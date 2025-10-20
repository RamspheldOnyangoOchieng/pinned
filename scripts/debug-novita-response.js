#!/usr/bin/env node
require('dotenv').config();
const fetch = require('node-fetch');

const NOVITA_API_KEY = process.env.NOVITA_API_KEY;

async function testGeneration() {
  console.log('🧪 Testing Novita API response structure...\n');
  
  // Submit a simple test request
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
        prompt: 'beautiful woman portrait',
        width: 512,
        height: 768,
        sampler_name: 'DPM++ 2M Karras',
        steps: 20,
        guidance_scale: 7.5,
        seed: -1,
        image_num: 1,
      }
    }),
  });

  const data = await response.json();
  console.log('📝 Initial response:');
  console.log(JSON.stringify(data, null, 2));
  
  const taskId = data.task_id;
  console.log(`\n⏳ Task ID: ${taskId}`);
  console.log('⏳ Waiting for completion...\n');

  // Poll a few times to see the structure
  for (let i = 0; i < 30; i++) {
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const pollResponse = await fetch(
      `https://api.novita.ai/v3/async/task-result?task_id=${taskId}`,
      { headers: { 'Authorization': `Bearer ${NOVITA_API_KEY}` }}
    );

    const pollData = await pollResponse.json();
    console.log(`Poll ${i + 1}: Status = ${pollData.task?.status || 'unknown'}`);

    if (pollData.task.status === 'TASK_STATUS_SUCCEED') {
      console.log('\n✅ SUCCESS! Full response structure:');
      console.log(JSON.stringify(pollData, null, 2));
      
      console.log('\n🔍 Analyzing structure:');
      console.log('pollData.task.images:', pollData.task?.images);
      console.log('pollData.task.image_url:', pollData.task?.image_url);
      console.log('pollData.images:', pollData.images);
      
      if (pollData.task?.images && pollData.task.images.length > 0) {
        console.log('\n📸 First image object:');
        console.log(JSON.stringify(pollData.task.images[0], null, 2));
      }
      
      break;
    } else if (pollData.task.status === 'TASK_STATUS_FAILED') {
      console.log('\n❌ Generation failed:', pollData.task.reason);
      break;
    }
  }
}

testGeneration().catch(console.error);
