
import { createClient } from '@supabase/supabase-js';

// Using direct configuration values from the connected Supabase project
const supabaseUrl = 'https://kglghnrexhcnjfdploac.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnbGdobnJleGhjbmpmZHBsb2FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwOTA3NTksImV4cCI6MjA2MDY2Njc1OX0.iRL2jlKXbH0mj3kZCzTV6KFfSFBKEipNWEq84c5JKAk';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Function to check if supabase is properly configured
export const isSupabaseConfigured = () => {
  return true; // Since we're now hardcoding the values
};
