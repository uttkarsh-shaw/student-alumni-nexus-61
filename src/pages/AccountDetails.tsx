
import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const AccountDetails = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [changePwVisible, setChangePwVisible] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const session = supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  const handleLogOut = async () => {
    await supabase.auth.signOut();
    toast({ title: "Logged out" });
    navigate("/login");
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast({ title: "New password must be at least 6 characters", variant: "destructive" });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ title: "Passwords do not match", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setLoading(false);
    if (error) {
      toast({ title: "Failed to update password", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Password updated" });
      setChangePwVisible(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow bg-gray-50 dark:bg-navy-800 py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split("@")[0] || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {user?.email}
                </p>
              </div>
              <div>
                <Button className="mr-4" onClick={() => setChangePwVisible(!changePwVisible)}>
                  {changePwVisible ? "Cancel" : "Change Password"}
                </Button>
                <Button onClick={handleLogOut} variant="destructive">
                  Log out
                </Button>
              </div>
              {changePwVisible && (
                <form className="space-y-4 max-w-sm mt-3" onSubmit={handleChangePassword}>
                  <Input
                    type="password"
                    placeholder="Current Password (for security)"
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                  />
                  <Input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                  />
                  <Input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                  />
                  <Button type="submit" disabled={loading}>
                    {loading ? "Updating..." : "Update Password"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccountDetails;
