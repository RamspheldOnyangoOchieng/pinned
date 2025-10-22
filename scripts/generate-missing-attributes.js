#!/usr/bin/env node

/**
 * Generate missing attribute images (Hair, Eyes, Face, Body Details)
 * Generates only: hair_length, hair_color, eye_color, eye_shape, lip_shape, face_shape, hips, bust
 */

require('dotenv').config({ path: '.env' });
const fetch = require('node-fetch');

const NOVITA_API_KEY = process.env.NOVITA_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Only the categories we need to generate
const CATEGORIES = {
  hair_length: [
    'Bald',
    'Buzz Cut',
    'Short',
    'Shoulder',
    'Mid-Back',
    'Waist',
    'Hip',
    'Floor'
  ],
  hair_color: [
    'Black',
    'Dark Brown',
    'Brown',
    'Light Brown',
    'Blonde',
    'Platinum',
    'Red',
    'Auburn',
    'Gray',
    'White'
  ],
  eye_color: [
    'Brown',
    'Dark Brown',
    'Amber',
    'Hazel',
    'Green',
    'Blue',
    'Light Blue',
    'Gray',
    'Violet',
    'Heterochromia'
  ],
  eye_shape: [
    'Almond',
    'Round',
    'Monolid',
    'Hooded',
    'Downturned',
    'Upturned',
    'Fox',
    'Wide Set'
  ],
  lip_shape: [
    'Thin',
    'Full',
    'Heart',
    'Wide',
    'M-Shaped',
    'Bow'
  ],
  face_shape: [
    'Round',
    'Oval',
    'Square',
    'Heart',
    'Oblong',
    'Diamond'
  ],
  hips: [
    'Slim Hips',
    'Average Hips',
    'Curved Hips',
    'Hip Dips',
    'Round Hips'
  ],
  bust: [
    'Petite',
    'Small',
    'Medium',
    'Full',
    'Large',
    'Very Large'
  ]
};

const STYLES = ['realistic', 'anime'];

let totalToGenerate = 0;
let successCount = 0;
let failedCount = 0;
const failed = [];

async function generateImage(prompt, style) {
  const response = await fetch('https://api.novita.ai/v3/async/txt2img', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${NOVITA_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      extra: {
        response_image_type: 'jpeg',
      },
      request: {
        model_name: 'sd_xl_base_1.0.safetensors',
        prompt: prompt,
        negative_prompt: 'blurry, low quality, distorted, ugly, bad anatomy',
        width: 512,
        height: 768,
        image_num: 1,
        sampler_name: 'DPM++ 2M Karras',
        guidance_scale: 7,
        steps: 25,
        seed: -1,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Novita API error: ${response.statusText}`);
  }

  const data = await response.json();
  const taskId = data.task_id;

  // Poll for completion
  let attempts = 0;
  const maxAttempts = 60;

  while (attempts < maxAttempts) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    attempts++;

    const progressResponse = await fetch(
      `https://api.novita.ai/v3/async/task-result?task_id=${taskId}`,
      {
        headers: {
          'Authorization': `Bearer ${NOVITA_API_KEY}`,
        },
      }
    );

    if (!progressResponse.ok) {
      throw new Error('Failed to check generation progress');
    }

    const progressData = await progressResponse.json();

    if (progressData.task.status === 'TASK_STATUS_SUCCEED') {
      const imageUrl = progressData.images[0]?.image_url;
      if (!imageUrl) {
        throw new Error('No image URL in response');
      }
      return { url: imageUrl, seed: -1 };
    } else if (progressData.task.status === 'TASK_STATUS_FAILED') {
      throw new Error('Image generation failed');
    }
  }

  throw new Error('Image generation timed out');
}

async function downloadImage(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.statusText}`);
  }
  return await response.buffer();
}

async function uploadToSupabase(imageBuffer, filename) {
  const response = await fetch(
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

  if (!response.ok) {
    throw new Error(`Upload error: ${await response.text()}`);
  }

  return `${SUPABASE_URL}/storage/v1/object/public/assets/attribute-images/${filename}`;
}

async function saveToDatabase(category, value, style, imageUrl, prompt) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/attribute_images`, {
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
      prompt,
      width: 512,
      height: 768,
    }),
  });

  if (!response.ok && response.status !== 409) {
    throw new Error(`Database error: ${await response.text()}`);
  }
}

