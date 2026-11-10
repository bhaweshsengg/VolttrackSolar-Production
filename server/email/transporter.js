import nodemailer from 'nodemailer';
import { config } from '../config.js';

let cachedTransporter = null;

/**
 * Creates and configures the Nodemailer SMTP transporter.
 */
export function createTransporter() {
  if (!config.isSmtpConfigured()) {
    throw new Error(
      'SMTP is not fully configured. Missing SMTP_PASSWORD or required credentials in environment variables.'
    );
  }

  const transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.secure, // SSL/TLS on port 465
    auth: {
      user: config.smtp.user,
      pass: config.smtp.password,
    },
    tls: {
      // Never disable TLS verification as required by security guidelines
      rejectUnauthorized: true,
      minVersion: 'TLSv1.2',
    },
    connectionTimeout: 15000, // 15 seconds
    greetingTimeout: 10000,   // 10 seconds
    socketTimeout: 20000,     // 20 seconds
    pool: false,              // single connections for accuracy
  });

  return transporter;
}

/**
 * Returns a reusable transporter or initializes one.
 */
export function getTransporter() {
  if (!cachedTransporter) {
    cachedTransporter = createTransporter();
  }
  return cachedTransporter;
}

/**
 * Clears cached transporter (useful when credentials are refreshed).
 */
export function resetTransporter() {
  cachedTransporter = null;
}

/**
 * Verifies SMTP connection and authentication status.
 * Returns structured diagnostic details without revealing the password.
 */
export async function verifySmtp() {
  if (!config.isSmtpConfigured()) {
    return {
      connected: false,
      authenticated: false,
      code: 'MISSING_CREDENTIALS',
      message: 'SMTP_PASSWORD is missing or set to placeholder.',
      host: config.smtp.host,
      port: config.smtp.port,
      user: config.smtp.user,
    };
  }

  try {
    const transporter = createTransporter();
    await transporter.verify();
    return {
      connected: true,
      authenticated: true,
      code: 'SUCCESS',
      message: 'SMTP connection and authentication verified successfully.',
      host: config.smtp.host,
      port: config.smtp.port,
      user: config.smtp.user,
      secure: config.smtp.secure,
    };
  } catch (error) {
    const code = error.code || error.responseCode || 'UNKNOWN_ERROR';
    let humanMessage = error.message;

    if (code === 'EAUTH' || error.command === 'AUTH') {
      humanMessage = 'SMTP Authentication failed. Please check the email account password (SMTP_PASSWORD).';
    } else if (code === 'ECONNECTION' || code === 'ETIMEDOUT') {
      humanMessage = `SMTP Connection failed to ${config.smtp.host}:${config.smtp.port}. Network or firewall timeout.`;
    } else if (code === 'ESOCKET' || error.message.includes('certificate')) {
      humanMessage = 'TLS certificate validation or handshake failed.';
    }

    return {
      connected: false,
      authenticated: false,
      code: String(code),
      message: humanMessage,
      host: config.smtp.host,
      port: config.smtp.port,
      user: config.smtp.user,
      rawError: error.message,
    };
  }
}

