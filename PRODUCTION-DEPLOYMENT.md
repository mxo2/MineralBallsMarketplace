# Production Deployment Guide - Mineral Balls Website

## Prerequisites

Before deployment, ensure you have:
- Ubuntu/Linux server with Node.js 18+ installed
- PostgreSQL database access
- PM2 process manager installed
- Nginx (optional, for reverse proxy)
- Git installed on server

## Step 1: Server Setup

### 1.1 Install Required Software
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install Git if not already installed
sudo apt install git -y
```

### 1.2 Create Application User (Optional but recommended)
```bash
sudo adduser frappe
sudo usermod -aG sudo frappe
su - frappe
```

## Step 2: Database Setup

### 2.1 PostgreSQL Installation
```bash
sudo apt install postgresql postgresql-contrib -y
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 2.2 Create Database and User
```bash
sudo -u postgres psql

-- In PostgreSQL shell:
CREATE DATABASE mineralballs;
CREATE USER mineralballs_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE mineralballs TO mineralballs_user;
\q
```

### 2.3 Get Database Connection String
```bash
# Format: postgresql://username:password@localhost:5432/database_name
DATABASE_URL="postgresql://mineralballs_user:your_secure_password@localhost:5432/mineralballs"
```

## Step 3: Application Deployment

### 3.1 Clone Repository
```bash
cd /home/frappe
git clone https://github.com/your-username/mineral-balls-website.git mineralballs.com
cd mineralballs.com
```

### 3.2 Install Dependencies
```bash
npm install
```

### 3.3 Environment Configuration
```bash
# Create environment file
nano .env

# Add these variables:
NODE_ENV=production
DATABASE_URL=postgresql://mineralballs_user:your_secure_password@localhost:5432/mineralballs
PORT=5000
```

### 3.4 Database Schema Setup
```bash
# Push database schema
npm run db:push

# Seed database with initial data
tsx server/seed.ts
```

## Step 4: Build Application

### 4.1 Fix ES Module Issue
```bash
# Copy the production build script
cp build-production.js /home/frappe/mineralballs.com/

# Make it executable
chmod +x build-production.js
```

### 4.2 Build for Production
```bash
# Run the custom build script
node build-production.js
```

## Step 5: PM2 Process Management

### 5.1 Create PM2 Ecosystem File
```bash
nano ecosystem.config.js
```

Add this content:
```javascript
module.exports = {
  apps: [{
    name: 'mineralballs',
    script: 'dist/index.js',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: '/home/frappe/.pm2/logs/mineralballs-error.log',
    out_file: '/home/frappe/.pm2/logs/mineralballs-out.log',
    log_file: '/home/frappe/.pm2/logs/mineralballs.log',
    time: true
  }]
};
```

### 5.2 Start Application with PM2
```bash
# Start the application
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup
# Follow the command it provides (usually requires sudo)
```

## Step 6: Nginx Reverse Proxy (Recommended)

### 6.1 Install Nginx
```bash
sudo apt install nginx -y
```

### 6.2 Configure Nginx
```bash
sudo nano /etc/nginx/sites-available/mineralballs.com
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name mineralballs.com www.mineralballs.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 6.3 Enable Site
```bash
sudo ln -s /etc/nginx/sites-available/mineralballs.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Step 7: SSL Certificate (Optional but Recommended)

### 7.1 Install Certbot
```bash
sudo apt install certbot python3-certbot-nginx -y
```

### 7.2 Get SSL Certificate
```bash
sudo certbot --nginx -d mineralballs.com -d www.mineralballs.com
```

## Step 8: Firewall Configuration

```bash
# Allow SSH, HTTP, HTTPS
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## Step 9: Monitoring and Maintenance

### 9.1 PM2 Monitoring
```bash
# View application status
pm2 status

# View logs
pm2 logs mineralballs

# Restart application
pm2 restart mineralballs

# Monitor real-time
pm2 monit
```

### 9.2 Application Updates
```bash
# Update application
cd /home/frappe/mineralballs.com
git pull origin main
npm install
npm run db:push  # If schema changes
node build-production.js
pm2 restart mineralballs
```

## Step 10: Verification

### 10.1 Test Application
```bash
# Check if application is running
curl http://localhost:5000

# Test database connection
NODE_ENV=production tsx -e "import('./server/storage.js').then(m => console.log('Storage type:', m.storage.constructor.name))"
```

### 10.2 Check Logs
```bash
# PM2 logs
pm2 logs mineralballs --lines 50

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## Troubleshooting

### Common Issues:

1. **Port 5000 already in use:**
   ```bash
   sudo lsof -i :5000
   sudo kill -9 PID_NUMBER
   ```

2. **Database connection error:**
   - Verify DATABASE_URL is correct
   - Check PostgreSQL is running: `sudo systemctl status postgresql`

3. **ES Module errors:**
   - Ensure you're using the build-production.js script
   - Check Node.js version: `node --version` (should be 18+)

4. **Permission errors:**
   ```bash
   sudo chown -R frappe:frappe /home/frappe/mineralballs.com
   ```

## Production URLs

After successful deployment:
- **HTTP**: http://your-domain.com
- **HTTPS**: https://your-domain.com (if SSL configured)
- **Direct IP**: http://your-server-ip:5000

## Security Checklist

- [ ] Database has strong password
- [ ] Firewall is configured
- [ ] SSL certificate installed
- [ ] Application runs as non-root user
- [ ] Regular backups configured
- [ ] Environment variables secured

---

This deployment guide ensures your Mineral Balls website runs reliably in production with proper database persistence, process management, and security configurations.