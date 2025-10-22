#!/usr/bin/env node

require('dotenv').config({ path: '.env' });

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkCategories() {
  // All categories from create-character-flow.tsx
  const allCategories = [
    'style',
    'model',
    'age',
    'body',
    'ethnicity',
    'hair_style',
    'hair_length',
    'hair_color',
    'eye_color',
    'eye_shape',
    'lip_shape',
    'face_shape',
    'hips',
    'bust',
    'language',
    'relationship',
    'occupation',
    'hobbies',
    'personality'
  ];

  console.log('📊 Checking all categories for images...\n');

  const { data: allImages } = await supabase
    .from('attribute_images')
    .select('category');

  const existingCategories = new Set(allImages?.map(img => img.category) || []);

  console.log('✅ CATEGORIES WITH IMAGES:');
  allCategories.forEach(cat => {
    if (existingCategories.has(cat)) {
      console.log(`  ✓ ${cat}`);
    }
  });

  console.log('\n❌ CATEGORIES WITHOUT IMAGES:');
  const missing = [];
  allCategories.forEach(cat => {
    if (!existingCategories.has(cat)) {
      console.log(`  ✗ ${cat}`);
      missing.push(cat);
    }
  });

  console.log(`\n📈 Summary: ${existingCategories.size}/${allCategories.length} categories have images`);
  console.log(`Missing: ${missing.join(', ')}`);
}

checkCategories();
