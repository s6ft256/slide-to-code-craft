import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://tjwntuutssejybhpdnbe.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqd250dXV0c3NlanliaHBkbmJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2NDU3NTksImV4cCI6MjA3MzIyMTc1OX0.iqqvanvFR8YBNxlnjGHoh-EpNEkbg9lpgAei-I0BZbM";

const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: window?.localStorage,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
});

export { supabase };
