#!/usr/bin/env node
/**
 * Regenerate BETTER quality images for existing categories
 * Focus on making images truly representative of what they should be
 */

require('dotenv').config();
const fetch = require('node-fetch');

const NOVITA_API_KEY = process.env.NOVITA_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// IMPROVED PROMPTS - More specific and accurate
const IMPROVED_PROMPTS = {
  age: {
    '18-19': {
      realistic: 'professional portrait photo of an 18 year old woman, very youthful teenage face, smooth clear skin without wrinkles, bright energetic eyes, playful innocent expression, fresh natural makeup, trendy young adult clothing, studio lighting, high detail, photorealistic, 8k quality',
      anime: 'anime illustration of an 18 year old girl, very youthful cute face, large expressive teenage eyes, smooth anime skin, playful cheerful expression, school uniform or casual young clothing, vibrant colors, professional anime art style, high detail digital art'
    },
    '20s': {
      realistic: 'professional portrait photo of a 25 year old woman, youthful adult features, clear healthy skin, confident vibrant expression, modern young adult style, fashionable outfit, studio lighting, photorealistic, sharp focus, 8k quality',
      anime: 'anime illustration of a woman in her twenties, youthful adult anime face, bright expressive eyes, confident smile, trendy fashionable outfit, vibrant anime colors, professional digital art, detailed'
    },
    '30s': {
      realistic: 'professional portrait photo of a 35 year old woman, mature confident features, refined facial structure, subtle laugh lines showing life experience, sophisticated professional style, elegant outfit, studio lighting, photorealistic, 8k quality',
      anime: 'anime illustration of a woman in her thirties, mature confident anime face, elegant features, sophisticated expression, professional business attire, refined anime style, high detail digital art'
    },
    '40s': {
      realistic: 'professional portrait photo of a 45 year old woman, mature distinguished features, visible fine lines and character, wise confident expression, elegant sophisticated style, professional attire, studio lighting, photorealistic, 8k quality',
      anime: 'anime illustration of a woman in her forties, mature elegant anime face, refined features showing experience, confident composed expression, sophisticated professional outfit, detailed anime art'
    },
    '50s': {
      realistic: 'professional portrait photo of a 55 year old woman, mature graceful features, noticeable aging with dignity, gray hair streaks possible, warm experienced expression, elegant classic style, studio lighting, photorealistic, 8k quality',
      anime: 'anime illustration of a woman in her fifties, mature graceful anime face, subtle aging features, kind wise expression, elegant refined outfit, soft anime colors, professional digital art'
    },
    '60s': {
      realistic: 'professional portrait photo of a 65 year old woman, senior distinguished features, gray or white hair, visible wrinkles showing wisdom, warm gentle expression, classic elegant attire, studio lighting, photorealistic, 8k quality',
      anime: 'anime illustration of a woman in her sixties, senior graceful anime face, silver or gray hair, gentle wise expression, classic elegant clothing, soft refined anime style, detailed'
    },
    '70+': {
      realistic: 'professional portrait photo of a 75 year old elderly woman, aged features with character lines, white or gray hair, deep wrinkles showing life lived, warm grandmother-like expression, comfortable classic clothing, studio lighting, photorealistic, 8k quality',
      anime: 'anime illustration of an elderly woman 70+ years old, aged graceful anime face, white hair, gentle wise grandmother expression, comfortable traditional clothing, soft warm anime colors, detailed digital art'
    }
  },
  
  body: {
    'Muscular': {
      realistic: 'professional photo of athletic woman with muscular defined physique, visible toned arms and shoulders, strong athletic build, confident pose, fitted athletic wear showing muscle definition, gym or studio background, photorealistic, 8k quality',
      anime: 'anime illustration of muscular athletic woman, defined toned anime body, strong arms and shoulders, confident powerful pose, sporty athletic outfit, vibrant anime style, high detail'
    },
    'Athletic': {
      realistic: 'professional photo of fit athletic woman, lean toned physique, healthy athletic build, active sporty appearance, fitted athletic clothing, confident energetic pose, studio lighting, photorealistic, 8k quality',
      anime: 'anime illustration of athletic fit woman, lean toned anime body, sporty healthy appearance, active confident pose, athletic sportswear, vibrant anime colors, detailed'
    },
    'Slim': {
      realistic: 'professional photo of slender slim woman, petite delicate frame, narrow shoulders and waist, graceful elegant posture, fitted casual clothing showing slender figure, studio lighting, photorealistic, 8k quality',
      anime: 'anime illustration of slim slender woman, petite delicate anime body, graceful elegant pose, fitted casual outfit, soft anime colors, high detail digital art'
    },
    'Chubby': {
      realistic: 'professional photo of plus-size curvy woman, soft fuller figure, rounded comfortable appearance, warm approachable expression, fitted casual clothing, confident natural pose, studio lighting, photorealistic, 8k quality',
      anime: 'anime illustration of chubby fuller-figured woman, soft rounded anime body, warm friendly expression, comfortable casual outfit, cute anime style, detailed'
    },
    'Cub': {
      realistic: 'professional photo of stocky solidly-built woman, strong sturdy frame, thick muscular build, powerful grounded stance, casual comfortable clothing, confident pose, studio lighting, photorealistic, 8k quality',
      anime: 'anime illustration of stocky solidly-built woman, strong sturdy anime body, powerful confident pose, casual comfortable outfit, bold anime style, detailed'
    },
    'Average': {
      realistic: 'professional photo of woman with average normal physique, balanced proportions, healthy natural build, everyday relatable appearance, casual clothing, natural confident pose, studio lighting, photorealistic, 8k quality',
      anime: 'anime illustration of woman with average normal body, balanced anime proportions, natural everyday appearance, casual outfit, standard anime style, detailed'
    },
    'Curvy': {
      realistic: 'professional photo of curvy hourglass woman, full feminine curves, defined waist with wider hips and bust, voluptuous attractive figure, fitted dress or outfit, confident sensual pose, studio lighting, photorealistic, 8k quality',
      anime: 'anime illustration of curvy hourglass woman, full feminine anime curves, defined waist and hips, attractive voluptuous figure, fitted outfit, confident pose, vibrant anime style, detailed'
    }
  },
  
  ethnicity: {
    'Caucasian': {
      realistic: 'professional portrait of beautiful Caucasian European woman, fair to light skin tone, European facial features with defined nose and cheekbones, light colored hair and eyes, elegant appearance, studio lighting, photorealistic, 8k quality',
      anime: 'anime illustration of beautiful Caucasian woman, fair skin anime style, European features, light colored hair, bright eyes, elegant refined anime art, detailed'
    },
    'Asian': {
      realistic: 'professional portrait of beautiful East Asian woman, light golden skin tone, distinctly Asian facial features with almond eyes and straight black hair, elegant appearance, studio lighting, photorealistic, 8k quality',
      anime: 'anime illustration of beautiful Asian woman, typical anime East Asian features, almond eyes, black straight hair, classic anime style, detailed'
    },
    'Arab': {
      realistic: 'professional portrait of beautiful Arab Middle Eastern woman, olive to tan skin tone, strong defined Middle Eastern facial features, dark hair and eyes, elegant hijab optional, studio lighting, photorealistic, 8k quality',
      anime: 'anime illustration of beautiful Arab woman, olive tan anime skin, Middle Eastern features, dark hair and eyes, elegant refined anime style, detailed'
    },
    'Indian': {
      realistic: 'professional portrait of beautiful Indian South Asian woman, medium brown to tan skin tone, Indian facial features with distinctive nose and large eyes, long dark hair, traditional or modern outfit, studio lighting, photorealistic, 8k quality',
      anime: 'anime illustration of beautiful Indian woman, brown tan anime skin, South Asian features, long dark hair, large expressive eyes, traditional or modern outfit, vibrant anime style, detailed'
    },
    'Latina': {
      realistic: 'professional portrait of beautiful Latina Hispanic woman, warm tan to brown skin tone, Latin American facial features, dark wavy hair, vibrant expressive features, elegant appearance, studio lighting, photorealistic, 8k quality',
      anime: 'anime illustration of beautiful Latina woman, warm tan anime skin, Latin features, dark wavy hair, vibrant expressive face, colorful anime style, detailed'
    },
    'African': {
      realistic: 'professional portrait of beautiful African Black woman, deep brown to dark skin tone, distinctly African facial features, natural black hair in braids twists or afro, elegant appearance, studio lighting, photorealistic, 8k quality',
      anime: 'anime illustration of beautiful African woman, dark brown anime skin, African features, natural black hair styled, vibrant anime colors, detailed digital art'
    },
    'Mixed': {
      realistic: 'professional portrait of beautiful mixed-race woman, blended ethnic features combining multiple backgrounds, unique harmonious facial structure, varied skin tone, natural diverse beauty, studio lighting, photorealistic, 8k quality',
      anime: 'anime illustration of beautiful mixed-race woman, blended ethnic anime features, unique harmonious face, diverse beauty, vibrant anime style, detailed'
    }
  }
};

