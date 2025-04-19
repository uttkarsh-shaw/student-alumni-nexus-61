
import { createClient } from '@supabase/supabase-js';

// Make sure to set these environment variables in your project
// You can set them in a .env file at the root of your project
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verify that the environment variables are properly loaded
if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
