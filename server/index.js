import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = Number(process.env.PORT || 5000);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '100kb' }));

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nzPhonePattern = /^(?:\+64|0)\s?(?:2\d|[3-9]\d)[\d\s()-]{6,12}$/;
const fieldLimits = { name: 100, email: 254, phone: 30, propertyType: 50, location: 120, message: 2000 };
const requestLog = new Map();
const duplicateLog = new Map();

function validate(body) {
  const required = ['name','email','phone','propertyType','location','message'];
  const errors = {};
  for (const field of required) {
    const value = String(body[field] || '').trim();
    if (!value) errors[field] = 'Required';
    else if (value.length > fieldLimits[field]) errors[field] = 'Too long';
  }
  if (body.email && !emailPattern.test(String(body.email).trim())) errors.email = 'Invalid email';
  if (body.phone && !nzPhonePattern.test(String(body.phone).trim())) errors.phone = 'Invalid NZ phone';
  return errors;
}

function requestAllowed(ip, fingerprint) {
  const now = Date.now();
  const requests = (requestLog.get(ip) || []).filter(time => now - time < 60_000);
  if (requests.length >= 10) return false;
  requestLog.set(ip, [...requests, now]);
  const previous = duplicateLog.get(fingerprint);
  if (previous && now - previous < 30_000) return false;
  duplicateLog.set(fingerprint, now);
  return true;
}

function mailTransport() {
  const required = ['SMTP_HOST','SMTP_USER','SMTP_PASSWORD','BUSINESS_EMAIL'];
  const missing = required.filter(k => !process.env[k]);
  if (missing.length) throw new Error(`Email service is not configured. Missing: ${missing.join(', ')}`);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE).toLowerCase() === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
  });
}

app.get('/api/health', (_req,res) => res.json({ ok:true, service:'VoltTrackSolar API' }));
app.post('/api/enquiries', async (req,res) => {
  const errors = validate(req.body || {});
  if (Object.keys(errors).length) return res.status(400).json({ message:'Please correct the highlighted fields.', errors });
  const { name,email,phone,propertyType,location,message } = req.body;
  const formType = req.body.formType === 'quote' ? 'quote' : 'contact';
  const fingerprint = [name,email,phone,propertyType,location,message,formType].map(value => String(value).trim().toLowerCase()).join('|');
  if (!requestAllowed(req.ip, fingerprint)) return res.status(429).json({ message:'Please wait before sending another enquiry.' });
  const subject = formType === 'quote' ? 'New Solar Quote Request - VoltTrackSolar Solutions' : 'New Website Enquiry - VoltTrackSolar Solutions';
  const text = [
    `Name: ${name}`, `Email: ${email}`, `Phone: ${phone}`, `Property type: ${propertyType}`,
    `Location: ${location || 'Not provided'}`, `Form: ${formType}`, '', 'Message:', message
  ].join('\n');
  try {
    const transporter = mailTransport();
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.BUSINESS_EMAIL,
      replyTo: email,
      subject,
      text,
      html: `<h2>${subject}</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Phone:</strong> ${escapeHtml(phone)}</p><p><strong>Property type:</strong> ${escapeHtml(propertyType)}</p><p><strong>Location:</strong> ${escapeHtml(location || 'Not provided')}</p><p><strong>Form:</strong> ${escapeHtml(formType)}</p><hr/><p><strong>Message</strong></p><p>${escapeHtml(message).replace(/\n/g,'<br/>')}</p>`
    });
    res.json({ ok:true, message:'Enquiry sent successfully.' });
  } catch (error) {
    console.error('Email send failed:', error.message);
    res.status(500).json({ message:'We could not send your enquiry right now. Please try again shortly.' });
  }
});

function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }

const dist = path.resolve(__dirname, '../dist');
app.use(express.static(dist));
app.get(/^(?!\/api\/).*/, (req,res) => { res.sendFile(path.join(dist,'index.html'), err => err && res.status(404).send('Build the React app first with npm run build.')); });
app.listen(port, () => console.log(`VoltTrackSolar API listening on http://localhost:${port}`));
