
import { createClient } from '@supabase/supabase-js';

// Make sure to set these environment variables in your project
// You can set them in a .env file at the root of your project
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Notify about missing environment variables but provide fallbacks to prevent app crashes
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.');
  console.warn('Using placeholder values. Authentication and database operations will not work correctly.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Optional mock function that can be used to check if supabase connection is valid
export const isSupabaseConfigured = () => {
  return import.meta.env.VITE_SUPABASE_URL && 
         import.meta.env.VITE_SUPABASE_ANON_KEY && 
         import.meta.env.VITE_SUPABASE_URL !== 'https://placeholder-url.supabase.co';
};
