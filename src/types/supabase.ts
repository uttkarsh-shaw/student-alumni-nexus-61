
// This defines the database schema for TypeScript type checking
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
        Insert: {
          id: string;
          full_name?: string | null;
          email?: string | null;
          user_type?: "student" | "alumni" | null;
          institute?: string | null;
          branch?: string | null;
          graduation_year?: string | null;
          skills?: string[] | null;
          career_info?: Json | null;
          linkedin_url?: string | null;
          portfolio_url?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        }
        Update: {
          id?: string;
          full_name?: string | null;
          email?: string | null;
          user_type?: "student" | "alumni" | null;
          institute?: string | null;
          branch?: string | null;
          graduation_year?: string | null;
          skills?: string[] | null;
          career_info?: Json | null;
          linkedin_url?: string | null;
          portfolio_url?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        }
      }
    }
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  }
}
