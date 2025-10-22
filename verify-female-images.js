#!/usr/bin/env node

require('dotenv').config({ path: '.env' });

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function verify() {
  console.log('\n✨ Verifying Female-Only Images in Database\n');

  const categories = ['language', 'relationship', 'occupation', 'hobbies', 'personality'];
  let totalImages = 0;
  let mismatchCount = 0;

  for (const category of categories) {
    const { data, error } = await supabase
      .from('attribute_images')
      .select('value, style, image_url, created_at')
      .eq('category', category)
      .order('value, style');

    if (error) {
      console.error(`❌ Error fetching ${category}:`, error);
      continue;
    }

    console.log(`\n📊 ${category.toUpperCase()}:`);
    
    // Group by value
    const byValue = {};
    data?.forEach(img => {
      if (!byValue[img.value]) byValue[img.value] = [];
      byValue[img.value].push(img.style);
    });

    Object.entries(byValue).forEach(([value, styles]) => {
      totalImages += styles.length;
      const hasRealistic = styles.includes('realistic');
      const hasAnime = styles.includes('anime');
      
      console.log(`  ${value.padEnd(20)} → Realistic: ${hasRealistic ? '✅' : '❌'} | Anime: ${hasAnime ? '✅' : '❌'}`);
      
      if (!hasRealistic || !hasAnime) mismatchCount++;
    });
  }

  console.log(`\n📈 SUMMARY:`);
  console.log(`  Total Images: ${totalImages}`);
  console.log(`  Values Missing Style: ${mismatchCount}`);
  console.log(`  Status: ${mismatchCount === 0 ? '✅ ALL COMPLETE' : '⚠️ SOME INCOMPLETE'}\n`);
}

verify();
