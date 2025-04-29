/**
 * supabaseClient.ts
 * Initializes and exports a single Supabase client instance for use throughout the app.
 */
import { createClient } from '@supabase/supabase-js'

// Ensure environment variables are set (they must start with VITE_ for Vite to expose them)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)