import express from 'express';
import cors from 'cors';

import { config } from './config.js';
import {
  validateEnquiryInput,
  generateFingerprint,
  RateLimiter
} from './utils/security.js';
import { saveEnquiry, updateEnquiryStatus } from './storage/enquiryStore.js';
import { dispatchEnquiryEmails } from './email/dispatcher.js';
import { verifySmtp } from './email/transporter.js';

const app = express();

// Trust reverse proxy (needed for accurate IP rate limiting on hosts like Vercel, Railway, Cloudflare, Nginx)
app.set('trust proxy', 1);

// CORS configuration supporting local dev and production Vercel domains
const allowedOrigins = new Set([
  'http://localhost:5173',
  'http://localhost:5000',
  'https://www.volttracksolar.co.nz',
  'https://volttracksolar.co.nz',
  config.clientOrigin
].filter(Boolean));

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like same-origin fetches or mobile requests)
    if (!origin || allowedOrigins.has(origin)) {
      return callback(null, true);
    }
    // Allow any subdomain of volttracksolar.co.nz
    if (/^https:\/\/([a-z0-9-]+\.)?volttracksolar\.co\.nz$/i.test(origin)) {
      return callback(null, true);
    }
    return callback(null, false);
  },
  credentials: true
}));
app.use(express.json({ limit: '100kb' }));

// Rate limiter instance
const rateLimiter = new RateLimiter(
  config.rateLimit.windowMs,
  config.rateLimit.maxPerWindow,
  config.rateLimit.duplicateWindowMs
);

/**
 * Health Check Endpoint
 * Supports both /api/health and /health
 */
app.get(['/api/health', '/health'], (_req, res) => {
  res.json({
    ok: true,
    service: 'VoltTrackSolar Solutions API',
    smtpConfigured: config.isSmtpConfigured(),
    timestamp: new Date().toISOString()
  });
});

/**
 * Diagnostic SMTP Status Endpoint (Read-only status, no passwords exposed)
 * Supports both /api/smtp/status and /smtp/status
 */
app.get(['/api/smtp/status', '/smtp/status'], async (_req, res) => {
  const status = await verifySmtp();
  res.json({
    ok: status.connected && status.authenticated,
    smtp: status
  });
});

/**
 * Main Enquiry Submission Endpoint
 * Supports both /api/enquiries and /enquiries
 */
app.post(['/api/enquiries', '/enquiries'], async (req, res) => {
  try {
    const rawBody = req.body || {};

    // 1. Honeypot check (anti-spam)
    if (rawBody.website || rawBody.b_hp_field) {
      console.warn('[SECURITY] Spam submission detected via honeypot field.');
      return res.status(400).json({
        ok: false,
        message: 'Invalid submission detected.'
      });
    }

    // 2. Validate user input
    const validation = validateEnquiryInput(rawBody);
    if (!validation.isValid) {
      return res.status(400).json({
        ok: false,
        message: 'Please correct the highlighted fields.',
        errors: validation.errors
      });
    }

    const { data } = validation;

    // 3. Rate limiting and duplicate prevention
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip || 'unknown';
    const fingerprint = generateFingerprint(data);
    const rateCheck = rateLimiter.check(clientIp, fingerprint);

    if (!rateCheck.allowed) {
      if (rateCheck.reason === 'duplicate') {
        return res.status(429).json({
          ok: false,
          message: 'This enquiry has already been submitted. Please wait before submitting again.'
        });
      }
      return res.status(429).json({
        ok: false,
        message: 'Too many submissions from your connection. Please wait a few minutes before trying again.'
      });
    }

    // 4. Preserve enquiry data atomically BEFORE attempting email dispatch
    const record = await saveEnquiry({
      ...data,
      ip: clientIp,
      userAgent: req.get('user-agent') || 'unknown',
    });

    console.log(`[ENQUIRY RECEIVED] Saved enquiry ${record.id} from ${data.name} <${data.email}>`);

    // 5. Verify SMTP configuration before sending
    if (!config.isSmtpConfigured()) {
      console.warn(`[SMTP WARNING] SMTP_PASSWORD is not configured. Enquiry ${record.id} saved to database but email not dispatched.`);
      await updateEnquiryStatus(record.id, {
        businessEmail: 'failed',
        customerAck: 'failed',
        lastError: 'SMTP_PASSWORD is not configured on server.'
      });

      return res.status(503).json({
        ok: false,
        referenceId: record.id,
        message: `Your enquiry has been received and saved (Reference: ${record.id}). However, our automated email dispatch is temporarily offline. Our team has your details and will contact you directly.`
      });
    }

    // 6. Dispatch emails (Business notification + Customer acknowledgement)
    const emailResults = await dispatchEnquiryEmails({
      ...data,
      id: record.id,
      submittedAtNZ: record.submittedAtNZ,
    });

    // 7. Handle response based on actual email dispatch result
    if (emailResults.business.sent) {
      return res.status(200).json({
        ok: true,
        referenceId: record.id,
        message: 'Thanks — your enquiry has been sent. Our team will be in touch soon.',
        customerAckSent: emailResults.customer.sent
      });
    } else {
      // Business notification failed: Never falsely tell user it succeeded!
      console.error(`[ENQUIRY FAILED] SMTP failed to deliver business email for ${record.id}: ${emailResults.business.error}`);
      return res.status(502).json({
        ok: false,
        referenceId: record.id,
        message: `We could not send your enquiry notification email at this moment. Your message has been safely saved (Reference: ${record.id}) and our team will review it shortly.`
      });
    }

  } catch (err) {
    console.error('[UNCAUGHT SERVER ERROR in /api/enquiries]:', err);
    return res.status(500).json({
      ok: false,
      message: 'An unexpected error occurred while processing your enquiry. Please try again shortly.'
    });
  }
});

export default app;

