/**
 * Script to generate all attribute images for character creation
 * Generates images using Novita AI, uploads to Supabase, and stores in database
 */

require('dotenv').config({ path: '.env' });
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const NOVITA_API_KEY = process.env.NOVITA_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Categories and their values
const CATEGORIES = {
  age: ['18-19', '20s', '30s', '40s', '50s', '60s', '70+'],
  body: ['Muscular', 'Athletic', 'Slim', 'Chubby', 'Cub', 'Average', 'Curvy'],
  ethnicity: ['Caucasian', 'Asian', 'Arab', 'Indian', 'Latina', 'African', 'Mixed']
};

const STYLES = ['realistic', 'anime'];

// Enhanced prompt builder matching the updated lib/novita-api.ts
function buildPrompt(category, value, style) {
  const parts = [];

  // Base style description
  if (style === 'realistic') {
    parts.push('attractive female avatar with life-like, ultra-realistic features, skin texture, and proportions');
    parts.push('idealized, polished, and highly desirable');
    parts.push('resembles a real person');
  } else {
    parts.push('attractive female avatar with anime-style features');
    parts.push('larger expressive eyes, stylized proportions, and vibrant color tones');
    parts.push('bold, artistic, and idealized for fantasy appeal');
  }

  // Category-specific prompts
  if (category === 'age') {
    const agePrompts = {
      '18-19': 'very youthful, fresh-faced, with smooth skin and a playful, energetic presence typical of late teens',
      '20s': 'woman in her twenties: vibrant, fit, adventurous, with a sense of youthful maturity starting to emerge',
      '30s': 'confident woman in her thirties: balanced, attractive, slightly more defined features, showing maturity and self-assurance',
      '40s': 'woman in her forties: sophisticated, experienced, with a confident and attractive adult presence',
      '50s': 'woman in her fifties: mature, refined, with signs of life experience and charisma, possibly with subtle aging features',
      '60s': 'woman in her sixties: distinguished, wise, still attractive, possibly silver-haired or showing graceful aging',
      '70+': 'older woman, 70 years or more: deeply mature, unique charm, with strong character lines that show wisdom and life lived'
    };
    parts.push(agePrompts[value] || 'beautiful woman');
  }

  if (category === 'body') {
    const bodyPrompts = {
      'Muscular': 'defined and strong physique, emphasizing power and intensity',
      'Athletic': 'lean and toned body, reflecting agility and balanced strength',
      'Slim': 'slender and light figure, projecting elegance and subtle charm',
      'Chubby': 'soft and full body, radiating warmth, comfort, and approachability',
      'Cub': 'youthful yet stocky build, blending a playful vibe with strength',
      'Average': 'natural and relatable physique, offering versatility and everyday realism',
      'Curvy': 'curvy hourglass figure, full and feminine proportions'
    };
    parts.push(bodyPrompts[value] || 'natural build');
  }

  if (category === 'ethnicity') {
    const ethnicityPrompts = {
      'Caucasian': 'attractive woman with lighter skin tones and a sharper or angular facial structure, idealized and desirable',
      'Asian': 'attractive woman with fair to golden skin tones and a softer or oval facial structure, idealized and desirable',
      'Arab': 'attractive woman with olive to light brown skin tones and strong, defined facial features, idealized and desirable',
      'Indian': 'attractive woman with medium brown to deep brown skin tones and rounded or symmetrical facial features, idealized and desirable',
      'Latina': 'attractive woman with warm tan to light brown skin tones and expressive, vibrant facial features, idealized and desirable',
      'African': 'attractive woman with deep brown to dark skin tones and bold, well-defined facial features, idealized and desirable',
      'Mixed': 'attractive woman with blended skin tones and unique facial harmony that combines traits from multiple backgrounds, idealized and desirable'
    };
    parts.push(ethnicityPrompts[value] || '');
  }

  // Professional photography details
  if (style === 'realistic') {
    parts.push('professional portrait photography');
    parts.push('studio lighting, perfect skin texture');
    parts.push('wearing elegant fashionable outfit');
    parts.push('upper body shot, three-quarter view');
    parts.push('professional makeup, tasteful styling');
    parts.push('high quality, 8k resolution, sharp focus');
  } else {
    parts.push('professional anime illustration');
    parts.push('detailed face and eyes, clean lines');
    parts.push('stylish anime outfit, vibrant colors');
    parts.push('upper body portrait, dynamic pose');
    parts.push('studio quality anime art, cel shading');
    parts.push('high detail, professional digital art');
  }

  return parts.filter(Boolean).join(', ');
}

