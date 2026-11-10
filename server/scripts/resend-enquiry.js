import 'dotenv/config';
import { getEnquiryById, updateEnquiryStatus, getPendingEnquiries } from '../storage/enquiryStore.js';
import { dispatchEnquiryEmails } from '../email/dispatcher.js';
import { config } from '../config.js';

async function main() {
  const targetId = process.argv[2];

  console.log('====================================================');
  console.log(' VoltTrack Solar - Resend / Process Stored Enquiries');
  console.log('====================================================');

  if (!config.isSmtpConfigured()) {
    console.error('\n✗ Error: SMTP_PASSWORD is not configured in .env.');
    console.error('Please open .env and set your actual password:');
    console.error('  SMTP_PASSWORD=your_actual_password\n');
    process.exit(1);
  }

  let enquiriesToProcess = [];

  if (targetId) {
    const enquiry = await getEnquiryById(targetId);
    if (!enquiry) {
      console.error(`\n✗ Error: Enquiry with ID "${targetId}" was not found.`);
      process.exit(1);
    }
    enquiriesToProcess = [enquiry];
  } else {
    enquiriesToProcess = await getPendingEnquiries();
    if (enquiriesToProcess.length === 0) {
      console.log('\n✓ No pending or failed enquiries found to resend.');
      return;
    }
    console.log(`\nFound ${enquiriesToProcess.length} pending enquiry record(s) to process.`);
  }

  for (const item of enquiriesToProcess) {
    console.log(`\nProcessing ${item.id} (${item.name} <${item.email}>)...`);
    const results = await dispatchEnquiryEmails(item);

    if (results.business.sent) {
      console.log(`  ✓ Business Notification Sent! (MessageId: ${results.business.messageId})`);
    } else {
      console.error(`  ✗ Business Notification Failed: ${results.business.error}`);
    }

    if (results.customer.sent) {
      console.log(`  ✓ Customer Acknowledgement Sent! (MessageId: ${results.customer.messageId})`);
    } else {
      console.error(`  ✗ Customer Acknowledgement Failed: ${results.customer.error}`);
    }
  }

  console.log('\n====================================================');
  console.log(' Done.');
  console.log('====================================================');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

