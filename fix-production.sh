#!/bin/bash

# Emergency fix for ES module __dirname issue
echo "🔧 Fixing ES module __dirname issue..."

# Stop the application
pm2 stop mineralballs

# Remove old build
rm -rf dist

# Build with proper ES module polyfill
echo "📦 Building client..."
npx vite build

echo "🚀 Building server with ES module fix..."
npx esbuild server/index.ts \
  --platform=node \
  --packages=external \
  --bundle \
  --format=esm \
  --outdir=dist \
  --banner:js="import { fileURLToPath } from 'url'; import path from 'path'; const __filename = fileURLToPath(import.meta.url); const __dirname = path.dirname(__filename);"

echo "✅ Build complete with ES module fix"

# Start the application
echo "🚀 Starting application..."
NODE_ENV=production pm2 start dist/index.js --name mineralballs

echo "✅ Application restarted"
echo "📊 Checking status..."
pm2 status mineralballs

echo "📋 Recent logs:"
pm2 logs mineralballs --lines 10