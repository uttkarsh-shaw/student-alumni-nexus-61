
// Supabase typed client, do not edit directly except for type changes!
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const SUPABASE_URL = "https://kglghnrexhcnjfdploac.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnbGdobnJleGhjbmpmZHBsb2FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwOTA3NTksImV4cCI6MjA2MDY2Njc1OX0.iRL2jlKXbH0mj3kZCzTV6KFfSFBKEipNWEq84c5JKAk";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
