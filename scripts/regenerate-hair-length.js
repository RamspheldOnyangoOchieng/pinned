#!/usr/bin/env node

/**
 * Regenerate hair length attribute images
 * Run this to rebuild all hair length images
 */

const HAIR_LENGTH_VALUES = ['very short', 'short', 'medium', 'long', 'very long'];
const STYLES = ['realistic', 'anime'];

async function regenerateHairLengthImages() {
  console.log('🎨 Starting regeneration of hair length images...\n');

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  let successCount = 0;
  let failedCount = 0;
  const failed = [];

  for (const style of STYLES) {
    console.log(`\n📦 Processing style: ${style.toUpperCase()}`);
    
    for (const value of HAIR_LENGTH_VALUES) {
      const formattedValue = value.toLowerCase().replace(/\s+/g, '-');
      
      try {
        process.stdout.write(`   Regenerating hair_length:${formattedValue}:${style}... `);

        const response = await fetch(`${baseUrl}/api/attribute-images?category=hair_length&value=${encodeURIComponent(formattedValue)}&style=${style}`, {
          method: 'GET',
          timeout: 180000, // 3 minute timeout per image
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.image_url) {
            console.log('✅ GENERATED');
            successCount++;
          } else {
            throw new Error(data.error || 'Unknown error');
          }
        } else {
          throw new Error(`HTTP ${response.status}`);
        }
      } catch (error) {
        console.log(`❌ FAILED: ${error.message}`);
        failedCount++;
        failed.push({ value: formattedValue, style, error: error.message });
      }

      // Add 2 second delay between requests to avoid overload
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 REGENERATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Successfully Generated: ${successCount}`);
  console.log(`❌ Failed: ${failedCount}`);
  console.log(`📈 Total: ${successCount + failedCount}`);
  console.log(`⏱️  Success Rate: ${(((successCount) / (successCount + failedCount)) * 100).toFixed(1)}%`);

  if (failed.length > 0) {
    console.log('\n⚠️  Failed Images:');
    failed.forEach(({ value, style, error }) => {
      console.log(`   - hair_length:${value}:${style} → ${error}`);
    });
  }

  console.log('\n✨ Regeneration complete!');
  console.log('   Hair length images are ready to use.');
  
  process.exit(failedCount > 0 ? 1 : 0);
}

// Run the regeneration
if (require.main === module) {
  regenerateHairLengthImages().catch(error => {
    console.error('Fatal error during regeneration:', error);
    process.exit(1);
  });
}

module.exports = { regenerateHairLengthImages, HAIR_LENGTH_VALUES, STYLES };
