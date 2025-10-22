#!/usr/bin/env node

/**
 * Regenerate only the failed female-only images
 */

require('dotenv').config({ path: '.env' });
const fetch = require('node-fetch');

const NOVITA_API_KEY = process.env.NOVITA_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Failed images to regenerate
const FAILED_IMAGES = [
  { category: 'relationship', value: 'Single', style: 'anime' },
  { category: 'occupation', value: 'Fitness', style: 'anime' },
  { category: 'hobbies', value: 'Reading', style: 'anime' },
  { category: 'hobbies', value: 'Gaming', style: 'realistic' },
];

// Prompts for failed images
const PROMPTS = {
  'relationship-Single-anime': 'anime girl, beautiful woman, single and independent, confident expression, illustration style, detailed face, professional artwork',
  'occupation-Fitness-anime': 'anime girl, fit woman, gym trainer, athletic body, exercise pose, illustration style, detailed face, professional artwork',
  'hobbies-Reading-anime': 'anime girl, beautiful woman reading book, intellectual expression, serene pose, illustration style, detailed face, professional artwork',
  'hobbies-Gaming-realistic': 'photorealistic portrait of beautiful woman gamer, holding controller, gaming setup, confident expression, professional lighting, detailed face',
};

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
        prompt: `${prompt}, professional portrait, high quality, realistic, detailed`,
        negative_prompt: 'blurry, low quality, distorted, ugly, bad anatomy, missing features, extra fingers, mutation, deformed, man, male, boy',
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

  // Poll for completion (max 60 seconds)
  let attempts = 0;
  const maxAttempts = 30;

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
      return { url: imageUrl };
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

async function deleteOldImage(imageId) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/attribute_images?id=eq.${imageId}`, {
    method: 'DELETE',
    headers: {
      'apikey': SUPABASE_SERVICE_KEY,
      'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok && response.status !== 404) {
    console.warn(`Warning: Could not delete old image ${imageId}`);
  }
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

async function regenerateFailed() {
  console.log('\n🎨 REGENERATING FAILED FEMALE-ONLY IMAGES\n');
  console.log(`Failed images to regenerate: ${FAILED_IMAGES.length}\n`);
  console.log('============================================================\n');

  let successCount = 0;
  let failureCount = 0;

  for (let i = 0; i < FAILED_IMAGES.length; i++) {
    const { category, value, style } = FAILED_IMAGES[i];
    const imageNum = i + 1;
    const key = `${category}-${value}-${style}`;
    const prompt = PROMPTS[key];

    console.log(`\n[${imageNum}/${FAILED_IMAGES.length}] ${category} / ${value} / ${style}`);

    try {
      console.log(`   🎨 Generating (FEMALE-ONLY)...`);
      const { url } = await generateImage(prompt, style);

      console.log(`   📥 Downloading...`);
      const imageBuffer = await downloadImage(url);

      const filename = `${category}-${value.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${style}-${Date.now()}.jpg`;

      console.log(`   ☁️  Uploading to Supabase...`);
      const publicUrl = await uploadToSupabase(imageBuffer, filename);

      console.log(`   💾 Saving to database...`);
      await saveToDatabase(category, value, style, publicUrl, prompt);

      console.log(`   ✅ SUCCESS!`);
      successCount++;
    } catch (error) {
      console.error(`   ❌ FAILED: ${error.message}`);
      failureCount++;
    }

    // 2 second delay between generations
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log(`\n\n============================================================\n`);
  console.log(`📊 REGENERATION COMPLETE!\n`);
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${failureCount}`);
  console.log(`📊 Total: ${FAILED_IMAGES.length}\n`);
}

regenerateFailed();
