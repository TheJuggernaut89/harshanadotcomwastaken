import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'src', 'data', 'content.js');

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
    }
];

if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;

    replacements.forEach(pair => {
        if (content.includes(pair.old)) {
            content = content.replace(pair.old, pair.new);
            updated = true;
            console.log(`Replaced: ${pair.old} -> ${pair.new}`);
        } else {
            console.log(`Not found (already updated?): ${pair.old}`);
        }
    });

    if (updated) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Successfully updated src/data/content.js');
    } else {
        console.log('No changes were needed in src/data/content.js');
    }
} else {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
}
