import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const DATA_DIR = isServerless
  ? path.join(os.tmpdir(), 'volttrack-data')
  : path.resolve(__dirname, '../data');
const SUBMISSIONS_DIR = path.join(DATA_DIR, 'submissions');
const LOG_FILE = path.join(DATA_DIR, 'enquiries-log.json');

// Safe atomic file writer with Windows cross-device and existing file fallback
async function safeWriteFile(targetPath, data) {
  const tempPath = `${targetPath}.tmp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  await fs.writeFile(tempPath, data, 'utf-8');
  try {
    await fs.rename(tempPath, targetPath);
  } catch (err) {
    if (err.code === 'EPERM' || err.code === 'EEXIST' || err.code === 'EBUSY') {
      // Windows fallback when overwriting an existing file
      await fs.copyFile(tempPath, targetPath);
      await fs.unlink(tempPath).catch(() => {});
    } else {
      throw err;
    }
  }
}

// Ensure storage directories exist
async function ensureDirs() {
  try {
    await fs.mkdir(SUBMISSIONS_DIR, { recursive: true });
  } catch (err) {
    console.error('Failed to create submissions directory:', err.message);
  }
}
ensureDirs();

/**
 * Generates a clean, unique reference ID for customer communication and tracking.
 * Format: VTS-YYYYMMDD-XXXX
 */
export function generateReferenceId() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const randomSuffix = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `VTS-${year}${month}${day}-${randomSuffix}`;
}

/**
 * Returns formatted New Zealand date and time string.
 */
export function getNewZealandTimestamp(date = new Date()) {
  return new Intl.DateTimeFormat('en-NZ', {
    timeZone: 'Pacific/Auckland',
    dateStyle: 'full',
    timeStyle: 'medium',
  }).format(date);
}

/**
 * Atomically saves a new enquiry submission to persistent storage.
 */
export async function saveEnquiry(enquiryData) {
  await ensureDirs();

  const id = generateReferenceId();
  const now = new Date();

  const record = {
    id,
    submittedAt: now.toISOString(),
    submittedAtNZ: getNewZealandTimestamp(now),
    formType: enquiryData.formType || 'contact',
    name: enquiryData.name,
    email: enquiryData.email,
    phone: enquiryData.phone,
    propertyType: enquiryData.propertyType,
    location: enquiryData.location,
    message: enquiryData.message,
    status: {
      businessEmail: 'pending', // 'pending' | 'sent' | 'failed'
      customerAck: 'pending',   // 'pending' | 'sent' | 'failed'
      attempts: 0,
      lastError: null,
    },
    meta: {
      ip: enquiryData.ip || 'unknown',
      userAgent: enquiryData.userAgent || 'unknown',
    }
  };

  const filePath = path.join(SUBMISSIONS_DIR, `${id}.json`);

  // Atomic file write
  await safeWriteFile(filePath, JSON.stringify(record, null, 2));

  // Update append log
  await appendToLog(record);

  return record;
}

/**
 * Updates status of an existing enquiry record.
 */
export async function updateEnquiryStatus(id, statusUpdate) {
  const filePath = path.join(SUBMISSIONS_DIR, `${id}.json`);
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    const record = JSON.parse(raw);

    record.status = {
      ...record.status,
      ...statusUpdate,
      updatedAt: new Date().toISOString(),
    };

    await safeWriteFile(filePath, JSON.stringify(record, null, 2));

    return record;
  } catch (err) {
    console.error(`Failed to update status for enquiry ${id}:`, err.message);
    return null;
  }
}

/**
 * Retrieves an enquiry by reference ID.
 */
export async function getEnquiryById(id) {
  const filePath = path.join(SUBMISSIONS_DIR, `${id}.json`);
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Appends the summary of an enquiry to the master log file.
 */
async function appendToLog(record) {
  try {
    let log = [];
    try {
      const raw = await fs.readFile(LOG_FILE, 'utf-8');
      log = JSON.parse(raw);
      if (!Array.isArray(log)) log = [];
    } catch {
      log = [];
    }

    log.unshift({
      id: record.id,
      submittedAt: record.submittedAt,
      submittedAtNZ: record.submittedAtNZ,
      formType: record.formType,
      name: record.name,
      email: record.email,
      phone: record.phone,
      propertyType: record.propertyType,
      location: record.location,
      status: record.status
    });

    // Keep the latest 500 records in the log
    if (log.length > 500) log = log.slice(0, 500);

    await safeWriteFile(LOG_FILE, JSON.stringify(log, null, 2));
  } catch (err) {
    console.error('Failed to update enquiries log:', err.message);
  }
}

/**
 * Retrieves all enquiries with pending or failed email deliveries.
 */
export async function getPendingEnquiries() {
  await ensureDirs();
  try {
    const files = await fs.readdir(SUBMISSIONS_DIR);
    const pending = [];

    for (const file of files) {
      if (!file.endsWith('.json')) continue;
      try {
        const content = await fs.readFile(path.join(SUBMISSIONS_DIR, file), 'utf-8');
        const record = JSON.parse(content);
        if (record.status.businessEmail !== 'sent' || record.status.customerAck !== 'sent') {
          pending.push(record);
        }
      } catch {
        // Skip corrupted files
      }
    }
    return pending;
  } catch {
    return [];
  }
}

