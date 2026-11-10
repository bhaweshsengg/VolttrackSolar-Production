import crypto from 'crypto';

// Limits matching form constraints
export const FIELD_LIMITS = {
  name: 100,
  email: 254,
  phone: 30,
  propertyType: 50,
  location: 120,
  message: 2000,
};

// RFC 5322 compliant email regex
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// New Zealand phone numbers: +64 or 0 prefix, mobile (02x), landlines (03, 04, 06, 07, 09), toll-free (0800, 0508)
const NZ_PHONE_REGEX = /^(?:\+64\s?\(?0?\)?|\(?0)[2346798][\d\s().-]{6,14}$/;

/**
 * Escapes characters for safe inclusion in HTML templates.
 */
export function escapeHtml(value) {
  if (value === null || value === undefined) return '';
  return String(value).replace(/[&<>'"]/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[c]));
}

/**
 * Strips all newline/carriage return characters to prevent email header injection (CRLF injection).
 */
export function sanitizeSingleLine(input, maxLength = 255) {
  if (!input) return '';
  return String(input)
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

/**
 * Sanitizes multi-line input (such as user messages) while limiting total size.
 */
export function sanitizeMultiLine(input, maxLength = FIELD_LIMITS.message) {
  if (!input) return '';
  // Normalize carriage returns to standard newlines, remove harmful control characters
  return String(input)
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .trim()
    .slice(0, maxLength);
}

/**
 * Validates enquiry submission payload.
 */
export function validateEnquiryInput(body = {}) {
  const errors = {};

  const name = sanitizeSingleLine(body.name, FIELD_LIMITS.name);
  const email = sanitizeSingleLine(body.email, FIELD_LIMITS.email);
  const phone = sanitizeSingleLine(body.phone, FIELD_LIMITS.phone);
  const propertyType = sanitizeSingleLine(body.propertyType, FIELD_LIMITS.propertyType);
  const location = sanitizeSingleLine(body.location, FIELD_LIMITS.location);
  const message = sanitizeMultiLine(body.message, FIELD_LIMITS.message);
  const formType = body.formType === 'quote' ? 'quote' : 'contact';

  // Required field checks
  if (!name) {
    errors.name = 'Full name is required.';
  } else if (name.length > FIELD_LIMITS.name) {
    errors.name = `Name must be ${FIELD_LIMITS.name} characters or fewer.`;
  }

  if (!email) {
    errors.email = 'Email address is required.';
  } else if (!EMAIL_REGEX.test(email) || email.length > FIELD_LIMITS.email) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!phone) {
    errors.phone = 'Phone number is required.';
  } else if (!NZ_PHONE_REGEX.test(phone)) {
    errors.phone = 'Please enter a valid New Zealand phone number.';
  }

  if (!propertyType) {
    errors.propertyType = 'Please select a property type.';
  }

  if (!location) {
    errors.location = 'Property location / suburb is required.';
  } else if (location.length > FIELD_LIMITS.location) {
    errors.location = `Location must be ${FIELD_LIMITS.location} characters or fewer.`;
  }

  if (!message) {
    errors.message = 'Message is required.';
  } else if (message.length > FIELD_LIMITS.message) {
    errors.message = `Message must be ${FIELD_LIMITS.message} characters or fewer.`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    data: {
      name,
      email,
      phone,
      propertyType,
      location,
      message,
      formType,
    }
  };
}

/**
 * Generates an SHA-256 fingerprint from enquiry details to detect duplicate submissions.
 */
export function generateFingerprint(data) {
  const normalized = [
    data.name,
    data.email,
    data.phone,
    data.propertyType,
    data.location,
    data.message,
    data.formType
  ].map(s => String(s || '').trim().toLowerCase()).join('::');

  return crypto.createHash('sha256').update(normalized).digest('hex');
}

/**
 * In-memory sliding-window rate limiter with automatic TTL cleanup to prevent memory leaks.
 */
export class RateLimiter {
  constructor(windowMs = 15 * 60 * 1000, maxRequests = 5, duplicateWindowMs = 60 * 1000) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
    this.duplicateWindowMs = duplicateWindowMs;
    this.ipLogs = new Map();
    this.duplicateLogs = new Map();

    // Clean up expired records every 5 minutes
    this.cleanupTimer = setInterval(() => this.cleanup(), 5 * 60 * 1000);
    if (this.cleanupTimer.unref) this.cleanupTimer.unref();
  }

  check(ip, fingerprint) {
    const now = Date.now();

    // 1. Duplicate submission check
    if (fingerprint) {
      const lastDuplicateTime = this.duplicateLogs.get(fingerprint);
      if (lastDuplicateTime && (now - lastDuplicateTime) < this.duplicateWindowMs) {
        return {
          allowed: false,
          reason: 'duplicate',
          retryAfterMs: this.duplicateWindowMs - (now - lastDuplicateTime)
        };
      }
    }

    // 2. IP rate limit check
    const rawTimes = this.ipLogs.get(ip) || [];
    const validTimes = rawTimes.filter(t => (now - t) < this.windowMs);

    if (validTimes.length >= this.maxRequests) {
      const oldestValid = validTimes[0];
      const retryAfterMs = this.windowMs - (now - oldestValid);
      return {
        allowed: false,
        reason: 'rate_limited',
        retryAfterMs
      };
    }

    // Record request
    validTimes.push(now);
    this.ipLogs.set(ip, validTimes);
    if (fingerprint) {
      this.duplicateLogs.set(fingerprint, now);
    }

    return { allowed: true };
  }

  cleanup() {
    const now = Date.now();
    for (const [ip, timestamps] of this.ipLogs.entries()) {
      const valid = timestamps.filter(t => (now - t) < this.windowMs);
      if (valid.length === 0) {
        this.ipLogs.delete(ip);
      } else {
        this.ipLogs.set(ip, valid);
      }
    }
    for (const [fingerprint, time] of this.duplicateLogs.entries()) {
      if ((now - time) >= this.duplicateWindowMs) {
        this.duplicateLogs.delete(fingerprint);
      }
    }
  }

  destroy() {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }
  }
}
