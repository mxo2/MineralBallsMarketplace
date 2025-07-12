#!/bin/bash

# Sync latest changes to production server
echo "🔄 Syncing latest changes to production..."

# Stop the current production application
pm2 stop mineralballs 2>/dev/null || echo "No existing process"

# Clean build directory
rm -rf dist
mkdir -p dist

# Build client
echo "📦 Building client..."
npx vite build

# Copy updated simple server with latest video URLs
echo "📋 Copying updated server..."
cp simple-server.js dist/server.js

# Copy attached assets for production
echo "📁 Copying assets..."
cp -r attached_assets dist/

# Copy logo as favicon
cp attached_assets/logo_bg_1752204377370.png dist/public/favicon.png

# Create package.json for CommonJS
echo '{"type": "commonjs", "main": "server.js"}' > dist/package.json

# Start the updated application
echo "🚀 Starting updated application on port 7000..."
cd dist
NODE_ENV=production PORT=7000 pm2 start server.js --name mineralballs

echo "✅ Production sync complete"
sleep 3
pm2 status mineralballs

# Test the updated videos endpoint
echo "🧪 Testing videos endpoint..."
response=$(curl -s http://localhost:7000/api/videos | jq -r '.[1].videoUrl' 2>/dev/null || echo "Could not test")
if [[ "$response" == *"video2.mp4"* ]]; then
    echo "✅ Video URLs updated successfully"
else
    echo "⚠️ Video URLs may need verification"
fi

echo "📋 Recent logs:"
pm2 logs mineralballs --lines 5