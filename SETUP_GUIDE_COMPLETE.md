# 🚀 Complete Step-by-Step Setup Guide
## Malaysian Legal Transcription Suite - Zero to Production

**Total Time:** 6 weeks (240 hours @ 8 hrs/day)
**Goal:** Fully functional transcription platform ready for beta testing

---

## 📋 Prerequisites Checklist

Before starting, ensure you have:

- [ ] Computer with Windows/Mac/Linux (8GB+ RAM recommended)
- [ ] Stable internet connection
- [ ] Credit/debit card (for domain purchase ~RM 50)
- [ ] Email address (Gmail recommended)
- [ ] Phone number (for 2FA verification)
- [ ] ~RM 2,000 budget (business registration + initial costs)
- [ ] 8 hours/day available for 6 weeks

---

# WEEK 0: SETUP (3 Days / 24 Hours)

## DAY 1 (8 Hours) - Development Environment Setup

### Hour 1-2: Install Core Tools

#### Step 1.1: Install Node.js
1. Open browser, go to: https://nodejs.org
2. Download **LTS version** (currently 20.x or higher)
3. Run installer:
   - Windows: Double-click `.msi` file → Next → Accept → Install
   - Mac: Double-click `.pkg` file → Continue → Install
   - Linux: `curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt-get install -y nodejs`
4. Verify installation:
   ```bash
   node --version  # Should show v20.x.x
   npm --version   # Should show 10.x.x
   ```

#### Step 1.2: Install Git
1. Go to: https://git-scm.com/downloads
2. Download for your OS
3. Install with default options
4. Verify:
   ```bash
   git --version  # Should show git version 2.x.x
   ```

#### Step 1.3: Install VS Code
1. Go to: https://code.visualstudio.com
2. Download and install
3. Open VS Code
4. Install essential extensions (Click Extensions icon on left sidebar):
   - ES7+ React/Redux/React-Native snippets
   - Prettier - Code formatter
   - ESLint
   - Tailwind CSS IntelliSense
   - Path Intellisense
   - GitLens

#### Step 1.4: Install PostgreSQL (Local Development)
1. Go to: https://www.postgresql.org/download
2. Download for your OS
3. Install:
   - Windows: Run installer, set password to `postgres123` (for local dev)
   - Mac: Use Homebrew: `brew install postgresql@15`
   - Linux: `sudo apt-get install postgresql-15`
4. Start PostgreSQL:
   - Windows: Starts automatically
   - Mac: `brew services start postgresql@15`
   - Linux: `sudo systemctl start postgresql`
5. Verify:
   ```bash
   psql --version  # Should show PostgreSQL 15.x
   ```

#### Step 1.5: Install FFmpeg (Audio Processing)
1. **Windows:**
   ```bash
   # Download from https://github.com/BtbN/FFmpeg-Builds/releases
   # Extract to C:\ffmpeg
   # Add C:\ffmpeg\bin to PATH:
   # System Properties → Environment Variables → Path → New → C:\ffmpeg\bin
   ```
2. **Mac:**
   ```bash
   brew install ffmpeg
   ```
3. **Linux:**
   ```bash
   sudo apt-get update
   sudo apt-get install ffmpeg
   ```
4. Verify:
   ```bash
   ffmpeg -version  # Should show ffmpeg version 6.x
   ```

### Hour 3-4: Create Project Structure

#### Step 2.1: Create Root Folder
```bash
# Open terminal/command prompt
cd Desktop  # or wherever you want the project
mkdir malaysian-legal-transcription
cd malaysian-legal-transcription
```

#### Step 2.2: Initialize Git Repository
```bash
git init
git branch -M main

# Create .gitignore file
cat > .gitignore << EOF
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.production

# Build outputs
dist/
build/
.next/
out/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Temporary files
tmp/
temp/
*.tmp

# Audio files (don't commit large files)
uploads/
*.mp3
*.wav
*.m4a

# Database
*.db
*.sqlite

# Logs
logs/
*.log
EOF
```

#### Step 2.3: Create Project Structure
```bash
# Create all folders at once
mkdir -p frontend/src/{components,pages,hooks,store,utils,styles,assets}
mkdir -p frontend/src/components/{Layout,Upload,Transcription,UI}
mkdir -p frontend/public
mkdir -p backend/src/{routes,services,workers,db,utils,config}
mkdir -p backend/src/db/migrations
mkdir -p shared/types
mkdir -p docs
```

