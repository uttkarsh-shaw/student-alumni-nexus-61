
import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserRound } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { UserProfile } from "@/types/user";

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (data && !error) {
          setProfile(data);
        }
      }
      setLoading(false);
    }
    
    loadProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow bg-gray-50 dark:bg-navy-800 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-amber-500 text-navy-900">
                  <UserRound className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">My Profile</CardTitle>
                <p className="text-gray-500">{profile?.email}</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Full Name</h3>
                  <p>{profile?.full_name}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">User Type</h3>
                  <p className="capitalize">{profile?.user_type}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Institute</h3>
                  <p>{profile?.institute}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Branch</h3>
                  <p>{profile?.branch}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Graduation Year</h3>
                  <p>{profile?.graduation_year}</p>
                </div>
                {profile?.career_info && (
                  <>
                    <div>
                      <h3 className="font-semibold mb-2">Current Company</h3>
                      <p>{profile.career_info.company || 'Not specified'}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Current Role</h3>
                      <p>{profile.career_info.role || 'Not specified'}</p>
                    </div>
                  </>
                )}
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profile?.skills?.map((skill, index) => (
                    <span key={index} className="bg-gray-100 dark:bg-navy-700 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Professional Links</h3>
                {profile?.linkedin_url && (
                  <p>
                    <span className="font-medium">LinkedIn:</span>{" "}
                    <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:underline">
                      View Profile
                    </a>
                  </p>
                )}
                {profile?.portfolio_url && (
                  <p>
                    <span className="font-medium">Portfolio:</span>{" "}
                    <a href={profile.portfolio_url} target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:underline">
                      View Portfolio
                    </a>
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
