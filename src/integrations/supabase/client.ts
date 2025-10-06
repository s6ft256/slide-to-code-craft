import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// These environment variables are set in the .env file for local development
// and in the deployment platform for production
// Project: hse_wkflow, Project ID: tjwntuutssejybhpdnbe
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Export auth for convenience
export const auth = supabase.auth;