Your structure should look like:
```
malaysian-legal-transcription/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   ├── Upload/
│   │   │   ├── Transcription/
│   │   │   └── UI/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── store/
│   │   ├── utils/
│   │   ├── styles/
│   │   └── assets/
│   └── public/
├── backend/
│   └── src/
│       ├── routes/
│       ├── services/
│       ├── workers/
│       ├── db/
│       │   └── migrations/
│       ├── utils/
│       └── config/
├── shared/
│   └── types/
└── docs/
```

### Hour 5-6: Initialize Frontend (React + Vite)

#### Step 3.1: Create React App with Vite
```bash
cd frontend

# Initialize Vite project
npm create vite@latest . -- --template react

# Install dependencies
npm install

# Install additional packages
npm install react-router-dom framer-motion zustand react-hook-form axios
npm install react-dropzone @headlessui/react
npm install clsx tailwind-merge

# Install dev dependencies
npm install -D tailwindcss postcss autoprefixer
npm install -D @tailwindcss/forms @tailwindcss/typography
```

#### Step 3.2: Configure Tailwind CSS
```bash
# Initialize Tailwind
npx tailwindcss init -p
```

Edit `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#EBF0F7',
          100: '#D7E1EF',
          500: '#1E3A5F',
          700: '#152942',
          900: '#0A1421'
        },
        gold: {
          50: '#FBF8F0',
          100: '#F5EDDB',
          500: '#D4AF37',
          700: '#A68928',
          900: '#785F1C'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        mono: ['JetBrains Mono', 'monospace']
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
```

Edit `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    @apply antialiased;
  }

  body {
    @apply bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100;
  }
}

@layer components {
  .glass-card {
    @apply backdrop-blur-md bg-white/70 dark:bg-gray-900/70
           border border-gray-200/50 dark:border-gray-700/50
           rounded-2xl shadow-xl;
  }
}
```

#### Step 3.3: Test Frontend
```bash
npm run dev
```
Open browser to http://localhost:5173 - you should see Vite + React welcome page

Press Ctrl+C to stop the server

### Hour 7-8: Initialize Backend (Express)

#### Step 4.1: Create Express App
```bash
cd ../backend

# Initialize npm
npm init -y

# Install dependencies
npm install express cors dotenv
npm install mysql2 redis ioredis bullmq
npm install multer fluent-ffmpeg
npm install groq-sdk replicate resend
npm install uuid jsonwebtoken bcryptjs

# Install dev dependencies
npm install -D nodemon

# For ES Modules support
npm pkg set type="module"
```

#### Step 4.2: Create Basic Server File
```bash
# Create main server file
cat > src/server.js << 'EOF'
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Malaysian Legal Transcription API',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});
EOF
```

#### Step 4.3: Add Scripts to package.json
Edit `backend/package.json`, add scripts section:
```json
{
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js"
  }
}
```

#### Step 4.4: Test Backend
```bash
npm run dev
```
Open browser to http://localhost:3000/api/health - you should see JSON response

Press Ctrl+C to stop

---

## DAY 2 (8 Hours) - Accounts & Services Setup

### Hour 1: Create GitHub Repository

#### Step 1.1: Create GitHub Account (if needed)
1. Go to https://github.com
2. Click "Sign up"
3. Enter email, create password, choose username
4. Verify email
5. Complete onboarding

#### Step 1.2: Create New Repository
1. Click "+" icon → "New repository"
2. Repository name: `malaysian-legal-transcription`
3. Description: "AI-powered legal transcription for Malaysian courts"
4. Select "Private" (keep it private for now)
5. **DO NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

#### Step 1.3: Push Code to GitHub
```bash
cd ~/Desktop/malaysian-legal-transcription  # Adjust path to your project

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/malaysian-legal-transcription.git

# Stage all files
git add .

# Commit
git commit -m "Initial commit: Project structure setup"

# Push
git push -u origin main
```

If asked for credentials:
- Username: your GitHub username
- Password: use **Personal Access Token** (not your password)
  - Generate at: https://github.com/settings/tokens
  - Click "Generate new token (classic)"
  - Select "repo" scope
  - Copy token and use as password

### Hour 2-3: Set Up Cloud Services

