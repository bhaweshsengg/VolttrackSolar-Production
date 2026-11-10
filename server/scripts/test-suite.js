import {
  validateEnquiryInput,
  sanitizeSingleLine,
  sanitizeMultiLine,
  escapeHtml,
  RateLimiter
} from '../utils/security.js';
import {
  renderBusinessNotificationEmail,
  renderCustomerAcknowledgementEmail
} from '../email/templates.js';
import {
  saveEnquiry,
  updateEnquiryStatus,
  getEnquiryById,
  generateReferenceId
} from '../storage/enquiryStore.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

async function runTests() {
  console.log('====================================================');
  console.log(' VoltTrack Solar - Integration & Security Test Suite');
  console.log('====================================================\n');

  // 1. Security & Sanitization
  console.log('[TEST 1] Email Header Injection Prevention (CRLF)');
  const dirtyHeader = 'John Doe\r\nBcc: evil@attacker.com\nTo: someone@else.com';
  const cleanHeader = sanitizeSingleLine(dirtyHeader, 100);
  assert(!cleanHeader.includes('\r'), 'Carriage returns stripped');
  assert(!cleanHeader.includes('\n'), 'Newlines stripped');
  assert(cleanHeader.startsWith('John Doe'), 'Content preserved');

  console.log('\n[TEST 2] HTML XSS Escaping');
  const xss = '<script>alert("xss")</script>&"\'';
  const safe = escapeHtml(xss);
  assert(!safe.includes('<script>'), '< and > escaped properly');
  assert(safe.includes('&amp;'), '& escaped to &amp;');
  assert(safe.includes('&quot;'), '" escaped to &quot;');
  assert(safe.includes('&#39;'), "' escaped to &#39;");

  console.log('\n[TEST 3] Validation Logic');
  // Valid payload
  const validPayload = {
    name: 'Sarah Connor',
    email: 'sarah.connor@example.co.nz',
    phone: '+64 21 555 1234',
    propertyType: 'Residential home',
    location: 'Hamilton',
    message: 'I would like to inquire about a 5kW solar system with battery storage.'
  };
  const validRes = validateEnquiryInput(validPayload);
  assert(validRes.isValid, 'Valid NZ submission passes validation');

  // Invalid email
  const badEmailRes = validateEnquiryInput({ ...validPayload, email: 'invalid-email@' });
  assert(!badEmailRes.isValid && !!badEmailRes.errors.email, 'Malformed email rejected');

  // Invalid phone
  const badPhoneRes = validateEnquiryInput({ ...validPayload, phone: '123' });
  assert(!badPhoneRes.isValid && !!badPhoneRes.errors.phone, 'Non-NZ phone number rejected');

  // Empty mandatory fields
  const emptyRes = validateEnquiryInput({});
  assert(!emptyRes.isValid, 'Empty payload rejected');
  assert(emptyRes.errors.name && emptyRes.errors.email && emptyRes.errors.phone && emptyRes.errors.message, 'All mandatory fields flagged');

  // Alternate valid NZ phone formats
  const phoneFormats = ['021 123 4567', '0271234567', '+64211234567', '03 345 6789', '0800 123 456'];
  for (const phone of phoneFormats) {
    const res = validateEnquiryInput({ ...validPayload, phone });
    assert(res.isValid, `NZ phone format "${phone}" accepted`);
  }

  console.log('\n[TEST 4] Rate Limiter & Deduplication');
  const limiter = new RateLimiter(60000, 3, 2000); // 3 per min, 2s duplicate window
  const ip = '192.168.1.100';
  const fp1 = 'fingerprint-abc';

  // First request allowed
  const check1 = limiter.check(ip, fp1);
  assert(check1.allowed, 'First request allowed');

  // Immediate duplicate rejected
  const checkDup = limiter.check(ip, fp1);
  assert(!checkDup.allowed && checkDup.reason === 'duplicate', 'Immediate duplicate fingerprint rejected');

  // Different fingerprint allowed up to limit
  const check2 = limiter.check(ip, 'fp-2');
  assert(check2.allowed, 'Second distinct request allowed');
  const check3 = limiter.check(ip, 'fp-3');
  assert(check3.allowed, 'Third distinct request allowed');

  // 4th request exceeds max
  const check4 = limiter.check(ip, 'fp-4');
  assert(!check4.allowed && check4.reason === 'rate_limited', 'Exceeded rate limit rejected with 429');
  limiter.destroy();

  console.log('\n[TEST 5] Persistent Enquiry Storage');
  const refId = generateReferenceId();
  assert(/^VTS-\d{8}-[A-F0-9]{6}$/.test(refId), `Generated Reference ID matches format (${refId})`);

  const savedRecord = await saveEnquiry({
    name: 'Test Customer',
    email: 'customer@example.co.nz',
    phone: '021 999 888',
    propertyType: 'Residential home',
    location: 'Auckland',
    message: 'Testing storage persistence',
    formType: 'quote'
  });
  assert(!!savedRecord.id, `Saved record assigned ID ${savedRecord.id}`);
  assert(savedRecord.status.businessEmail === 'pending', 'Initial business email status is pending');

  const retrieved = await getEnquiryById(savedRecord.id);
  assert(retrieved && retrieved.name === 'Test Customer', 'Record accurately retrieved from disk');

  await updateEnquiryStatus(savedRecord.id, {
    businessEmail: 'sent',
    customerAck: 'sent',
  });
  const updated = await getEnquiryById(savedRecord.id);
  assert(updated.status.businessEmail === 'sent' && updated.status.customerAck === 'sent', 'Status updated successfully in storage');

  console.log('\n[TEST 6] Email Templates Generation');
  const testEnquiry = {
    id: 'VTS-20261110-TEST01',
    name: 'Jane Doe',
    email: 'jane.doe@example.co.nz',
    phone: '021 345 6789',
    propertyType: 'Commercial property',
    location: 'Tauranga',
    message: 'Looking for a 30kW rooftop solar system for our warehouse.',
    formType: 'quote',
    submittedAtNZ: 'Tuesday, 10 November 2026 at 5:00 PM NZDT'
  };

  const businessMail = renderBusinessNotificationEmail(testEnquiry);
  assert(businessMail.subject.includes('New Solar Quote Request'), 'Business subject reflects quote type');
  assert(businessMail.html.includes('Jane Doe'), 'Business template contains customer name');
  assert(businessMail.html.includes('jane.doe@example.co.nz'), 'Business template contains customer email');
  assert(businessMail.html.includes('Tauranga'), 'Business template contains location');
  assert(businessMail.html.includes('mailto:jane.doe@example.co.nz'), 'Business template has mailto link');
  assert(businessMail.text.includes('30kW rooftop solar'), 'Business text fallback contains message');

  const customerMail = renderCustomerAcknowledgementEmail(testEnquiry);
  assert(customerMail.subject === 'Thank You for Contacting VoltTrack Solar!', 'Customer subject is accurate');
  assert(customerMail.html.includes('Hi Jane Doe,'), 'Customer template has personalized greeting');
  assert(customerMail.html.includes('Thank you for contacting'), 'Customer template has thank you message');
  assert(customerMail.html.includes('VTS-20261110-TEST01'), 'Customer template includes reference ID');
  assert(customerMail.html.includes('https://www.volttracksolar.co.nz/'), 'Customer template includes website link');

  console.log('\n====================================================');
  console.log(`Results: ${passed} Passed, ${failed} Failed`);
  console.log('====================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});

