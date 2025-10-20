#!/usr/bin/env node
require('dotenv').config();
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function runMigration() {
  console.log('🚀 Running database migration...\n');
  
  // Read the migration SQL
  const migrationPath = path.join(__dirname, '..', 'migrations', 'create_attribute_images_tables.sql');
  const sql = fs.readFileSync(migrationPath, 'utf8');
  
  console.log('📝 Executing SQL migration...');
  console.log('File:', migrationPath);
  console.log('');
  
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/rpc/exec_sql`,
      {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_SERVICE_KEY,
          'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: sql }),
      }
    );

    const responseText = await response.text();
    
    if (!response.ok) {
      console.log('❌ Migration failed via RPC');
      console.log('Response:', responseText);
      console.log('\n⚠️  Please run the migration manually:');
      console.log('   1. Open: https://app.supabase.com/project/qfjptqdkthmejxpwbmvq/sql/new');
      console.log('   2. Copy and paste the contents of: migrations/create_attribute_images_tables.sql');
      console.log('   3. Click "Run"');
      process.exit(1);
    }

    console.log('✅ Migration completed successfully!');
    console.log('Response:', responseText);
    
  } catch (error) {
    console.log('❌ Error running migration:', error.message);
    console.log('\n⚠️  Please run the migration manually:');
    console.log('   1. Open: https://app.supabase.com/project/qfjptqdkthmejxpwbmvq/sql/new');
    console.log('   2. Copy and paste the contents of: migrations/create_attribute_images_tables.sql');
    console.log('   3. Click "Run"');
    process.exit(1);
  }
}

runMigration();
