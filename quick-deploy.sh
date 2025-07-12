#!/bin/bash

# Mineral Balls - Quick Production Deployment Script
# Run this script on your production server

set -e

echo "🚀 Starting Mineral Balls Production Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_error "This script should not be run as root for security reasons"
   exit 1
fi

# Variables (modify these for your setup)
APP_NAME="mineralballs"
APP_DIR="/home/$(whoami)/mineralballs.com"
DB_NAME="mineralballs"
DB_USER="mineralballs_user"

print_status "Deployment Configuration:"
echo "  App Name: $APP_NAME"
echo "  App Directory: $APP_DIR"
echo "  Database: $DB_NAME"
echo "  User: $DB_USER"
echo ""

# Check if directory exists
if [ ! -d "$APP_DIR" ]; then
    print_error "Application directory $APP_DIR does not exist!"
    print_status "Please clone your repository first:"
    echo "  git clone <your-repo-url> $APP_DIR"
    exit 1
fi

cd "$APP_DIR"

# Step 1: Update code
print_status "Step 1: Updating application code..."
if [ -d ".git" ]; then
    git pull origin main
    print_status "Code updated successfully"
else
    print_warning "Not a git repository, skipping code update"
fi

# Step 2: Install dependencies
print_status "Step 2: Installing dependencies..."
npm install
print_status "Dependencies installed"

# Step 3: Environment setup
print_status "Step 3: Checking environment configuration..."
if [ ! -f ".env" ]; then
    print_warning ".env file not found, creating template..."
    cat > .env << EOF
NODE_ENV=production
DATABASE_URL=postgresql://$DB_USER:your_password@localhost:5432/$DB_NAME
PORT=5000
EOF
    print_warning "Please edit .env file with your actual database credentials"
    print_status "Template .env file created"
else
    print_status "Environment file exists"
fi

# Step 4: Database setup
print_status "Step 4: Setting up database..."
if command -v tsx &> /dev/null; then
    npm run db:push
    print_status "Database schema updated"
    
    # Ask if user wants to seed database
    read -p "Do you want to seed the database with initial data? (y/N): " seed_db
    if [[ $seed_db =~ ^[Yy]$ ]]; then
        tsx server/seed.ts
        print_status "Database seeded with initial data"
    fi
else
    print_error "tsx command not found. Please install it globally: npm install -g tsx"
    exit 1
fi

# Step 5: Build application
print_status "Step 5: Building application for production..."
if [ -f "build-production.js" ]; then
    node build-production.js
    print_status "Application built successfully"
else
    print_error "build-production.js not found!"
    print_status "Creating build script..."
    
    # Create the build script if it doesn't exist
    cat > build-production.js << 'EOF'
#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';

console.log('🔧 Building for production...');

// Build the client
console.log('📦 Building client...');
execSync('vite build', { stdio: 'inherit' });

// Build the server with ES module compatibility
console.log('🚀 Building server...');
const serverBuildCommand = `esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist --banner:js="import { fileURLToPath } from 'url'; import path from 'path'; const __filename = fileURLToPath(import.meta.url); const __dirname = path.dirname(__filename);"`;

execSync(serverBuildCommand, { stdio: 'inherit' });

// Copy public assets if they exist
if (fs.existsSync('dist/public')) {
  console.log('📂 Assets ready');
} else {
  console.log('⚠️  No public assets found');
}

console.log('✅ Production build complete!');
console.log('🚀 Run with: NODE_ENV=production node dist/index.js');
EOF
    
    node build-production.js
    print_status "Build script created and executed"
fi

# Step 6: PM2 configuration
print_status "Step 6: Configuring PM2..."
if ! command -v pm2 &> /dev/null; then
    print_error "PM2 not found. Installing PM2..."
    npm install -g pm2
fi

# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: '$APP_NAME',
    script: 'dist/index.js',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 7000
    },
    error_file: '$HOME/.pm2/logs/$APP_NAME-error.log',
    out_file: '$HOME/.pm2/logs/$APP_NAME-out.log',
    log_file: '$HOME/.pm2/logs/$APP_NAME.log',
    time: true
  }]
};
EOF

print_status "PM2 configuration created"

# Step 7: Start/Restart application
print_status "Step 7: Starting application..."
if pm2 list | grep -q "$APP_NAME"; then
    print_status "Restarting existing application..."
    pm2 restart $APP_NAME
else
    print_status "Starting new application..."
    pm2 start ecosystem.config.js
    pm2 save
fi

# Step 8: Setup startup script
print_status "Step 8: Setting up PM2 startup..."
pm2 startup | grep "sudo" | bash || print_warning "Could not setup PM2 startup automatically"

# Step 9: Verification
print_status "Step 9: Verifying deployment..."
sleep 3

if pm2 list | grep -q "$APP_NAME.*online"; then
    print_status "✅ Application is running successfully!"
    
    # Test local connection
    if curl -s http://localhost:7000 > /dev/null; then
        print_status "✅ Application responds to HTTP requests"
    else
        print_warning "⚠️  Application not responding on port 7000"
    fi
    
    # Show PM2 status
    echo ""
    print_status "PM2 Status:"
    pm2 status
    
    echo ""
    print_status "Recent logs:"
    pm2 logs $APP_NAME --lines 10
    
else
    print_error "❌ Application failed to start!"
    print_status "Checking logs..."
    pm2 logs $APP_NAME --lines 20
    exit 1
fi

echo ""
print_status "🎉 Deployment completed successfully!"
echo ""
print_status "Useful commands:"
echo "  pm2 status                 - Check application status"
echo "  pm2 logs $APP_NAME         - View application logs"
echo "  pm2 restart $APP_NAME      - Restart application"
echo "  pm2 monit                  - Real-time monitoring"
echo ""
print_status "Your application should be available at:"
echo "  http://localhost:7000"
echo "  http://your-domain.com (if Nginx is configured)"