const NEGATIVE_PROMPT = 'nude, naked, nsfw, explicit, sexual, vulgar, inappropriate, deformed, ugly, bad anatomy, bad proportions, extra limbs, missing limbs, disfigured, distorted face, blurry, low quality, watermark, text, multiple people, child, underage';

async function generateImage(prompt, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch('https://api.novita.ai/v3/async/txt2img', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${NOVITA_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          extra: { response_image_type: 'jpeg' },
          request: {
            model_name: 'sd_xl_base_1.0.safetensors',
            prompt: prompt,
            negative_prompt: NEGATIVE_PROMPT,
            width: 512,
            height: 768,
            sampler_name: 'DPM++ 2M Karras',
            steps: 40, // Increased for better quality
            guidance_scale: 8, // Increased for better prompt adherence
            seed: -1,
            batch_size: 1,
            image_num: 1,
          }
        }),
      });

      if (!response.ok) {
        if (attempt < retries) {
          console.log(`  ⚠️  API error, retrying (${attempt}/${retries})...`);
          await new Promise(resolve => setTimeout(resolve, 5000 * attempt));
          continue;
        }
        throw new Error(`Novita API error: ${await response.text()}`);
      }

      const data = await response.json();
      const taskId = data.task_id;

      // Poll for completion
      for (let i = 0; i < 80; i++) { // Increased timeout
        await new Promise(resolve => setTimeout(resolve, 3000));
        const pollResponse = await fetch(
          `https://api.novita.ai/v3/async/task-result?task_id=${taskId}`,
          { headers: { 'Authorization': `Bearer ${NOVITA_API_KEY}` }}
        );

        if (!pollResponse.ok) continue;
        const pollData = await pollResponse.json();

        if (pollData.task.status === 'TASK_STATUS_SUCCEED') {
          let imageUrl = null;
          if (pollData.images && pollData.images.length > 0) {
            imageUrl = pollData.images[0].image_url;
          }
          
          if (!imageUrl) throw new Error('No image URL in response');
          return { url: imageUrl, seed: pollData.task.seed || -1 };
        } else if (pollData.task.status === 'TASK_STATUS_FAILED') {
          throw new Error(`Generation failed: ${pollData.task.reason}`);
        }
        process.stdout.write('.');
      }
      throw new Error('Timeout');
    } catch (error) {
      if (attempt < retries) {
        console.log(`  ⚠️  Error, retrying (${attempt}/${retries})...`);
        await new Promise(resolve => setTimeout(resolve, 5000 * attempt));
        continue;
      }
      throw error;
    }
  }
}