#### Step 2.1: Neon.tech (PostgreSQL Database)
1. Go to https://neon.tech
2. Click "Sign up" → Sign in with GitHub
3. Authorize Neon
4. Create new project:
   - Project name: `malaysian-legal-transcription`
   - Region: **Singapore** (closest to Malaysia)
   - PostgreSQL version: 16 (latest)
5. Click "Create project"
6. **SAVE CONNECTION STRING:**
   ```
   Copy the connection string shown (looks like):
   postgresql://username:password@ep-xxx-xxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
   ```
7. Store in password manager or note

#### Step 2.2: Upstash (Redis)
1. Go to https://upstash.com
2. Click "Sign up" → Continue with GitHub
3. Create database:
   - Name: `transcription-queue`
   - Type: Regional
   - Region: **Singapore**
   - TLS: Enabled
4. Click "Create"
5. Go to "Details" tab
6. **SAVE THESE:**
   ```
   UPSTASH_REDIS_URL=rediss://...
   UPSTASH_REDIS_TOKEN=...
   ```

#### Step 2.3: Railway (Backend Hosting)
1. Go to https://railway.app
2. Click "Login" → Login with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Connect to your `malaysian-legal-transcription` repo
6. **Don't deploy yet** - we'll configure later
7. Just note you have account set up

#### Step 2.4: Vercel (Frontend Hosting)
1. Go to https://vercel.com
2. Click "Sign Up" → Continue with GitHub
3. Authorize Vercel
4. Import your repository:
   - Click "Add New..." → "Project"
   - Select `malaysian-legal-transcription`
   - **Don't deploy yet**
5. Just verify account is created

### Hour 4-5: Set Up API Keys

#### Step 3.1: Groq API (Whisper Transcription)
1. Go to https://console.groq.com
2. Click "Sign Up" (or "Login")
3. Create account with email
4. Verify email
5. Log in to console
6. Go to "API Keys" section
7. Click "Create API Key"
8. Name: `transcription-service`
9. **COPY AND SAVE:**
   ```
   GROQ_API_KEY=gsk_...
   ```
10. **IMPORTANT:** You can only see this once!

#### Step 3.2: Replicate API (Fallback)
1. Go to https://replicate.com
2. Click "Sign up" → Continue with GitHub
3. Go to Account settings → API tokens
4. Click "Create token"
5. Name: `transcription-fallback`
6. **COPY AND SAVE:**
   ```
   REPLICATE_API_TOKEN=r8_...
   ```

#### Step 3.3: Resend (Email Service)
1. Go to https://resend.com
2. Click "Sign up"
3. Enter email and password
4. Verify email
5. Complete onboarding
6. Go to "API Keys"
7. Click "Create API Key"
8. Name: `transcription-emails`
9. **COPY AND SAVE:**
   ```
   RESEND_API_KEY=re_...
   ```

