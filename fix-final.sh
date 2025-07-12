#!/bin/bash

# Final fix - Use CommonJS to avoid all ES module issues
echo "🔧 Final fix: Building as CommonJS..."

# Stop application
pm2 stop mineralballs || echo "App not running"

# Clean slate
rm -rf dist
mkdir -p dist

# Build client
echo "📦 Building client..."
npx vite build

# Build server as CommonJS (no ES module issues)
echo "🚀 Building server as CommonJS..."
npx esbuild server/index.ts \
  --platform=node \
  --packages=external \
  --bundle \
  --format=cjs \
  --outdir=dist

# Create package.json for CommonJS
echo '{"type": "commonjs"}' > dist/package.json

echo "✅ Build complete as CommonJS"

# Start application
echo "🚀 Starting application on port 7000..."
NODE_ENV=production PORT=7000 pm2 start dist/index.js --name mineralballs

echo "✅ Application started"
sleep 3
pm2 status mineralballs
echo "📋 Testing connection..."
curl -s http://localhost:7000 > /dev/null && echo "✅ App responding" || echo "⚠️ App not responding"
pm2 logs mineralballs --lines 5