// Generate image with Novita AI
async function generateImage(prompt, style) {
  console.log(`  🎨 Generating image with Novita AI...`);
  
  const requestBody = {
    extra: {
      response_image_type: 'jpeg'
    },
    request: {
      model_name: 'sd_xl_base_1.0.safetensors',
      prompt: prompt,
      negative_prompt: 'nude, naked, nsfw, explicit, sexual, vulgar, inappropriate, low quality, blurry, distorted, deformed, ugly, bad anatomy',
      width: 512,
      height: 768,
      sampler_name: 'DPM++ 2M Karras',
      steps: 30,
      guidance_scale: 7.5,
      seed: -1,
      batch_size: 1,
      image_num: 1,
    }
  };

  // Submit generation request
  const response = await fetch('https://api.novita.ai/v3/async/txt2img', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${NOVITA_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Novita API error: ${error}`);
  }

  const data = await response.json();
  const taskId = data.task_id;

  console.log(`  ⏳ Task ID: ${taskId}, polling for completion...`);

  // Poll for completion
  for (let i = 0; i < 60; i++) {
    await new Promise(resolve => setTimeout(resolve, 3000)); // Wait 3 seconds

    const pollResponse = await fetch(
      `https://api.novita.ai/v3/async/task-result?task_id=${taskId}`,
      {
        headers: {
          'Authorization': `Bearer ${NOVITA_API_KEY}`,
        },
      }
    );

    if (!pollResponse.ok) {
      throw new Error(`Failed to check task status: ${pollResponse.statusText}`);
    }

    const pollData = await pollResponse.json();

    if (pollData.task.status === 'TASK_STATUS_SUCCEED') {
      console.log(`  ✅ Image generated successfully!`);
      
      // The response structure: pollData.images[0].image_url (NOT pollData.task.images!)
      let imageUrl = null;
      let seed = -1;
      
      if (pollData.images && pollData.images.length > 0) {
        imageUrl = pollData.images[0].image_url || pollData.images[0];
      } else if (pollData.task.images && pollData.task.images.length > 0) {
        imageUrl = pollData.task.images[0].image_url || pollData.task.images[0];
      } else if (pollData.task.image_url) {
        imageUrl = pollData.task.image_url;
      }
      
      // Get seed from extra.seed or task.seed
      if (pollData.extra && pollData.extra.seed) {
        seed = parseInt(pollData.extra.seed);
      } else if (pollData.task.seed) {
        seed = pollData.task.seed;
      } else if (pollData.seed) {
        seed = pollData.seed;
      }
      
      if (!imageUrl) {
        console.log('Response structure:', JSON.stringify(pollData, null, 2));
        throw new Error('Could not find image URL in response');
      }
      
      return { url: imageUrl, seed };
    } else if (pollData.task.status === 'TASK_STATUS_FAILED') {
      throw new Error(`Image generation failed: ${pollData.task.reason}`);
    }

    process.stdout.write('.');
  }

  throw new Error('Image generation timed out');
}

