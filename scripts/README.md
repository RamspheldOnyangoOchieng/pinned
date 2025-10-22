# Scripts Directory

This directory contains utility scripts for deployment, database management, and image generation.

## 📋 Table of Contents

- [Deployment Scripts](#deployment-scripts)
- [Database Scripts](#database-scripts)
- [Image Generation Scripts](#image-generation-scripts)
- [Testing Scripts](#testing-scripts)
- [Usage Examples](#usage-examples)

---

## 🚀 Deployment Scripts

### `migrate.js` & `apply-migrations.js`
Apply database migrations from `supabase/migrations/` directory.

**Usage:**
```bash
pnpm run migrate:sql
# or
node scripts/migrate.js
```

**What it does:**
- Connects to Supabase PostgreSQL using `POSTGRES_URL_NON_POOLING`
- Executes all `.sql` files in `supabase/migrations/` in alphabetical order
- Creates/updates database schema and tables

**Requirements:**
- `POSTGRES_URL_NON_POOLING` in `.env.local`

---

### `create_resources.js`
Create Supabase storage buckets required by the application.

**Usage:**
```bash
pnpm run create-resources
# or
node scripts/create_resources.js
```

**What it does:**
- Creates storage buckets: `assets`, `attributes`, `banners`
- Sets basic bucket configuration (public/private)

**Requirements:**
- `NEXT_PUBLIC_SUPABASE_URL` in `.env.local`
- `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`

---

### `seed.ts`
Seed initial data (Stripe keys, admin users).

**Usage:**
```bash
pnpm run seed
# or
pnpm dlx ts-node --project tsconfig.json scripts/seed.ts
```

**What it does:**
- Inserts/updates `stripe_keys` table with your Stripe credentials
- Creates admin user if `INIT_ADMIN_EMAIL` is set

**Requirements:**
- All Supabase environment variables
- `STRIPE_*` keys in `.env.local`
- Optional: `INIT_ADMIN_EMAIL` for auto-admin creation

---

### `create-admin-user.ts`
Interactive script to create admin users.

**Usage:**
```bash
pnpm dlx ts-node --project tsconfig.json scripts/create-admin-user.ts
```

**What it does:**
- Prompts for admin email address
- Looks up user in Supabase Auth
- Adds user to `admin_users` table

**Requirements:**
- User must already be signed up in the application
- Supabase service role key

---

## 🗄️ Database Scripts

### `run-migration.js`
Execute a specific migration file.

**Usage:**
```bash
node scripts/run-migration.js path/to/migration.sql
```

---

### SQL Migration Files (in root and migrations/)

- `admin_users_setup.sql` - Create admin_users table
- `20240521_create_transactions_table.sql` - Transaction tracking
- Various other migration files for features

**To execute manually:**
```bash
psql "$POSTGRES_URL_NON_POOLING" -f filename.sql
```

---

## 🎨 Image Generation Scripts

### `test-novita.js` ⭐ **NEW**
Test Novita AI integration and verify image generation is working.

**Usage:**
```bash
pnpm run test-novita
# or
node scripts/test-novita.js
```

**What it does:**
- Checks Novita API key is valid
- Submits a test image generation task
- Monitors task until completion
- Displays generated image URL
- Shows account balance

**Output example:**
```
🎨 Testing Novita AI Image Generation...

📊 Account Information:
   Balance: $10.50
   Email: user@example.com

📤 Submitting image generation task...
✅ Task submitted successfully
📋 Task ID: abc123-def456

⏳ Attempt 3: Status = TASK_STATUS_SUCCEED

✅ Image generation completed successfully!
🖼️  Image URL: https://image-cdn.novita.ai/...
⏱️  Generation time: ~6 seconds

✅ Novita AI test completed successfully!
```

**Requirements:**
- `NOVITA_API_KEY` or `NEXT_PUBLIC_NOVITA_API_KEY` in `.env.local`
- Active Novita AI account with credits

---

### `generate-all-attribute-images.js`
Pre-generate ALL character attribute images for the application.

**Usage:**
```bash
node scripts/generate-all-attribute-images.js
```

**What it does:**
- Generates images for all character attributes (body types, hair styles, ethnicities, etc.)
- Creates images in both realistic and anime styles
- Uploads images to Supabase storage (`attributes` bucket)
- Stores metadata in `attribute_images` table

**Time:** 30-60 minutes  
**Cost:** ~$2-10 in Novita API credits (one-time)  
**Images:** ~100-200 total

**Requirements:**
- `NOVITA_API_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- Sufficient Novita credits

---

### `generate-missing-images.js`
Generate only missing attribute images (incremental).

**Usage:**
```bash
node scripts/generate-missing-images.js
```

**What it does:**
- Checks database for existing attribute images
- Generates only images that don't exist yet
- Useful for adding new attributes without regenerating everything

---

### `generate-remaining-attributes.js`
Generate specific remaining attributes.

**Usage:**
```bash
node scripts/generate-remaining-attributes.js
```

---

### `generate-style-images.sh`
Bash script to generate style reference images.

**Usage:**
```bash
bash scripts/generate-style-images.sh
```

**What it does:**
- Generates realistic and anime style reference images
- Calls the Next.js API endpoint `/api/generate-style-images`

---

### `regenerate-*.js` Scripts
Various scripts to regenerate specific image categories:

- `regenerate-better-images.js` - Regenerate with improved prompts
- `regenerate-failed-female.js` - Retry failed female character generations
- `regenerate-female-only.js` - Regenerate only female variants
- `regenerate-hair-length.js` - Regenerate hair length variations
- `regenerate-single.js` - Regenerate a single specific image

---

### `prebuild-all-images.js`
Pre-build all application images before deployment.

**Usage:**
```bash
node scripts/prebuild-all-images.js
```

---

## 🧪 Testing Scripts

### `test-novita.js` ⭐
See [Image Generation Scripts](#image-generation-scripts) section above.

---

### `test-single-image.js`
Test generating a single image with custom parameters.

**Usage:**
```bash
node scripts/test-single-image.js
```

---

### `test-payment.js`
Test Stripe payment integration.

**Usage:**
```bash
node scripts/test-payment.js
```

---

### `check-images.js`
Check which attribute images exist in storage.

**Usage:**
```bash
node scripts/check-images.js
```

---

### `check-missing-images.js`
List missing attribute images.

**Usage:**
```bash
node scripts/check-missing-images.js
```

---

### `check-style-images.sh`
Check style reference images.

**Usage:**
```bash
bash scripts/check-style-images.sh
```

---

### `verify-female-images.js`
Verify female character images exist.

**Usage:**
```bash
node scripts/verify-female-images.js
```

---

## 📖 Usage Examples

### Complete Deployment Workflow

```bash
# 1. Install dependencies
pnpm install

# 2. Configure environment
cp .env.example .env.local
nano .env.local  # Fill in your values

# 3. Run migrations
pnpm run migrate:sql

# 4. Create storage resources
pnpm run create-resources

# 5. Seed initial data
pnpm run seed

# 6. Test Novita AI (optional but recommended)
pnpm run test-novita

# 7. Pre-generate attribute images (optional, costs API credits)
node scripts/generate-all-attribute-images.js

# 8. Build application
pnpm run build

# 9. Start application
pnpm start
```

---

### Testing Image Generation

```bash
# Quick test - verify Novita AI works
pnpm run test-novita

# Test single image generation
node scripts/test-single-image.js

# Check what images exist
node scripts/check-images.js

# Check what's missing
node scripts/check-missing-images.js
```

---

### Generating Attribute Images

```bash
# Generate all images (first time setup)
node scripts/generate-all-attribute-images.js > generation.log 2>&1 &

# Monitor progress
tail -f generation.log

# Generate only missing images (if you add new attributes)
node scripts/generate-missing-images.js

# Regenerate specific category with better quality
node scripts/regenerate-better-images.js
```

---

### Troubleshooting

```bash
# Test database connection
psql "$POSTGRES_URL_NON_POOLING" -c "SELECT version();"

# Test Supabase connection
node scripts/create_resources.js

# Test Novita API
pnpm run test-novita

# Check application logs
sudo journalctl -u yourapp -f
```

---

## 🔑 Required Environment Variables

Different scripts require different environment variables:

### Database Scripts
- `POSTGRES_URL_NON_POOLING` or `POSTGRES_URL`

### Supabase Scripts
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

### Image Generation Scripts
- `NOVITA_API_KEY` or `NEXT_PUBLIC_NOVITA_API_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

### Seed Script
- All Supabase variables
- `STRIPE_TEST_SECRET_KEY`
- `STRIPE_TEST_PUBLISHABLE_KEY`
- `STRIPE_LIVE_SECRET_KEY`
- `STRIPE_LIVE_PUBLISHABLE_KEY`
- Optional: `INIT_ADMIN_EMAIL`

---

## 📝 Notes

### Image Generation Costs

Be aware of Novita AI costs when running generation scripts:
- Single image: $0.02-0.10 depending on model
- Full attribute library: $2-10 one-time cost
- Monitor spending in [Novita Dashboard](https://novita.ai/dashboard)

### Running Long Scripts

For long-running scripts (like `generate-all-attribute-images.js`), use:

```bash
# Run in background with output logging
node scripts/generate-all-attribute-images.js > ~/generation.log 2>&1 &

# Check if still running
ps aux | grep generate-all

# Monitor progress
tail -f ~/generation.log
```

### Script Order

Some scripts depend on others being run first:
1. `migrate.js` - Must run before any DB operations
2. `create_resources.js` - Must run before image uploads
3. `seed.ts` - Should run after migrations
4. Image generation scripts - Should run after resources are created

---

## 🆘 Getting Help

If a script fails:

1. Check the error message carefully
2. Verify all required environment variables are set
3. Test connections individually (DB, Supabase, Novita)
4. Check script-specific requirements above
5. Review logs: `sudo journalctl -u yourapp -n 100`
6. Consult the main [DEPLOYMENT.md](../DEPLOYMENT.md)

---

**Last Updated:** October 23, 2025
