#!/usr/bin/env node

require('dotenv').config({ path: '.env' });

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkImages() {
  console.log('📊 Checking attribute_images table...\n');

  const { data: allImages, error } = await supabase
    .from('attribute_images')
    .select('*');

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  // Group by category
  const byCategory = {};
  const byStyle = {};

  allImages?.forEach(img => {
    if (!byCategory[img.category]) byCategory[img.category] = [];
    byCategory[img.category].push(img);
    
    if (!byStyle[img.style]) byStyle[img.style] = 0;
    byStyle[img.style]++;
  });

  console.log('📈 IMAGES BY CATEGORY:');
  Object.entries(byCategory).forEach(([cat, images]) => {
    console.log(`\n  ${cat}:`);
    const styles = {};
    images.forEach(img => {
      if (!styles[img.style]) styles[img.style] = 0;
      styles[img.style]++;
    });
    Object.entries(styles).forEach(([style, count]) => {
      console.log(`    • ${style}: ${count} images`);
    });
  });

  console.log('\n\n📊 TOTAL BY STYLE:');
  Object.entries(byStyle).forEach(([style, count]) => {
    console.log(`  ${style}: ${count} images`);
  });

  console.log(`\n✅ TOTAL IMAGES IN DATABASE: ${allImages?.length || 0}`);
  
  // Sample a few image URLs to verify they work
  console.log('\n🔗 SAMPLE IMAGE URLs:');
  const samples = allImages?.slice(0, 3) || [];
  samples.forEach(img => {
    console.log(`  ${img.category}/${img.value}/${img.style}:`);
    console.log(`  ${img.image_url.substring(0, 80)}...`);
  });
}

checkImages();
