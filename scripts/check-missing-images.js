#!/usr/bin/env node
require('dotenv').config();
const fetch = require('node-fetch');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Expected images
const EXPECTED_IMAGES = {
  age: ['18-19', '20s', '30s', '40s', '50s', '60s', '70+'],
  body: ['Muscular', 'Athletic', 'Slim', 'Chubby', 'Cub', 'Average', 'Curvy'],
  ethnicity: ['Caucasian', 'Asian', 'Arab', 'Indian', 'Latina', 'African', 'Mixed'],
};

const STYLES = ['realistic', 'anime'];

async function checkMissing() {
  console.log('🔍 Checking for missing images...\n');
  
  // Fetch all existing images
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/attribute_images?select=category,value,style`,
    {
      headers: {
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
      }
    }
  );
  
  const existingImages = await response.json();
  
  // Create a set of existing combinations
  const existingSet = new Set(
    existingImages.map(img => `${img.category}-${img.value}-${img.style}`)
  );
  
  console.log(`✅ Found ${existingImages.length} existing images\n`);
  
  // Find missing images
  const missing = [];
  
  for (const category of Object.keys(EXPECTED_IMAGES)) {
    for (const value of EXPECTED_IMAGES[category]) {
      for (const style of STYLES) {
        const key = `${category}-${value}-${style}`;
        if (!existingSet.has(key)) {
          missing.push({ category, value, style });
        }
      }
    }
  }
  
  if (missing.length === 0) {
    console.log('🎉 All images are present! (42/42)');
    return;
  }
  
  console.log(`❌ Missing ${missing.length} images:\n`);
  
  // Group by category and style
  const byCategory = {};
  missing.forEach(({ category, value, style }) => {
    const key = `${category}-${style}`;
    if (!byCategory[key]) byCategory[key] = [];
    byCategory[key].push(value);
  });
  
  Object.entries(byCategory).sort().forEach(([key, values]) => {
    console.log(`  ${key}: ${values.join(', ')}`);
  });
  
  console.log(`\n📝 To generate missing images, run:`);
  console.log(`   node scripts/generate-missing-images.js`);
  console.log(`\nOr to regenerate all from scratch:`);
  console.log(`   node scripts/generate-all-attribute-images.js`);
}

checkMissing().catch(console.error);
