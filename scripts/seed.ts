import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config()

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

async function upsertStripeKeys() {
  const testSecret = process.env.STRIPE_TEST_SECRET_KEY || null
  const testPub = process.env.STRIPE_TEST_PUBLISHABLE_KEY || null
  const liveSecret = process.env.STRIPE_LIVE_SECRET_KEY || null
  const livePub = process.env.STRIPE_LIVE_PUBLISHABLE_KEY || null

  const exists = await supabase.from('stripe_keys').select('*').limit(1)
  if (exists.error) {
    console.warn('stripe_keys table may not exist or cannot be read:', exists.error.message)
    return
  }

  if (exists.data && exists.data.length > 0) {
    const { error } = await supabase.from('stripe_keys').update({
      test_publishable_key: testPub,
      test_secret_key: testSecret,
      live_publishable_key: livePub,
      live_secret_key: liveSecret,
      updated_at: new Date().toISOString(),
    }).eq('id', exists.data[0].id)

    if (error) console.error('Failed to update stripe_keys:', error.message)
    else console.log('Updated existing stripe_keys row')
    return
  }

  const { error } = await supabase.from('stripe_keys').insert([{
    test_publishable_key: testPub,
    test_secret_key: testSecret,
    live_publishable_key: livePub,
    live_secret_key: liveSecret,
  }])

  if (error) console.error('Failed to insert stripe_keys:', error.message)
  else console.log('Inserted stripe_keys row')
}

async function createAdminByEmail(email: string) {
  try {
    // Some versions of @supabase/supabase-js don't expose getUserByEmail on the admin API types.
    // Try getUserByEmail, otherwise fall back to listUsers/search.
    const adminApi: any = (supabase.auth as any).admin

    let userId: string | null = null

    const getUserByEmailFn = (adminApi as any)['getUserByEmail']
    const listUsersFn = (adminApi as any)['listUsers']

    if (typeof getUserByEmailFn === 'function') {
      const resp = await getUserByEmailFn.call(adminApi, email)
      if (resp?.data?.user) userId = resp.data.user.id
    } else if (typeof listUsersFn === 'function') {
      // listUsers typically returns { data: { users: [...] } }
      const resp = await listUsersFn.call(adminApi, { search: email })
      const users = resp?.data?.users || resp?.data || []
      const found = users.find((u: any) => u.email === email)
      if (found) userId = found.id
    } else {
      console.error('Admin user lookup not available on this client. Please run the script create-admin-user.ts in this repo for interactive creation.')
      return
    }

    if (!userId) {
      console.error('User not found. Please sign up the user first using the app and retry.')
      return
    }

    // Insert into admin_users table
    const { error } = await supabase.from('admin_users').upsert({ user_id: userId }, { onConflict: 'user_id' })
    if (error) console.error('Failed to upsert admin user:', error.message)
    else console.log(`User ${email} added to admin_users`)
  } catch (err: any) {
    console.error('Unexpected error creating admin by email:', err.message || err)
  }
}

async function main() {
  await upsertStripeKeys()

  // Optionally create admin if env var provided
  const adminEmail = process.env.INIT_ADMIN_EMAIL
  if (adminEmail) {
    console.log('Creating admin for', adminEmail)
    await createAdminByEmail(adminEmail)
  } else {
    console.log('No INIT_ADMIN_EMAIL provided — skipping admin creation')
  }
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1) })
