import 'dotenv/config';
import dns from 'dns/promises';
import tls from 'tls';
import { config } from '../config.js';
import { verifySmtp, createTransporter } from '../email/transporter.js';
import { dispatchEnquiryEmails } from '../email/dispatcher.js';

async function runDiagnostics() {
  console.log('====================================================');
  console.log(' VoltTrack Solar - SMTP & Email Integration Diagnostic');
  console.log('====================================================');
  console.log(`Timestamp:       ${new Date().toISOString()}`);
  console.log(`Target Host:     ${config.smtp.host}`);
  console.log(`Target Port:     ${config.smtp.port} (SSL/TLS: ${config.smtp.secure})`);
  console.log(`SMTP User:       ${config.smtp.user}`);
  console.log(`Destination:     ${config.businessEmail}`);
  console.log(`Password Set:    ${config.isSmtpConfigured() ? 'YES (configured)' : 'NO (empty or placeholder)'}`);
  console.log('----------------------------------------------------');

  // Step 1: DNS Resolution
  console.log('\n[1/4] Checking DNS Resolution...');
  try {
    const addresses = await dns.resolve4(config.smtp.host);
    console.log(`✓ DNS Resolved successfully: ${addresses.join(', ')}`);
  } catch (err) {
    console.error(`✗ DNS Resolution failed for ${config.smtp.host}:`, err.message);
    process.exit(1);
  }

  // Step 2: TLS Socket Connection & Certificate Validation
  console.log('\n[2/4] Testing Direct TLS Handshake on Port 465...');
  await new Promise((resolve) => {
    const socket = tls.connect(
      {
        host: config.smtp.host,
        port: config.smtp.port,
        servername: config.smtp.host,
        rejectUnauthorized: true,
      },
      () => {
        const cert = socket.getPeerCertificate();
        console.log('✓ TLS Handshake Successful:');
        console.log(`  - Protocol:     ${socket.getProtocol()}`);
        console.log(`  - Cipher:       ${socket.getCipher().name}`);
        console.log(`  - Authorized:   ${socket.authorized}`);
        console.log(`  - Subject CN:   ${cert.subject ? cert.subject.CN : 'N/A'}`);
        console.log(`  - Issuer:       ${cert.issuer ? (cert.issuer.O || cert.issuer.CN) : 'N/A'}`);
        console.log(`  - Valid Until:  ${cert.valid_to}`);
      }
    );

    let greeted = false;
    socket.setEncoding('utf8');
    socket.on('data', (data) => {
      if (!greeted) {
        greeted = true;
        console.log(`✓ SMTP Server Greeting received:\n  ${data.trim().split('\n').join('\n  ')}`);
        socket.end();
        resolve(true);
      }
    });

    socket.on('error', (err) => {
      console.error('✗ TLS / Socket Connection Error:', err.message);
      resolve(false);
    });

    socket.setTimeout(10000, () => {
      console.error('✗ Connection timed out waiting for SMTP greeting.');
      socket.destroy();
      resolve(false);
    });
  });

  // Step 3: SMTP Transporter Authentication Verification
  console.log('\n[3/4] Verifying Nodemailer Transporter Authentication...');
  if (!config.isSmtpConfigured()) {
    console.log('! SMTP_PASSWORD is not set or using placeholder in .env.');
    console.log('  To complete authentication test, add your actual password to .env:');
    console.log('  SMTP_PASSWORD=your_actual_password');
  } else {
    const status = await verifySmtp();
    if (status.authenticated) {
      console.log('✓ SMTP Authentication Verified Successfully!');
      console.log(`  Connected and authenticated as ${config.smtp.user}`);
    } else {
      console.error('✗ SMTP Authentication Failed:');
      console.error(`  Code:    ${status.code}`);
      console.error(`  Message: ${status.message}`);
      if (status.rawError) console.error(`  Raw:     ${status.rawError}`);
    }
  }

  // Step 4: Optional End-to-End Test Send
  const args = process.argv.slice(2);
  const shouldSend = args.includes('--send');

  if (shouldSend) {
    console.log('\n[4/4] Sending Live Test Enquiry Email (--send flag passed)...');
    if (!config.isSmtpConfigured()) {
      console.error('✗ Cannot send test email: SMTP_PASSWORD is missing.');
    } else {
      try {
        const testPayload = {
          id: `TEST-${Date.now()}`,
          formType: 'quote',
          name: 'VoltTrack Test User',
          email: config.businessEmail, // sends acknowledgement to business email for testing
          phone: '021 123 4567',
          propertyType: 'Residential home',
          location: 'Hamilton, Waikato',
          message: 'This is an automated test enquiry verifying the VoltTrack Solar email integration.',
          submittedAtNZ: new Date().toLocaleString('en-NZ', { timeZone: 'Pacific/Auckland' })
        };

        const dispatchResult = await dispatchEnquiryEmails(testPayload);
        console.log('✓ Test Email Dispatch Results:');
        console.log(`  - Business Notification: ${dispatchResult.business.sent ? 'SENT' : 'FAILED'}`);
        if (dispatchResult.business.messageId) console.log(`    MessageId: ${dispatchResult.business.messageId}`);
        if (dispatchResult.business.error) console.log(`    Error: ${dispatchResult.business.error}`);
        console.log(`  - Customer Acknowledgement: ${dispatchResult.customer.sent ? 'SENT' : 'FAILED'}`);
        if (dispatchResult.customer.messageId) console.log(`    MessageId: ${dispatchResult.customer.messageId}`);
        if (dispatchResult.customer.error) console.log(`    Error: ${dispatchResult.customer.error}`);
      } catch (err) {
        console.error('✗ Error during test send:', err.message);
      }
    }
  } else {
    console.log('\n[4/4] Test Email Dispatch skipped (run with `npm run test:smtp -- --send` to dispatch a test email).');
  }

  console.log('\n====================================================');
  console.log(' Diagnostic Summary Complete');
  console.log('====================================================');
}

runDiagnostics().catch(console.error);

