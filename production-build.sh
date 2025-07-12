#!/bin/bash

# Production build that handles import.meta properly
echo "🔧 Building for production with CommonJS compatibility..."

# Stop application
pm2 stop mineralballs || pm2 delete mineralballs || echo "No existing process"

# Clean build
rm -rf dist
mkdir -p dist

# Build client first
echo "📦 Building client..."
npx vite build

# Create a CommonJS-compatible server entry point
echo "🚀 Creating CommonJS server..."
cat > server/index-cjs.ts << 'EOF'
import express from "express";
import { setupVite, serveStatic } from "./vite-cjs";
import { registerRoutes } from "./routes";

const app = express();
const port = process.env.PORT || 7000;

if (process.env.NODE_ENV === "production") {
  serveStatic(app);
} else {
  console.log("Development mode not supported in CommonJS build");
}

registerRoutes(app).then(() => {
  app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
  });
});
EOF

# Create CommonJS-compatible vite helper
cat > server/vite-cjs.ts << 'EOF'
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function serveStatic(app: express.Express) {
  const distPath = path.resolve(__dirname, "public");
  app.use(express.static(distPath));
  
  app.get("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

export function log(message: string, source = "express") {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`${timestamp} [${source}] ${message}`);
}
EOF

# Build the CommonJS server
echo "📦 Building CommonJS server..."
npx esbuild server/index-cjs.ts \
  --platform=node \
  --target=node18 \
  --packages=external \
  --bundle \
  --format=cjs \
  --outfile=dist/server.js \
  --define:process.env.NODE_ENV=\"production\"

# Create package.json for CommonJS
echo '{"type": "commonjs", "main": "server.js"}' > dist/package.json

# Start application
echo "🚀 Starting application on port 7000..."
cd dist
NODE_ENV=production PORT=7000 pm2 start server.js --name mineralballs

echo "✅ Build and deployment complete"
sleep 3
pm2 status mineralballs
echo "📋 Testing connection..."
curl -s -o /dev/null -w "%{http_code}" http://localhost:7000 && echo " - App responding" || echo " - App not responding"
pm2 logs mineralballs --lines 5