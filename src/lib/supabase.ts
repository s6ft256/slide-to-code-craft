import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vhipieatnyexggqllfqe.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoaXBpZWF0bnlleGdncWxsZnFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwNTc3NTksImV4cCI6MjEwMTYzMzc1OX0.2rR_VwFJ-1bZXWdFUx57XXVnmvwByBQKttMr_2ZJU3w';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
