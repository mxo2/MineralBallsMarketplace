# Manual Emergency Fix Commands

Run these commands **one by one** on your production server:

```bash
# 1. Go to project directory
cd /home/frappe/mineralballs.com

# 2. Stop and remove all existing processes
pm2 delete mineralballs
pm2 delete all

# 3. Clean everything
rm -rf dist
rm -rf node_modules/.cache

# 4. Fresh install
npm install

# 5. Build client
npx vite build

# 6. Build server as CommonJS (this avoids ALL ES module issues)
npx esbuild server/index.ts \
  --platform=node \
  --target=node18 \
  --packages=external \
  --bundle \
  --format=cjs \
  --outfile=dist/app.js

# 7. Create package.json for CommonJS
echo '{"type": "commonjs"}' > dist/package.json

# 8. Start application
cd dist
NODE_ENV=production PORT=7000 pm2 start app.js --name mineralballs

# 9. Check status
pm2 status
pm2 logs mineralballs --lines 10

# 10. Test connection
curl http://localhost:7000
```

These commands will completely rebuild your application as CommonJS, eliminating all ES module conflicts.