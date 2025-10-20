#!/usr/bin/env node
/**
 * Script to generate only missing attribute images
 */

require('dotenv').config({ path: '.env' });
const fetch = require('node-fetch');

const NOVITA_API_KEY = process.env.NOVITA_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Missing images to generate
const MISSING_IMAGES = [
  { category: 'age', value: '30s', style: 'realistic' },
  { category: 'body', value: 'Slim', style: 'anime' },
  { category: 'body', value: 'Average', style: 'anime' },
  { category: 'ethnicity', value: 'Caucasian', style: 'anime' },
  { category: 'ethnicity', value: 'Asian', style: 'anime' },
  { category: 'ethnicity', value: 'Arab', style: 'anime' },
  { category: 'ethnicity', value: 'Latina', style: 'anime' },
  { category: 'ethnicity', value: 'African', style: 'anime' },
];

// Enhanced prompt builder
function buildPrompt(category, value, style) {
  const parts = [];

  if (style === 'realistic') {
    parts.push('attractive female avatar with life-like, ultra-realistic features, skin texture, and proportions');
    parts.push('idealized, polished, and highly desirable, resembles a real person');
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
    parts.push('professional portrait photography, studio lighting, perfect skin texture');
    parts.push('wearing elegant fashionable outfit, upper body shot, three-quarter view');
    parts.push('professional makeup, tasteful styling, high quality, 8k resolution, sharp focus');
  } else {
    parts.push('professional anime illustration, detailed face and eyes, clean lines');
    parts.push('stylish anime outfit, vibrant colors, upper body portrait, dynamic pose');
    parts.push('studio quality anime art, cel shading, high detail, professional digital art');
  }

  return parts.filter(Boolean).join(', ');
}

// Generate image with Novita AI
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
      for (let i = 0; i < 60; i++) {
        await new Promise(resolve => setTimeout(resolve, 3000));
        const pollResponse = await fetch(
          `https://api.novita.ai/v3/async/task-result?task_id=${taskId}`,
          { headers: { 'Authorization': `Bearer ${NOVITA_API_KEY}` }}
        );

        if (!pollResponse.ok) continue;
        const pollData = await pollResponse.json();

        if (pollData.task.status === 'TASK_STATUS_SUCCEED') {
          let imageUrl = null;
          let seed = -1;
          
          // Try multiple paths to find the image URL
          // The response structure is: pollData.images[0].image_url (NOT pollData.task.images!)
          if (pollData.images && pollData.images.length > 0) {
            const img = pollData.images[0];
            imageUrl = img.image_url || img.url || (typeof img === 'string' ? img : null);
          } else if (pollData.task.images && pollData.task.images.length > 0) {
            const img = pollData.task.images[0];
            imageUrl = img.image_url || img.url || (typeof img === 'string' ? img : null);
          } else if (pollData.task.image_url) {
            imageUrl = pollData.task.image_url;
          } else if (pollData.task.image) {
            imageUrl = pollData.task.image;
          }
          
          // Get seed from extra.seed or task.seed
          if (pollData.extra && pollData.extra.seed) {
            seed = parseInt(pollData.extra.seed);
          } else if (pollData.task.seed) {
            seed = pollData.task.seed;
          }
          
          if (!imageUrl) {
            console.log('\n  🔍 Response structure:', JSON.stringify(pollData, null, 2));
            throw new Error('No image URL in response');
          }
          return { url: imageUrl, seed };
        } else if (pollData.task.status === 'TASK_STATUS_FAILED') {
          throw new Error(`Generation failed: ${pollData.task.reason}`);
        }
        process.stdout.write('.');
      }
      throw new Error('Timeout');
    } catch (error) {
      if (attempt < retries && (error.message.includes('ECONNRESET') || error.message.includes('fetch failed'))) {
        console.log(`  ⚠️  Connection error, retrying (${attempt}/${retries})...`);
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
        console.log(`  ⚠️  Download retry (${attempt}/${retries})...`);
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
          console.log(`  ⚠️  Upload retry (${attempt}/${retries})...`);
          await new Promise(resolve => setTimeout(resolve, 3000 * attempt));
          continue;
        }
        throw new Error(`Upload error: ${await response.text()}`);
      }

      return `${SUPABASE_URL}/storage/v1/object/public/assets/attribute-images/${filename}`;
    } catch (error) {
      if (attempt < retries && error.message.includes('ECONNRESET')) {
        console.log(`  ⚠️  Connection retry (${attempt}/${retries})...`);
        await new Promise(resolve => setTimeout(resolve, 3000));
        continue;
      }
      throw error;
    }
  }
}

async function saveToDatabase(category, value, style, imageUrl, seed, prompt) {
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
  console.log(`🚀 Generating ${MISSING_IMAGES.length} missing images...\n`);

  let success = 0;
  let failed = 0;

  for (let i = 0; i < MISSING_IMAGES.length; i++) {
    const { category, value, style } = MISSING_IMAGES[i];
    
    console.log(`\n[${i + 1}/${MISSING_IMAGES.length}] 🎯 ${category} / ${value} / ${style}`);
    
    try {
      const prompt = buildPrompt(category, value, style);
      const truncated = prompt.substring(0, 80) + '...';
      console.log(`  📝 ${truncated}`);
      
      console.log(`  🎨 Generating...`);
      const { url, seed } = await generateImage(prompt);
      console.log(`  ✅ Generated!`);
      
      console.log(`  📥 Downloading...`);
      const imageBuffer = await downloadImage(url);
      console.log(`  ✅ Downloaded!`);
      
      const filename = `${category}-${value.toLowerCase().replace(/\+/g, '')}-${style}-${Date.now()}.jpg`;
      console.log(`  ☁️  Uploading...`);
      const publicUrl = await uploadToSupabase(imageBuffer, filename);
      console.log(`  ✅ Uploaded!`);
      
      console.log(`  💾 Saving to database...`);
      await saveToDatabase(category, value, style, publicUrl, seed, prompt);
      console.log(`  ✅ Complete!`);
      
      success++;
      
      // Wait between requests to avoid rate limits
      if (i < MISSING_IMAGES.length - 1) {
        console.log(`  ⏸️  Waiting 3 seconds...`);
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    } catch (error) {
      console.log(`  ❌ ERROR: ${error.message}`);
      failed++;
    }
  }

  console.log(`\n\n${'='.repeat(60)}`);
  console.log(`✅ Completed: ${success}/${MISSING_IMAGES.length} successful`);
  console.log(`❌ Failed: ${failed}`);
  console.log('='.repeat(60));
}

main().catch(console.error);
