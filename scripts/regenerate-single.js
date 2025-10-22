#!/usr/bin/env node

/**
 * Quick script to regenerate a single missing image
 */

require('dotenv').config({ path: '.env' });
const fetch = require('node-fetch');

const NOVITA_API_KEY = process.env.NOVITA_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

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

async function regenerateMissing() {
  const category = 'lip_shape';
  const value = 'M-Shaped';
  const style = 'realistic';

  console.log(`\n🎨 Regenerating missing image: ${category}/${value}/${style}\n`);

  const filename = `${category}-${value.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${style}-${Date.now()}.jpg`;
  const prompt = `photorealistic, professional portrait photography, close-up of ${value.toLowerCase()} lips, detailed lip shape, professional lighting, natural color`;

  try {
    console.log(`📝 Prompt: ${prompt}\n`);
    
    console.log(`🎨 Generating image...`);
    const { url } = await generateImage(prompt, style);

    console.log(`📥 Downloading image...`);
    const imageBuffer = await downloadImage(url);

    console.log(`☁️  Uploading to Supabase...`);
    const publicUrl = await uploadToSupabase(imageBuffer, filename);

    console.log(`💾 Saving to database...`);
    await saveToDatabase(category, value, style, publicUrl, prompt);

    console.log(`\n✅ SUCCESS! Image regenerated and saved!\n`);
  } catch (error) {
    console.error(`\n❌ FAILED: ${error.message}\n`);
    process.exit(1);
  }
}

regenerateMissing();
