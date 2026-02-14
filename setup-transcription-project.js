import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Malaysian Legal Transcription Suite structure
const projectRoot = path.join(__dirname, 'malaysian-legal-transcription');

const directories = [
  'frontend/src/components',
  'frontend/src/pages',
  'frontend/src/hooks',
  'frontend/src/store',
  'frontend/src/utils',
  'backend/src/models',
  'backend/src/routes',
  'backend/src/services',
  'backend/src/workers',
  'backend/src/middleware',
  'backend/src/config',
  'backend/src/utils',
  'backend/migrations',
  'backend/tests/integration',
  'backend/tests/load',
  'backend/tests/security',
  'backend/python-services/diarization',
  'docs'
];

console.log('🚀 Creating Malaysian Legal Transcription Suite project structure...\n');
console.log(`Project root: ${projectRoot}\n`);

// Create project root
if (!fs.existsSync(projectRoot)) {
  fs.mkdirSync(projectRoot, { recursive: true });
  console.log(`✓ Created project root`);
} else {
  console.log(`- Project root already exists`);
}

// Create all directories
directories.forEach(dir => {
  const fullPath = path.join(projectRoot, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✓ Created: ${dir}`);
  } else {
    console.log(`- Exists: ${dir}`);
  }
});

// Create .gitignore
const gitignoreContent = `node_modules/
.env
.env.local
.env.production
dist/
build/
*.log
.DS_Store
venv/
__pycache__/
.vscode/
.idea/
coverage/
*.tmp
*.temp
audio/
pdfs/
transcripts/
`;

const gitignorePath = path.join(projectRoot, '.gitignore');
fs.writeFileSync(gitignorePath, gitignoreContent);
console.log('\n✓ Created .gitignore');

// Create README
const readmeContent = `# Malaysian Legal Transcription Suite

**AI-Powered Legal Transcription Platform for Malaysian Courts**

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL 15+
- FFmpeg
- Python 3.9+ (for speaker diarization)

### Installation

\`\`\`bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Set up Python environment for diarization
cd python-services/diarization
python -m venv venv
source venv/bin/activate  # or venv\\Scripts\\activate on Windows
pip install -r requirements.txt
\`\`\`

### Environment Variables

Copy \`.env.example\` to \`.env\` and fill in your credentials:

\`\`\`
DATABASE_URL=
REDIS_URL=
AWS_S3_BUCKET=
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
GROQ_API_KEY=
SENDGRID_API_KEY=
FROM_EMAIL=
\`\`\`

### Running Locally

\`\`\`bash
# Terminal 1: Frontend
cd frontend
npm run dev

# Terminal 2: Backend API
cd backend
node src/server.js

# Terminal 3: Worker
cd backend
node src/workers/transcription.worker.js

# Terminal 4: Diarization service (optional)
cd backend/python-services/diarization
python diarization_service.py
\`\`\`

## 📚 Documentation

- [Master Blueprint](../ANTIGRAVITY_MASTER_BLUEPRINT.md)
- [Execution Checklist](../ANTIGRAVITY_EXECUTION_CHECKLIST.md)
- [Bug Fixes](../BUG_FIXES_REQUIRED.md)
- [Performance Optimization](../PERFORMANCE_OPTIMIZATION.md)

## 🏆 Competitive Advantage

- **PDF Bundle Intelligence** (Global First) - 25%+ accuracy improvement
- **140x Faster** than competitors (10 min vs 24-48 hours)
- **70% Cheaper** (RM 60-90/hr vs RM 210-318/hr)
- **99% Profit Margin**

## 📈 Revenue Projections

- Month 3: RM 6,000/month
- Month 6: RM 30,000/month
- Month 12: RM 135,000/month
- Year 2: RM 540,000/month

## 🔧 Tech Stack

**Frontend:** React 18 + Vite + Tailwind CSS + Framer Motion
**Backend:** Node.js + Express + PostgreSQL + Redis + BullMQ
**AI:** Groq Whisper Large v3 (FREE 500 hrs/month)
**Storage:** AWS S3
**Email:** SendGrid
**Deployment:** Railway + Vercel

## 📄 License

Proprietary - All Rights Reserved
`;

const readmePath = path.join(projectRoot, 'README.md');
fs.writeFileSync(readmePath, readmeContent);
console.log('✓ Created README.md');

console.log('\n✅ Project structure created successfully!');
console.log('\n📋 Next Steps:');
console.log('1. cd malaysian-legal-transcription');
console.log('2. Apply bug fixes from BUG_FIXES_REQUIRED.md');
console.log('3. Follow ANTIGRAVITY_EXECUTION_CHECKLIST.md');
console.log('\n🚀 Let\'s build a RM 540,000/month business!\n');
