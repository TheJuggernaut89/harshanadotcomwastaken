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

// Move built React app to professional/ - fix asset paths
const builtIndex = path.join(distDir, 'index.html');
if (fs.existsSync(builtIndex)) {
  let content = fs.readFileSync(builtIndex, 'utf8');
  // Check if it's the React app (has #root)
  if (content.includes('id="root"') || content.includes('/src/main.jsx')) {
    // Fix asset paths to be relative (for subfolder deployment)
    content = content.replace(/src="\/assets\//g, 'src="./assets/');
    content = content.replace(/href="\/assets\//g, 'href="./assets/');
    fs.writeFileSync(path.join(professionalDir, 'index.html'), content);
    fs.unlinkSync(builtIndex);
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

// Copy creative folder - USES STATIC HTML (Palmer template)
const creativeSource = path.join(__dirname, 'creative');
if (fs.existsSync(creativeSource)) {
  // Copy the static creative HTML file
  let creativeContent = fs.readFileSync(path.join(creativeSource, 'index.html'), 'utf8');
  
  // Fix asset paths to be relative (for subfolder deployment)
  creativeContent = creativeContent.replace(/src="\.\.\//g, 'src="./');
  creativeContent = creativeContent.replace(/href="\.\.\//g, 'href="./');
  
  fs.writeFileSync(path.join(creativeDir, 'index.html'), creativeContent);
  console.log('✓ Copied creative mode (static HTML)');
}

// Copy brutal folder - fix asset paths
const brutalSource = path.join(__dirname, 'brutal');
if (fs.existsSync(brutalSource)) {
  let brutalContent = fs.readFileSync(path.join(brutalSource, 'index.html'), 'utf8');
  
  // Fix asset paths to be relative (for subfolder deployment)
  brutalContent = brutalContent.replace(/src="\/assets\//g, 'src="./assets/');
  brutalContent = brutalContent.replace(/href="\/assets\//g, 'href="./assets/');
  brutalContent = brutalContent.replace(/src="\.\.\//g, 'src="./');
  brutalContent = brutalContent.replace(/href="\.\.\//g, 'href="./');
  
  fs.writeFileSync(path.join(brutalDir, 'index.html'), brutalContent);
  console.log('✓ Copied brutal mode');
}

// Copy assets to all subfolders for React app support
const assetsDir = path.join(distDir, 'assets');
if (fs.existsSync(assetsDir)) {
  const copyRecursive = (src, dest) => {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        copyRecursive(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  };
  
  // Copy assets to professional
  const professionalAssets = path.join(professionalDir, 'assets');
  copyRecursive(assetsDir, professionalAssets);
  console.log('✓ Copied assets to professional/');
  
  // Copy assets to creative
  const creativeAssets = path.join(creativeDir, 'assets');
  copyRecursive(assetsDir, creativeAssets);
  console.log('✓ Copied assets to creative/');
  
  // Copy assets to brutal
  const brutalAssets = path.join(brutalDir, 'assets');
  copyRecursive(assetsDir, brutalAssets);
  console.log('✓ Copied assets to brutal/');
}

console.log('Post-build complete!');
console.log('');
console.log('Structure:');
console.log('  / (root) -> Terminal boot');
console.log('  /professional/ -> React app (professional theme)');
console.log('  /creative/ -> React app (creative theme + chatbot)');
console.log('  /brutal/ -> Brutal mode (static HTML - no chatbot)');
