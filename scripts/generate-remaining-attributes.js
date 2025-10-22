#!/usr/bin/env node

/**
 * Generate images for remaining categories: language, relationship, occupation, hobbies, personality
 * These are text-based attributes so we generate portrait-based images
 */

require('dotenv').config({ path: '.env' });
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const NOVITA_API_KEY = process.env.NOVITA_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Define all missing categories with their values
const CATEGORIES = {
  language: [
    { value: 'English', prompt: 'professional portrait of a woman speaking english, english speaker, casual style, natural confidence' },
    { value: 'Spanish', prompt: 'professional portrait of a woman with latin features, spanish speaker, warm personality, cultural style' },
    { value: 'French', prompt: 'professional portrait of a woman with french elegance, french speaker, sophisticated style, classic beauty' },
    { value: 'German', prompt: 'professional portrait of a woman with german heritage, german speaker, professional style, confident expression' },
    { value: 'Japanese', prompt: 'professional portrait of a woman with japanese features, japanese speaker, serene expression, cultural elegance' },
    { value: 'Korean', prompt: 'professional portrait of a woman with korean features, korean speaker, modern style, elegant presentation' },
    { value: 'Multilingual', prompt: 'professional portrait of a cosmopolitan woman, multilingual, diverse cultural background, intelligent expression' },
  ],
  relationship: [
    { value: 'Single', prompt: 'professional portrait of independent woman, confident and self-assured, approachable and friendly, looking for connection' },
    { value: 'Open', prompt: 'professional portrait of an open-minded woman, warm and welcoming, progressive attitude, genuine smile' },
    { value: 'Exploring', prompt: 'professional portrait of curious woman, exploratory spirit, thoughtful expression, discovering new possibilities' },
    { value: 'Committed', prompt: 'professional portrait of devoted woman, sincere expression, deep emotional connection, genuine warmth' },
  ],
  occupation: [
    { value: 'Student', prompt: 'portrait of a college student, young professional, studious expression, ambitious and focused, casual academic style' },
    { value: 'Artist', prompt: 'portrait of a creative artist, expressive and passionate, artistic soul, colorful and imaginative presence, bohemian style' },
    { value: 'Professional', prompt: 'portrait of a career-focused woman, professional attire, confident businesswoman, competent and intelligent expression' },
    { value: 'Entrepreneur', prompt: 'portrait of a confident entrepreneur, visionary expression, business-minded, ambitious and driven, modern style' },
    { value: 'Healthcare', prompt: 'portrait of a healthcare professional, medical worker, caring and compassionate, professional medical style, helpful demeanor' },
    { value: 'Tech', prompt: 'portrait of a tech industry professional, tech worker, innovative minded, modern style, intelligent and focused' },
    { value: 'Creative', prompt: 'portrait of a creative professional, arts and entertainment, expressive personality, colorful and vibrant energy' },
    { value: 'Fitness', prompt: 'portrait of a fitness professional, athletic trainer, toned appearance, active lifestyle, energetic and healthy' },
  ],
  hobbies: [
    { value: 'Reading', prompt: 'portrait of a woman who loves reading, intellectual expression, thoughtful pose, surrounded by literary ambiance' },
    { value: 'Gaming', prompt: 'portrait of a woman gamer, modern tech-savvy, confident expression, gaming culture aesthetic' },
    { value: 'Yoga', prompt: 'portrait of a yoga practitioner, zen expression, peaceful demeanor, mindful and serene, wellness focused' },
    { value: 'Cooking', prompt: 'portrait of a woman who loves cooking, culinary passion, warm kitchen ambiance, creative food lover' },
    { value: 'Travel', prompt: 'portrait of a woman traveler, adventurous spirit, worldly expression, passport in hand, wanderlust aesthetic' },
    { value: 'Music', prompt: 'portrait of a music lover, musical expression, surrounded by musical instruments, passionate about music' },
    { value: 'Art', prompt: 'portrait of an artist, creative expression, surrounded by art, paintbrush in hand, artistic soul' },
    { value: 'Fitness', prompt: 'portrait of a fitness enthusiast, athletic expression, workout gear, strong and healthy appearance' },
    { value: 'Photography', prompt: 'portrait of a photographer, holding a camera, creative eye, artistic expression, visual storytelling' },
    { value: 'Dancing', prompt: 'portrait of a dancer, graceful movement, expressive dancing pose, rhythm and flow, performance energy' },
  ],
  personality: [
    { value: 'Playful', prompt: 'portrait of a playful woman, cheerful expression, fun and lighthearted personality, joyful smile' },
    { value: 'Caring', prompt: 'portrait of a caring woman, warm expression, compassionate eyes, nurturing personality, gentle demeanor' },
    { value: 'Adventurous', prompt: 'portrait of an adventurous woman, daring expression, bold confidence, excitement and energy' },
    { value: 'Intelligent', prompt: 'portrait of an intelligent woman, thoughtful expression, intellectual confidence, sharp and wise eyes' },
    { value: 'Flirty', prompt: 'portrait of a flirty woman, playful smile, confident expression, charming and witty personality' },
    { value: 'Mysterious', prompt: 'portrait of a mysterious woman, enigmatic expression, intriguing eyes, secretive and alluring personality' },
    { value: 'Confident', prompt: 'portrait of a confident woman, powerful presence, assured expression, self-assured and commanding' },
    { value: 'Romantic', prompt: 'portrait of a romantic woman, soft and dreamy expression, loving eyes, passionate and tender personality' },
    { value: 'Witty', prompt: 'portrait of a witty woman, intelligent smile, clever expression, sharp sense of humor, quick-witted' },
    { value: 'Supportive', prompt: 'portrait of a supportive woman, encouraging expression, warm and helpful, reliable and trustworthy' },
  ],
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
        negative_prompt: 'blurry, low quality, distorted, ugly, bad anatomy, missing features, extra fingers, mutation, deformed',
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

async function generateAll() {
  console.log('\n🎨 GENERATING REMAINING ATTRIBUTE IMAGES\n');
  console.log('Categories: language, relationship, occupation, hobbies, personality\n');

  let totalImages = 0;
  let successCount = 0;
  let failureCount = 0;
  const failedImages = [];

  // Calculate total
  Object.values(CATEGORIES).forEach(values => {
    totalImages += values.length * 2; // realistic + anime
  });

  console.log(`📊 Total images to generate: ${totalImages}\n`);
  console.log('============================================================\n');

  let imageCount = 0;

  for (const [category, values] of Object.entries(CATEGORIES)) {
    for (const { value, prompt } of values) {
      for (const style of ['realistic', 'anime']) {
        imageCount++;
        const status = `[${imageCount}/${totalImages}] ${category} / ${value} / ${style}`;
        console.log(`\n${status}`);

        try {
          console.log(`   🎨 Generating...`);
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
          failedImages.push(`${category}/${value}/${style}`);
        }

        // 2 second delay between generations
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  }

  console.log(`\n\n============================================================\n`);
  console.log(`📊 GENERATION COMPLETE!\n`);
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${failureCount}`);
  console.log(`📊 Total: ${totalImages}\n`);

  if (failedImages.length > 0) {
    console.log(`Failed images:`);
    failedImages.forEach(img => {
      console.log(`  - ${img}`);
    });
  }
}

generateAll();
