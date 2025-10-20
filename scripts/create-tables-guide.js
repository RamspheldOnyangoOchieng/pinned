#!/usr/bin/env node
require('dotenv').config();
const fetch = require('node-fetch');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function createTables() {
  console.log('🚀 Creating database tables via Supabase REST API...\n');

  // Create attribute_images table
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS attribute_images (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      category VARCHAR(50) NOT NULL,
      value VARCHAR(100) NOT NULL,
      style VARCHAR(20) NOT NULL,
      image_url TEXT NOT NULL,
      seed INTEGER,
      width INTEGER DEFAULT 512,
      height INTEGER DEFAULT 768,
      prompt TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      UNIQUE(category, value, style)
    );
  `.trim();

  console.log('📝 Step 1: Creating attribute_images table...');
  
  // Try using query endpoint
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/rpc/exec`,
      {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_SERVICE_KEY,
          'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sql: createTableSQL }),
      }
    );

    const responseText = await response.text();
    console.log('Response:', response.status, responseText);

  } catch (error) {
    console.log('❌ Direct SQL execution not available via REST API');
  }

  // Alternative: Create via admin API or use the Supabase Management API
  console.log('\n⚠️  Supabase REST API does not support direct SQL execution.');
  console.log('You need to use one of these methods:\n');
  console.log('METHOD 1: Supabase Dashboard (Easiest)');
  console.log('  1. Open: https://app.supabase.com/project/qfjptqdkthmejxpwbmvq/sql/new');
  console.log('  2. Copy the contents of: migrations/create_attribute_images_tables.sql');
  console.log('  3. Paste and click "Run"\n');
  
  console.log('METHOD 2: Use Supabase CLI');
  console.log('  1. Install: npm install -g supabase');
  console.log('  2. Login: supabase login');
  console.log('  3. Link: supabase link --project-ref qfjptqdkthmejxpwbmvq');
  console.log('  4. Run: supabase db push\n');
  
  console.log('METHOD 3: Direct psql connection');
  console.log('  1. Get database password from Supabase dashboard');
  console.log('  2. Run: PGPASSWORD=your_password psql -h db.qfjptqdkthmejxpwbmvq.supabase.co -U postgres -d postgres -f migrations/create_attribute_images_tables.sql\n');
}

createTables();