async function downloadImage(url, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.buffer();
    } catch (error) {
      if (attempt < retries) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        continue;
      }
      throw error;
    }
  }
}

async function uploadToSupabase(imageBuffer, filename, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
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
        if ((response.status === 502 || response.status === 503) && attempt < retries) {
          await new Promise(resolve => setTimeout(resolve, 3000 * attempt));
          continue;
        }
        throw new Error(`Upload error: ${await response.text()}`);
      }

      return `${SUPABASE_URL}/storage/v1/object/public/assets/attribute-images/${filename}`;
    } catch (error) {
      if (attempt < retries) {
        await new Promise(resolve => setTimeout(resolve, 3000));
        continue;
      }
      throw error;
    }
  }
}

async function updateDatabase(category, value, style, imageUrl, seed, prompt) {
  // Delete old version first
  await fetch(
    `${SUPABASE_URL}/rest/v1/attribute_images?category=eq.${category}&value=eq.${encodeURIComponent(value)}&style=eq.${style}`,
    {
      method: 'DELETE',
      headers: {
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
      },
    }
  );

  // Insert new version
  const response = await fetch(
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
        category, value, style,
        image_url: imageUrl,
        seed, prompt,
        width: 512, height: 768,
      }),
    }
  );

  if (!response.ok && response.status !== 409) {
    throw new Error(`Database error: ${await response.text()}`);
  }
}

async function main() {
  console.log('🎨 REGENERATING HIGH-QUALITY IMAGES\n');
  console.log('This will replace existing images with better, more accurate ones.\n');

  let success = 0;
  let failed = 0;
  let total = 0;

  // Count total
  for (const category of ['age', 'body', 'ethnicity']) {
    total += Object.keys(IMPROVED_PROMPTS[category]).length * 2;
  }

  console.log(`Total images to regenerate: ${total}\n`);

  for (const category of ['age', 'body', 'ethnicity']) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📁 Category: ${category.toUpperCase()}`);
    console.log('='.repeat(60));

    for (const [value, styles] of Object.entries(IMPROVED_PROMPTS[category])) {
      for (const [style, prompt] of Object.entries(styles)) {
        const index = success + failed + 1;
        console.log(`\n[${index}/${total}] 🎯 ${category} / ${value} / ${style}`);
        
        try {
          console.log(`  🎨 Generating with improved prompt...`);
          const { url, seed } = await generateImage(prompt);
          console.log(`  ✅ Generated!`);
          
          console.log(`  📥 Downloading...`);
          const imageBuffer = await downloadImage(url);
          console.log(`  ✅ Downloaded!`);
          
          const filename = `${category}-${value.toLowerCase().replace(/\+/g, '').replace(/\s+/g, '-')}-${style}-${Date.now()}.jpg`;
          console.log(`  ☁️  Uploading...`);
          const publicUrl = await uploadToSupabase(imageBuffer, filename);
          console.log(`  ✅ Uploaded!`);
          
          console.log(`  💾 Updating database...`);
          await updateDatabase(category, value, style, publicUrl, seed, prompt);
          console.log(`  ✅ Complete!`);
          
          success++;
          
          // Rate limiting
          if (index < total) {
            console.log(`  ⏸️  Waiting 3 seconds...`);
            await new Promise(resolve => setTimeout(resolve, 3000));
          }
        } catch (error) {
          console.log(`  ❌ ERROR: ${error.message}`);
          failed++;
        }
      }
    }
  }

  console.log(`\n\n${'='.repeat(60)}`);
  console.log(`✅ Regeneration Complete!`);
  console.log(`   Success: ${success}/${total}`);
  console.log(`   Failed: ${failed}`);
  console.log('='.repeat(60));
}

main().catch(console.error);
