# 🔧 Week 2: Backend Core Setup Guide
**Malaysian Legal Transcription Suite - Development Timeline**

---

## 📋 Week 2 Overview

**Duration:** 40 hours (5 days × 8 hours)
**Goal:** Build complete backend API with database, file storage, and job queue system
**Prerequisites:** Week 1 completed (frontend foundation ready)

---

## Day 1: Express Server & Database Setup (8 hours)

### Hour 1-2: Express Server Structure

#### Step 1: Create Server File Structure

```bash
cd backend/src
mkdir -p routes controllers middleware services utils config
```

Create proper server structure in `backend/src/server.js`:

```javascript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';
import logger from './utils/logger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Malaysian Legal Transcription API',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// API routes
app.use('/api', routes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
  logger.info(`📝 Environment: ${process.env.NODE_ENV}`);
  logger.info(`🔗 Frontend URL: ${process.env.FRONTEND_URL}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
  });
});

export default app;
```

**Install additional dependencies:**
```bash
cd backend
npm install helmet morgan
```

---

#### Step 2: Create Error Handler Middleware

Create `backend/src/middleware/errorHandler.js`:

```javascript
import logger from '../utils/logger.js';

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip
  });

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new AppError(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new AppError(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(e => e.message).join(', ');
    error = new AppError(message, 400);
  }

  // Multer file upload errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    error = new AppError('File too large', 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

export { AppError, errorHandler as default };
```

---

#### Step 3: Create Route Index

Create `backend/src/routes/index.js`:

```javascript
import express from 'express';
import uploadRoutes from './upload.routes.js';
import jobRoutes from './job.routes.js';
import transcriptRoutes from './transcript.routes.js';

const router = express.Router();

// API version prefix
const API_VERSION = '/v1';

// Mount routes
router.use(`${API_VERSION}/upload`, uploadRoutes);
router.use(`${API_VERSION}/jobs`, jobRoutes);
router.use(`${API_VERSION}/transcripts`, transcriptRoutes);

// API info
router.get('/', (req, res) => {
  res.json({
    message: 'Malaysian Legal Transcription API',
    version: '1.0.0',
    endpoints: {
      upload: `${API_VERSION}/upload`,
      jobs: `${API_VERSION}/jobs`,
      transcripts: `${API_VERSION}/transcripts`
    }
  });
});

export default router;
```

**Verification:**
```bash
npm run dev
```
Visit http://localhost:3000/api - should see API info.

---

### Hour 3-4: Database Schema Design

#### Step 1: Create Database Schema

Create `backend/src/db/schema.sql`:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Transcription Jobs Table
CREATE TABLE IF NOT EXISTS transcription_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- File information
  audio_filename VARCHAR(500) NOT NULL,
  audio_url TEXT NOT NULL,
  audio_size_bytes BIGINT,
  audio_duration_seconds INT,
  pdf_filename VARCHAR(500),
  pdf_url TEXT,

  -- Job details
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  -- Status: pending, queued, processing, completed, failed
  progress INT DEFAULT 0,
  current_step VARCHAR(100),

  -- Contact
  proofreader_email VARCHAR(255) NOT NULL,

  -- Results
  transcript_url TEXT,
  transcript_text TEXT,
  confidence_score DECIMAL(5,2),
  word_count INT,

  -- Processing details
  processing_started_at TIMESTAMP,
  processing_completed_at TIMESTAMP,
  processing_duration_ms INT,

  -- Error handling
  error_message TEXT,
  retry_count INT DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Indexes
  CONSTRAINT check_status CHECK (status IN ('pending', 'queued', 'processing', 'completed', 'failed'))
);

-- API Usage Tracking Table
CREATE TABLE IF NOT EXISTS api_usage (
  id SERIAL PRIMARY KEY,
  job_id UUID REFERENCES transcription_jobs(id) ON DELETE CASCADE,

  -- Cost tracking
  month VARCHAR(7) NOT NULL, -- Format: YYYY-MM
  provider VARCHAR(50) NOT NULL, -- groq, replicate, openai
  duration_seconds INT NOT NULL,
  cost_usd DECIMAL(10, 6) DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Indexes for querying
  INDEX idx_month (month),
  INDEX idx_provider (provider)
);

-- Transcript Segments Table (for timestamped transcript)
CREATE TABLE IF NOT EXISTS transcript_segments (
  id SERIAL PRIMARY KEY,
  job_id UUID REFERENCES transcription_jobs(id) ON DELETE CASCADE,

  -- Segment details
  start_time DECIMAL(10, 2) NOT NULL, -- seconds
  end_time DECIMAL(10, 2) NOT NULL,
  speaker VARCHAR(100),
  text TEXT NOT NULL,
  language VARCHAR(10), -- ms, en, zh
  confidence DECIMAL(5, 2),

  -- Ordering
  segment_index INT NOT NULL,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Indexes
  INDEX idx_job_id (job_id),
  INDEX idx_segment_index (job_id, segment_index)
);

-- PDF Extracted Terms Table
CREATE TABLE IF NOT EXISTS pdf_extracted_terms (
  id SERIAL PRIMARY KEY,
  job_id UUID REFERENCES transcription_jobs(id) ON DELETE CASCADE,

  -- Extracted data
  term_type VARCHAR(50) NOT NULL, -- party_name, lawyer_name, case_number, legal_term
  term_value TEXT NOT NULL,
  frequency INT DEFAULT 1,

  -- Context
  context TEXT,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Indexes
  INDEX idx_job_id (job_id),
  INDEX idx_term_type (term_type)
);

-- Job Logs Table (for debugging)
CREATE TABLE IF NOT EXISTS job_logs (
  id SERIAL PRIMARY KEY,
  job_id UUID REFERENCES transcription_jobs(id) ON DELETE CASCADE,

  -- Log details
  level VARCHAR(20) NOT NULL, -- info, warn, error
  message TEXT NOT NULL,
  metadata JSONB,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Indexes
  INDEX idx_job_id (job_id),
  INDEX idx_level (level),
  INDEX idx_created_at (created_at)
);

-- Update timestamp trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to transcription_jobs
CREATE TRIGGER update_transcription_jobs_updated_at
  BEFORE UPDATE ON transcription_jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

#### Step 2: Run Migration

Create `backend/src/db/migrate.js`:

```javascript
import { pool } from './index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function migrate() {
  try {
    logger.info('Starting database migration...');

    // Read schema file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf-8');

    // Execute schema
    await pool.query(schema);

    logger.info('✅ Database migration completed successfully');
    process.exit(0);
  } catch (error) {
    logger.error('❌ Database migration failed:', error);
    process.exit(1);
  }
}

migrate();
```

**Run migration:**
```bash
node src/db/migrate.js
```

---

### Hour 5-6: Database Connection & Models

#### Step 1: Create Database Connection Pool

Update `backend/src/db/index.js`:

```javascript
import pkg from 'pg';
const { Pool } = pkg;
import logger from '../utils/logger.js';

// Create connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20, // Maximum pool size
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test connection
pool.on('connect', () => {
  logger.info('✅ Database connected');
});

pool.on('error', (err) => {
  logger.error('❌ Unexpected database error:', err);
  process.exit(-1);
});

// Helper function to execute queries
export async function query(text, params) {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;

    if (duration > 1000) {
      logger.warn(`Slow query detected (${duration}ms): ${text}`);
    }

    return res;
  } catch (error) {
    logger.error('Database query error:', { text, error: error.message });
    throw error;
  }
}

// Helper for transactions
export async function transaction(callback) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export { pool };
```

#### Step 2: Create Job Model

Create `backend/src/models/Job.model.js`:

```javascript
import { query } from '../db/index.js';
import { AppError } from '../middleware/errorHandler.js';

class JobModel {
  // Create new transcription job
  static async create(jobData) {
    const {
      audioFilename,
      audioUrl,
      audioSize,
      audioDuration,
      pdfFilename,
      pdfUrl,
      proofreaderEmail
    } = jobData;

    const sql = `
      INSERT INTO transcription_jobs (
        audio_filename, audio_url, audio_size_bytes, audio_duration_seconds,
        pdf_filename, pdf_url, proofreader_email, status
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending')
      RETURNING *
    `;

    const result = await query(sql, [
      audioFilename,
      audioUrl,
      audioSize,
      audioDuration,
      pdfFilename,
      pdfUrl,
      proofreaderEmail
    ]);

    return result.rows[0];
  }

  // Get job by ID
  static async findById(jobId) {
    const sql = 'SELECT * FROM transcription_jobs WHERE id = $1';
    const result = await query(sql, [jobId]);

    if (result.rows.length === 0) {
      throw new AppError('Job not found', 404);
    }

    return result.rows[0];
  }

