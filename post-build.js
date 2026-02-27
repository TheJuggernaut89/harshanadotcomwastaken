#!/usr/bin/env node
/**
 * Post-build script to reorganize dist folder
 * Structure after build:
 * - dist/index.html (terminal boot - from landing.html)
 * - dist/professional/index.html (React app - built)
 * - dist/creative/index.html (Creative mode)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, 'dist');
const professionalDir = path.join(distDir, 'professional');
const creativeDir = path.join(distDir, 'creative');
const brutalDir = path.join(distDir, 'brutal');

console.log('Running post-build reorganization...');

// Ensure directories exist
if (!fs.existsSync(professionalDir)) {
  fs.mkdirSync(professionalDir, { recursive: true });
}
if (!fs.existsSync(creativeDir)) {
  fs.mkdirSync(creativeDir, { recursive: true });
}
if (!fs.existsSync(brutalDir)) {
  fs.mkdirSync(brutalDir, { recursive: true });
}

// Move built React app to professional/
const builtIndex = path.join(distDir, 'index.html');
if (fs.existsSync(builtIndex)) {
  const content = fs.readFileSync(builtIndex, 'utf8');
  // Check if it's the React app (has #root)
  if (content.includes('id="root"') || content.includes('/src/main.jsx')) {
    fs.renameSync(builtIndex, path.join(professionalDir, 'index.html'));
    console.log('✓ Moved React app to professional/index.html');
  }
}

// Copy terminal boot source to dist root
const terminalSource = path.join(__dirname, 'terminal-boot-source.html');
if (fs.existsSync(terminalSource)) {
  fs.copyFileSync(terminalSource, path.join(distDir, 'index.html'));
  console.log('✓ Copied terminal boot to index.html');
} else {
  // Fallback to landing.html if exists
  const landingFile = path.join(__dirname, 'landing.html');
  if (fs.existsSync(landingFile)) {
    fs.copyFileSync(landingFile, path.join(distDir, 'index.html'));
    console.log('✓ Copied terminal boot to index.html');
  }
}

// Copy creative folder
const creativeSource = path.join(__dirname, 'creative');
if (fs.existsSync(creativeSource)) {
  // Copy index.html
  fs.copyFileSync(
    path.join(creativeSource, 'index.html'),
    path.join(creativeDir, 'index.html')
  );
  console.log('✓ Copied creative mode');
}

// Copy brutal folder
const brutalSource = path.join(__dirname, 'brutal');
if (fs.existsSync(brutalSource)) {
  fs.copyFileSync(
    path.join(brutalSource, 'index.html'),
    path.join(brutalDir, 'index.html')
  );
  console.log('✓ Copied brutal mode');
}

console.log('Post-build complete!');
console.log('');
console.log('Structure:');
console.log('  / (root) -> Terminal boot');
console.log('  /professional/ -> React app');
console.log('  /creative/ -> Creative mode');
console.log('  /brutal/ -> Brutal mode (trauma clearance)');
