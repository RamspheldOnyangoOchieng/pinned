# 🚀 Complete Deployment Guide — Personal Domain & VPS

**Comprehensive production deployment documentation for Next.js AI Companion Platform**

This guide walks you through deploying this Next.js application to your own VPS (Virtual Private Server) with a custom domain, connecting it to **your own Supabase project** (NOT the developer's database), and configuring all required services including Stripe payments, storage buckets, admin users, and production SSL/TLS.

---

## 📋 Table of Contents

1. [Overview & Prerequisites](#overview--prerequisites)
2. [Architecture & System Requirements](#architecture--system-requirements)
3. [Supabase Project Setup](#supabase-project-setup)
4. [VPS Initial Setup](#vps-initial-setup)
5. [Domain & DNS Configuration](#domain--dns-configuration)
6. [Application Deployment](#application-deployment)
7. [Database Migration & Seeding](#database-migration--seeding)
8. [Storage Buckets & Resources](#storage-buckets--resources)
9. [Reverse Proxy & SSL/TLS](#reverse-proxy--ssltls)
10. [Process Management (systemd)](#process-management-systemd)
11. [Stripe Integration](#stripe-integration)
12. [Admin User Management](#admin-user-management)
13. [Novita AI Image Generation Setup](#novita-ai-image-generation-setup)
14. [Security Hardening](#security-hardening)
15. [Monitoring & Logging](#monitoring--logging)
16. [Backup & Disaster Recovery](#backup--disaster-recovery)
17. [Troubleshooting](#troubleshooting)
18. [CI/CD & Automation](#cicd--automation)

---

## 📦 Overview & Prerequisites

### What You'll Deploy

A production-ready Next.js 15 application featuring:
- AI character chat system with Novita AI integration
- Image generation capabilities
- User authentication via Supabase Auth
- Token-based credit system
- Stripe payment processing
- Admin dashboard for management
- Storage for user-generated content

### Prerequisites Checklist

**Infrastructure:**
- ✅ VPS with at least 2GB RAM, 2 CPU cores, 20GB storage (Ubuntu 22.04 LTS recommended)
- ✅ Domain name with DNS control (e.g., example.com)
- ✅ SSH access to VPS with sudo privileges

**Accounts & Services:**
- ✅ Supabase account (free tier works for testing, Pro recommended for production)
- ✅ Stripe account (test & live mode keys)
- ✅ Novita AI account with API key (for image generation)
- ✅ Optional: Bland AI account (for voice features)
- ✅ Optional: Google Translate API key

**Local Development Tools:**
- ✅ Git installed locally and on VPS
- ✅ SSH client (OpenSSH, PuTTY, or similar)
- ✅ Text editor for configuration files

### Success Criteria

After completing this guide, you should have:
- ✅ Application accessible at `https://yourdomain.com` with valid SSL
- ✅ All database migrations applied successfully
- ✅ Storage buckets created and accessible
- ✅ Admin user created and able to access admin dashboard
- ✅ Stripe payments configured and testable
- ✅ Application running as systemd service with auto-restart
- ✅ Logs accessible and monitoring in place

---

## 🏗️ Architecture & System Requirements

### Application Stack

```
┌─────────────────────────────────────────┐
│         User Browser (HTTPS)            │
└────────────────┬────────────────────────┘
                 │
        ┌────────▼────────┐
        │  Nginx/Caddy    │  ← Reverse Proxy + SSL/TLS
        │  (Port 80/443)  │
        └────────┬────────┘
                 │
        ┌────────▼────────┐
        │  Next.js App    │  ← Your Application
        │  (Port 3000)    │
        └────────┬────────┘
                 │
     ┌───────────┴───────────┐
     │                       │
┌────▼─────┐         ┌──────▼──────┐
│ Supabase │         │ External    │
│ Database │         │ APIs        │
│ + Auth   │         │ (Novita,    │
│ + Storage│         │  Stripe)    │
└──────────┘         └─────────────┘
```

### Minimum System Requirements

**VPS Specifications:**
- **CPU:** 4 cores (4 cores recommended for production)
- **RAM:** 4GB minimum (4GB+ recommended)
- **Storage:** 20GB SSD (50GB+ for production with image storage)
- **OS:** Ubuntu 22.04 LTS (this guide uses Ubuntu; adapt for other distros)
- **Network:** Public IPv4 address, open ports 22 (SSH), 80 (HTTP), 443 (HTTPS)

**Software Versions:**
- Node.js: 18.x or 20.x LTS
- pnpm: 8.x or later (package manager)
- PostgreSQL client tools (optional, for manual DB access)
- nginx: 1.18+ or Caddy 2.x

---

## 🗄️ Supabase Project Setup

### 1. Create New Supabase Project

**IMPORTANT:** Do NOT use the developer's Supabase project. Create your own.

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **"New Project"**
3. Fill in project details:
   - **Name:** Your project name (e.g., "ai-companion-prod")
   - **Database Password:** Strong password (save this securely)
   - **Region:** Choose closest to your users
   - **Plan:** Free tier for testing, Pro for production
4. Wait 2-3 minutes for project provisioning

### 2. Collect Supabase Credentials

Navigate to **Project Settings** → **API**:

```bash
# Note these values - you'll need them later
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...  # Public, safe for client
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...      # SECRET - server-only
```

Navigate to **Project Settings** → **Database** → **Connection string**:

```bash
# Copy the "Connection string" (Direct connection)
POSTGRES_URL_NON_POOLING=postgresql://postgres.[project-ref]:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:5432/postgres
```

### 3. Enable Required Supabase Extensions

In Supabase dashboard, go to **Database** → **Extensions**, enable:
- ✅ `uuid-ossp` (for UUID generation)
- ✅ `pg_trgm` (for text search)
- ✅ `pgcrypto` (for encryption functions)

### 4. Configure Authentication

Go to **Authentication** → **Providers**:
- ✅ Enable Email provider (required)
- ✅ Disable email confirmations for testing (optional)
- ✅ Configure email templates (optional but recommended)

Go to **Authentication** → **URL Configuration**:
- **Site URL:** `https://yourdomain.com`
- **Redirect URLs:** Add `https://yourdomain.com/**` (wildcard for auth callbacks)

---

## 💻 VPS Initial Setup

### 1. Create Non-Root User

```bash
# SSH as root (or existing user)
ssh root@your-vps-ip

# Create new user
adduser deploy
usermod -aG sudo deploy

# Setup SSH for new user
mkdir -p /home/deploy/.ssh
cp ~/.ssh/authorized_keys /home/deploy/.ssh/
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
chmod 600 /home/deploy/.ssh/authorized_keys

# Test login as new user (from local machine)
ssh deploy@your-vps-ip
```

### 2. Update System & Install Dependencies

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install essential tools
sudo apt install -y curl wget git build-essential ufw

# Configure firewall
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
sudo ufw status
```

### 3. Install Node.js & pnpm

```bash
# Install Node.js 20.x LTS via NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version

# Install pnpm globally
curl -fsSL https://get.pnpm.io/install.sh | sh -
# OR
sudo npm install -g pnpm

# Add pnpm to PATH (if using curl installer)
source ~/.bashrc
pnpm --version
```

### 4. Install PostgreSQL Client (Optional)

```bash
# For direct database access/debugging
sudo apt install -y postgresql-client

# Test connection to Supabase
psql "postgresql://postgres.[project-ref]:[PASSWORD]@[host]:5432/postgres"
```

---

## 🌐 Domain & DNS Configuration

### 1. Point Domain to VPS

In your domain registrar or DNS provider (Cloudflare, Namecheap, etc.):

```
Type    Name    Value              TTL
A       @       YOUR_VPS_IP        300
A       www     YOUR_VPS_IP        300
```

**Note:** DNS propagation can take 5 minutes to 48 hours. Check with:
```bash
dig yourdomain.com +short
# Should return your VPS IP
```

### 2. Optional: Cloudflare Setup

If using Cloudflare:
- ✅ Set DNS records as above
- ✅ Set SSL/TLS mode to **"Full (strict)"** (not "Flexible")
- ✅ Enable **"Always Use HTTPS"**
- ✅ Consider disabling Cloudflare proxy (orange cloud) during initial setup

---

## 📦 Application Deployment

### 1. Clone Repository

```bash
# SSH into VPS as deploy user
ssh deploy@your-vps-ip

# Navigate to desired location
cd ~
mkdir -p apps
cd apps

# Clone repository (replace with your repo URL)
git clone https://github.com/yourusername/your-repo.git
cd your-repo

# Verify files
ls -la
```

### 2. Install Dependencies

```bash
# Install all project dependencies
pnpm install

# This may take 2-5 minutes depending on connection speed
```

### 3. Configure Environment Variables

```bash
# Create production environment file
cp .env.example .env.local

# Edit with your values
nano .env.local
```

**Complete `.env.local` template:**

```bash
# ===========================
# Supabase Configuration
# ===========================
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...  # KEEP SECRET
SUPABASE_JWT_SECRET=your_jwt_secret_from_supabase

# Database connection (for migrations)
POSTGRES_URL_NON_POOLING=postgresql://postgres.[ref]:[password]@[host]:5432/postgres
POSTGRES_URL=postgresql://postgres.[ref]:[password]@[host]:6543/postgres?pgbouncer=true

# ===========================
# Stripe Configuration
# ===========================
# Test mode keys (for development/testing)
STRIPE_TEST_SECRET_KEY=sk_test_51...
STRIPE_TEST_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Live mode keys (for production)
STRIPE_LIVE_SECRET_KEY=sk_live_51...
STRIPE_LIVE_PUBLISHABLE_KEY=pk_live_...

# Set to 'true' for production, 'false' for test mode
STRIPE_LIVE_MODE=false

# Stripe webhook secret (configure after webhook setup)
STRIPE_WEBHOOK_SECRET=whsec_...

# ===========================
# AI Provider Keys
# ===========================
# Novita AI (for image generation and chat)
NOVITA_API_KEY=your_novita_api_key
NEXT_PUBLIC_NOVITA_API_KEY=your_novita_api_key

# Optional: Bland AI (for voice features)
BLAND_AI_API_KEY=your_bland_api_key

# Optional: Google Translate
GOOGLE_TRANSLATE_API_KEY=your_google_api_key

# ===========================
# Application Settings
# ===========================
# Your domain (used for auth redirects)
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXTAUTH_URL=https://yourdomain.com

# Admin email for seeding (optional)
INIT_ADMIN_EMAIL=admin@yourdomain.com

# ===========================
# Node Environment
# ===========================
NODE_ENV=production
```

**Security check:**
```bash
# Verify .env.local is in .gitignore
cat .gitignore | grep ".env"

# Set proper permissions
chmod 600 .env.local
```

### 4. Build Application

```bash
# Build Next.js for production
pnpm run build

# This creates optimized production build in .next/
# Build time: 2-5 minutes
```

**Expected output:**
```
✓ Compiled successfully
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization
```

---

## 🗄️ Database Migration & Seeding

### 1. Run Database Migrations

```bash
# Apply all SQL migrations to your Supabase database
pnpm run migrate:sql
```

**What this does:**
- Connects to your Supabase PostgreSQL database
- Executes all `.sql` files in `supabase/migrations/` in order
- Creates tables: `character_profiles`, `saved_prompts`, `admin_users`, `stripe_keys`, `delete_feedback`, `plan_features`, `pricing`, `attribute_images`, and more

**Expected output:**
```
[migrate] Connecting to db.xxxxx.supabase.co:5432 ...
Connected to database. Applying 6 migrations...
→ 20250906_create_delete_feedback.sql ... OK
→ 20250906_create_plan_features.sql ... OK
→ create-storage-tables.sql ... OK
→ create_attribute_images_tables.sql ... OK
→ create_pricing_table.sql ... OK
→ create_stripe_keys_table.sql ... OK
All migrations applied successfully.
```

**Troubleshooting migrations:**
```bash
# If migration fails, check connection string
echo $POSTGRES_URL_NON_POOLING

# Test direct connection
psql "$POSTGRES_URL_NON_POOLING" -c "SELECT version();"

# View migration files
ls -la supabase/migrations/

# Manually run a specific migration (if needed)
psql "$POSTGRES_URL_NON_POOLING" -f supabase/migrations/filename.sql
```

### 2. Create Storage Buckets

```bash
# Create required Supabase storage buckets
pnpm run create-resources
```

**What this does:**
- Creates `assets` bucket (public) - for character images, generated content
- Creates `attributes` bucket (private) - for character attribute images
- Creates `banners` bucket (public) - for promotional banners

**Expected output:**
```
Created bucket: assets
Created bucket: attributes
Created bucket: banners

Done. Please review bucket policies in the Supabase dashboard.
```

### 3. Configure Storage Bucket Policies

**Important:** Set appropriate access policies in Supabase dashboard.

Navigate to **Storage** → Select bucket → **Policies**:

**For `assets` bucket (public read):**
```sql
-- Policy: Public read access
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'assets');

-- Policy: Authenticated users can upload
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'assets');
```

**For `attributes` bucket (private):**
```sql
-- Policy: Only service role can access
CREATE POLICY "Service role only"
ON storage.objects FOR ALL
TO service_role
USING (bucket_id = 'attributes');
```

**For `banners` bucket (public read, admin write):**
```sql
-- Policy: Public read
CREATE POLICY "Public read"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'banners');

-- Policy: Admins can upload
CREATE POLICY "Admins can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'banners' AND
  auth.uid() IN (SELECT user_id FROM admin_users)
);
```

### 4. Seed Initial Data

```bash
# Insert Stripe keys and create admin user
pnpm run seed
```

**What this does:**
- Inserts/updates a row in `stripe_keys` table with your Stripe credentials
- If `INIT_ADMIN_EMAIL` is set in `.env.local`, creates an admin user entry

**Expected output:**
```
Inserted stripe_keys row
Creating admin for admin@yourdomain.com
User admin@yourdomain.com added to admin_users
```

**Important:** The user must already exist in Supabase Auth. If not:
1. Visit your deployed site
2. Sign up with the email specified in `INIT_ADMIN_EMAIL`
3. Run `pnpm run seed` again

**Alternative: Manual admin creation:**
```bash
# Run interactive admin creation script
pnpm dlx ts-node --project tsconfig.json scripts/create-admin-user.ts
# Follow prompts to enter admin email
```

---

## 📦 Storage Buckets & Resources

### Storage Architecture

```
Supabase Storage
├── assets (public)
│   ├── characters/           # Character profile images
│   ├── generated/            # AI-generated images
│   └── user-uploads/         # User-uploaded content
├── attributes (private)
│   └── attribute-images/     # Character attribute reference images
└── banners (public)
    └── promotional/          # Marketing banners
```

### Verify Bucket Creation

```bash
# List all buckets via Supabase API
curl -X GET "https://xxxxx.supabase.co/storage/v1/bucket" \
  -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY"
```

### Storage Quota Management

**Monitor storage usage:**
- Free tier: 1GB storage
- Pro tier: 100GB included
- Check usage in Supabase dashboard: **Settings** → **Usage**

---

## 🔒 Reverse Proxy & SSL/TLS

Choose either **nginx** (traditional) or **Caddy** (automatic SSL).

### Option A: nginx + Certbot (Recommended for most)

#### 1. Install nginx

```bash
sudo apt install -y nginx
```

#### 2. Create nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/yourapp
```

**Paste this configuration:**

```nginx
# HTTP - Redirect to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;

    # Certbot challenge location
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    # Redirect all other HTTP traffic to HTTPS
    location / {
        return 301 https://$host$request_uri;
    }
}

# HTTPS - Main application
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL certificates (will be configured by Certbot)
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_session_timeout 10m;
    ssl_session_cache shared:SSL:10m;
    ssl_stapling on;
    ssl_stapling_verify on;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options SAMEORIGIN always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Client max body size (for image uploads)
    client_max_body_size 50M;

    # Proxy to Next.js application
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Logging
    access_log /var/log/nginx/yourapp_access.log;
    error_log /var/log/nginx/yourapp_error.log;
}
```

#### 3. Enable Site & Test Configuration

```bash
# Create symlink to enable site
sudo ln -s /etc/nginx/sites-available/yourapp /etc/nginx/sites-enabled/

# Remove default site (optional)
sudo rm /etc/nginx/sites-enabled/default

# Test nginx configuration
sudo nginx -t

# If OK, reload nginx
sudo systemctl reload nginx
```

#### 4. Install Certbot & Obtain SSL Certificate

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain certificate (interactive)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow prompts:
# - Enter email for renewal notifications
# - Agree to terms of service
# - Choose: Redirect HTTP to HTTPS (option 2)
```

**Certbot will automatically:**
- ✅ Obtain SSL certificate from Let's Encrypt
- ✅ Update nginx configuration with certificate paths
- ✅ Set up auto-renewal via cron/systemd timer

**Verify auto-renewal:**
```bash
sudo certbot renew --dry-run
```

#### 5. Reload nginx

```bash
sudo systemctl reload nginx
```

---

### Option B: Caddy (Automatic SSL)

#### 1. Install Caddy

```bash
# Install Caddy (official method)
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install -y caddy
```

#### 2. Create Caddyfile

```bash
sudo nano /etc/caddy/Caddyfile
```

**Paste this configuration:**

```caddy
yourdomain.com, www.yourdomain.com {
    # Automatic HTTPS
    encode gzip

    # Security headers
    header {
        Strict-Transport-Security "max-age=31536000; includeSubDomains"
        X-Frame-Options "SAMEORIGIN"
        X-Content-Type-Options "nosniff"
        X-XSS-Protection "1; mode=block"
    }

    # Reverse proxy to Next.js
    reverse_proxy localhost:3000 {
        header_up X-Real-IP {remote_host}
        header_up X-Forwarded-For {remote_host}
        header_up X-Forwarded-Proto {scheme}
    }

    # Logging
    log {
        output file /var/log/caddy/yourapp.log
        format json
    }
}
```

#### 3. Start & Enable Caddy

```bash
# Start Caddy
sudo systemctl start caddy

# Enable on boot
sudo systemctl enable caddy

# Check status
sudo systemctl status caddy
```

**Caddy automatically:**
- ✅ Obtains SSL certificates from Let's Encrypt
- ✅ Handles certificate renewal
- ✅ Redirects HTTP to HTTPS

---

## ⚙️ Process Management (systemd)

Keep your Next.js app running 24/7 with automatic restart on failure.

### 1. Create systemd Service File

```bash
sudo nano /etc/systemd/system/yourapp.service
```

**Paste this configuration:**

```ini
[Unit]
Description=Next.js AI Companion Platform
After=network.target

[Service]
Type=simple
User=deploy
WorkingDirectory=/home/deploy/apps/your-repo
EnvironmentFile=/home/deploy/apps/your-repo/.env.local
ExecStart=/usr/bin/pnpm start
Restart=on-failure
RestartSec=10
StandardOutput=journal
StandardError=journal
SyslogIdentifier=yourapp

# Security hardening
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=read-only
ReadWritePaths=/home/deploy/apps/your-repo/.next

[Install]
WantedBy=multi-user.target
```

### 2. Enable & Start Service

```bash
# Reload systemd to recognize new service
sudo systemctl daemon-reload

# Enable service to start on boot
sudo systemctl enable yourapp

# Start the service
sudo systemctl start yourapp

# Check status
sudo systemctl status yourapp
```

**Expected output:**
```
● yourapp.service - Next.js AI Companion Platform
     Loaded: loaded (/etc/systemd/system/yourapp.service; enabled)
     Active: active (running) since ...
```

### 3. Manage Service

```bash
# View logs (real-time)
sudo journalctl -u yourapp -f

# View last 100 lines
sudo journalctl -u yourapp -n 100

# Restart service
sudo systemctl restart yourapp

# Stop service
sudo systemctl stop yourapp

# Check if service is enabled
sudo systemctl is-enabled yourapp
```

### 4. Test Application

```bash
# Visit your domain
curl https://yourdomain.com

# Or open in browser
# Should show your app homepage
```

---

## 💳 Stripe Integration

### 1. Create Stripe Account

1. Sign up at [stripe.com](https://stripe.com)
2. Complete account verification
3. Navigate to **Developers** → **API Keys**

### 2. Collect Stripe Keys

**Test Mode Keys** (for development):
```
Publishable key: pk_test_51...
Secret key: sk_test_51...
```

**Live Mode Keys** (for production):
```
Publishable key: pk_live_51...
Secret key: sk_live_51...
```

Add these to your `.env.local` (already done in earlier step).

### 3. Configure Stripe Webhook

**Why:** Stripe webhooks notify your app about payment events (successful payments, subscription changes, etc.).

#### Create Webhook Endpoint

1. Go to **Stripe Dashboard** → **Developers** → **Webhooks**
2. Click **"Add endpoint"**
3. Enter URL: `https://yourdomain.com/api/webhooks/stripe`
4. Select events to listen to:
   - ✅ `checkout.session.completed`
   - ✅ `payment_intent.succeeded`
   - ✅ `payment_intent.payment_failed`
   - ✅ `customer.subscription.created`
   - ✅ `customer.subscription.updated`
   - ✅ `customer.subscription.deleted`
   - ✅ `invoice.payment_succeeded`
   - ✅ `invoice.payment_failed`

5. Click **"Add endpoint"**
6. Copy the **Signing secret** (starts with `whsec_...`)

#### Add Webhook Secret to Environment

```bash
nano .env.local

# Add this line:
STRIPE_WEBHOOK_SECRET=whsec_...

# Restart app
sudo systemctl restart yourapp
```

### 4. Test Stripe Integration

**Test mode:**
```bash
# Use Stripe test card numbers
# Card number: 4242 4242 4242 4242
# Expiry: Any future date
# CVC: Any 3 digits
# ZIP: Any 5 digits
```

**Test webhook delivery:**
1. Make a test payment on your site
2. Check Stripe Dashboard → **Developers** → **Webhooks** → **Events**
3. Verify webhook was delivered successfully

### 5. Switch to Live Mode (Production)

```bash
nano .env.local

# Change from test to live keys
STRIPE_LIVE_MODE=true

# Restart
sudo systemctl restart yourapp
```

**Important:** Test thoroughly in test mode before switching to live mode.

---

## 👨‍💼 Admin User Management

### Method 1: Via Seed Script (Automatic)

```bash
# Set admin email in .env.local
nano .env.local

# Add:
INIT_ADMIN_EMAIL=admin@yourdomain.com

# Run seed script
pnpm run seed
```

**Prerequisites:**
- User must already exist (sign up via website first)
- Email must match exactly

### Method 2: Interactive Script

```bash
# Run interactive admin creator
pnpm dlx ts-node --project tsconfig.json scripts/create-admin-user.ts

# Enter admin email when prompted
```

### Method 3: Manual SQL

```bash
# Connect to Supabase DB
psql "$POSTGRES_URL_NON_POOLING"

# Get user ID
SELECT id, email FROM auth.users WHERE email = 'admin@yourdomain.com';

# Insert into admin_users table
INSERT INTO admin_users (user_id)
VALUES ('user-uuid-from-above')
ON CONFLICT (user_id) DO NOTHING;

# Verify
SELECT u.email, a.created_at
FROM admin_users a
JOIN auth.users u ON u.id = a.user_id;
```

### Verify Admin Access

1. Log in to your site with admin email
2. Navigate to `/admin` or `/admin/dashboard`
3. You should see admin panel with full access

### Remove Admin Access

```sql
-- Remove user from admin_users table
DELETE FROM admin_users WHERE user_id = 'user-uuid';
```

---

## 🎨 Novita AI Image Generation Setup

### Overview

This application uses **Novita AI** for:
- AI-powered character image generation
- Chat completions with AI characters (Llama 3.1 8B Instruct)
- Multiple image models (Flux, Stable Diffusion variants)

### 1. Create Novita AI Account

1. Visit [novita.ai](https://novita.ai)
2. Sign up for an account
3. Navigate to **Dashboard** → **API Keys**
4. Click **"Create API Key"**
5. Copy your API key (starts with `sk_...`)

**Pricing:**
- Free tier: Limited credits for testing
- Pay-as-you-go: ~$0.02-0.10 per image depending on model
- Check current pricing at [novita.ai/pricing](https://novita.ai/pricing)

### 2. Add Novita API Key to Environment

```bash
# Edit .env.local on your VPS
nano .env.local

# Add these lines (replace with your actual key):
NOVITA_API_KEY=sk_your_actual_novita_api_key_here
NEXT_PUBLIC_NOVITA_API_KEY=sk_your_actual_novita_api_key_here

# Save and restart app
sudo systemctl restart yourapp
```

**Important:** 
- The key is used both server-side (`NOVITA_API_KEY`) and client-side (`NEXT_PUBLIC_NOVITA_API_KEY`)
- Keep your key secure; monitor usage in Novita dashboard
- Set spending limits in Novita dashboard to avoid unexpected charges

### 3. Test Image Generation

#### Quick API Test (curl)

```bash
# Test Novita API directly from VPS
curl -X POST "https://api.novita.ai/v3/async/txt2img" \
  -H "Authorization: Bearer $NOVITA_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model_name": "flux-schnell_v1.1",
    "prompt": "beautiful woman portrait, professional photography",
    "width": 512,
    "height": 768,
    "steps": 4,
    "seed": -1,
    "guidance_scale": 3.5
  }'

# You should receive a task_id in response
# Check task status:
curl -X GET "https://api.novita.ai/v3/async/task-result?task_id=YOUR_TASK_ID" \
  -H "Authorization: Bearer $NOVITA_API_KEY"
```

#### Test Script (Node.js)

Create a test script to verify image generation:

```bash
nano ~/test-novita.js
```

```javascript
#!/usr/bin/env node
const https = require('https');
require('dotenv').config({ path: '.env.local' });

const NOVITA_API_KEY = process.env.NOVITA_API_KEY;

if (!NOVITA_API_KEY) {
  console.error('Error: NOVITA_API_KEY not found in environment');
  process.exit(1);
}

console.log('Testing Novita AI Image Generation...\n');

// Step 1: Submit image generation task
function submitTask() {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      model_name: 'flux-schnell_v1.1',
      prompt: 'beautiful woman portrait, professional photography, high detail',
      negative_prompt: 'blurry, low quality, distorted',
      width: 512,
      height: 768,
      steps: 4,
      seed: -1,
      guidance_scale: 3.5,
      sampler_name: 'Euler',
      image_num: 1
    });

    const options = {
      hostname: 'api.novita.ai',
      path: '/v3/async/txt2img',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOVITA_API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          if (response.task_id) {
            console.log('✅ Task submitted successfully');
            console.log(`Task ID: ${response.task_id}\n`);
            resolve(response.task_id);
          } else {
            reject(new Error(`Failed to submit task: ${body}`));
          }
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}`));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// Step 2: Check task status
function checkTaskStatus(taskId, attempt = 1) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.novita.ai',
      path: `/v3/async/task-result?task_id=${taskId}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${NOVITA_API_KEY}`
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          const status = response.task?.status;
          
          console.log(`⏳ Attempt ${attempt}: Status = ${status}`);

          if (status === 'TASK_STATUS_SUCCEED') {
            console.log('\n✅ Image generation completed!');
            console.log(`Image URL: ${response.images[0]?.image_url || 'N/A'}`);
            console.log(`\nYou can download the image from the URL above.`);
            resolve(response);
          } else if (status === 'TASK_STATUS_FAILED') {
            reject(new Error('Task failed'));
          } else if (attempt > 30) {
            reject(new Error('Timeout: Task took too long'));
          } else {
            // Wait 2 seconds and try again
            setTimeout(() => {
              checkTaskStatus(taskId, attempt + 1)
                .then(resolve)
                .catch(reject);
            }, 2000);
          }
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

// Run test
async function main() {
  try {
    const taskId = await submitTask();
    await checkTaskStatus(taskId);
    console.log('\n✅ Novita AI test completed successfully!');
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  }
}

main();
```

**Run the test:**

```bash
# Make executable
chmod +x ~/test-novita.js

# Run test
cd /home/deploy/apps/your-repo
node ~/test-novita.js
```

**Expected output:**
```
Testing Novita AI Image Generation...

✅ Task submitted successfully
Task ID: abc123-def456-ghi789

⏳ Attempt 1: Status = TASK_STATUS_PROCESSING
⏳ Attempt 2: Status = TASK_STATUS_PROCESSING
⏳ Attempt 3: Status = TASK_STATUS_SUCCEED

✅ Image generation completed!
Image URL: https://image-cdn.novita.ai/...

You can download the image from the URL above.

✅ Novita AI test completed successfully!
```

### 4. Configure Image Generation in Application

The application includes several image generation endpoints and features:

#### Available API Routes

1. **`/api/generate-image`** - Generate character images
2. **`/api/generate-style-images`** - Generate style-specific images
3. **`/api/character-features`** - Generate character attribute images

#### Supported Models

The application supports multiple Novita AI models:

| Model | Use Case | Speed | Quality | Cost |
|-------|----------|-------|---------|------|
| `flux-schnell_v1.1` | Fast generation | ⚡ Fast | ⭐⭐⭐ | $ |
| `flux-dev_v1.1` | High quality | 🐢 Slow | ⭐⭐⭐⭐⭐ | $$$ |
| `sd_xl_base_1.0` | Stable Diffusion XL | 🚀 Medium | ⭐⭐⭐⭐ | $$ |
| `realisticVisionV60_v5.1` | Realistic photos | 🚀 Medium | ⭐⭐⭐⭐ | $$ |

#### Token System Configuration

Images cost tokens (credits). Configure token costs in admin dashboard:

1. Log in as admin
2. Navigate to `/admin/dashboard/tokens` or similar
3. Configure token packages and pricing
4. Set image generation costs per model

**Default token costs (example):**
- Flux Schnell: 10 tokens per image
- Flux Dev: 50 tokens per image
- SD XL: 20 tokens per image

### 5. Pre-generate Character Attribute Images

The application includes scripts to pre-generate character attribute images (body types, hair styles, etc.) for use in the character creator.

#### List Available Scripts

```bash
ls -la scripts/generate*.js
```

**Key scripts:**
- `generate-all-attribute-images.js` - Generate all attribute images
- `generate-missing-images.js` - Generate only missing images
- `generate-style-images.sh` - Generate style reference images

#### Run Pre-generation Script

```bash
# Navigate to project directory
cd /home/deploy/apps/your-repo

# Ensure environment variables are loaded
source .env.local

# Run pre-generation (this may take 30-60 minutes and consume API credits)
node scripts/generate-all-attribute-images.js

# Or generate only missing images
node scripts/generate-missing-images.js
```

**What this does:**
- Generates images for all character attributes (body type, ethnicity, hair, etc.)
- Uploads images to Supabase storage (`attributes` bucket)
- Stores metadata in `attribute_images` table
- Creates reference images for both realistic and anime styles

**Cost estimation:**
- ~100-200 images needed for full attribute library
- At $0.02-0.05 per image = $2-10 total cost
- One-time generation, reusable for all users

#### Monitor Generation Progress

```bash
# Watch logs in real-time
tail -f ~/attribute-generation.log

# Or if running as background task
node scripts/generate-all-attribute-images.js > ~/generation.log 2>&1 &

# Monitor progress
tail -f ~/generation.log
```

### 6. Test Image Generation in Application

#### Test as Regular User

1. **Sign up/Login** to your deployed site
2. **Navigate to character creator** (`/create-character` or similar)
3. **Try generating a character image:**
   - Fill in character details
   - Select attributes (body type, hair, etc.)
   - Click "Generate Image"
4. **Verify:**
   - Image generates successfully
   - Token balance decreases
   - Image saves to Supabase storage
   - Image displays in character profile

#### Test as Admin

1. **Login as admin**
2. **Navigate to admin dashboard** (`/admin/dashboard`)
3. **Test admin image generation:**
   - Character feature management
   - Bulk image generation
   - Token adjustments

### 7. Monitor Novita Usage & Costs

#### Check Novita Dashboard

1. Log in to [novita.ai](https://novita.ai/dashboard)
2. Navigate to **Usage** or **Billing**
3. Monitor:
   - API calls per day
   - Cost per day/month
   - Remaining credits
   - Failed requests

#### Set Spending Limits

```bash
# In Novita dashboard:
# Settings → Billing → Set spending limit
# Recommended: $10-50/month for small-medium site
```

#### Application-Level Monitoring

```bash
# Check application logs for Novita errors
sudo journalctl -u yourapp | grep -i novita

# Count image generations in last 24 hours
sudo journalctl -u yourapp --since "24 hours ago" | grep "Image generated" | wc -l

# Check failed generations
sudo journalctl -u yourapp --since "24 hours ago" | grep -i "novita.*error"
```

### 8. Troubleshooting Image Generation

#### Issue: "Novita API Key Invalid"

**Solutions:**
```bash
# 1. Verify key in environment
echo $NOVITA_API_KEY
cat .env.local | grep NOVITA

# 2. Test key directly
curl -X GET "https://api.novita.ai/v3/user/info" \
  -H "Authorization: Bearer $NOVITA_API_KEY"

# 3. Restart application
sudo systemctl restart yourapp
```

#### Issue: "Image Generation Timeout"

**Causes:**
- Novita API slow response (high load)
- Complex prompts taking longer
- Network issues

**Solutions:**
```bash
# 1. Check Novita status
curl https://status.novita.ai

# 2. Use faster model (Flux Schnell instead of Dev)
# Edit character generation settings in app

# 3. Increase timeout in application code
# In API routes, adjust fetch timeout to 120s+
```

#### Issue: "Out of Credits"

**Solutions:**
```bash
# 1. Check Novita balance
curl -X GET "https://api.novita.ai/v3/user/info" \
  -H "Authorization: Bearer $NOVITA_API_KEY"

# 2. Add credits in Novita dashboard
# Dashboard → Billing → Add Credits

# 3. Temporarily disable image generation
# Or show users error message with option to purchase
```

#### Issue: "Images Not Saving to Storage"

**Solutions:**
```sql
-- 1. Check storage bucket policies
-- In Supabase dashboard: Storage → attributes → Policies

-- 2. Verify service role key has access
-- Test upload with curl

-- 3. Check application logs
sudo journalctl -u yourapp | grep -i "storage\|supabase"

-- 4. Verify bucket exists
-- In Supabase: Storage → should see 'attributes' bucket
```

#### Issue: "Poor Image Quality"

**Solutions:**
```javascript
// 1. Improve prompts - add quality terms
const improvedPrompt = `
  ${basePrompt},
  professional photography,
  high detail,
  sharp focus,
  8k uhd,
  masterpiece
`;

// 2. Use better model (Flux Dev instead of Schnell)
model_name: 'flux-dev_v1.1'

// 3. Increase steps (at cost of speed)
steps: 20  // instead of 4

// 4. Adjust guidance_scale
guidance_scale: 7.5  // higher = more prompt adherence
```

### 9. Optimize Image Generation Costs

#### Cost Reduction Strategies

1. **Use Faster/Cheaper Models**
   - Flux Schnell for previews
   - Flux Dev only for final/premium generations

2. **Cache Generated Images**
   - Store attribute images permanently
   - Reuse similar generations

3. **Implement Rate Limiting**
   ```javascript
   // Limit generations per user per hour
   const MAX_GENERATIONS_PER_HOUR = 10;
   ```

4. **Batch Generation**
   - Pre-generate common variations
   - Generate during off-peak hours

5. **Set Spending Alerts**
   - Configure alerts in Novita dashboard
   - Monitor daily/weekly spend

### 10. Advanced: Custom Model Configuration

Edit image generation settings in your application:

```bash
nano app/api/generate-image/route.ts
```

**Example configuration:**

```typescript
// Configure default model and parameters
const DEFAULT_CONFIG = {
  model_name: 'flux-schnell_v1.1',
  width: 512,
  height: 768,
  steps: 4,
  guidance_scale: 3.5,
  sampler_name: 'Euler',
  seed: -1,
  negative_prompt: 'blurry, low quality, distorted, deformed, ugly, bad anatomy'
};

// Premium model for paid users
const PREMIUM_CONFIG = {
  model_name: 'flux-dev_v1.1',
  width: 1024,
  height: 1536,
  steps: 20,
  guidance_scale: 7.5
};
```

### 11. Testing Checklist

Before going live with image generation:

- [ ] Novita API key added to environment
- [ ] Test script runs successfully
- [ ] Image generation works in UI
- [ ] Images save to Supabase storage
- [ ] Token system deducts correctly
- [ ] Attribute images pre-generated
- [ ] Error handling displays user-friendly messages
- [ ] Spending limit set in Novita dashboard
- [ ] Monitoring/logging configured
- [ ] Backup plan if Novita is down

---

## 🔐 Security Hardening

### 1. Firewall Configuration

```bash
# Configure UFW (Uncomplicated Firewall)
sudo ufw status

# Ensure only necessary ports are open
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'  # or just 80,443
sudo ufw deny 3000/tcp  # Block direct access to Next.js

# Enable firewall
sudo ufw --force enable
```

### 2. Secure SSH

```bash
sudo nano /etc/ssh/sshd_config

# Recommended changes:
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
Port 22  # Or change to non-standard port

# Restart SSH
sudo systemctl restart sshd
```

### 3. Fail2Ban (Prevent Brute Force)

```bash
# Install fail2ban
sudo apt install -y fail2ban

# Create local config
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
sudo nano /etc/fail2ban/jail.local

# Configure:
[sshd]
enabled = true
maxretry = 3
bantime = 3600

# Start fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

### 4. Environment Variable Security

```bash
# Ensure .env.local has correct permissions
chmod 600 /home/deploy/apps/your-repo/.env.local

# Verify it's in .gitignore
grep ".env" .gitignore

# Never commit sensitive keys to git
```

### 5. Supabase RLS (Row Level Security)

**Enable RLS on all tables:**

```sql
-- Example: Enable RLS on character_profiles
ALTER TABLE character_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only read their own characters
CREATE POLICY "Users can view own characters"
ON character_profiles FOR SELECT
TO authenticated
USING (auth.uid()::text = user_id);

-- Policy: Users can insert their own characters
CREATE POLICY "Users can create characters"
ON character_profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid()::text = user_id);

-- Policy: Admins can see all
CREATE POLICY "Admins can view all characters"
ON character_profiles FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE user_id = auth.uid()
  )
);
```

**Apply similar policies to all sensitive tables.**

### 6. Rate Limiting (Optional but Recommended)

Consider adding rate limiting via:
- **nginx:** `limit_req` module
- **Cloudflare:** Built-in rate limiting rules
- **Application-level:** Express middleware or Next.js middleware

---

## 📊 Monitoring & Logging

### 1. Application Logs

```bash
# View real-time logs
sudo journalctl -u yourapp -f

# View logs from last hour
sudo journalctl -u yourapp --since "1 hour ago"

# View errors only
sudo journalctl -u yourapp -p err

# Export logs to file
sudo journalctl -u yourapp > /tmp/app-logs.txt
```

### 2. nginx Logs

```bash
# Access logs
sudo tail -f /var/log/nginx/yourapp_access.log

# Error logs
sudo tail -f /var/log/nginx/yourapp_error.log

# Analyze with goaccess (optional)
sudo apt install goaccess
sudo goaccess /var/log/nginx/yourapp_access.log -o /tmp/report.html
```

### 3. System Monitoring

```bash
# Install htop for interactive monitoring
sudo apt install htop
htop

# Check disk usage
df -h

# Check memory usage
free -h

# Check CPU usage
top

# Check network connections
sudo netstat -tulpn | grep LISTEN
```

### 4. Uptime Monitoring (Recommended)

Use external services to monitor site uptime:
- [UptimeRobot](https://uptimerobot.com) (Free)
- [Pingdom](https://pingdom.com)
- [Better Uptime](https://betteruptime.com)

### 5. Error Tracking (Optional)

Consider integrating error tracking:
- **Sentry:** Application error monitoring
- **LogRocket:** Session replay and error tracking

```bash
# Install Sentry (example)
pnpm add @sentry/nextjs

# Configure in next.config.mjs
# Follow Sentry's Next.js setup guide
```

---

## 💾 Backup & Disaster Recovery

### 1. Database Backups

**Supabase automatic backups:**
- Free tier: Daily backups, 7-day retention
- Pro tier: Daily backups, 30-day retention, point-in-time recovery

**Manual backup:**
```bash
# Backup entire database
pg_dump "$POSTGRES_URL_NON_POOLING" > backup_$(date +%Y%m%d).sql

# Backup specific table
pg_dump "$POSTGRES_URL_NON_POOLING" -t character_profiles > characters_backup.sql

# Restore from backup
psql "$POSTGRES_URL_NON_POOLING" < backup_20251023.sql
```

### 2. Application Code Backup

```bash
# Your code should be in Git - ensure it's pushed
cd /home/deploy/apps/your-repo
git status
git push origin main

# Backup .env.local separately (secure location)
cp .env.local ~/backups/.env.local.$(date +%Y%m%d)
chmod 600 ~/backups/.env.local.*
```

### 3. Storage Bucket Backup

**Option 1: Supabase Storage backup (manual):**
- Go to Supabase Dashboard → **Storage**
- Download buckets manually (small files)

**Option 2: S3-compatible tools:**
```bash
# Install s3cmd or rclone for automated backups
# Configure with Supabase S3-compatible endpoint
```

### 4. Disaster Recovery Plan

**Document your recovery procedure:**

1. **VPS failure:** Deploy to new VPS using this guide
2. **Database corruption:** Restore from Supabase backup
3. **Code issues:** Revert to previous Git commit
4. **SSL expiry:** Certbot auto-renews (but monitor)

**Test recovery periodically:**
```bash
# Test database restore
psql "$POSTGRES_URL_NON_POOLING" < test_backup.sql

# Test application deployment on staging server
```

---

## 🔧 Troubleshooting

### Common Issues & Solutions

#### Issue: Migration Fails with Connection Error

**Symptoms:**
```
Error: Connection timeout
Missing Postgres connection string
```

**Solutions:**
```bash
# 1. Verify connection string in .env.local
echo $POSTGRES_URL_NON_POOLING

# 2. Test direct connection
psql "$POSTGRES_URL_NON_POOLING" -c "SELECT 1;"

# 3. Check firewall/network access from VPS to Supabase
curl -I https://xxxxx.supabase.co

# 4. Verify password doesn't contain special chars needing URL encoding
# If password has #, %, @, etc., URL-encode it
```

#### Issue: Application Won't Start

**Symptoms:**
```bash
sudo systemctl status yourapp
# Shows: failed (Result: exit-code)
```

**Solutions:**
```bash
# 1. Check logs for errors
sudo journalctl -u yourapp -n 50

# 2. Verify build completed successfully
cd /home/deploy/apps/your-repo
pnpm run build

# 3. Check .env.local is present and readable
ls -la .env.local
cat .env.local

# 4. Test manual start
pnpm start
# Check for errors

# 5. Verify Node.js version
node --version  # Should be 18.x or 20.x
```

#### Issue: SSL Certificate Error

**Symptoms:**
- "Your connection is not private"
- "NET::ERR_CERT_AUTHORITY_INVALID"

**Solutions:**
```bash
# 1. Verify certificate exists
sudo ls -la /etc/letsencrypt/live/yourdomain.com/

# 2. Check nginx configuration
sudo nginx -t

# 3. Re-run Certbot
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# 4. Check certificate expiry
sudo certbot certificates
```

#### Issue: Storage Bucket Upload Fails

**Symptoms:**
- "Failed to upload to Supabase"
- 403 Forbidden errors

**Solutions:**
```bash
# 1. Verify bucket exists
curl "https://xxxxx.supabase.co/storage/v1/bucket" \
  -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY"

# 2. Check bucket policies in Supabase dashboard
# Storage → Select bucket → Policies

# 3. Verify service role key is correct
# Should start with eyJhbGc...

# 4. Test upload with curl
curl -X POST "https://xxxxx.supabase.co/storage/v1/object/assets/test.txt" \
  -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
  -F file=@test.txt
```

#### Issue: Stripe Webhook Not Receiving Events

**Symptoms:**
- Payments successful but not recorded in database
- Webhook status shows failed in Stripe dashboard

**Solutions:**
```bash
# 1. Verify webhook endpoint is accessible
curl https://yourdomain.com/api/webhooks/stripe

# 2. Check application logs
sudo journalctl -u yourapp | grep stripe

# 3. Verify STRIPE_WEBHOOK_SECRET in .env.local
cat .env.local | grep STRIPE_WEBHOOK_SECRET

# 4. Test webhook delivery in Stripe dashboard
# Developers → Webhooks → Select endpoint → Send test webhook

# 5. Check nginx isn't blocking POST requests
sudo tail -f /var/log/nginx/yourapp_error.log
```

#### Issue: Admin Access Not Working

**Symptoms:**
- User logged in but can't access /admin
- Admin dashboard shows "Unauthorized"

**Solutions:**
```sql
-- 1. Verify user is in admin_users table
SELECT u.email, a.created_at
FROM admin_users a
JOIN auth.users u ON u.id = a.user_id
WHERE u.email = 'admin@yourdomain.com';

-- 2. If not present, add manually
INSERT INTO admin_users (user_id)
SELECT id FROM auth.users WHERE email = 'admin@yourdomain.com'
ON CONFLICT DO NOTHING;

-- 3. Check RLS policies on admin_users table
SELECT * FROM pg_policies WHERE tablename = 'admin_users';
```

#### Issue: High Memory Usage / App Crashes

**Symptoms:**
- `systemctl status yourapp` shows "killed"
- Out of memory errors in logs

**Solutions:**
```bash
# 1. Check memory usage
free -h

# 2. Add swap if needed (for 2GB VPS)
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# 3. Optimize Next.js build
# Edit next.config.mjs
export default {
  experimental: {
    optimizePackageImports: ['@radix-ui/*'],
  },
}

# 4. Consider upgrading VPS plan
```

---

## 🚀 CI/CD & Automation

### GitHub Actions Deployment

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to VPS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Deploy to VPS
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.VPS_HOST }}
          username: deploy
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /home/deploy/apps/your-repo
            git pull origin main
            pnpm install
            pnpm run build
            pnpm run migrate:sql
            sudo systemctl restart yourapp
```

**Setup secrets in GitHub:**
- Go to **Repository Settings** → **Secrets and variables** → **Actions**
- Add secrets:
  - `VPS_HOST`: Your VPS IP or domain
  - `SSH_PRIVATE_KEY`: Your SSH private key

### Automated Backups

**Create backup script:**

```bash
nano ~/backup.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR=~/backups

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup database
pg_dump "$POSTGRES_URL_NON_POOLING" > $BACKUP_DIR/db_$DATE.sql

# Backup .env.local
cp /home/deploy/apps/your-repo/.env.local $BACKUP_DIR/env_$DATE.local

# Compress
tar -czf $BACKUP_DIR/backup_$DATE.tar.gz $BACKUP_DIR/db_$DATE.sql $BACKUP_DIR/env_$DATE.local

# Remove old backups (keep last 7 days)
find $BACKUP_DIR -name "backup_*.tar.gz" -mtime +7 -delete

# Clean up temp files
rm $BACKUP_DIR/db_$DATE.sql $BACKUP_DIR/env_$DATE.local

echo "Backup completed: $BACKUP_DIR/backup_$DATE.tar.gz"
```

**Schedule with cron:**

```bash
chmod +x ~/backup.sh
crontab -e

# Add line (runs daily at 2 AM):
0 2 * * * /home/deploy/backup.sh >> /home/deploy/backup.log 2>&1
```

---

## 📝 Final Checklist

Before going live, verify:

- [ ] Domain DNS points to VPS IP
- [ ] SSL certificate valid and auto-renewal configured
- [ ] Application accessible at `https://yourdomain.com`
- [ ] All database migrations applied successfully
- [ ] Storage buckets created with correct policies
- [ ] Admin user created and can access `/admin`
- [ ] Stripe test payments working
- [ ] Stripe webhook receiving events
- [ ] systemd service enabled and running
- [ ] Firewall configured (only 22, 80, 443 open)
- [ ] Fail2ban installed and active
- [ ] Backup system configured
- [ ] Monitoring/uptime checks configured
- [ ] `.env.local` secured (chmod 600) and not in Git
- [ ] Service role keys and Stripe secrets secured
- [ ] Logs accessible and being monitored
- [ ] Test all critical user flows (signup, login, payment, admin)

---

## 🆘 Support & Resources

### Documentation Links

- **Next.js:** https://nextjs.org/docs
- **Supabase:** https://supabase.com/docs
- **Stripe:** https://stripe.com/docs
- **nginx:** https://nginx.org/en/docs/
- **Caddy:** https://caddyserver.com/docs/

### Community Support

- **Supabase Discord:** https://discord.supabase.com
- **Next.js Discord:** https://nextjs.org/discord
- **Stack Overflow:** Tag questions with `nextjs`, `supabase`, `stripe`

### Professional Support

Consider hiring a DevOps consultant for:
- Custom infrastructure setup
- High-availability configurations
- Advanced security audits
- Performance optimization

---

## 🎉 Congratulations!

You've successfully deployed your AI Companion Platform to production!

**What's next?**
- Test all features thoroughly in production
- Monitor performance and errors
- Scale resources as user base grows
- Keep dependencies updated (`pnpm update`)
- Regularly review and update security configurations

**Remember:** This is a living system. Continue to:
- Monitor logs daily
- Review backup integrity weekly
- Update SSL certificates (automatic, but verify)
- Patch security vulnerabilities promptly
- Scale resources based on traffic

---

**Document Version:** 1.0  
**Last Updated:** October 23, 2025  
**Maintained By:** Your Team
