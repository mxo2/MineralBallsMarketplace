#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';

console.log('🔧 Building for production...');

// Build the client
console.log('📦 Building client...');
execSync('vite build', { stdio: 'inherit' });

// Build the server with ES module compatibility
console.log('🚀 Building server...');
const serverBuildCommand = `esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist --banner:js="import { fileURLToPath } from 'url'; import path from 'path'; const __filename = fileURLToPath(import.meta.url); const __dirname = path.dirname(__filename);"`;

execSync(serverBuildCommand, { stdio: 'inherit' });

// Copy public assets if they exist
if (fs.existsSync('dist/public')) {
  console.log('📂 Assets ready');
} else {
  console.log('⚠️  No public assets found');
}

console.log('✅ Production build complete!');
console.log('🚀 Run with: NODE_ENV=production node dist/index.js');