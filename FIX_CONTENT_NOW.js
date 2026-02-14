import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Files to check and update
const filesToUpdate = [
    'src/data/content.js',
    'src/data/content-marketing-technologist.js',
    'src/data/content-BACKUP-LATEST.js'
];

const replacements = [
    {
        old: 'April 2025 - Standard 19.png',
        new: 'cream-1.png'
    },
    {
        old: 'April 2025 - Standard 25.png',
        new: 'cream-2.png'
    },
    {
        old: 'Chinese New Year Post - Gong Xi Fa Cai - Chinese New Year Post - Gong Xi Fa Cai 1.png',
        new: 'cream-3.png'
    },
    {
        old: 'Chinese New Year Post - Gong Xi Fa Cai - Chinese New Year Post - Gong Xi Fa Cai 7.png',
        new: 'cream-4.png'
    },
    {
        old: 'Untitled Project - Standard.png',
        new: 'cream-5.png'
    },
    // Fix existing content.js if it reverted or has partial matches
    {
        old: '/images/journey/cream-of-creams/images/April 2025 - Standard 19.png',
        new: '/images/journey/cream-of-creams/images/cream-1.png'
    }
];

filesToUpdate.forEach(relativePath => {
    const filePath = path.join(__dirname, relativePath);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        let updated = false;

        replacements.forEach(pair => {
            if (content.includes(pair.old)) {
                content = content.replace(new RegExp(pair.old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), pair.new);
                updated = true;
                console.log(`[${relativePath}] Replaced: ${pair.old.substring(0, 30)}... -> ${pair.new}`);
            }
        });

        if (updated) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Updated ${relativePath}`);
        } else {
            console.log(`Example check for ${relativePath}: All clear.`);
        }
    } else {
        console.log(`⚠️ Skipped missing file: ${relativePath}`);
    }
});