#### Step 3.4: AWS S3 (File Storage) - FREE TIER
1. Go to https://aws.amazon.com
2. Click "Create an AWS Account"
3. Enter email → Choose "Personal account"
4. Complete credit card verification (won't be charged in free tier)
5. After account is created, sign in to console
6. Search for "S3" in top search bar
7. Click "Create bucket"
   - Bucket name: `malaysian-legal-transcription-dev` (must be globally unique)
   - Region: **Asia Pacific (Singapore) ap-southeast-1**
   - Block all public access: ✅ KEEP CHECKED
   - Click "Create bucket"
8. Now create IAM user for API access:
   - Search for "IAM" in top search
   - Click "Users" → "Create user"
   - Username: `transcription-service`
   - Click "Next"
   - Attach policies: Select "AmazonS3FullAccess"
   - Click "Next" → "Create user"
9. Create access keys:
   - Click on the user you just created
   - Go to "Security credentials" tab
   - Click "Create access key"
   - Use case: "Application running outside AWS"
   - Click "Next" → "Create access key"
10. **COPY AND SAVE:**
    ```
    AWS_ACCESS_KEY_ID=AKIA...
    AWS_SECRET_ACCESS_KEY=...
    AWS_REGION=ap-southeast-1
    AWS_S3_BUCKET=malaysian-legal-transcription-dev
    ```

### Hour 6-7: Create Environment Variables Files

#### Step 4.1: Backend .env File
```bash
cd backend

# Create .env file
cat > .env << 'EOF'
# Server
NODE_ENV=development
PORT=3000

# Database (Neon PostgreSQL)
DATABASE_URL=postgresql://username:password@ep-xxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require

# Redis (Upstash)
REDIS_URL=rediss://default:xxx@xxx.upstash.io:6379

# AI Services
GROQ_API_KEY=gsk_xxx
REPLICATE_API_TOKEN=r8_xxx

# Email (Resend)
RESEND_API_KEY=re_xxx
ADMIN_EMAIL=your-email@gmail.com

# File Storage (AWS S3)
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=ap-southeast-1
AWS_S3_BUCKET=malaysian-legal-transcription-dev

# Other
TEMP_DIR=/tmp/audio
JWT_SECRET=your-random-secret-key-change-this-in-production
EOF
```

**REPLACE ALL VALUES** with your actual API keys from previous steps!

#### Step 4.2: Frontend .env File
```bash
cd ../frontend

cat > .env << 'EOF'
VITE_API_URL=http://localhost:3000/api
EOF
```

#### Step 4.3: Secure Your Keys
```bash
# NEVER commit .env files!
# Verify .env is in .gitignore
cd ..
grep -q "\.env" .gitignore && echo "✅ .env is ignored" || echo "❌ WARNING: .env not in .gitignore!"
```

### Hour 8: Test All Connections

#### Step 5.1: Test Database Connection
```bash
cd backend

# Create test file
cat > test-db.js << 'EOF'
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function testDatabase() {
  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    console.log('✅ Database connected successfully!');

    const [rows] = await connection.execute('SELECT NOW() as current_time');
    console.log('Current time from DB:', rows[0].current_time);

    await connection.end();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
}

testDatabase();
EOF

node test-db.js
```

Expected output: `✅ Database connected successfully!`

#### Step 5.2: Test Redis Connection
```bash
cat > test-redis.js << 'EOF'
import { Redis } from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

async function testRedis() {
  try {
    const redis = new Redis(process.env.REDIS_URL);

    await redis.set('test-key', 'Hello Redis!');
    const value = await redis.get('test-key');

    console.log('✅ Redis connected successfully!');
    console.log('Test value:', value);

    await redis.quit();
  } catch (error) {
    console.error('❌ Redis connection failed:', error.message);
  }
}

testRedis();
EOF

node test-redis.js
```

Expected output: `✅ Redis connected successfully!`

#### Step 5.3: Test Groq API
```bash
cat > test-groq.js << 'EOF'
import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

async function testGroq() {
  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    // List models
    const models = await groq.models.list();
    console.log('✅ Groq API connected successfully!');
    console.log('Available models:', models.data.length);

    // Find Whisper model
    const whisper = models.data.find(m => m.id.includes('whisper'));
    if (whisper) {
      console.log('✅ Whisper model available:', whisper.id);
    }
  } catch (error) {
    console.error('❌ Groq API failed:', error.message);
  }
}

testGroq();
EOF

node test-groq.js
```

Expected output: `✅ Groq API connected successfully!`

#### Step 5.4: Test S3 Connection
```bash
npm install @aws-sdk/client-s3

cat > test-s3.js << 'EOF'
import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

async function testS3() {
  try {
    const s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      }
    });

    const command = new ListBucketsCommand({});
    const response = await s3.send(command);

    console.log('✅ S3 connected successfully!');
    console.log('Buckets:', response.Buckets.map(b => b.Name));
  } catch (error) {
    console.error('❌ S3 connection failed:', error.message);
  }
}

testS3();
EOF

node test-s3.js
```

Expected output: `✅ S3 connected successfully!`

---

## DAY 3 (8 Hours) - Domain & Final Setup

### Hour 1-2: Purchase Domain

#### Step 1.1: Choose Domain Registrar
Recommended: **Namecheap** or **GoDaddy**

#### Step 1.2: Purchase Domain (Namecheap Example)
1. Go to https://www.namecheap.com
2. Search for: `malaysianlegal.ai` or alternatives:
   - `mylegalai.com`
   - `courttranscribe.my`
   - `legalscribe.my`
3. Check prices (typically RM 40-80/year)
4. Add to cart
5. Create account / Sign in
6. Complete purchase (~RM 50)
7. Enable WhoisGuard (privacy protection) - usually free first year
8. **SAVE domain credentials**

#### Step 1.3: Configure DNS (Do Later)
We'll configure DNS in Week 6 when deploying

### Hour 3-4: Set Up Database Schema

#### Step 2.1: Create Migration File
```bash
cd backend/src/db/migrations

cat > 001_initial_schema.sql << 'EOF'
-- Transcription Jobs Table
CREATE TABLE IF NOT EXISTS transcription_jobs (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(255),

  -- Files
  audio_filename VARCHAR(500) NOT NULL,
  audio_url TEXT NOT NULL,
  pdf_url TEXT,

  -- Status
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  progress INT DEFAULT 0,
  current_step VARCHAR(100),

  -- Results
  transcript_url TEXT,
  confidence_score DECIMAL(5,2),
  flagged_sections INT DEFAULT 0,
  duration_seconds INT,
  page_count INT,

  -- Metadata
  case_number VARCHAR(255),
  hearing_date DATE,
  languages_detected JSON,
  pdf_extracted_terms JSON,
  speaker_labels JSON,

  -- Email
  proofreader_email VARCHAR(255),
  email_sent_at TIMESTAMP,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,

  INDEX idx_status (status),
  INDEX idx_user (user_id),
  INDEX idx_created (created_at)
);

-- API Usage Tracking
CREATE TABLE IF NOT EXISTS api_usage (
  id INT AUTO_INCREMENT PRIMARY KEY,
  job_id VARCHAR(36) NOT NULL,
  month VARCHAR(7) NOT NULL,
  provider VARCHAR(50) NOT NULL,
  duration_seconds INT NOT NULL,
  cost_usd DECIMAL(10, 6) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  INDEX idx_month (month),
  INDEX idx_provider (provider),
  INDEX idx_job (job_id)
);

-- Monthly Usage Aggregates
CREATE TABLE IF NOT EXISTS monthly_usage (
  id INT AUTO_INCREMENT PRIMARY KEY,
  month VARCHAR(7) NOT NULL,
  provider VARCHAR(50) NOT NULL,
  total_seconds BIGINT DEFAULT 0,
  total_cost DECIMAL(10, 2) DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  UNIQUE KEY unique_month_provider (month, provider)
);

-- Legal Terms Dictionary
CREATE TABLE IF NOT EXISTS legal_terms_dictionary (
  id INT AUTO_INCREMENT PRIMARY KEY,
  term_malay VARCHAR(255),
  term_english VARCHAR(255),
  category VARCHAR(100),
  usage_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  INDEX idx_malay (term_malay),
  INDEX idx_english (term_english)
);

-- User Settings
CREATE TABLE IF NOT EXISTS user_settings (
  user_id VARCHAR(255) PRIMARY KEY,
  default_proofreader_email VARCHAR(255),
  include_timestamps BOOLEAN DEFAULT TRUE,
  include_speaker_labels BOOLEAN DEFAULT TRUE,
  include_language_tags BOOLEAN DEFAULT TRUE,
  confidence_threshold INT DEFAULT 70,
  email_template TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
EOF
```

#### Step 2.2: Run Migration
```bash
cd ../..  # Back to backend root

# Install MySQL client if needed
npm install mysql2

# Create migration runner
cat > run-migrations.js << 'EOF'
import mysql from 'mysql2/promise';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

async function runMigrations() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);

  try {
    console.log('📊 Running database migrations...');

    const migrationFile = path.join(process.cwd(), 'src/db/migrations/001_initial_schema.sql');
    const sql = await fs.readFile(migrationFile, 'utf-8');

    // Split by semicolons and run each statement
    const statements = sql.split(';').filter(s => s.trim());

    for (const statement of statements) {
      if (statement.trim()) {
        await connection.execute(statement);
      }
    }

    console.log('✅ Migrations completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await connection.end();
  }
}

runMigrations();
EOF

node run-migrations.js
```

Expected output: `✅ Migrations completed successfully!`

### Hour 5-6: Create Utility Files

#### Step 3.1: Logger Utility
```bash
cat > src/utils/logger.js << 'EOF'
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
};

class Logger {
  log(level, message, ...args) {
    const timestamp = new Date().toISOString();
    const color = colors[this.getColor(level)] || colors.reset;
    console.log(`${color}[${timestamp}] [${level.toUpperCase()}]${colors.reset}`, message, ...args);
  }

  getColor(level) {
    const colorMap = {
      info: 'blue',
      warn: 'yellow',
      error: 'red',
      success: 'green',
      debug: 'magenta',
    };
    return colorMap[level] || 'reset';
  }

  info(message, ...args) {
    this.log('info', message, ...args);
  }

  warn(message, ...args) {
    this.log('warn', message, ...args);
  }

  error(message, ...args) {
    this.log('error', message, ...args);
  }

  success(message, ...args) {
    this.log('success', message, ...args);
  }

  debug(message, ...args) {
    if (process.env.NODE_ENV === 'development') {
      this.log('debug', message, ...args);
    }
  }
}

export default new Logger();
EOF
```

#### Step 3.2: Database Connection Helper
```bash
cat > src/db/index.js << 'EOF'
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let pool;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      uri: process.env.DATABASE_URL,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });
  }
  return pool;
}

export async function query(sql, params) {
  const pool = getPool();
  const [rows] = await pool.execute(sql, params);
  return rows;
}

export default {
  getPool,
  query,
};
EOF
```

### Hour 7-8: Create README & Documentation

#### Step 4.1: Root README
```bash
cd ../..  # Back to project root

cat > README.md << 'EOF'
# 🎯 Malaysian Legal Transcription Suite

AI-powered legal transcription platform specifically designed for Malaysian courts.

## Features

- ⚡ 10-minute transcription (vs 24-48 hours traditional)
- 🗣️ Malay + English + Chinese code-switching support
- 📄 PDF context intelligence for better accuracy
- 💰 70% cheaper than manual services
- 🔒 PDPA compliant with encryption

## Tech Stack

### Frontend
- React 18 + Vite
- Tailwind CSS
- Framer Motion
- Zustand (state management)

### Backend
- Node.js + Express
- PostgreSQL (Neon)
- Redis (Upstash)
- BullMQ (job queue)

### AI Services
- Groq (Whisper v3) - Primary
- Replicate - Fallback
- Pyannote - Speaker diarization

## Setup

See [SETUP_GUIDE_COMPLETE.md](SETUP_GUIDE_COMPLETE.md) for detailed instructions.

## Development

```bash
# Frontend
cd frontend
npm run dev

# Backend
cd backend
npm run dev
```

## License

Private - All Rights Reserved
EOF
```

#### Step 4.2: Commit Everything
```bash
git add .
git commit -m "Week 0 complete: Development environment and services setup"
git push origin main
```

---

## ✅ WEEK 0 COMPLETION CHECKLIST

Before moving to Week 1, verify:

### Development Environment
- [ ] Node.js installed and working (`node --version`)
- [ ] Git installed (`git --version`)
- [ ] VS Code installed with extensions
- [ ] PostgreSQL installed (`psql --version`)
- [ ] FFmpeg installed (`ffmpeg -version`)

### Project Structure
- [ ] GitHub repository created
- [ ] Project folders created (frontend, backend, shared)
- [ ] Frontend initialized (React + Vite + Tailwind)
- [ ] Backend initialized (Express + dependencies)

### Cloud Services
- [ ] Neon database created and connection tested ✅
- [ ] Upstash Redis created and connection tested ✅
- [ ] Railway account created
- [ ] Vercel account created

### API Keys Obtained
- [ ] Groq API key ✅
- [ ] Replicate API token ✅
- [ ] Resend API key ✅
- [ ] AWS S3 access keys ✅

### Configuration
- [ ] Backend .env file created with all keys
- [ ] Frontend .env file created
- [ ] Database schema migrated ✅
- [ ] All connection tests passed ✅

### Domain
- [ ] Domain purchased (optional for now)

---

# 🚀 READY FOR WEEK 1!

You now have:
- ✅ Complete development environment
- ✅ All services configured and tested
- ✅ Database schema ready
- ✅ Project structure in place
- ✅ Version control set up

**Next:** Week 1 - Frontend Foundation

Continue to next section...
EOF
```

**THIS COMPLETES WEEK 0 SETUP!**

The remaining weeks (1-6) will be in separate detailed guides. Would you like me to create:
1. Week 1: Frontend Foundation guide?
2. Week 2: Backend Core guide?
3. Week 3: AI Transcription Pipeline guide?
4. Week 4: PDF Intelligence + Document Formatting guide?
5. Week 5: Email Automation + UI Polish guide?
6. Week 6: Testing + Deployment guide?

Let me know and I'll create the complete step-by-step for that week!