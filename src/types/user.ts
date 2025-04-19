
export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  user_type: 'student' | 'alumni';
  institute: string;
  branch: string;
  graduation_year: string;
  skills?: string[];
  career_info?: {
    company?: string;
    role?: string;
  };
  linkedin_url?: string;
  portfolio_url?: string;
  created_at: string;
  updated_at: string;
}
