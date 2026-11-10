# VoltTrackSolar Solutions

New Zealand-focused website for VoltTrack Solar Solutions built with React, Vite, Express, and Nodemailer.

## Technology Stack
- **Frontend**: React 19, Vite 7, React Router 7
- **Backend**: Node.js, Express 5, Nodemailer
- **Email Delivery**: SSL/TLS SMTP Transporter (Port 465)
- **Styling**: Responsive CSS with custom properties matching brand guidelines

## Email Account & SMTP Configuration
The backend is configured to use the official VoltTrack Solar mail server over SSL/TLS:
- **Business Email / Recipient**: `info@volttracksolar.co.nz`
- **Incoming Mail (IMAP)**: `mail.volttracksolar.co.nz:993` (SSL/TLS)
- **Incoming Mail (POP3)**: `mail.volttracksolar.co.nz:995` (SSL/TLS)
- **Outgoing Mail (SMTP)**: `mail.volttracksolar.co.nz:465` (SSL/TLS direct)
- **Authentication**: Required (`info@volttracksolar.co.nz`)
- **Security**: Strict TLS certificate validation enabled (`rejectUnauthorized: true`, `minVersion: TLSv1.2`)

## Environment Setup
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Populate the `.env` file with the actual mailbox password:
   ```env
   PORT=5000
   CLIENT_ORIGIN=http://localhost:5173
   ENQUIRY_TO=info@volttracksolar.co.nz
   BUSINESS_EMAIL=info@volttracksolar.co.nz
   SMTP_HOST=mail.volttracksolar.co.nz
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER=info@volttracksolar.co.nz
   SMTP_PASSWORD=YOUR_ACTUAL_EMAIL_PASSWORD
   SMTP_FROM="VoltTrack Solar" <info@volttracksolar.co.nz>
   ```
> **Security Note:** Never commit `.env` to Git. `.gitignore` is pre-configured to ignore all `.env` files and `server/data/`.

## Running the Application

### Development
```bash
npm install
npm run dev
```
Starts Vite frontend on `http://localhost:5173` with automatic API proxying to Express backend on `http://localhost:5000`.

### Production
```bash
npm run build
npm start
```
Compiles optimized React assets into `dist/` and runs the production Express server serving both static assets and API routes.

## Testing & Diagnostics

- **Run all unit & integration tests**:
  ```bash
  npm test
  ```
  Validates input sanitization, CRLF prevention, HTML escaping, New Zealand phone number regex, rate limiting, and email template rendering.

- **Run API endpoint tests**:
  ```bash
  npm run test:api
  ```
  Tests `/api/health`, `/api/smtp/status`, and `/api/enquiries` validation, honeypot spam protection, atomic persistence, and rate limiting.

- **Run SMTP diagnostics**:
  ```bash
  npm run test:smtp
  ```
  Tests DNS resolution, direct TLS handshake on port 465, certificate expiration, server greeting, and credential authentication.

- **Send a live test enquiry email**:
  ```bash
  npm run test:smtp -- --send
  ```
  Dispatches a test enquiry to `info@volttracksolar.co.nz` and records delivery status.

## Enquiry Workflow & Security Architecture
1. **Submission**: Visitor fills out Free Quote or Contact form.
2. **Client Validation**: Fast feedback on required fields and New Zealand phone numbers.
3. **Anti-Spam & Rate Limiting**: Invisible honeypot field catches automated bots; IP rate limiter and fingerprint deduplication prevent spam floods.
4. **Data Persistence**: Enquiries are immediately and atomically saved to `server/data/submissions/` with a unique reference ID (e.g. `VTS-20261110-XXXX`). No submission is lost even during upstream SMTP outages.
5. **Business Notification**: Professional HTML email dispatched to `info@volttracksolar.co.nz` with customer details, NZ timestamp, and `Reply-To` set to customer.
6. **Customer Acknowledgement**: Branded thank-you email automatically dispatched to the customer's email address confirming receipt with reference number.
