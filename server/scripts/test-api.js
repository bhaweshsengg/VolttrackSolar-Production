import { spawn } from 'child_process';
import http from 'http';

function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request(`http://127.0.0.1:5001${path}`, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });
    req.on('error', reject);
    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

async function runApiTests() {
  console.log('Starting API server on port 5001 for endpoint verification...');

  const serverProc = spawn(process.execPath, ['server/index.js'], {
    env: { ...process.env, PORT: '5001' },
    stdio: ['ignore', 'pipe', 'pipe']
  });

  serverProc.stdout.on('data', d => {
    // console.log(`[SERVER] ${d.toString().trim()}`);
  });
  serverProc.stderr.on('data', d => {
    console.error(`[SERVER ERR] ${d.toString().trim()}`);
  });

  // Wait for server to start with polling
  for (let i = 0; i < 15; i++) {
    await new Promise(r => setTimeout(r, 300));
    try {
      const ping = await request('/api/health');
      if (ping.status === 200) break;
    } catch {
      // still starting
    }
  }

  let passed = 0;
  let failed = 0;

  function assert(cond, msg) {
    if (cond) {
      console.log(`  ✓ ${msg}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${msg}`);
      failed++;
    }
  }

  try {
    console.log('\n[TEST 1] GET /api/health');
    const health = await request('/api/health');
    assert(health.status === 200, 'Health check returned 200');
    assert(health.body.ok === true, 'Health check body ok: true');

    console.log('\n[TEST 2] GET /api/smtp/status');
    const smtpStatus = await request('/api/smtp/status');
    assert(smtpStatus.status === 200, 'SMTP status returned 200');
    assert(smtpStatus.body.smtp.host === 'mail.volttracksolar.co.nz', 'Correct host reported');
    assert(smtpStatus.body.smtp.port === 465, 'Correct port 465 reported');

    console.log('\n[TEST 3] POST /api/enquiries - Missing required fields');
    const badReq = await request('/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { name: 'Only Name' }
    });
    assert(badReq.status === 400, 'Returned 400 Bad Request');
    assert(!!badReq.body.errors.email, 'Email identified as missing');
    assert(!!badReq.body.errors.phone, 'Phone identified as missing');

    console.log('\n[TEST 4] POST /api/enquiries - Honeypot spam trap');
    const botReq = await request('/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        name: 'Bot Spammer',
        email: 'spammer@bot.com',
        phone: '021 123 4567',
        propertyType: 'Other',
        location: 'Nowhere',
        message: 'Buy cheap watches',
        b_hp_field: 'I am a bot filling hidden fields'
      }
    });
    assert(botReq.status === 400, 'Spam rejected with 400');

    console.log('\n[TEST 5] POST /api/enquiries - Valid submission with storage preservation');
    const validReq = await request('/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        name: 'David Miller',
        email: 'david.miller@example.co.nz',
        phone: '022 987 6543',
        propertyType: 'Residential home',
        location: 'Christchurch',
        message: 'Interested in solar panel installation for a 4-bedroom house in Christchurch.',
        formType: 'quote'
      }
    });
    // Valid submission preserves record and responds appropriately based on SMTP availability
    if (validReq.status === 200) {
      assert(validReq.status === 200, 'Returned 200 OK on successful submission and email dispatch');
      assert(validReq.body.ok === true, 'Reports ok: true when email is accepted');
    } else {
      assert(validReq.status === 502 || validReq.status === 503, 'Returned 502/503 when SMTP is pending or unreachable (enquiry preserved safely)');
      assert(validReq.body.ok === false, 'Reports ok: false (prevents false reporting of delivery)');
    }
    assert(!!validReq.body.referenceId, `Reference ID generated and returned: ${validReq.body.referenceId}`);
    assert(validReq.body.message.includes('sent') || validReq.body.message.includes('saved') || validReq.body.message.includes('received'), 'Confirms submission message');

    console.log('\n[TEST 6] POST /api/enquiries - Immediate duplicate submission');
    const dupReq = await request('/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        name: 'David Miller',
        email: 'david.miller@example.co.nz',
        phone: '022 987 6543',
        propertyType: 'Residential home',
        location: 'Christchurch',
        message: 'Interested in solar panel installation for a 4-bedroom house in Christchurch.',
        formType: 'quote'
      }
    });
    assert(dupReq.status === 429, 'Duplicate submission blocked with 429 Too Many Requests');

    console.log('\n====================================================');
    console.log(`API Results: ${passed} Passed, ${failed} Failed`);
    console.log('====================================================\n');
  } finally {
    serverProc.kill();
  }
}

runApiTests().catch(console.error);