// Download image from URL
async function downloadImage(url) {
  console.log(`  📥 Downloading image...`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.statusText}`);
  }
  return await response.buffer();
}

// Upload image to Supabase storage with retry logic
async function uploadToSupabase(imageBuffer, filename, retries = 3) {
  console.log(`  ☁️  Uploading to Supabase storage...`);
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const uploadResponse = await fetch(
        `${SUPABASE_URL}/storage/v1/object/assets/attribute-images/${filename}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
            'Content-Type': 'image/jpeg',
          },
          body: imageBuffer,
        }
      );

      if (!uploadResponse.ok) {
        const error = await uploadResponse.text();
        
        // If it's a 502 or 503 error, retry
        if ((uploadResponse.status === 502 || uploadResponse.status === 503) && attempt < retries) {
          console.log(`  ⚠️  Upload failed (${uploadResponse.status}), retrying (${attempt}/${retries})...`);
          await new Promise(resolve => setTimeout(resolve, 2000 * attempt)); // Exponential backoff
          continue;
        }
        
        throw new Error(`Supabase upload error: ${error}`);
      }

      const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/assets/attribute-images/${filename}`;
      console.log(`  ✅ Uploaded to: ${publicUrl}`);
      return publicUrl;
    } catch (error) {
      if (attempt < retries && error.message.includes('ECONNRESET')) {
        console.log(`  ⚠️  Connection reset, retrying (${attempt}/${retries})...`);
        await new Promise(resolve => setTimeout(resolve, 2000 * attempt));
        continue;
      }
      throw error;
    }
  }
}

// Save image metadata to database
async function saveToDatabase(category, value, style, imageUrl, seed, prompt, width, height) {
  console.log(`  💾 Saving to database...`);
  
  const insertResponse = await fetch(
    `${SUPABASE_URL}/rest/v1/attribute_images`,
    {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({
        category,
        value,
        style,
        image_url: imageUrl,
        seed,
        prompt,
        width,
        height,
      }),
    }
  );

  if (!insertResponse.ok) {
    const errorText = await insertResponse.text();
    const status = insertResponse.status;
    
    // If it's a duplicate key error (409), that's actually OK - the image already exists
    if (status === 409) {
      console.log(`  ⚠️  Image already exists in database (skipping)`);
      return; // Don't throw error, just return
    }
    
    throw new Error(`Database insert error (${status}): ${errorText || 'Unknown error'}`);
  }

  console.log(`  ✅ Saved to database`);
}

// Main generation function
async function generateAndUpload(category, value, style) {
  const filename = `${category}-${value.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${style}-${Date.now()}.jpg`;
  
  console.log(`\n🎯 Generating: ${category} / ${value} / ${style}`);
  console.log(`   Filename: ${filename}`);

  try {
    // Build prompt
    const prompt = buildPrompt(category, value, style);
    console.log(`  📝 Prompt: ${prompt.substring(0, 100)}...`);

    // Generate image
    const { url, seed } = await generateImage(prompt, style);

    // Download image
    const imageBuffer = await downloadImage(url);

    // Upload to Supabase
    const publicUrl = await uploadToSupabase(imageBuffer, filename);

    // Save to database
    await saveToDatabase(category, value, style, publicUrl, seed, prompt);

    console.log(`  ✨ SUCCESS! ${category}/${value}/${style} complete!`);
    return { success: true, url: publicUrl };

  } catch (error) {
    console.error(`  ❌ ERROR: ${error.message}`);
    return { success: false, error: error.message };
  }
}

// Main execution
async function main() {
  console.log('🚀 Starting attribute image generation...\n');
  console.log('📊 Configuration:');
  console.log(`   Categories: ${Object.keys(CATEGORIES).join(', ')}`);
  console.log(`   Styles: ${STYLES.join(', ')}`);
  console.log(`   Total images to generate: ${Object.values(CATEGORIES).flat().length * STYLES.length}`);
  console.log('\n' + '='.repeat(80) + '\n');

  const results = {
    success: [],
    failed: [],
  };

  let totalCount = 0;
  let successCount = 0;
  let failCount = 0;

  for (const style of STYLES) {
    console.log(`\n${'='.repeat(80)}`);
    console.log(`🎨 Processing ${style.toUpperCase()} style`);
    console.log('='.repeat(80));

    for (const [category, values] of Object.entries(CATEGORIES)) {
      console.log(`\n📁 Category: ${category.toUpperCase()}`);
      console.log(`   Values: ${values.join(', ')}`);

      for (const value of values) {
        totalCount++;
        const result = await generateAndUpload(category, value, style);

        if (result.success) {
          successCount++;
          results.success.push({ category, value, style, url: result.url });
        } else {
          failCount++;
          results.failed.push({ category, value, style, error: result.error });
        }

        // Progress update
        console.log(`\n📊 Progress: ${successCount}/${totalCount} successful, ${failCount} failed`);

        // Rate limiting - wait 2 seconds between requests
        if (totalCount < Object.values(CATEGORIES).flat().length * STYLES.length) {
          console.log('⏸️  Waiting 2 seconds before next generation...');
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
    }
  }

  // Final summary
  console.log('\n' + '='.repeat(80));
  console.log('🎉 GENERATION COMPLETE!');
  console.log('='.repeat(80));
  console.log(`\n📊 Final Statistics:`);
  console.log(`   Total: ${totalCount}`);
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`   Success Rate: ${((successCount/totalCount)*100).toFixed(1)}%`);

  if (results.failed.length > 0) {
    console.log(`\n❌ Failed generations:`);
    results.failed.forEach(item => {
      console.log(`   - ${item.category}/${item.value}/${item.style}: ${item.error}`);
    });
  }

  console.log(`\n✅ Successfully generated images:`);
  results.success.forEach(item => {
    console.log(`   ✓ ${item.category}/${item.value}/${item.style}`);
  });

  console.log('\n🎨 All images are now available in Supabase and cached in the database!');
  console.log('🌐 Visit http://localhost:3000/create-character to see them in action!');
}

// Run the script
if (!NOVITA_API_KEY) {
  console.error('❌ ERROR: NOVITA_API_KEY not found in environment variables!');
  process.exit(1);
}

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ ERROR: Supabase credentials not found in environment variables!');
  process.exit(1);
}

main().catch(error => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});
