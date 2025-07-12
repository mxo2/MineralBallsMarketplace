#!/bin/bash

# Emergency fix - completely clean rebuild
echo "🚨 Emergency fix: Complete clean rebuild..."

# Kill all processes
pm2 delete mineralballs 2>/dev/null || echo "No existing process"

# Complete cleanup
rm -rf dist node_modules/.cache

# Install fresh dependencies
npm install

# Build client
echo "Building client..."
npx vite build

# Build server as CommonJS with explicit configuration
echo "Building server as CommonJS..."
npx esbuild server/index.ts \
  --platform=node \
  --target=node18 \
  --packages=external \
  --bundle \
  --format=cjs \
  --outfile=dist/server.js \
  --external:@neondatabase/serverless \
  --external:drizzle-orm \
  --external:express

# Create clean package.json in dist
cat > dist/package.json << 'EOF'
{
  "type": "commonjs",
  "main": "server.js"
}
EOF

# Start fresh PM2 process
echo "Starting fresh application..."
cd dist
NODE_ENV=production PORT=7000 pm2 start server.js --name mineralballs-new

# Monitor startup
sleep 3
pm2 status
pm2 logs mineralballs-new --lines 5