function buildPrompt(category, value, style) {
  const stylePrefix = style === 'anime' 
    ? 'anime character, illustrated, cel-shaded style' 
    : 'photorealistic, professional portrait photography';

  const prompts = {
    hair_length: `${stylePrefix}, woman with ${value.toLowerCase()} hair length, clear hair visible, professional lighting, detailed hair texture`,
    hair_color: `${stylePrefix}, woman with ${value.toLowerCase()} hair color, clear hair visible, professional lighting, vibrant color`,
    eye_color: `${stylePrefix}, close-up of eyes with ${value.toLowerCase()} color, detailed eyes, professional lighting, sharp focus on eyes`,
    eye_shape: `${stylePrefix}, close-up of ${value.toLowerCase()} eyes, detailed eye shape, professional lighting, clear eye definition`,
    lip_shape: `${stylePrefix}, close-up of ${value.toLowerCase()} lips, detailed lip shape, professional lighting, natural color`,
    face_shape: `${stylePrefix}, woman with ${value.toLowerCase()} face shape, frontal view, professional lighting, clear facial features`,
    hips: `${stylePrefix}, woman showing ${value.toLowerCase()}, full body view, professional lighting, clear body proportions`,
    bust: `${stylePrefix}, woman showing ${value.toLowerCase()} bust size, frontal view, professional lighting, clear body proportions`
  };

  return prompts[category] || stylePrefix;
}

async function generateAndUpload(category, value, style) {
  const filename = `${category}-${value.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${style}-${Date.now()}.jpg`;

  console.log(`   🎯 ${category} / ${value} / ${style}`);

  try {
    // Build prompt
    const prompt = buildPrompt(category, value, style);

    // Generate image
    console.log(`      🎨 Generating...`);
    const { url } = await generateImage(prompt, style);

    // Download image
    console.log(`      📥 Downloading...`);
    const imageBuffer = await downloadImage(url);

    // Upload to Supabase
    console.log(`      ☁️  Uploading to Supabase...`);
    const publicUrl = await uploadToSupabase(imageBuffer, filename);

    // Save to database
    console.log(`      💾 Saving to database...`);
    await saveToDatabase(category, value, style, publicUrl, prompt);

    console.log(`      ✅ SUCCESS!\n`);
    successCount++;
  } catch (error) {
    console.log(`      ❌ FAILED: ${error.message}\n`);
    failedCount++;
    failed.push({ category, value, style, error: error.message });
  }
}

async function main() {
  console.log('🎨 GENERATING MISSING ATTRIBUTE IMAGES\n');
  console.log('Categories: hair_length, hair_color, eye_color, eye_shape, lip_shape, face_shape, hips, bust');
  console.log('Styles: realistic, anime\n');

  // Calculate total
  for (const category in CATEGORIES) {
    totalToGenerate += CATEGORIES[category].length * STYLES.length;
  }

  console.log(`Total images to generate: ${totalToGenerate}\n`);
  console.log('=' .repeat(60) + '\n');

  let count = 0;

  for (const category in CATEGORIES) {
    const values = CATEGORIES[category];
    
    console.log(`\n📁 Category: ${category.toUpperCase()}`);
    console.log(`   Values: ${values.join(', ')}\n`);

    for (const style of STYLES) {
      console.log(`   🎨 Style: ${style.toUpperCase()}\n`);

      for (const value of values) {
        count++;
        console.log(`   [${count}/${totalToGenerate}]`);
        await generateAndUpload(category, value, style);
        
        // Wait between generations
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('\n📊 GENERATION COMPLETE!\n');
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${failedCount}`);
  console.log(`📊 Total: ${totalToGenerate}\n`);

  if (failed.length > 0) {
    console.log('Failed images:');
    failed.forEach(f => {
      console.log(`  - ${f.category}/${f.value}/${f.style}: ${f.error}`);
    });
  }
}

main().catch(error => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});
