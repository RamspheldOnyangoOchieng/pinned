#!/usr/bin/env node

/**
 * Pre-generate all attribute images for instant loading
 * Run this once to build the image cache
 */

const fs = require('fs');
const path = require('path');

// Character attribute options from the codebase
const ATTRIBUTE_OPTIONS = {
  age: ['18-22', '23-30', '31-40', '40+'],
  body: ['petite', 'athletic', 'curvy', 'muscular'],
  ethnicity: ['European', 'Asian', 'African', 'Latin', 'Middle Eastern', 'Indian', 'Latina', 'Mixed'],
  hair_style: ['long', 'short', 'curly', 'straight', 'wavy'],
  hair_length: ['very short', 'short', 'medium', 'long', 'very long'],
  hair_color: ['black', 'brown', 'blonde', 'red', 'pink', 'purple', 'blue'],
  eye_color: ['blue', 'green', 'brown', 'hazel', 'gray'],
  eye_shape: ['almond', 'round', 'hooded', 'downturned'],
  lip_shape: ['full', 'thin', 'pouty', 'natural'],
};

const STYLES = ['realistic', 'anime'];

async function prebuildImages() {
  console.log('🖼️  Starting pre-generation of all attribute images...\n');

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  let totalImages = 0;
  let successCount = 0;
  let cacheHits = 0;
  let failedImages = [];

  for (const [category, values] of Object.entries(ATTRIBUTE_OPTIONS)) {
    console.log(`\n📦 Processing category: ${category.toUpperCase()}`);
    console.log(`   Values: ${values.join(', ')}`);
    console.log(`   Total combinations: ${values.length * STYLES.length}`);

    for (const style of STYLES) {
      for (const value of values) {
        totalImages++;
        const params = new URLSearchParams({
          category,
          value,
          style,
        });

        try {
          process.stdout.write(`   [${successCount + cacheHits}/${totalImages}] Fetching ${category}:${value}:${style}... `);

          const response = await fetch(`${baseUrl}/api/attribute-images?${params}`, {
            method: 'GET',
            timeout: 120000, // 2 minute timeout per image
          });

          if (response.ok) {
            const data = await response.json();
            if (data.success && data.image_url) {
              // Check if it was a cache hit
              if (response.headers.get('x-cache') === 'HIT') {
                console.log('✅ CACHED');
                cacheHits++;
              } else {
                console.log('🎨 GENERATED');
                successCount++;
              }
            } else {
              throw new Error(data.error || 'Unknown error');
            }
          } else {
            throw new Error(`HTTP ${response.status}`);
          }
        } catch (error) {
          console.log(`❌ FAILED: ${error.message}`);
          failedImages.push({ category, value, style, error: error.message });
        }

        // Add small delay between requests to avoid overload
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 PREBUILD SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Successfully Generated: ${successCount}`);
  console.log(`📦 Already Cached: ${cacheHits}`);
  console.log(`❌ Failed: ${failedImages.length}`);
  console.log(`📈 Total Processed: ${totalImages}`);
  console.log(`⏱️  Success Rate: ${(((successCount + cacheHits) / totalImages) * 100).toFixed(1)}%`);

  if (failedImages.length > 0) {
    console.log('\n⚠️  Failed Images:');
    failedImages.forEach(({ category, value, style, error }) => {
      console.log(`   - ${category}:${value}:${style} → ${error}`);
    });
  }

  console.log('\n✨ Pre-build complete! Images are now cached in the database.');
  console.log('   Future requests will load instantly.');
}

// Run the prebuild
if (require.main === module) {
  prebuildImages().catch(error => {
    console.error('Fatal error during pre-build:', error);
    process.exit(1);
  });
}

module.exports = { prebuildImages, ATTRIBUTE_OPTIONS, STYLES };
