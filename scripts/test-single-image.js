#!/usr/bin/env node
require('dotenv').config();
const fetch = require('node-fetch');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function testDatabaseInsert() {
  console.log('🧪 Testing database insert...');
  console.log('URL:', SUPABASE_URL);
  console.log('Service Key:', SUPABASE_SERVICE_KEY ? `${SUPABASE_SERVICE_KEY.substring(0, 20)}...` : 'NOT SET');
  
  const testData = {
    category: 'age',
    value: '20s',
    style: 'realistic',
    image_url: 'https://example.com/test.jpg',
    seed: 12345,
    prompt: 'test prompt',
    width: 512,
    height: 768,
  };
  
  console.log('\n📝 Inserting:', JSON.stringify(testData, null, 2));
  
  const insertResponse = await fetch(
    `${SUPABASE_URL}/rest/v1/attribute_images`,
    {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
      },
      body: JSON.stringify(testData),
    }
  );

  console.log('\n📊 Response status:', insertResponse.status);
  console.log('Response headers:', Object.fromEntries(insertResponse.headers.entries()));
  
  const responseText = await insertResponse.text();
  console.log('\n📄 Response body:', responseText);
  
  if (!insertResponse.ok) {
    console.log('\n❌ Insert failed');
  } else {
    console.log('\n✅ Insert successful!');
  }
}

testDatabaseInsert().catch(console.error);
