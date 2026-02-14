import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Keywords to flag (lowercase)
// Using regex patterns for better matching
const BLACKLIST_PATTERNS = [
    /\bporn\b/i,
    /\bxhamster\b/i,
    /\blucah\b/i,
    /\bsex\b/i,
    /\bxxx\b/i,
    /\bnude\b/i,
    /\badult content\b/i,
    /\baddiction while in relationships\b/i
];

// Directories to scan (recursive)
const SCAN_DIRS = ['src', 'public', 'api'];

// Files to skip (e.g. this file itself)
const SKIP_FILES = ['verify-content.js', 'package-lock.json', '.git'];

// Binary file extensions to skip
const BINARY_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.mp4', '.pdf', '.webp', '.ico'];

function scanFile(filePath) {
    // Skip binary files
    if (BINARY_EXTENSIONS.some(ext => filePath.toLowerCase().endsWith(ext))) {
        return null;
    }

    try {
        const content = fs.readFileSync(filePath, 'utf8');
        for (const pattern of BLACKLIST_PATTERNS) {
            if (pattern.test(content)) {
                // Double check if it's a false positive context (like code variable)
                // For now, we trust the word boundary regex
                return { file: filePath, keyword: pattern.source };
            }
        }
    } catch (err) {
        // Skip binary files or read errors
    }
    return null;
}

function scanDir(dir) {
    let issues = [];
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (SKIP_FILES.includes(file)) continue;

        if (stat.isDirectory()) {
            if (!SKIP_FILES.includes(file)) {
                issues = issues.concat(scanDir(fullPath));
            }
        } else {
            const issue = scanFile(fullPath);
            if (issue) issues.push(issue);
        }
    }
    return issues;
}

console.log('🔍 Scanning codebase for brand safety issues...');

let allIssues = [];
SCAN_DIRS.forEach(dir => {
    const fullPath = path.join(__dirname, dir);
    if (fs.existsSync(fullPath)) {
        allIssues = allIssues.concat(scanDir(fullPath));
    }
});

// Also scan root files
const rootFiles = fs.readdirSync(__dirname).filter(f => fs.statSync(f).isFile() && !SKIP_FILES.includes(f));
rootFiles.forEach(file => {
    const issue = scanFile(path.join(__dirname, file));
    if (issue) allIssues.push(issue);
});

if (allIssues.length > 0) {
    console.error('❌ Brand Safety Violations Found:');
    allIssues.forEach(issue => {
        console.error(`   - ${issue.file}: matches pattern "${issue.keyword}"`);
    });
    process.exit(1);
} else {
    console.log('✅ Brand Safety Check Passed: No flagged content found.');
    process.exit(0);
}
