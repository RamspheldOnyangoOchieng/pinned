#!/usr/bin/env node
/**
 * Create Supabase storage buckets used by the app.
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars.
 */
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

async function ensureBucket(name, publicAccess = false) {
  try {
    const { data: existing } = await supabase.storage.listBuckets()
    const found = existing?.find((b) => b.name === name)
    if (found) {
      console.log(`Bucket exists: ${name}`)
      return true
    }

    const { data, error } = await supabase.storage.createBucket(name, { public: publicAccess })
    if (error) {
      console.error(`Failed to create bucket ${name}:`, error.message || error)
      return false
    }
    console.log(`Created bucket: ${name}`)
    return true
  } catch (err) {
    console.error('Error ensuring bucket:', err.message || err)
    return false
  }
}

async function main() {
  // Buckets used by the app
  const buckets = [
    { name: 'assets', public: true },
    { name: 'attributes', public: false },
    { name: 'banners', public: true },
  ]

  for (const b of buckets) {
    const ok = await ensureBucket(b.name, b.public)
    if (!ok) process.exit(1)
  }

  console.log('\nDone. Please review bucket policies in the Supabase dashboard:')
  console.log('- For public buckets (assets, banners) set appropriate public read policies if needed')
  console.log('- For private buckets (attributes) ensure only authenticated/service role can access/upload')
  console.log('\nIf you want the script to also set RLS policies or SQL, tell me and I can extend it.')
}

main()
