import { escapeHtml } from '../utils/security.js';

const BRAND = {
  name: 'VoltTrack Solar Solutions',
  shortName: 'VoltTrack Solar',
  website: 'https://www.volttracksolar.co.nz/',
  email: 'info@volttracksolar.co.nz',
  phone: '+64 22 426 6006',
  primaryColor: '#2f7d5c',
  primaryDark: '#1e533c',
  accentColor: '#f59e0b',
  textColor: '#1e293b',
  mutedColor: '#64748b',
  bgColor: '#f1f5f9',
  cardBg: '#ffffff',
  borderColor: '#e2e8f0',
};

/**
 * Generates the HTML and Plain Text templates for Business Notification email.
 */
export function renderBusinessNotificationEmail(enquiry) {
  const isQuote = enquiry.formType === 'quote';
  const heading = isQuote ? 'New Solar Quote Request' : 'New Website Enquiry';
  const subject = isQuote
    ? 'New Solar Quote Request – VoltTrack Solar'
    : 'New Website Enquiry – VoltTrack Solar';

  const safeName = escapeHtml(enquiry.name);
  const safeEmail = escapeHtml(enquiry.email);
  const safePhone = escapeHtml(enquiry.phone);
  const safePropType = escapeHtml(enquiry.propertyType);
  const safeLocation = escapeHtml(enquiry.location);
  const safeMessage = escapeHtml(enquiry.message).replace(/\n/g, '<br/>');
  const safeDate = escapeHtml(enquiry.submittedAtNZ || new Date().toLocaleString('en-NZ'));
  const safeId = escapeHtml(enquiry.id || 'N/A');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(subject)}</title>
  <style>
    body { margin: 0; padding: 0; background-color: ${BRAND.bgColor}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: ${BRAND.textColor}; }
    table { border-collapse: collapse; }
    .wrapper { width: 100%; table-layout: fixed; background-color: ${BRAND.bgColor}; padding: 30px 0; }
    .container { width: 100%; max-width: 600px; margin: 0 auto; background: ${BRAND.cardBg}; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06); border: 1px solid ${BRAND.borderColor}; }
    .header { background: linear-gradient(135deg, ${BRAND.primaryDark} 0%, ${BRAND.primaryColor} 100%); padding: 30px 32px; color: #ffffff; }
    .header h1 { margin: 0 0 6px; font-size: 22px; font-weight: 700; letter-spacing: -0.02em; color: #ffffff; }
    .header .badge { display: inline-block; background: rgba(255,255,255,0.18); color: #ffffff; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; padding: 4px 10px; border-radius: 20px; }
    .content { padding: 32px; }
    .meta-box { background: #f8fafc; border-left: 4px solid ${BRAND.primaryColor}; padding: 14px 18px; margin-bottom: 24px; border-radius: 0 8px 8px 0; font-size: 13px; color: ${BRAND.mutedColor}; }
    .meta-box strong { color: ${BRAND.textColor}; }
    .section-title { font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: ${BRAND.mutedColor}; margin: 0 0 12px; }
    .details-table { width: 100%; margin-bottom: 24px; }
    .details-table td { padding: 10px 0; border-bottom: 1px solid ${BRAND.borderColor}; font-size: 14px; vertical-align: top; }
    .details-table td.label { width: 35%; color: ${BRAND.mutedColor}; font-weight: 600; }
    .details-table td.value { width: 65%; color: ${BRAND.textColor}; font-weight: 500; }
    .message-card { background: #f8fafc; border: 1px solid ${BRAND.borderColor}; border-radius: 8px; padding: 18px 20px; margin-bottom: 26px; line-height: 1.6; font-size: 14px; color: ${BRAND.textColor}; }
    .button-wrap { text-align: center; margin: 24px 0 10px; }
    .reply-btn { display: inline-block; background: ${BRAND.primaryColor}; color: #ffffff !important; text-decoration: none; font-weight: 600; font-size: 14px; padding: 12px 26px; border-radius: 6px; }
    .footer { background: #f8fafc; border-top: 1px solid ${BRAND.borderColor}; padding: 20px 32px; font-size: 12px; color: ${BRAND.mutedColor}; text-align: center; }
  </style>
</head>
<body>
  <div class="wrapper">
    <table class="container" align="center" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td class="header">
          <span class="badge">${isQuote ? 'Quote Request' : 'General Enquiry'}</span>
          <h1 style="margin-top: 10px;">${heading}</h1>
          <p style="margin: 0; font-size: 13px; opacity: 0.9;">VoltTrack Solar Website Notification</p>
        </td>
      </tr>
      <tr>
        <td class="content">
          <div class="meta-box">
            <strong>Ref ID:</strong> ${safeId}<br/>
            <strong>Submitted:</strong> ${safeDate}<br/>
            <strong>Source Form:</strong> ${isQuote ? 'Free Solar Quote Form' : 'Contact Enquiry Form'}
          </div>

          <div class="section-title">Customer Details</div>
          <table class="details-table" role="presentation">
            <tr>
              <td class="label">Full Name</td>
              <td class="value"><strong>${safeName}</strong></td>
            </tr>
            <tr>
              <td class="label">Email Address</td>
              <td class="value"><a href="mailto:${safeEmail}" style="color: ${BRAND.primaryColor}; text-decoration: none;">${safeEmail}</a></td>
            </tr>
            <tr>
              <td class="label">NZ Phone Number</td>
              <td class="value"><a href="tel:${safePhone}" style="color: ${BRAND.primaryColor}; text-decoration: none;">${safePhone}</a></td>
            </tr>
            <tr>
              <td class="label">Property Type</td>
              <td class="value">${safePropType}</td>
            </tr>
            <tr>
              <td class="label">Location / Suburb</td>
              <td class="value">${safeLocation}</td>
            </tr>
          </table>

          <div class="section-title">Customer Message</div>
          <div class="message-card">
            ${safeMessage}
          </div>

          <div class="button-wrap">
            <a href="mailto:${safeEmail}?subject=Re:%20VoltTrack%20Solar%20${encodeURIComponent(heading)}%20[${encodeURIComponent(safeId)}]" class="reply-btn">Reply Directly to Customer</a>
          </div>
        </td>
      </tr>
      <tr>
        <td class="footer">
          This email was generated automatically by the VoltTrack Solar website enquiry system.<br/>
          Direct reply-to is configured for: <strong>${safeEmail}</strong>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>`;

  const text = `${heading.toUpperCase()} – VOLTTRACK SOLAR
==================================================
Reference ID: ${enquiry.id || 'N/A'}
Date & Time:  ${enquiry.submittedAtNZ || new Date().toLocaleString('en-NZ')}
Form Type:    ${isQuote ? 'Free Solar Quote' : 'Contact Enquiry'}

CUSTOMER DETAILS:
--------------------------------------------------
Full Name:      ${enquiry.name}
Email Address:  ${enquiry.email}
Phone Number:   ${enquiry.phone}
Property Type:  ${enquiry.propertyType}
Location:       ${enquiry.location}

CUSTOMER MESSAGE:
--------------------------------------------------
${enquiry.message}

--------------------------------------------------
Direct reply to this email will reply to: ${enquiry.email}
`;

  return { subject, html, text };
}

/**
 * Generates the HTML and Plain Text templates for Customer Acknowledgement email.
 */
export function renderCustomerAcknowledgementEmail(enquiry) {
  const subject = 'Thank You for Contacting VoltTrack Solar!';
  const isQuote = enquiry.formType === 'quote';

  const safeName = escapeHtml(enquiry.name);
  const safePropType = escapeHtml(enquiry.propertyType);
  const safeLocation = escapeHtml(enquiry.location);
  const safeMessage = escapeHtml(enquiry.message).replace(/\n/g, '<br/>');
  const safeId = escapeHtml(enquiry.id || 'N/A');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(subject)}</title>
  <style>
    body { margin: 0; padding: 0; background-color: ${BRAND.bgColor}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: ${BRAND.textColor}; }
    table { border-collapse: collapse; }
    .wrapper { width: 100%; table-layout: fixed; background-color: ${BRAND.bgColor}; padding: 30px 0; }
    .container { width: 100%; max-width: 600px; margin: 0 auto; background: ${BRAND.cardBg}; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06); border: 1px solid ${BRAND.borderColor}; }
    .header { background: linear-gradient(135deg, ${BRAND.primaryDark} 0%, ${BRAND.primaryColor} 100%); padding: 36px 32px; color: #ffffff; text-align: center; }
    .header h1 { margin: 0 0 6px; font-size: 24px; font-weight: 700; letter-spacing: -0.02em; color: #ffffff; }
    .header p { margin: 0; font-size: 14px; opacity: 0.9; }
    .content { padding: 36px 32px; line-height: 1.6; font-size: 15px; }
    .greeting { font-size: 17px; font-weight: 600; color: ${BRAND.textColor}; margin-bottom: 16px; }
    .intro-text { color: #334155; margin-bottom: 22px; }
    .summary-box { background: #f8fafc; border: 1px solid ${BRAND.borderColor}; border-radius: 8px; padding: 20px; margin: 24px 0; font-size: 13.5px; }
    .summary-box h3 { margin: 0 0 12px; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: ${BRAND.mutedColor}; }
    .summary-item { padding: 4px 0; }
    .summary-item strong { color: ${BRAND.textColor}; }
    .next-steps { background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 18px 20px; margin: 24px 0; font-size: 14px; color: #065f46; }
    .next-steps strong { display: block; margin-bottom: 4px; font-size: 15px; }
    .sign-off { margin-top: 30px; font-size: 14.5px; color: #334155; }
    .sign-off strong { color: ${BRAND.textColor}; }
    .footer { background: #07111f; color: #94a3b8; padding: 26px 32px; font-size: 12px; text-align: center; }
    .footer a { color: #86efac; text-decoration: none; }
  </style>
</head>
<body>
  <div class="wrapper">
    <table class="container" align="center" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td class="header">
          <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #86efac; margin-bottom: 8px;">VoltTrack Solar Solutions</div>
          <h1>We’ve Received Your Enquiry</h1>
          <p>Thank you for reaching out to New Zealand’s solar specialists.</p>
        </td>
      </tr>
      <tr>
        <td class="content">
          <div class="greeting">Hi ${safeName},</div>
          <div class="intro-text">
            Thank you for contacting <strong>VoltTrack Solar</strong>.<br/><br/>
            We have successfully received your enquiry. Our team will review your request and get back to you as soon as possible.<br/><br/>
            We appreciate your interest in our solar solutions.
          </div>

          <div class="summary-box">
            <h3>Summary of Your Request</h3>
            <div class="summary-item"><strong>Reference:</strong> ${safeId}</div>
            <div class="summary-item"><strong>Enquiry Type:</strong> ${isQuote ? 'Free Solar Quote' : 'General Enquiry'}</div>
            <div class="summary-item"><strong>Property Type:</strong> ${safePropType}</div>
            <div class="summary-item"><strong>Location:</strong> ${safeLocation}</div>
          </div>

          <div class="next-steps">
            <strong>What happens next?</strong>
            One of our solar consultants will assess your property details and contact you with tailored advice and transparent pricing.
          </div>

          <div class="sign-off">
            Kind regards,<br/>
            <strong>VoltTrack Solar Team</strong><br/>
            <span style="color: ${BRAND.mutedColor}; font-size: 13px;">Smarter Solar Energy For New Zealand</span><br/>
            <a href="${BRAND.website}" style="color: ${BRAND.primaryColor}; text-decoration: none; font-weight: 600;">${BRAND.website}</a>
          </div>
        </td>
      </tr>
      <tr>
        <td class="footer">
          <strong>VoltTrack Solar Solutions</strong> • Serving New Zealand<br/>
          Phone: <a href="tel:+64224266006">+64 22 426 6006</a> • Email: <a href="mailto:${BRAND.email}">${BRAND.email}</a><br/>
          <span style="font-size: 11px; color: #64748b; margin-top: 8px; display: block;">
            You received this email because you submitted an enquiry on volttracksolar.co.nz.
          </span>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>`;

  const text = `Hi ${enquiry.name},

Thank you for contacting VoltTrack Solar.

We have successfully received your enquiry (Ref: ${enquiry.id || 'N/A'}). Our team will review your request and get back to you as soon as possible.

We appreciate your interest in our solar solutions.

Your Submitted Details:
--------------------------------------------------
Reference:     ${enquiry.id || 'N/A'}
Property Type: ${enquiry.propertyType}
Location:      ${enquiry.location}

If you have urgent questions or need immediate assistance, feel free to call our team at +64 22 426 6006 or reply to this email.

Kind regards,
VoltTrack Solar Team
https://www.volttracksolar.co.nz/
`;

  return { subject, html, text };
}

