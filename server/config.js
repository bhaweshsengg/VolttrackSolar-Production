import 'dotenv/config';

/**
 * Safely strips quotes only when a string is completely enclosed by matching double or single quotes.
 * e.g. "secret123" -> secret123, 'secret123' -> secret123
 * Leaves unquoted or internal quotes intact: e.g. "VoltTrack Solar" <info@volttracksolar.co.nz>
 */
export function stripQuotes(str) {
  if (typeof str !== 'string') return '';
  const trimmed = str.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"') && trimmed.length >= 2) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'") && trimmed.length >= 2)
  ) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
}

/**
 * Safely extracts environment variable values, trimming whitespace and stripping surrounding quotes.
 */
export function getEnvValue(...keys) {
  for (const k of keys) {
    const val = process.env[k];
    if (val !== undefined && val !== null && String(val).trim() !== '') {
      return stripQuotes(String(val));
    }
  }
  return '';
}

/**
 * Safely parses an email address with optional display name.
 * Returns an object { name, address } which Nodemailer formats perfectly and uses
 * the pure email address for SMTP envelope MAIL FROM.
 */
export function parseSender(raw, defaultEmail = 'info@volttracksolar.co.nz', defaultName = 'VoltTrack Solar') {
  if (!raw) {
    return { name: defaultName, address: defaultEmail };
  }
  const str = String(raw).trim();
  // Case 1: "Display Name" <email@domain.com> or Display Name <email@domain.com>
  const match = str.match(/^(?:["']?([^"<]+)["']?\s*)?<([^>]+)>$/);
  if (match) {
    const name = (match[1] || defaultName).trim().replace(/^["']|["']$/g, '');
    const address = match[2].trim().replace(/^["']|["']$/g, '');
    return { name: name || defaultName, address };
  }
  // Case 2: raw email address e.g. info@volttracksolar.co.nz
  if (str.includes('@')) {
    return { name: defaultName, address: str.replace(/^["']|["']$/g, '').trim() };
  }
  return { name: defaultName, address: defaultEmail };
}

const smtpUser = getEnvValue('SMTP_USER', 'EMAIL_USER', 'MAIL_USER') || 'info@volttracksolar.co.nz';

export const config = {
  port: Number(getEnvValue('PORT') || 5000),
  clientOrigin: getEnvValue('CLIENT_ORIGIN') || 'http://localhost:5173',

  // Business destination email
  businessEmail: getEnvValue('ENQUIRY_TO', 'BUSINESS_EMAIL', 'NOTIFICATION_EMAIL', 'CONTACT_EMAIL') || 'info@volttracksolar.co.nz',

  // Outgoing SMTP configuration
  smtp: {
    host: getEnvValue('SMTP_HOST', 'EMAIL_HOST', 'MAIL_HOST') || 'mail.volttracksolar.co.nz',
    port: Number(getEnvValue('SMTP_PORT', 'EMAIL_PORT', 'MAIL_PORT') || 465),
    secure: (() => {
      const sec = getEnvValue('SMTP_SECURE', 'EMAIL_SECURE', 'MAIL_SECURE');
      return sec !== '' ? sec.toLowerCase() === 'true' : true;
    })(),
    user: smtpUser,
    password: getEnvValue(
      'SMTP_PASSWORD',
      'SMTP_PASS',
      'SMTP_PWD',
      'EMAIL_PASSWORD',
      'EMAIL_PASS',
      'MAIL_PASSWORD',
      'MAIL_PASS'
    ),
    from: parseSender(
      getEnvValue('SMTP_FROM', 'EMAIL_FROM', 'MAIL_FROM'),
      smtpUser,
      'VoltTrack Solar'
    ),
  },

  // Security & Rate Limiting
  rateLimit: {
    maxPerWindow: Number(getEnvValue('RATE_LIMIT_MAX') || 5), // 5 requests per IP
    windowMs: Number(getEnvValue('RATE_LIMIT_WINDOW_MS') || 15 * 60 * 1000), // 15 minutes
    duplicateWindowMs: 60 * 1000, // 60 seconds
  },

  isSmtpConfigured() {
    return Boolean(
      this.smtp.host &&
      this.smtp.user &&
      this.smtp.password &&
      this.smtp.password !== 'YOUR_ACTUAL_EMAIL_PASSWORD' &&
      this.smtp.password !== 'your-smtp-password' &&
      this.smtp.password !== 'your-actual-smtp-password'
    );
  }
};
