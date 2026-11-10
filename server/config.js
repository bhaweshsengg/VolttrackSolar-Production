import 'dotenv/config';

export const config = {
  port: Number(process.env.PORT || 5000),
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',

  // Business destination email
  businessEmail: process.env.ENQUIRY_TO || process.env.BUSINESS_EMAIL || 'info@volttracksolar.co.nz',

  // Outgoing SMTP configuration
  smtp: {
    host: process.env.SMTP_HOST || 'mail.volttracksolar.co.nz',
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE !== undefined
      ? String(process.env.SMTP_SECURE).toLowerCase() === 'true'
      : true,
    user: process.env.SMTP_USER || 'info@volttracksolar.co.nz',
    password: process.env.SMTP_PASSWORD || '',
    from: process.env.SMTP_FROM || '"VoltTrack Solar" <info@volttracksolar.co.nz>',
  },

  // Security & Rate Limiting
  rateLimit: {
    maxPerWindow: Number(process.env.RATE_LIMIT_MAX || 5), // 5 requests per IP
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000), // 15 minutes
    duplicateWindowMs: 60 * 1000, // 60 seconds
  },

  isSmtpConfigured() {
    return Boolean(
      this.smtp.host &&
      this.smtp.user &&
      this.smtp.password &&
      this.smtp.password !== 'YOUR_ACTUAL_EMAIL_PASSWORD' &&
      this.smtp.password !== 'your-smtp-password'
    );
  }
};

