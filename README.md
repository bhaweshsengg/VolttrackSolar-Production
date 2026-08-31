# VoltTrackSolar Solutions

New Zealand-focused React website converted from the supplied Solartec HTML template.

## Stack
- React + Vite
- React Router
- Express API
- Nodemailer SMTP email service
- Responsive CSS with CSS theme variables

## Run locally
1. Install Node.js 20+.
2. Run `npm install`.
3. Copy `.env.example` to `.env`.
4. Set the business email and SMTP values in `.env`.
5. Run `npm run dev`.
6. Open `http://localhost:5173`.

## Email setup
Forms post to `POST /api/enquiries`. The browser never receives SMTP credentials. The server uses environment variables only.

Required variables:
- `BUSINESS_EMAIL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASSWORD`
- `SMTP_FROM`

The quote subject is `New Solar Quote Request - VoltTrackSolar Solutions`.
The contact subject is `New Website Enquiry - VoltTrackSolar Solutions`.

## Production
Run `npm run build` and then `npm start`. The Express server serves the generated `dist` folder and the `/api` endpoint.

## Notes
- Existing useful image assets from the supplied template are preserved in `public/images`.
- Placeholder/lorem ipsum/template branding has been removed from the React site.
- The public site does not expose a mailbox credential or hard-coded delivery address. Set the real destination through `BUSINESS_EMAIL` on the server.
