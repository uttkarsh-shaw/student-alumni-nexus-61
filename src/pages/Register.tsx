
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthCard from "@/components/AuthCard";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import StudentRegistrationForm from "@/components/forms/StudentRegistrationForm";
import AlumniRegistrationForm from "@/components/forms/AlumniRegistrationForm";
import type { RegistrationFormData } from "@/types/auth";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userType, setUserType] = useState("student");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<RegistrationFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    branch: "",
    graduationYear: "",
    institute: "",
    agreeTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (!formData.agreeTerms) {
      toast({
        title: "Error",
        description: "Please agree to the Terms of Service and Privacy Policy",
        variant: "destructive",
      });
      return;
    }

    // Check if Supabase is properly configured before attempting registration
    if (!isSupabaseConfigured()) {
      toast({
        title: "Configuration Error",
        description: "Supabase is not properly configured. Please set the environment variables.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
            user_type: userType,
            institute: formData.institute,
            branch: formData.branch,
            graduation_year: formData.graduationYear,
          },
        },
      });

      if (authError) throw authError;

      if (authData) {
        toast({
          title: "Success",
          description: "Registration successful! Please check your email for verification.",
        });
        navigate('/login');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred during registration",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow bg-gray-50 dark:bg-navy-800">
        <AuthCard
          title="Create an Account"
          description="Join the AlumniNexus network today"
          footer={
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          }
        >
          <Tabs defaultValue="student" className="mb-4">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger 
                value="student" 
                onClick={() => setUserType("student")}
              >
                Student
              </TabsTrigger>
              <TabsTrigger 
                value="alumni" 
                onClick={() => setUserType("alumni")}
              >
                Alumni
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="student">
              <StudentRegistrationForm 
                formData={formData}
                loading={loading}
                handleChange={handleChange}
                handleSelectChange={handleSelectChange}
                handleSubmit={handleSubmit}
              />
            </TabsContent>
            
            <TabsContent value="alumni">
              <AlumniRegistrationForm 
                formData={formData}
                loading={loading}
                handleChange={handleChange}
                handleSelectChange={handleSelectChange}
                handleSubmit={handleSubmit}
              />
            </TabsContent>
          </Tabs>
        </AuthCard>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
