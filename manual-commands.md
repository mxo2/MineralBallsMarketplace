# Production Deployment Commands

## RECOMMENDED: Use the simple deployment script
```bash
cd /home/frappe/mineralballs.com
./deploy-simple.sh
```

## MANUAL: Step-by-step commands

Run these commands **one by one** on your production server:

```bash
# 1. Go to project directory
cd /home/frappe/mineralballs.com

# 2. Stop and remove all existing processes
pm2 stop mineralballs || pm2 delete mineralballs

# 3. Clean everything
rm -rf dist

# 4. Build client
npx vite build

# 5. Create CommonJS-compatible server entry
cat > server/index-production.js << 'EOF'
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 7000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API routes (you'll need to adapt your routes to CommonJS)
app.get('/api/products', (req, res) => {
  res.json([/* your products */]);
});

// Catch all handler
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
EOF

# 6. Copy the CommonJS server to dist
cp server/index-production.js dist/server.js

# 7. Create package.json for CommonJS
echo '{"type": "commonjs", "main": "server.js"}' > dist/package.json

# 8. Start application
cd dist
NODE_ENV=production PORT=7000 pm2 start server.js --name mineralballs

# 9. Check status
pm2 status mineralballs
pm2 logs mineralballs --lines 10

# 10. Test connection
curl http://localhost:7000
```

**The automated script handles import.meta compatibility and creates a proper CommonJS build.**