#!/usr/bin/env node
/**
 * Test script for Novita AI image generation
 * Tests API connectivity and image generation workflow
 * 
 * Usage: node scripts/test-novita.js
 */

const https = require('https');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const NOVITA_API_KEY = process.env.NOVITA_API_KEY || process.env.NEXT_PUBLIC_NOVITA_API_KEY;

if (!NOVITA_API_KEY) {
  console.error('❌ Error: NOVITA_API_KEY not found in environment');
  console.error('Make sure .env.local contains NOVITA_API_KEY or NEXT_PUBLIC_NOVITA_API_KEY');
  process.exit(1);
}

console.log('🎨 Testing Novita AI Image Generation...\n');

// Step 1: Submit image generation task
function submitTask() {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      model_name: 'flux-schnell_v1.1',
      prompt: 'beautiful woman portrait, professional photography, high detail, sharp focus',
      negative_prompt: 'blurry, low quality, distorted, deformed, ugly',
      width: 512,
      height: 768,
      steps: 4,
      seed: -1,
      guidance_scale: 3.5,
      sampler_name: 'Euler',
      image_num: 1
    });

    const options = {
      hostname: 'api.novita.ai',
      path: '/v3/async/txt2img',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOVITA_API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    console.log('📤 Submitting image generation task...');
    
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          
          if (res.statusCode !== 200) {
            reject(new Error(`HTTP ${res.statusCode}: ${response.message || body}`));
            return;
          }
          
          if (response.task_id) {
            console.log('✅ Task submitted successfully');
            console.log(`📋 Task ID: ${response.task_id}\n`);
            resolve(response.task_id);
          } else {
            reject(new Error(`Failed to submit task: ${body}`));
          }
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}\nResponse: ${body}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(new Error(`Network error: ${error.message}`));
    });
    
    req.write(data);
    req.end();
  });
}

// Step 2: Check task status
function checkTaskStatus(taskId, attempt = 1) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.novita.ai',
      path: `/v3/async/task-result?task_id=${taskId}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${NOVITA_API_KEY}`
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          const status = response.task?.status || 'UNKNOWN';
          
          process.stdout.write(`⏳ Attempt ${attempt}: Status = ${status}\r`);

          if (status === 'TASK_STATUS_SUCCEED') {
            console.log('\n\n✅ Image generation completed successfully!');
            console.log(`🖼️  Image URL: ${response.images[0]?.image_url || 'N/A'}`);
            console.log(`⏱️  Generation time: ~${attempt * 2} seconds`);
            console.log(`\n💡 You can download the image from the URL above.`);
            resolve(response);
          } else if (status === 'TASK_STATUS_FAILED') {
            console.log('\n');
            reject(new Error(`Task failed: ${response.task?.reason || 'Unknown error'}`));
          } else if (attempt > 30) {
            console.log('\n');
            reject(new Error('Timeout: Task took too long (>60 seconds)'));
          } else {
            // Wait 2 seconds and try again
            setTimeout(() => {
              checkTaskStatus(taskId, attempt + 1)
                .then(resolve)
                .catch(reject);
            }, 2000);
          }
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}\nResponse: ${body}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(new Error(`Network error: ${error.message}`));
    });
    
    req.end();
  });
}

// Step 3: Get user info (optional)
function getUserInfo() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.novita.ai',
      path: '/v3/user/info',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${NOVITA_API_KEY}`
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          if (res.statusCode === 200) {
            console.log('\n📊 Account Information:');
            console.log(`   Balance: $${response.balance || '0.00'}`);
            console.log(`   Email: ${response.email || 'N/A'}`);
            resolve(response);
          } else {
            // Non-critical, don't fail the test
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    });

    req.on('error', () => resolve(null));
    req.end();
  });
}

// Run test
async function main() {
  try {
    console.log('🔑 API Key detected (starts with: ' + NOVITA_API_KEY.substring(0, 10) + '...)\n');
    
    // Optional: Get user info
    await getUserInfo();
    
    // Submit task
    const taskId = await submitTask();
    
    // Check status until complete
    await checkTaskStatus(taskId);
    
    console.log('\n✅ Novita AI test completed successfully!\n');
    console.log('Your Novita AI integration is working correctly.');
    console.log('You can now use image generation in your application.\n');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error('\nTroubleshooting steps:');
    console.error('1. Verify NOVITA_API_KEY in .env.local is correct');
    console.error('2. Check your Novita AI account has sufficient credits');
    console.error('3. Verify API key permissions in Novita dashboard');
    console.error('4. Check Novita AI status: https://status.novita.ai\n');
    process.exit(1);
  }
}

main();
