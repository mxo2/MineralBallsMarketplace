#!/bin/bash

# Alternative ES module fix - simpler approach
echo "🔧 Alternative ES module fix..."

# Stop application
pm2 stop mineralballs || echo "App not running"

# Clean build
rm -rf dist

# Build normally first
echo "📦 Building application..."
npx vite build
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

# Create a wrapper file that handles ES modules properly
echo "🔧 Creating ES module wrapper..."
cat > dist/wrapper.js << 'EOF'
import { fileURLToPath } from 'url';
import path from 'path';

// Define ES module globals
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Make available globally
globalThis.__dirname = __dirname;
globalThis.__filename = __filename;

// Import and run the main application
import('./index.js').catch(console.error);
EOF

# Start with the wrapper
echo "🚀 Starting with ES module wrapper on port 7000..."
NODE_ENV=production PORT=7000 pm2 start dist/wrapper.js --name mineralballs

echo "✅ Application started"
sleep 2
pm2 status mineralballs
pm2 logs mineralballs --lines 5