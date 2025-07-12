#!/bin/bash

# Emergency fix for ES module __dirname issue
echo "🔧 Fixing ES module __dirname issue..."

# Stop the application
pm2 stop mineralballs || echo "Application not running"

# Remove old build completely
rm -rf dist
mkdir -p dist

# Build client
echo "📦 Building client..."
npx vite build

# Build server with clean ES module compatibility
echo "🚀 Building server with ES module fix..."
npx esbuild server/index.ts \
  --platform=node \
  --packages=external \
  --bundle \
  --format=esm \
  --outdir=dist \
  --define:global=globalThis

# Add ES module polyfill to the built file
echo "🔧 Adding ES module compatibility..."
cat > dist/polyfill.js << 'EOF'
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
globalThis.__dirname = __dirname;
globalThis.__filename = __filename;
EOF

# Prepend polyfill to the main file
cat dist/polyfill.js dist/index.js > dist/app.js
rm dist/polyfill.js dist/index.js
mv dist/app.js dist/index.js

echo "✅ Build complete with ES module fix"

# Start the application on port 7000
echo "🚀 Starting application on port 7000..."
NODE_ENV=production PORT=7000 pm2 start dist/index.js --name mineralballs

echo "✅ Application restarted"
echo "📊 Checking status..."
sleep 2
pm2 status mineralballs

echo "📋 Recent logs:"
pm2 logs mineralballs --lines 10