
// This is a placeholder. After you run
// npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/supabase.ts
// this file will be overwritten with your database type definitions.
//
// For now, let's define the profiles table minimally to fix TS errors:
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          email: string | null;
          user_type: "student" | "alumni" | null;
          institute: string | null;
          branch: string | null;
          graduation_year: string | null;
          skills: string[] | null;
          career_info: {
            company?: string;
            role?: string;
          } | null;
          linkedin_url: string | null;
          portfolio_url: string | null;
          created_at: string | null;
          updated_at: string | null;
        }
        Insert: Partial<Database["public"]["Tables"]["profiles"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["profiles"]["Row"]>;
      }
    }
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  }
}
