import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import app from './app.js';
import { config } from './config.js';

const port = config.port;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve static frontend in standalone/local production mode
const dist = path.resolve(__dirname, '../dist');
app.use(express.static(dist));
app.get(/^(?!\/api\/).*/, (_req, res) => {
  res.sendFile(path.join(dist, 'index.html'), err => {
    if (err) res.status(404).send('Build the React app first with npm run build.');
  });
});

app.listen(port, () => {
  console.log(`VoltTrack Solar API listening on http://localhost:${port}`);
  console.log(`SMTP Destination: ${config.businessEmail}`);
  console.log(`SMTP Server: ${config.smtp.host}:${config.smtp.port} (Secure: ${config.smtp.secure})`);
  console.log(`SMTP Configured: ${config.isSmtpConfigured() ? 'Yes' : 'No (Requires valid SMTP_PASSWORD)'}`);
});

export default app;
