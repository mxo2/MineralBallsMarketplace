#!/bin/bash

# Simple deployment with pure CommonJS - no ES modules at all
echo "🚀 Deploying with pure CommonJS server..."

# Stop everything
pm2 stop mineralballs 2>/dev/null || echo "No existing process"
pm2 delete mineralballs 2>/dev/null || echo "Process deleted"

# Clean build
rm -rf dist
mkdir -p dist

# Build client only
echo "📦 Building client..."
npx vite build

# Copy our simple CommonJS server
echo "📋 Copying simple server..."
cp simple-server.js dist/server.js

# Create CommonJS package.json
echo '{"type": "commonjs", "main": "server.js"}' > dist/package.json

# Start the server
echo "🚀 Starting server on port 7000..."
cd dist
NODE_ENV=production PORT=7000 pm2 start server.js --name mineralballs

# Check status
echo "📊 Checking status..."
sleep 3
pm2 status mineralballs

# Test connection
echo "🧪 Testing connection..."
sleep 2
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:7000)
if [ "$response" = "200" ]; then
    echo "✅ Server responding with HTTP $response"
else
    echo "⚠️ Server responding with HTTP $response"
fi

echo "📋 Recent logs:"
pm2 logs mineralballs --lines 5