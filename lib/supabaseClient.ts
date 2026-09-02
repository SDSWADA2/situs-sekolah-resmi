import { createClient } from '@supabase/supabase-js'

// Client-side Supabase helper. Safe to expose NEXT_PUBLIC_* keys to the browser.
// Use this in React components or client-side code only.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: true },
})