  // Update job status
  static async updateStatus(jobId, status, additionalData = {}) {
    const updates = { status, ...additionalData };
    const fields = Object.keys(updates);
    const values = Object.values(updates);

    const setClause = fields.map((field, i) => `${field} = $${i + 2}`).join(', ');
    const sql = `
      UPDATE transcription_jobs
      SET ${setClause}
      WHERE id = $1
      RETURNING *
    `;

    const result = await query(sql, [jobId, ...values]);
    return result.rows[0];
  }

  // Update progress
  static async updateProgress(jobId, progress, currentStep) {
    const sql = `
      UPDATE transcription_jobs
      SET progress = $2, current_step = $3
      WHERE id = $1
      RETURNING *
    `;

    const result = await query(sql, [jobId, progress, currentStep]);
    return result.rows[0];
  }

  // Mark job as completed
  static async markCompleted(jobId, transcriptUrl, transcriptText, confidenceScore) {
    const sql = `
      UPDATE transcription_jobs
      SET
        status = 'completed',
        progress = 100,
        transcript_url = $2,
        transcript_text = $3,
        confidence_score = $4,
        processing_completed_at = CURRENT_TIMESTAMP,
        processing_duration_ms = EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - processing_started_at)) * 1000
      WHERE id = $1
      RETURNING *
    `;

    const result = await query(sql, [jobId, transcriptUrl, transcriptText, confidenceScore]);
    return result.rows[0];
  }

  // Mark job as failed
  static async markFailed(jobId, errorMessage) {
    const sql = `
      UPDATE transcription_jobs
      SET
        status = 'failed',
        error_message = $2
      WHERE id = $1
      RETURNING *
    `;

    const result = await query(sql, [jobId, errorMessage]);
    return result.rows[0];
  }

  // Get jobs by status
  static async findByStatus(status, limit = 100) {
    const sql = `
      SELECT * FROM transcription_jobs
      WHERE status = $1
      ORDER BY created_at DESC
      LIMIT $2
    `;

    const result = await query(sql, [status, limit]);
    return result.rows;
  }

  // Delete old jobs (cleanup)
  static async deleteOlderThan(days) {
    const sql = `
      DELETE FROM transcription_jobs
      WHERE created_at < NOW() - INTERVAL '${days} days'
      RETURNING id
    `;

    const result = await query(sql);
    return result.rows.length;
  }
}

export default JobModel;
```

**Verification:**
```bash
# Test database connection
node -e "import('./src/db/index.js').then(db => db.query('SELECT NOW()')).then(r => console.log('DB OK:', r.rows[0]))"
```

---

### Hour 7-8: File Upload Endpoints

#### Step 1: Install Multer for File Uploads

```bash
npm install multer
```

#### Step 2: Create Upload Middleware

Create `backend/src/middleware/upload.js`:

```javascript
import multer from 'multer';
import path from 'path';
import { AppError } from './errorHandler.js';

// Configure multer storage (memory storage for now)
const storage = multer.memoryStorage();

// File filter
const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'audio') {
    // Audio files
    const allowedAudioTypes = [
      'audio/mpeg',
      'audio/mp3',
      'audio/wav',
      'audio/x-wav',
      'audio/m4a',
      'audio/x-m4a',
      'video/mp4',
      'audio/mp4'
    ];

    if (allowedAudioTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new AppError('Invalid audio file type. Supported: MP3, WAV, M4A, MP4', 400), false);
    }
  } else if (file.fieldname === 'pdf') {
    // PDF files
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new AppError('Invalid PDF file type', 400), false);
    }
  } else {
    cb(new AppError('Unexpected field', 400), false);
  }
};

// Create multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 500 * 1024 * 1024, // 500MB for audio
    files: 2 // Max 2 files (audio + pdf)
  }
});

export default upload;
```

#### Step 3: Create Upload Routes

Create `backend/src/routes/upload.routes.js`:

```javascript
import express from 'express';
import upload from '../middleware/upload.js';
import { uploadFiles } from '../controllers/upload.controller.js';

const router = express.Router();

// POST /api/v1/upload
router.post(
  '/',
  upload.fields([
    { name: 'audio', maxCount: 1 },
    { name: 'pdf', maxCount: 1 }
  ]),
  uploadFiles
);

export default router;
```

#### Step 4: Create Upload Controller

Create `backend/src/controllers/upload.controller.js`:

```javascript
import JobModel from '../models/Job.model.js';
import { AppError } from '../middleware/errorHandler.js';
import logger from '../utils/logger.js';

export async function uploadFiles(req, res, next) {
  try {
    // Validate files
    if (!req.files || !req.files.audio) {
      throw new AppError('Audio file is required', 400);
    }

    // Validate email
    const { proofreaderEmail } = req.body;
    if (!proofreaderEmail || !proofreaderEmail.includes('@')) {
      throw new AppError('Valid proofreader email is required', 400);
    }

    const audioFile = req.files.audio[0];
    const pdfFile = req.files.pdf ? req.files.pdf[0] : null;

    // TODO: Upload to S3 (will implement in next section)
    // For now, store temporarily
    const audioUrl = `temp://${audioFile.originalname}`;
    const pdfUrl = pdfFile ? `temp://${pdfFile.originalname}` : null;

    // Create job in database
    const job = await JobModel.create({
      audioFilename: audioFile.originalname,
      audioUrl,
      audioSize: audioFile.size,
      audioDuration: null, // Will be extracted during processing
      pdfFilename: pdfFile?.originalname || null,
      pdfUrl,
      proofreaderEmail
    });

    logger.info(`Job created: ${job.id}`);

    // TODO: Add job to queue (will implement tomorrow)

    res.status(201).json({
      success: true,
      message: 'Files uploaded successfully',
      data: {
        jobId: job.id,
        status: job.status,
        audioFilename: job.audio_filename,
        pdfFilename: job.pdf_filename
      }
    });
  } catch (error) {
    next(error);
  }
}
```

**Verification:**
Test with Postman or Thunder Client:
```
POST http://localhost:3000/api/v1/upload
Body: form-data
- audio: [select audio file]
- pdf: [select pdf file] (optional)
- proofreaderEmail: test@example.com
```

---

### ✅ Day 1 Completion Checklist

- [ ] Express server with proper structure
- [ ] Error handling middleware
- [ ] Route organization
- [ ] Database schema created and migrated
- [ ] Connection pool configured
- [ ] Job model with CRUD operations
- [ ] File upload middleware (Multer)
- [ ] Upload endpoint functional
- [ ] All endpoints tested with Postman

**Git Commit:**
```bash
git add .
git commit -m "Week 2 Day 1: Express server, database schema, and file upload endpoints"
git push
```

---

## Day 2: AWS S3 Integration & Job Queue (8 hours)

### Hour 1-2: AWS S3 Setup

#### Step 1: Install AWS SDK

```bash
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

#### Step 2: Create S3 Service

Create `backend/src/services/S3Service.js`:

