import { getTransporter } from './transporter.js';
import { renderBusinessNotificationEmail, renderCustomerAcknowledgementEmail } from './templates.js';
import { updateEnquiryStatus } from '../storage/enquiryStore.js';
import { config } from '../config.js';

/**
 * Dispatches both the Business Notification and Customer Acknowledgement emails.
 */
export async function dispatchEnquiryEmails(enquiry) {
  const transporter = getTransporter();

  const businessTemplate = renderBusinessNotificationEmail(enquiry);
  const customerTemplate = renderCustomerAcknowledgementEmail(enquiry);

  const results = {
    business: { sent: false, messageId: null, error: null, accepted: [], rejected: [] },
    customer: { sent: false, messageId: null, error: null, accepted: [], rejected: [] }
  };

  // 1. Dispatch Business Notification Email
  try {
    const businessMailOptions = {
      from: config.smtp.from,
      to: config.businessEmail,
      replyTo: `"${enquiry.name.replace(/"/g, '')}" <${enquiry.email}>`,
      subject: businessTemplate.subject,
      text: businessTemplate.text,
      html: businessTemplate.html,
      headers: {
        'X-VoltTrack-Enquiry-ID': enquiry.id || '',
        'X-VoltTrack-Form-Type': enquiry.formType || 'contact',
      }
    };

    const businessInfo = await transporter.sendMail(businessMailOptions);
    results.business.sent = true;
    results.business.messageId = businessInfo.messageId;
    results.business.accepted = businessInfo.accepted || [];
    results.business.rejected = businessInfo.rejected || [];

    console.log(`[EMAIL] Business notification sent for ${enquiry.id}. MessageId: ${businessInfo.messageId}`);
  } catch (err) {
    results.business.sent = false;
    results.business.error = err.message;
    console.error(`[EMAIL ERROR] Failed to send business notification for ${enquiry.id}:`, err.message);
  }

  // 2. Dispatch Customer Acknowledgement Email
  // Only attempt if customer email is provided and business send succeeded or was attempted
  if (enquiry.email) {
    try {
      const customerMailOptions = {
        from: config.smtp.from,
        to: enquiry.email,
        replyTo: config.businessEmail,
        subject: customerTemplate.subject,
        text: customerTemplate.text,
        html: customerTemplate.html,
        headers: {
          'X-VoltTrack-Enquiry-ID': enquiry.id || '',
        }
      };

      const customerInfo = await transporter.sendMail(customerMailOptions);
      results.customer.sent = true;
      results.customer.messageId = customerInfo.messageId;
      results.customer.accepted = customerInfo.accepted || [];
      results.customer.rejected = customerInfo.rejected || [];

      console.log(`[EMAIL] Customer acknowledgement sent for ${enquiry.id} to ${enquiry.email}. MessageId: ${customerInfo.messageId}`);
    } catch (err) {
      results.customer.sent = false;
      results.customer.error = err.message;
      console.error(`[EMAIL ERROR] Failed to send customer acknowledgement for ${enquiry.id}:`, err.message);
    }
  }

  // 3. Update storage status
  if (enquiry.id) {
    await updateEnquiryStatus(enquiry.id, {
      businessEmail: results.business.sent ? 'sent' : 'failed',
      customerAck: results.customer.sent ? 'sent' : 'failed',
      lastError: results.business.error || results.customer.error || null,
      messageIds: {
        business: results.business.messageId,
        customer: results.customer.messageId,
      }
    });
  }

  return results;
}