```javascript
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';
import logger from '../utils/logger.js';

class S3Service {
  constructor() {
    this.client = new S3Client({
      region: process.env.AWS_REGION || 'ap-southeast-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      }
    });

    this.bucket = process.env.AWS_S3_BUCKET;
  }

  // Upload file to S3
  async uploadFile(file, folder = 'audio') {
    const key = `${folder}/${uuidv4()}-${file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      Metadata: {
        originalName: file.originalname,
        uploadedAt: new Date().toISOString()
      }
    });

    try {
      await this.client.send(command);
      logger.info(`File uploaded to S3: ${key}`);

      // Return public URL
      return `https://${this.bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    } catch (error) {
      logger.error('S3 upload error:', error);
      throw new Error('Failed to upload file to storage');
    }
  }

  // Generate signed URL for private file access
  async getSignedUrl(key, expiresIn = 3600) {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key
    });

    try {
      const url = await getSignedUrl(this.client, command, { expiresIn });
      return url;
    } catch (error) {
      logger.error('S3 signed URL error:', error);
      throw new Error('Failed to generate download URL');
    }
  }

  // Delete file from S3
  async deleteFile(key) {
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: key
    });

    try {
      await this.client.send(command);
      logger.info(`File deleted from S3: ${key}`);
      return true;
    } catch (error) {
      logger.error('S3 delete error:', error);
      return false;
    }
  }

  // Extract key from S3 URL
  extractKeyFromUrl(url) {
    const urlObj = new URL(url);
    return urlObj.pathname.substring(1); // Remove leading '/'
  }
}

export default new S3Service();
```

**Install uuid:**
```bash
npm install uuid
```

#### Step 3: Update Upload Controller to Use S3

Update `backend/src/controllers/upload.controller.js`:

```javascript
import JobModel from '../models/Job.model.js';
import S3Service from '../services/S3Service.js';
import { AppError } from '../middleware/errorHandler.js';
import logger from '../utils/logger.js';

export async function uploadFiles(req, res, next) {
  try {
    // Validate files
    if (!req.files || !req.files.audio) {
      throw new AppError('Audio file is required', 400);
    }

    // Validate email
    const { proofreaderEmail } = req.body;
    if (!proofreaderEmail || !proofreaderEmail.includes('@')) {
      throw new AppError('Valid proofreader email is required', 400);
    }

    const audioFile = req.files.audio[0];
    const pdfFile = req.files.pdf ? req.files.pdf[0] : null;

    logger.info(`Uploading files to S3...`);

    // Upload audio to S3
    const audioUrl = await S3Service.uploadFile(audioFile, 'audio');

    // Upload PDF to S3 if exists
    let pdfUrl = null;
    if (pdfFile) {
      pdfUrl = await S3Service.uploadFile(pdfFile, 'pdf');
    }

    logger.info(`Files uploaded successfully`);

    // Create job in database
    const job = await JobModel.create({
      audioFilename: audioFile.originalname,
      audioUrl,
      audioSize: audioFile.size,
      audioDuration: null,
      pdfFilename: pdfFile?.originalname || null,
      pdfUrl,
      proofreaderEmail
    });

    logger.info(`Job created: ${job.id}`);

    // TODO: Add job to queue (next section)

    res.status(201).json({
      success: true,
      message: 'Files uploaded successfully',
      data: {
        jobId: job.id,
        status: job.status,
        audioFilename: job.audio_filename,
        pdfFilename: job.pdf_filename
      }
    });
  } catch (error) {
    next(error);
  }
}
```

**Update .env:**
```env
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=ap-southeast-1
AWS_S3_BUCKET=malaysian-legal-transcription-dev
```

**Verification:**
Upload file via Postman - check AWS S3 console to confirm file uploaded.

---

### Hour 3-4: Redis & BullMQ Setup

#### Step 1: Install BullMQ

```bash
npm install bullmq ioredis
```

#### Step 2: Create Queue Service

Create `backend/src/services/QueueService.js`:

```javascript
import { Queue, Worker, QueueEvents } from 'bullmq';
import Redis from 'ioredis';
import logger from '../utils/logger.js';

// Create Redis connection
const connection = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false
});

connection.on('connect', () => {
  logger.info('✅ Redis connected');
});

connection.on('error', (err) => {
  logger.error('❌ Redis connection error:', err);
});

// Create transcription queue
const transcriptionQueue = new Queue('transcription', {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 5000
    },
    removeOnComplete: {
      count: 100 // Keep last 100 completed jobs
    },
    removeOnFail: {
      count: 50 // Keep last 50 failed jobs
    }
  }
});

// Queue events for monitoring
const queueEvents = new QueueEvents('transcription', { connection });

queueEvents.on('completed', ({ jobId }) => {
  logger.info(`Job ${jobId} completed`);
});

queueEvents.on('failed', ({ jobId, failedReason }) => {
  logger.error(`Job ${jobId} failed:`, failedReason);
});

class QueueService {
  // Add job to queue
  async addTranscriptionJob(jobId, jobData) {
    try {
      const job = await transcriptionQueue.add(
        'transcribe',
        {
          jobId,
          ...jobData
        },
        {
          jobId: jobId // Use database job ID as queue job ID
        }
      );

      logger.info(`Job ${jobId} added to queue`);
      return job;
    } catch (error) {
      logger.error('Failed to add job to queue:', error);
      throw error;
    }
  }

  // Get job status from queue
  async getJobStatus(jobId) {
    try {
      const job = await transcriptionQueue.getJob(jobId);

      if (!job) {
        return null;
      }

      const state = await job.getState();
      const progress = job.progress;

      return {
        id: job.id,
        state,
        progress,
        data: job.data,
        returnvalue: job.returnvalue,
        failedReason: job.failedReason
      };
    } catch (error) {
      logger.error('Failed to get job status:', error);
      return null;
    }
  }

  // Remove job from queue
  async removeJob(jobId) {
    try {
      const job = await transcriptionQueue.getJob(jobId);
      if (job) {
        await job.remove();
        logger.info(`Job ${jobId} removed from queue`);
      }
    } catch (error) {
      logger.error('Failed to remove job:', error);
    }
  }

  // Get queue stats
  async getQueueStats() {
    try {
      const [waiting, active, completed, failed] = await Promise.all([
        transcriptionQueue.getWaitingCount(),
        transcriptionQueue.getActiveCount(),
        transcriptionQueue.getCompletedCount(),
        transcriptionQueue.getFailedCount()
      ]);

      return {
        waiting,
        active,
        completed,
        failed,
        total: waiting + active + completed + failed
      };
    } catch (error) {
      logger.error('Failed to get queue stats:', error);
      return null;
    }
  }
}

export default new QueueService();
export { transcriptionQueue, connection };
```

#### Step 3: Update Upload Controller to Add to Queue

Update `backend/src/controllers/upload.controller.js`:

```javascript
import JobModel from '../models/Job.model.js';
import S3Service from '../services/S3Service.js';
import QueueService from '../services/QueueService.js';
import { AppError } from '../middleware/errorHandler.js';
import logger from '../utils/logger.js';

export async function uploadFiles(req, res, next) {
  try {
    // Validate files
    if (!req.files || !req.files.audio) {
      throw new AppError('Audio file is required', 400);
    }

    // Validate email
    const { proofreaderEmail } = req.body;
    if (!proofreaderEmail || !proofreaderEmail.includes('@')) {
      throw new AppError('Valid proofreader email is required', 400);
    }

    const audioFile = req.files.audio[0];
    const pdfFile = req.files.pdf ? req.files.pdf[0] : null;

    logger.info(`Uploading files to S3...`);

    // Upload audio to S3
    const audioUrl = await S3Service.uploadFile(audioFile, 'audio');

    // Upload PDF to S3 if exists
    let pdfUrl = null;
    if (pdfFile) {
      pdfUrl = await S3Service.uploadFile(pdfFile, 'pdf');
    }

    logger.info(`Files uploaded successfully`);

    // Create job in database
    const job = await JobModel.create({
      audioFilename: audioFile.originalname,
      audioUrl,
      audioSize: audioFile.size,
      audioDuration: null,
      pdfFilename: pdfFile?.originalname || null,
      pdfUrl,
      proofreaderEmail
    });

    logger.info(`Job created: ${job.id}`);

    // Add to queue
    await QueueService.addTranscriptionJob(job.id, {
      audioUrl: job.audio_url,
      pdfUrl: job.pdf_url,
      proofreaderEmail: job.proofreader_email
    });

    // Update status to queued
    await JobModel.updateStatus(job.id, 'queued');

    res.status(201).json({
      success: true,
      message: 'Files uploaded and queued for processing',
      data: {
        jobId: job.id,
        status: 'queued',
        audioFilename: job.audio_filename,
        pdfFilename: job.pdf_filename
      }
    });
  } catch (error) {
    next(error);
  }
}
```

**Update .env:**
```env
REDIS_URL=rediss://default:YOUR_UPSTASH_PASSWORD@YOUR_UPSTASH_URL:6379
```

**Verification:**
```bash
# Test upload - should add job to Redis queue
curl -X POST http://localhost:3000/api/v1/upload \
  -F "audio=@test.mp3" \
  -F "proofreaderEmail=test@example.com"
```

---

### Hour 5-6: Job Status Routes

#### Step 1: Create Job Routes

Create `backend/src/routes/job.routes.js`:

```javascript
import express from 'express';
import {
  getJobStatus,
  getAllJobs,
  deleteJob
} from '../controllers/job.controller.js';

const router = express.Router();

// GET /api/v1/jobs/:jobId - Get specific job status
router.get('/:jobId', getJobStatus);

// GET /api/v1/jobs - Get all jobs (with filters)
router.get('/', getAllJobs);

// DELETE /api/v1/jobs/:jobId - Delete job
router.delete('/:jobId', deleteJob);

export default router;
```

#### Step 2: Create Job Controller

Create `backend/src/controllers/job.controller.js`:

```javascript
import JobModel from '../models/Job.model.js';
import QueueService from '../services/QueueService.js';
import { AppError } from '../middleware/errorHandler.js';
import logger from '../utils/logger.js';

// Get job status
export async function getJobStatus(req, res, next) {
  try {
    const { jobId } = req.params;

    // Get job from database
    const job = await JobModel.findById(jobId);

    // Get queue status (if job is still processing)
    let queueStatus = null;
    if (['pending', 'queued', 'processing'].includes(job.status)) {
      queueStatus = await QueueService.getJobStatus(jobId);
    }

    res.json({
      success: true,
      data: {
        id: job.id,
        status: job.status,
        progress: job.progress,
        currentStep: job.current_step,
        audioFilename: job.audio_filename,
        pdfFilename: job.pdf_filename,
        proofreaderEmail: job.proofreader_email,
        transcriptUrl: job.transcript_url,
        confidenceScore: job.confidence_score,
        createdAt: job.created_at,
        completedAt: job.processing_completed_at,
        errorMessage: job.error_message,
        queueStatus
      }
    });
  } catch (error) {
    next(error);
  }
}

// Get all jobs (with filters)
export async function getAllJobs(req, res, next) {
  try {
    const { status, limit = 50 } = req.query;

    let jobs;
    if (status) {
      jobs = await JobModel.findByStatus(status, parseInt(limit));
    } else {
      // Get all recent jobs
      const result = await query(
        'SELECT * FROM transcription_jobs ORDER BY created_at DESC LIMIT $1',
        [parseInt(limit)]
      );
      jobs = result.rows;
    }

    res.json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    next(error);
  }
}

// Delete job
export async function deleteJob(req, res, next) {
  try {
    const { jobId } = req.params;

    // Get job
    const job = await JobModel.findById(jobId);

    // Remove from queue if still processing
    if (['pending', 'queued', 'processing'].includes(job.status)) {
      await QueueService.removeJob(jobId);
    }

    // Delete from database
    await query('DELETE FROM transcription_jobs WHERE id = $1', [jobId]);

    logger.info(`Job ${jobId} deleted`);

    res.json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    next(error);
  }
}
```

**Verification:**
```bash
# Get job status
curl http://localhost:3000/api/v1/jobs/YOUR_JOB_ID

# Get all jobs
curl http://localhost:3000/api/v1/jobs

# Get jobs by status
curl http://localhost:3000/api/v1/jobs?status=completed
```

---

### Hour 7-8: Worker Process Setup (Placeholder)

#### Step 1: Create Worker File

Create `backend/src/workers/transcription.worker.js`:

```javascript
import { Worker } from 'bullmq';
import { connection } from '../services/QueueService.js';
import JobModel from '../models/Job.model.js';
import logger from '../utils/logger.js';

// Create worker
const worker = new Worker(
  'transcription',
  async (job) => {
    const { jobId, audioUrl, pdfUrl, proofreaderEmail } = job.data;

    logger.info(`Processing job ${jobId}...`);

    try {
      // Update status to processing
      await JobModel.updateStatus(jobId, 'processing', {
        processing_started_at: new Date()
      });

      // Step 1: Upload (already done)
      await job.updateProgress(10);
      await JobModel.updateProgress(jobId, 10, 'upload');

      // Step 2: Enhance audio (TODO: implement in Week 3)
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate
      await job.updateProgress(20);
      await JobModel.updateProgress(jobId, 20, 'enhance');

      // Step 3: Chunk audio (TODO: implement in Week 3)
      await new Promise(resolve => setTimeout(resolve, 2000));
      await job.updateProgress(30);
      await JobModel.updateProgress(jobId, 30, 'chunk');

      // Step 4: Transcribe (TODO: implement in Week 3)
      await new Promise(resolve => setTimeout(resolve, 5000));
      await job.updateProgress(70);
      await JobModel.updateProgress(jobId, 70, 'transcribe');

      // Step 5: Format document (TODO: implement in Week 4)
      await new Promise(resolve => setTimeout(resolve, 2000));
      await job.updateProgress(90);
      await JobModel.updateProgress(jobId, 90, 'format');

      // Step 6: Send email (TODO: implement in Week 5)
      await new Promise(resolve => setTimeout(resolve, 1000));
      await job.updateProgress(100);
      await JobModel.updateProgress(jobId, 100, 'email');

      // Mark as completed
      await JobModel.markCompleted(
        jobId,
        'https://example.com/transcript.docx', // Placeholder
        'Mock transcript text...', // Placeholder
        85.5 // Placeholder confidence score
      );

      logger.info(`Job ${jobId} completed`);

      return { success: true, jobId };
    } catch (error) {
      logger.error(`Job ${jobId} failed:`, error);

      // Mark as failed
      await JobModel.markFailed(jobId, error.message);

      throw error;
    }
  },
  {
    connection,
    concurrency: 3, // Process 3 jobs simultaneously
    limiter: {
      max: 10, // Max 10 jobs
      duration: 60000 // Per minute
    }
  }
);

worker.on('completed', (job) => {
  logger.info(`Worker completed job ${job.id}`);
});

worker.on('failed', (job, err) => {
  logger.error(`Worker failed job ${job.id}:`, err.message);
});

worker.on('error', (err) => {
  logger.error('Worker error:', err);
});

logger.info('🔨 Transcription worker started');

export default worker;
```

#### Step 2: Create Worker Start Script

Create `backend/src/worker.js`:

```javascript
import dotenv from 'dotenv';
import logger from './utils/logger.js';
import worker from './workers/transcription.worker.js';

dotenv.config();

logger.info('Starting worker process...');
logger.info(`Environment: ${process.env.NODE_ENV}`);

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, closing worker...');
  await worker.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received, closing worker...');
  await worker.close();
  process.exit(0);
});
```

#### Step 3: Add Worker Start Script to package.json

Update `backend/package.json`:

```json
{
  "scripts": {
    "dev": "nodemon src/server.js",
    "worker": "nodemon src/worker.js",
    "start": "node src/server.js",
    "migrate": "node src/db/migrate.js"
  }
}
```

**Start worker in separate terminal:**
```bash
npm run worker
```

**Verification:**
1. Upload a file via Postman
2. Watch worker terminal - should see job processing
3. Check job status via GET /api/v1/jobs/:jobId
4. After ~12 seconds, job should be marked as completed

---

### ✅ Day 2 Completion Checklist

- [ ] AWS S3 service configured and tested
- [ ] File upload to S3 working
- [ ] Redis connection established
- [ ] BullMQ queue created
- [ ] Jobs added to queue on upload
- [ ] Worker process created
- [ ] Job status routes implemented
- [ ] End-to-end flow tested (upload → queue → worker → complete)

**Git Commit:**
```bash
git add .
git commit -m "Week 2 Day 2: AWS S3 integration, Redis queue, and worker process"
git push
```

---

## Day 3: Transcript Routes & Download Endpoints (8 hours)

### Hour 1-2: Transcript Download Routes

#### Step 1: Create Transcript Routes

Create `backend/src/routes/transcript.routes.js`:

```javascript
import express from 'express';
import {
  getTranscript,
  downloadTranscript,
  getTranscriptSegments
} from '../controllers/transcript.controller.js';

const router = express.Router();

// GET /api/v1/transcripts/:jobId - Get transcript data
router.get('/:jobId', getTranscript);

// GET /api/v1/transcripts/:jobId/download - Download transcript file
router.get('/:jobId/download', downloadTranscript);

// GET /api/v1/transcripts/:jobId/segments - Get timestamped segments
router.get('/:jobId/segments', getTranscriptSegments);

export default router;
```

#### Step 2: Create Transcript Controller

Create `backend/src/controllers/transcript.controller.js`:

```javascript
import JobModel from '../models/Job.model.js';
import S3Service from '../services/S3Service.js';
import { query } from '../db/index.js';
import { AppError } from '../middleware/errorHandler.js';
import logger from '../utils/logger.js';

// Get transcript data
export async function getTranscript(req, res, next) {
  try {
    const { jobId } = req.params;

    // Get job
    const job = await JobModel.findById(jobId);

    if (job.status !== 'completed') {
      throw new AppError('Transcript not yet available', 400);
    }

    // Get transcript segments
    const segmentsResult = await query(
      `SELECT * FROM transcript_segments
       WHERE job_id = $1
       ORDER BY segment_index ASC`,
      [jobId]
    );

    res.json({
      success: true,
      data: {
        jobId: job.id,
        transcriptText: job.transcript_text,
        confidenceScore: job.confidence_score,
        wordCount: job.word_count,
        segments: segmentsResult.rows,
        createdAt: job.created_at,
        completedAt: job.processing_completed_at
      }
    });
  } catch (error) {
    next(error);
  }
}

// Download transcript file
export async function downloadTranscript(req, res, next) {
  try {
    const { jobId } = req.params;
    const { format = 'docx' } = req.query; // docx, pdf, txt, srt

    // Get job
    const job = await JobModel.findById(jobId);

    if (job.status !== 'completed') {
      throw new AppError('Transcript not yet available', 400);
    }

    if (!job.transcript_url) {
      throw new AppError('Transcript file not found', 404);
    }

    // Extract S3 key from URL
    const key = S3Service.extractKeyFromUrl(job.transcript_url);

    // Generate signed download URL
    const downloadUrl = await S3Service.getSignedUrl(key, 3600); // 1 hour expiry

    res.json({
      success: true,
      data: {
        downloadUrl,
        filename: `transcript_${jobId}.${format}`,
        expiresIn: 3600
      }
    });
  } catch (error) {
    next(error);
  }
}

// Get transcript segments
export async function getTranscriptSegments(req, res, next) {
  try {
    const { jobId } = req.params;
    const { language, minConfidence } = req.query;

    // Get job to verify it exists
    await JobModel.findById(jobId);

    // Build query
    let sql = `
      SELECT * FROM transcript_segments
      WHERE job_id = $1
    `;
    const params = [jobId];

    // Filter by language if specified
    if (language) {
      sql += ` AND language = $${params.length + 1}`;
      params.push(language);
    }

    // Filter by confidence if specified
    if (minConfidence) {
      sql += ` AND confidence >= $${params.length + 1}`;
      params.push(parseFloat(minConfidence));
    }

    sql += ` ORDER BY segment_index ASC`;

    const result = await query(sql, params);

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
}
```

---

### Hour 3-4: Cleanup & Maintenance Jobs

#### Step 1: Create Cleanup Service

Create `backend/src/services/CleanupService.js`:

```javascript
import JobModel from '../models/Job.model.js';
import S3Service from '../services/S3Service.js';
import { query } from '../db/index.js';
import logger from '../utils/logger.js';

class CleanupService {
  // Delete old completed jobs (older than X days)
  async deleteOldJobs(daysOld = 30) {
    try {
      logger.info(`Cleaning up jobs older than ${daysOld} days...`);

      // Get old completed jobs
      const result = await query(
        `SELECT id, audio_url, pdf_url, transcript_url
         FROM transcription_jobs
         WHERE status = 'completed'
         AND created_at < NOW() - INTERVAL '${daysOld} days'`,
        []
      );

      const jobs = result.rows;
      logger.info(`Found ${jobs.length} old jobs to delete`);

      let deleted = 0;

      for (const job of jobs) {
        try {
          // Delete files from S3
          if (job.audio_url) {
            const audioKey = S3Service.extractKeyFromUrl(job.audio_url);
            await S3Service.deleteFile(audioKey);
          }

          if (job.pdf_url) {
            const pdfKey = S3Service.extractKeyFromUrl(job.pdf_url);
            await S3Service.deleteFile(pdfKey);
          }

          if (job.transcript_url) {
            const transcriptKey = S3Service.extractKeyFromUrl(job.transcript_url);
            await S3Service.deleteFile(transcriptKey);
          }

          // Delete from database (cascade will delete related records)
          await query('DELETE FROM transcription_jobs WHERE id = $1', [job.id]);

          deleted++;
        } catch (error) {
          logger.error(`Failed to delete job ${job.id}:`, error);
        }
      }

      logger.info(`✅ Deleted ${deleted} old jobs`);
      return deleted;
    } catch (error) {
      logger.error('Cleanup failed:', error);
      throw error;
    }
  }

  // Delete failed jobs older than X days
  async deleteFailedJobs(daysOld = 7) {
    try {
      logger.info(`Cleaning up failed jobs older than ${daysOld} days...`);

      const result = await query(
        `SELECT id, audio_url, pdf_url
         FROM transcription_jobs
         WHERE status = 'failed'
         AND created_at < NOW() - INTERVAL '${daysOld} days'`,
        []
      );

      const jobs = result.rows;
      let deleted = 0;

      for (const job of jobs) {
        try {
          // Delete files from S3
          if (job.audio_url) {
            const audioKey = S3Service.extractKeyFromUrl(job.audio_url);
            await S3Service.deleteFile(audioKey);
          }

          if (job.pdf_url) {
            const pdfKey = S3Service.extractKeyFromUrl(job.pdf_url);
            await S3Service.deleteFile(pdfKey);
          }

          // Delete from database
          await query('DELETE FROM transcription_jobs WHERE id = $1', [job.id]);

          deleted++;
        } catch (error) {
          logger.error(`Failed to delete failed job ${job.id}:`, error);
        }
      }

      logger.info(`✅ Deleted ${deleted} failed jobs`);
      return deleted;
    } catch (error) {
      logger.error('Failed job cleanup failed:', error);
      throw error;
    }
  }

  // Clean up orphaned files in S3 (files not referenced in database)
  async cleanupOrphanedFiles() {
    // TODO: Implement in production if needed
    // Requires listing all S3 files and checking database references
    logger.info('Orphaned file cleanup not yet implemented');
  }

  // Get storage statistics
  async getStorageStats() {
    try {
      const result = await query(
        `SELECT
          COUNT(*) as total_jobs,
          SUM(audio_size_bytes) as total_audio_size,
          AVG(audio_duration_seconds) as avg_duration,
          COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_jobs,
          COUNT(CASE WHEN status = 'failed' THEN 1 END) as failed_jobs,
          COUNT(CASE WHEN status = 'processing' THEN 1 END) as processing_jobs
         FROM transcription_jobs`,
        []
      );

      return result.rows[0];
    } catch (error) {
      logger.error('Failed to get storage stats:', error);
      return null;
    }
  }
}

export default new CleanupService();
```

#### Step 2: Create Cleanup Cron Job

Create `backend/src/jobs/cleanup.job.js`:

```javascript
import cron from 'node-cron';
import CleanupService from '../services/CleanupService.js';
import logger from '../utils/logger.js';

// Run cleanup every day at 2 AM
const cleanupJob = cron.schedule('0 2 * * *', async () => {
  logger.info('🧹 Running daily cleanup job...');

  try {
    // Delete old completed jobs (30 days)
    await CleanupService.deleteOldJobs(30);

    // Delete old failed jobs (7 days)
    await CleanupService.deleteFailedJobs(7);

    // Get storage stats
    const stats = await CleanupService.getStorageStats();
    logger.info('Storage stats:', stats);

    logger.info('✅ Daily cleanup completed');
  } catch (error) {
    logger.error('❌ Daily cleanup failed:', error);
  }
}, {
  scheduled: false // Don't start automatically
});

export default cleanupJob;
```

**Install node-cron:**
```bash
npm install node-cron
```

#### Step 3: Start Cleanup Job in Server

Update `backend/src/server.js` to start cleanup job:

```javascript
import cleanupJob from './jobs/cleanup.job.js';

// ... existing code ...

// Start cleanup job
if (process.env.NODE_ENV === 'production') {
  cleanupJob.start();
  logger.info('🧹 Cleanup job scheduled');
}

// ... rest of code ...
```

---

### Hour 5-6: API Usage Tracking

#### Step 1: Create Usage Tracking Service

Create `backend/src/services/UsageTracker.js`:

```javascript
import { query } from '../db/index.js';
import logger from '../utils/logger.js';

class UsageTracker {
  // Track API usage
  async trackUsage(jobId, provider, durationSeconds, costUsd = 0) {
    try {
      const month = this.getCurrentMonth();

      await query(
        `INSERT INTO api_usage (job_id, month, provider, duration_seconds, cost_usd)
         VALUES ($1, $2, $3, $4, $5)`,
        [jobId, month, provider, durationSeconds, costUsd]
      );

      logger.info(`Usage tracked: ${provider} - ${durationSeconds}s - $${costUsd}`);
    } catch (error) {
      logger.error('Failed to track usage:', error);
      // Don't throw - tracking failure shouldn't break the main flow
    }
  }

  // Get current month in YYYY-MM format
  getCurrentMonth() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  }

  // Get usage for current month
  async getMonthlyUsage(month = null) {
    try {
      const targetMonth = month || this.getCurrentMonth();

      const result = await query(
        `SELECT
          provider,
          COUNT(*) as request_count,
          SUM(duration_seconds) as total_seconds,
          ROUND(SUM(duration_seconds) / 3600.0, 2) as total_hours,
          SUM(cost_usd) as total_cost
         FROM api_usage
         WHERE month = $1
         GROUP BY provider`,
        [targetMonth]
      );

      return result.rows;
    } catch (error) {
      logger.error('Failed to get monthly usage:', error);
      return [];
    }
  }

  // Get Groq usage for current month
  async getGroqUsageThisMonth() {
    try {
      const month = this.getCurrentMonth();

      const result = await query(
        `SELECT COALESCE(SUM(duration_seconds), 0) as total_seconds
         FROM api_usage
         WHERE month = $1 AND provider = 'groq'`,
        [month]
      );

      const totalSeconds = parseInt(result.rows[0]?.total_seconds || 0);
      const totalHours = totalSeconds / 3600;
      const limitHours = 500; // Groq free tier limit
      const percentUsed = (totalHours / limitHours) * 100;

      return {
        totalSeconds,
        totalHours: Math.round(totalHours * 100) / 100,
        limitHours,
        percentUsed: Math.round(percentUsed * 100) / 100,
        remainingHours: Math.max(0, limitHours - totalHours)
      };
    } catch (error) {
      logger.error('Failed to get Groq usage:', error);
      return null;
    }
  }

  // Check if Groq quota exceeded
  async shouldUseGroq() {
    const usage = await this.getGroqUsageThisMonth();

    if (!usage) return true; // Default to using Groq if can't check

    // If over 90% of quota, switch to fallback
    if (usage.percentUsed > 90) {
      logger.warn(`Groq quota at ${usage.percentUsed}% - switching to fallback`);
      return false;
    }

    return true;
  }

  // Get cost summary for a job
  async getJobCost(jobId) {
    try {
      const result = await query(
        `SELECT
          provider,
          duration_seconds,
          cost_usd
         FROM api_usage
         WHERE job_id = $1`,
        [jobId]
      );

      return result.rows;
    } catch (error) {
      logger.error('Failed to get job cost:', error);
      return [];
    }
  }
}

export default new UsageTracker();
```

#### Step 2: Create Usage Dashboard Endpoint

Add to `backend/src/routes/job.routes.js`:

```javascript
import { getUsageStats } from '../controllers/job.controller.js';

// GET /api/v1/jobs/stats/usage - Get usage statistics
router.get('/stats/usage', getUsageStats);
```

Add to `backend/src/controllers/job.controller.js`:

```javascript
import UsageTracker from '../services/UsageTracker.js';

export async function getUsageStats(req, res, next) {
  try {
    const { month } = req.query;

    const [monthlyUsage, groqUsage] = await Promise.all([
      UsageTracker.getMonthlyUsage(month),
      UsageTracker.getGroqUsageThisMonth()
    ]);

    res.json({
      success: true,
      data: {
        month: month || UsageTracker.getCurrentMonth(),
        byProvider: monthlyUsage,
        groq: groqUsage
      }
    });
  } catch (error) {
    next(error);
  }
}
```

**Verification:**
```bash
# Get usage stats
curl http://localhost:3000/api/v1/jobs/stats/usage
```

---

### Hour 7-8: Admin Routes & Monitoring

#### Step 1: Create Admin Routes

Create `backend/src/routes/admin.routes.js`:

```javascript
import express from 'express';
import {
  getSystemStats,
  runCleanup,
  getQueueStats
} from '../controllers/admin.controller.js';

const router = express.Router();

// GET /api/v1/admin/stats - System statistics
router.get('/stats', getSystemStats);

// GET /api/v1/admin/queue - Queue statistics
router.get('/queue', getQueueStats);

// POST /api/v1/admin/cleanup - Trigger cleanup manually
router.post('/cleanup', runCleanup);

export default router;
```

#### Step 2: Create Admin Controller

Create `backend/src/controllers/admin.controller.js`:

```javascript
import QueueService from '../services/QueueService.js';
import CleanupService from '../services/CleanupService.js';
import UsageTracker from '../services/UsageTracker.js';
import { query } from '../db/index.js';
import logger from '../utils/logger.js';

export async function getSystemStats(req, res, next) {
  try {
    // Get job stats
    const jobStats = await query(
      `SELECT
        COUNT(*) as total_jobs,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed,
        COUNT(CASE WHEN status = 'failed' THEN 1 END) as failed,
        COUNT(CASE WHEN status = 'processing' THEN 1 END) as processing,
        COUNT(CASE WHEN status = 'queued' THEN 1 END) as queued,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
        AVG(processing_duration_ms) as avg_processing_time_ms,
        SUM(audio_size_bytes) as total_audio_size_bytes
       FROM transcription_jobs`,
      []
    );

    // Get storage stats
    const storageStats = await CleanupService.getStorageStats();

    // Get usage stats
    const usageStats = await UsageTracker.getMonthlyUsage();
    const groqUsage = await UsageTracker.getGroqUsageThisMonth();

    res.json({
      success: true,
      data: {
        jobs: jobStats.rows[0],
        storage: storageStats,
        usage: {
          byProvider: usageStats,
          groq: groqUsage
        },
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage()
      }
    });
  } catch (error) {
    next(error);
  }
}

export async function getQueueStats(req, res, next) {
  try {
    const stats = await QueueService.getQueueStats();

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
}

export async function runCleanup(req, res, next) {
  try {
    const { daysOld = 30, failedDaysOld = 7 } = req.body;

    const [completedDeleted, failedDeleted] = await Promise.all([
      CleanupService.deleteOldJobs(daysOld),
      CleanupService.deleteFailedJobs(failedDaysOld)
    ]);

    res.json({
      success: true,
      message: 'Cleanup completed',
      data: {
        completedJobsDeleted: completedDeleted,
        failedJobsDeleted: failedDeleted
      }
    });
  } catch (error) {
    next(error);
  }
}
```

#### Step 3: Add Admin Routes to Main Router

Update `backend/src/routes/index.js`:

```javascript
import adminRoutes from './admin.routes.js';

// Add admin routes
router.use(`${API_VERSION}/admin`, adminRoutes);
```

**Verification:**
```bash
# Get system stats
curl http://localhost:3000/api/v1/admin/stats

# Get queue stats
curl http://localhost:3000/api/v1/admin/queue

# Trigger cleanup
curl -X POST http://localhost:3000/api/v1/admin/cleanup \
  -H "Content-Type: application/json" \
  -d '{"daysOld": 30}'
```

---

### ✅ Day 3 Completion Checklist

- [ ] Transcript download routes implemented
- [ ] Signed URL generation for downloads
- [ ] Transcript segments endpoint
- [ ] Cleanup service created
- [ ] Cron job for daily cleanup scheduled
- [ ] Usage tracking service implemented
- [ ] Usage dashboard endpoint
- [ ] Admin routes for monitoring
- [ ] All endpoints tested

**Git Commit:**
```bash
git add .
git commit -m "Week 2 Day 3: Transcript routes, cleanup jobs, and usage tracking"
git push
```

---

## Day 4: API Testing & Error Handling (8 hours)

### Hour 1-2: Comprehensive Error Handling

#### Step 1: Enhance Error Handler Middleware

Update `backend/src/middleware/errorHandler.js`:

```javascript
import logger from '../utils/logger.js';

class AppError extends Error {
  constructor(message, statusCode, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.timestamp = new Date().toISOString();
    Error.captureStackTrace(this, this.constructor);
  }
}

// Specific error types
class ValidationError extends AppError {
  constructor(message) {
    super(message, 400);
    this.name = 'ValidationError';
  }
}

class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404);
    this.name = 'NotFoundError';
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized access') {
    super(message, 401);
    this.name = 'UnauthorizedError';
  }
}

class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(message, 403);
    this.name = 'ForbiddenError';
  }
}

class ConflictError extends AppError {
  constructor(message = 'Resource already exists') {
    super(message, 409);
    this.name = 'ConflictError';
  }
}

class TooManyRequestsError extends AppError {
  constructor(message = 'Too many requests') {
    super(message, 429);
    this.name = 'TooManyRequestsError';
  }
}

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  error.name = err.name;

  // Log error with context
  logger.error({
    name: err.name,
    message: err.message,
    stack: err.stack,
    statusCode: err.statusCode,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('user-agent')
  });

  // Mongoose/PostgreSQL errors
  if (err.code === '23505') {
    // Unique constraint violation
    error = new ConflictError('Duplicate entry');
  }

  if (err.code === '22P02') {
    // Invalid UUID
    error = new ValidationError('Invalid ID format');
  }

  if (err.code === '23503') {
    // Foreign key violation
    error = new ValidationError('Referenced resource does not exist');
  }

  // Multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    error = new ValidationError('File too large');
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    error = new ValidationError('Unexpected file field');
  }

  // AWS S3 errors
  if (err.name === 'NoSuchKey') {
    error = new NotFoundError('File');
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = new UnauthorizedError('Invalid token');
  }

  if (err.name === 'TokenExpiredError') {
    error = new UnauthorizedError('Token expired');
  }

  // Send response
  res.status(error.statusCode || 500).json({
    success: false,
    error: {
      message: error.message || 'Internal server error',
      statusCode: error.statusCode || 500,
      ...(process.env.NODE_ENV === 'development' && {
        stack: err.stack,
        name: err.name
      })
    }
  });
};

export {
  AppError,
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  TooManyRequestsError,
  errorHandler as default
};
```

---

### Hour 3-4: Request Validation Middleware

#### Step 1: Install Validation Library

```bash
npm install joi
```

#### Step 2: Create Validation Schemas

Create `backend/src/validators/job.validator.js`:

```javascript
import Joi from 'joi';
import { ValidationError } from '../middleware/errorHandler.js';

export const uploadSchema = Joi.object({
  proofreaderEmail: Joi.string().email().required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Proofreader email is required'
    })
});

export const jobIdSchema = Joi.object({
  jobId: Joi.string().uuid().required()
    .messages({
      'string.guid': 'Invalid job ID format',
      'any.required': 'Job ID is required'
    })
});

export const queryParamsSchema = Joi.object({
  status: Joi.string().valid('pending', 'queued', 'processing', 'completed', 'failed'),
  limit: Joi.number().integer().min(1).max(100).default(50),
  month: Joi.string().pattern(/^\d{4}-\d{2}$/).message('Month must be in YYYY-MM format')
}).unknown(true); // Allow other query params

// Validation middleware factory
export function validate(schema, property = 'body') {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const message = error.details.map(detail => detail.message).join(', ');
      throw new ValidationError(message);
    }

    next();
  };
}
```

#### Step 3: Apply Validation to Routes

Update `backend/src/routes/upload.routes.js`:

```javascript
import { validate, uploadSchema } from '../validators/job.validator.js';

router.post(
  '/',
  upload.fields([
    { name: 'audio', maxCount: 1 },
    { name: 'pdf', maxCount: 1 }
  ]),
  validate(uploadSchema, 'body'),
  uploadFiles
);
```

Update `backend/src/routes/job.routes.js`:

```javascript
import { validate, jobIdSchema, queryParamsSchema } from '../validators/job.validator.js';

router.get('/:jobId', validate(jobIdSchema, 'params'), getJobStatus);
router.get('/', validate(queryParamsSchema, 'query'), getAllJobs);
router.delete('/:jobId', validate(jobIdSchema, 'params'), deleteJob);
```

---

### Hour 5-6: Rate Limiting & Security

#### Step 1: Install Rate Limiting

```bash
npm install express-rate-limit
```

#### Step 2: Create Rate Limit Middleware

Create `backend/src/middleware/rateLimiter.js`:

```javascript
import rateLimit from 'express-rate-limit';
import { TooManyRequestsError } from './errorHandler.js';

// General API rate limiter
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requests per 15 minutes
  message: 'Too many requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    throw new TooManyRequestsError('Too many requests, please try again later');
  }
});

// Upload rate limiter (stricter)
export const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Max 10 uploads per hour
  message: 'Upload limit exceeded, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    throw new TooManyRequestsError('Upload limit exceeded, please try again in an hour');
  }
});

// Auth rate limiter (very strict)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Max 5 login attempts per 15 minutes
  message: 'Too many login attempts, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    throw new TooManyRequestsError('Too many login attempts, please wait 15 minutes');
  }
});
```

#### Step 3: Apply Rate Limiting

Update `backend/src/server.js`:

```javascript
import { apiLimiter } from './middleware/rateLimiter.js';

// Apply to all API routes
app.use('/api', apiLimiter);
```

Update `backend/src/routes/upload.routes.js`:

```javascript
import { uploadLimiter } from '../middleware/rateLimiter.js';

router.post(
  '/',
  uploadLimiter, // Apply upload rate limit
  upload.fields([
    { name: 'audio', maxCount: 1 },
    { name: 'pdf', maxCount: 1 }
  ]),
  validate(uploadSchema, 'body'),
  uploadFiles
);
```

---

### Hour 7-8: API Testing Suite

#### Step 1: Create Test Files

Create `backend/tests/api.test.js`:

```javascript
// Manual API testing checklist
// Use Postman, Thunder Client, or curl to test these endpoints

const API_BASE = 'http://localhost:3000/api/v1';

// Test Cases:

/*
1. HEALTH CHECK
   GET /health
   Expected: 200, { status: 'ok' }

2. UPLOAD FILE
   POST /api/v1/upload
   Body (form-data):
     - audio: [audio file]
     - proofreaderEmail: test@example.com
   Expected: 201, { success: true, data: { jobId: ... } }

3. UPLOAD WITHOUT EMAIL
   POST /api/v1/upload
   Body (form-data):
     - audio: [audio file]
   Expected: 400, validation error

4. UPLOAD WITHOUT AUDIO
   POST /api/v1/upload
   Body (form-data):
     - proofreaderEmail: test@example.com
   Expected: 400, audio required error

5. GET JOB STATUS
   GET /api/v1/jobs/{jobId}
   Expected: 200, { success: true, data: { status, progress, ... } }

6. GET NON-EXISTENT JOB
   GET /api/v1/jobs/00000000-0000-0000-0000-000000000000
   Expected: 404, job not found

7. GET ALL JOBS
   GET /api/v1/jobs
   Expected: 200, array of jobs

8. GET JOBS BY STATUS
   GET /api/v1/jobs?status=completed
   Expected: 200, filtered jobs

9. GET TRANSCRIPT
   GET /api/v1/transcripts/{jobId}
   Expected: 200 (if completed), 400 (if not ready)

10. DOWNLOAD TRANSCRIPT
    GET /api/v1/transcripts/{jobId}/download
    Expected: 200, { downloadUrl: ... }

11. GET USAGE STATS
    GET /api/v1/jobs/stats/usage
    Expected: 200, usage statistics

12. GET SYSTEM STATS
    GET /api/v1/admin/stats
    Expected: 200, system statistics

13. RATE LIMITING TEST
    POST /api/v1/upload (repeat 11 times in 1 hour)
    Expected: 429 on 11th request

14. INVALID JOB ID FORMAT
    GET /api/v1/jobs/invalid-id
    Expected: 400, validation error
*/

// Export test configuration
export default {
  baseUrl: API_BASE,
  testAudioFile: './test-files/sample.mp3',
  testPdfFile: './test-files/sample.pdf',
  testEmail: 'test@example.com'
};
```

#### Step 2: Create Postman Collection

Create `backend/tests/Malaysian-Legal-Transcription.postman_collection.json`:

```json
{
  "info": {
    "name": "Malaysian Legal Transcription API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "base_url",
      "value": "http://localhost:3000/api/v1"
    },
    {
      "key": "job_id",
      "value": ""
    }
  ],
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{base_url}}/../health",
          "host": ["{{base_url}}"],
          "path": ["..", "health"]
        }
      }
    },
    {
      "name": "Upload Files",
      "event": [
        {
          "listen": "test",
          "script": {
            "exec": [
              "if (pm.response.code === 201) {",
              "  const jsonData = pm.response.json();",
              "  pm.collectionVariables.set('job_id', jsonData.data.jobId);",
              "}"
            ]
          }
        }
      ],
      "request": {
        "method": "POST",
        "header": [],
        "body": {
          "mode": "formdata",
          "formdata": [
            {
              "key": "audio",
              "type": "file",
              "src": []
            },
            {
              "key": "proofreaderEmail",
              "value": "test@example.com",
              "type": "text"
            }
          ]
        },
        "url": {
          "raw": "{{base_url}}/upload",
          "host": ["{{base_url}}"],
          "path": ["upload"]
        }
      }
    },
    {
      "name": "Get Job Status",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{base_url}}/jobs/{{job_id}}",
          "host": ["{{base_url}}"],
          "path": ["jobs", "{{job_id}}"]
        }
      }
    },
    {
      "name": "Get All Jobs",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{base_url}}/jobs",
          "host": ["{{base_url}}"],
          "path": ["jobs"]
        }
      }
    },
    {
      "name": "Get Usage Stats",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{base_url}}/jobs/stats/usage",
          "host": ["{{base_url}}"],
          "path": ["jobs", "stats", "usage"]
        }
      }
    }
  ]
}
```

**Verification:**
1. Import Postman collection
2. Run all requests in collection
3. Verify responses match expected results

---

### ✅ Day 4 Completion Checklist

- [ ] Enhanced error handling with specific error types
- [ ] Request validation middleware
- [ ] Validation schemas for all routes
- [ ] Rate limiting implemented
- [ ] API testing checklist created
- [ ] Postman collection created
- [ ] All endpoints tested manually
- [ ] Error scenarios tested

**Git Commit:**
```bash
git add .
git commit -m "Week 2 Day 4: API testing, validation, and rate limiting"
git push
```

---

## Day 5: Deployment to Railway (8 hours)

### Hour 1-2: Deployment Preparation

#### Step 1: Create Production Environment File

Create `backend/.env.production.example`:

```env
# Node Environment
NODE_ENV=production

# Server
PORT=3000
FRONTEND_URL=https://your-frontend.vercel.app

# Database (Neon PostgreSQL)
DATABASE_URL=postgresql://user:password@ep-xxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require

# Redis (Upstash)
REDIS_URL=rediss://default:password@xxx.upstash.io:6379

# AWS S3
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=ap-southeast-1
AWS_S3_BUCKET=malaysian-legal-transcription-prod

# API Keys
GROQ_API_KEY=gsk_...
REPLICATE_API_TOKEN=r8_...
OPENAI_API_KEY=sk-...

# Email (Resend)
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@malaysianlegal.ai
```

#### Step 2: Create Railway Configuration

Create `railway.json`:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "numReplicas": 1,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

Create `railway.toml`:

```toml
[build]
builder = "NIXPACKS"
buildCommand = "npm install"

[deploy]
startCommand = "npm start"
healthcheckPath = "/health"
healthcheckTimeout = 100
restartPolicyType = "ON_FAILURE"
```

#### Step 3: Update package.json Scripts

Update `backend/package.json`:

```json
{
  "scripts": {
    "dev": "nodemon src/server.js",
    "worker": "nodemon src/worker.js",
    "start": "node src/server.js",
    "start:worker": "node src/worker.js",
    "migrate": "node src/db/migrate.js",
    "test": "echo \"No tests yet\" && exit 0"
  },
  "engines": {
    "node": ">=20.0.0",
    "npm": ">=10.0.0"
  }
}
```

---

### Hour 3-4: Deploy to Railway

#### Step 1: Railway CLI Setup

**Install Railway CLI:**
```bash
npm install -g @railway/cli
```

**Login:**
```bash
railway login
```

**Link project:**
```bash
cd backend
railway init
```

Select "Create new project" → Name it "malaysian-legal-api"

#### Step 2: Set Environment Variables

```bash
# Set all environment variables
railway variables set NODE_ENV=production
railway variables set DATABASE_URL="postgresql://..."
railway variables set REDIS_URL="rediss://..."
railway variables set AWS_ACCESS_KEY_ID="AKIA..."
railway variables set AWS_SECRET_ACCESS_KEY="..."
railway variables set AWS_REGION="ap-southeast-1"
railway variables set AWS_S3_BUCKET="malaysian-legal-transcription-prod"
railway variables set GROQ_API_KEY="gsk_..."
railway variables set FRONTEND_URL="https://your-frontend.vercel.app"
```

Or set via Railway dashboard:
1. Go to Railway dashboard
2. Select project
3. Click "Variables"
4. Add all environment variables

#### Step 3: Deploy

```bash
# Deploy main API server
railway up

# Get deployment URL
railway domain
```

Should see: `https://malaysian-legal-api.up.railway.app`

#### Step 4: Deploy Worker Service

Create second service for worker:

```bash
# Create new service in same project
railway service
```

Select "New Service" → Name it "transcription-worker"

Set start command:
```bash
railway variables set RAILWAY_START_COMMAND="npm run start:worker"
```

Deploy worker:
```bash
railway up
```

**Verification:**
```bash
# Test deployed API
curl https://malaysian-legal-api.up.railway.app/health

# Should return: { "status": "ok", ... }
```

---

### Hour 5-6: Frontend Integration

#### Step 1: Update Frontend API URL

Update `frontend/.env.production`:

```env
VITE_API_URL=https://malaysian-legal-api.up.railway.app/api/v1
```

#### Step 2: Create API Service

Update `frontend/src/utils/api.js`:

```javascript
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Upload files
export async function uploadFiles(audioFile, pdfFile, proofreaderEmail, onUploadProgress) {
  const formData = new FormData();
  formData.append('audio', audioFile);
  if (pdfFile) {
    formData.append('pdf', pdfFile);
  }
  formData.append('proofreaderEmail', proofreaderEmail);

  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress
  });

  return response.data;
}

// Get job status
export async function getJobStatus(jobId) {
  const response = await api.get(`/jobs/${jobId}`);
  return response.data;
}

// Get transcript
export async function getTranscript(jobId) {
  const response = await api.get(`/transcripts/${jobId}`);
  return response.data;
}

// Download transcript
export async function downloadTranscript(jobId, format = 'docx') {
  const response = await api.get(`/transcripts/${jobId}/download`, {
    params: { format }
  });
  return response.data;
}

export default api;
```

#### Step 3: Update Frontend to Use Real API

Update `frontend/src/pages/UploadPage.jsx`:

```javascript
import { uploadFiles } from '../utils/api';

const handleSubmit = async () => {
  setError(null);

  if (!audioFile) {
    setError('Please upload an audio file.');
    return;
  }

  if (!proofreaderEmail || !proofreaderEmail.includes('@')) {
    setError('Please enter a valid proofreader email address.');
    return;
  }

  setIsUploading(true);

  try {
    // Upload to real API
    const result = await uploadFiles(
      audioFile,
      pdfFile,
      proofreaderEmail,
      (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(percentCompleted);
      }
    );

    // Store job ID
    setUploadedFile(audioFile);
    if (pdfFile) {
      setUploadedPDF(pdfFile);
    }

    // Navigate to processing page
    navigate(`/processing/${result.data.jobId}`);
  } catch (err) {
    setError(err.response?.data?.error?.message || 'Upload failed. Please try again.');
    console.error('Upload error:', err);
  } finally {
    setIsUploading(false);
  }
};
```

Update `frontend/src/pages/ProcessingPage.jsx`:

```javascript
import { getJobStatus } from '../utils/api';

const fetchJobStatus = async () => {
  try {
    const response = await getJobStatus(jobId);
    const jobData = response.data;

    setJob(jobData);

    // If completed, redirect to results
    if (jobData.status === 'completed') {
      setTimeout(() => {
        navigate(`/results/${jobId}`);
      }, 2000);
    }

    setIsLoading(false);
  } catch (err) {
    setError('Failed to fetch job status. Please try again.');
    console.error('Error fetching job status:', err);
    setIsLoading(false);
  }
};
```

---

### Hour 7-8: Production Testing & Monitoring

#### Step 1: Test Production Deployment

**Create test checklist:**

```bash
# 1. Health check
curl https://malaysian-legal-api.up.railway.app/health

# 2. Upload file
curl -X POST https://malaysian-legal-api.up.railway.app/api/v1/upload \
  -F "audio=@test.mp3" \
  -F "proofreaderEmail=test@example.com"

# 3. Get job status (use jobId from step 2)
curl https://malaysian-legal-api.up.railway.app/api/v1/jobs/{jobId}

# 4. Watch logs
railway logs
```

#### Step 2: Set Up Monitoring

Create `backend/src/utils/monitoring.js`:

```javascript
import logger from './logger.js';

class Monitor {
  // Track request metrics
  trackRequest(req, res, duration) {
    logger.info({
      type: 'request',
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration,
      ip: req.ip
    });
  }

  // Track errors
  trackError(error, context = {}) {
    logger.error({
      type: 'error',
      message: error.message,
      stack: error.stack,
      ...context
    });
  }

  // Track job metrics
  trackJobComplete(jobId, duration, cost) {
    logger.info({
      type: 'job_complete',
      jobId,
      duration,
      cost
    });
  }
}

export default new Monitor();
```

Add request logging middleware in `backend/src/server.js`:

```javascript
import Monitor from './utils/monitoring.js';

// Request timing middleware
app.use((req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    Monitor.trackRequest(req, res, duration);
  });

  next();
});
```

#### Step 3: Deploy Frontend to Vercel

```bash
cd frontend

# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Set production environment variables
vercel env add VITE_API_URL production
# Enter: https://malaysian-legal-api.up.railway.app/api/v1

# Deploy to production
vercel --prod
```

**Final Verification:**
1. Visit your Vercel URL
2. Upload a test file
3. Watch processing in real-time
4. Verify completion

---

### ✅ Day 5 Completion Checklist

- [ ] Production environment configured
- [ ] Railway configuration files created
- [ ] Backend deployed to Railway
- [ ] Worker service deployed separately
- [ ] Environment variables set in Railway
- [ ] Frontend integrated with production API
- [ ] Frontend deployed to Vercel
- [ ] Production testing completed
- [ ] Monitoring set up
- [ ] Logs verified in Railway

**Git Commit:**
```bash
git add .
git commit -m "Week 2 Day 5: Production deployment to Railway and Vercel"
git push
```

---

## ✅ WEEK 2 COMPLETE!

**What You've Built:**

### **Backend Core (40 hours):**
1. ✅ Express server with proper architecture
2. ✅ PostgreSQL database with complete schema
3. ✅ AWS S3 file storage integration
4. ✅ Redis + BullMQ job queue system
5. ✅ Worker process for background jobs
6. ✅ File upload endpoints with validation
7. ✅ Job status tracking and updates
8. ✅ Transcript download with signed URLs
9. ✅ Cleanup service with cron jobs
10. ✅ Usage tracking and cost monitoring
11. ✅ Admin dashboard endpoints
12. ✅ Comprehensive error handling
13. ✅ Request validation (Joi)
14. ✅ Rate limiting
15. ✅ Production deployment (Railway)

### **API Endpoints:**
- `POST /api/v1/upload` - Upload files
- `GET /api/v1/jobs/:jobId` - Get job status
- `GET /api/v1/jobs` - Get all jobs
- `DELETE /api/v1/jobs/:jobId` - Delete job
- `GET /api/v1/transcripts/:jobId` - Get transcript
- `GET /api/v1/transcripts/:jobId/download` - Download transcript
- `GET /api/v1/jobs/stats/usage` - Usage statistics
- `GET /api/v1/admin/stats` - System statistics
- `GET /api/v1/admin/queue` - Queue statistics

### **Infrastructure:**
- ✅ Railway (backend hosting)
- ✅ Neon PostgreSQL (database)
- ✅ Upstash Redis (queue)
- ✅ AWS S3 (file storage)
- ✅ Vercel (frontend hosting)

---

**Next Steps:**

**Week 3: AI Transcription Pipeline (40 hours)** will cover:
- Groq Whisper Large v3 integration
- Audio chunking algorithm
- FFmpeg audio enhancement
- Speaker diarization
- Language detection and tagging
- Confidence scoring
- Fallback to Replicate/OpenAI

**Ready to continue with Week 3?**