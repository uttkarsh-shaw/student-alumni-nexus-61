
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { branches, graduationYears } from "@/utils/registerConstants";
import { RegistrationFormProps } from "@/types/auth";

const StudentRegistrationForm = ({ formData, loading, handleChange, handleSelectChange, handleSubmit }: RegistrationFormProps) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="student-name">Full Name</Label>
        <Input 
          id="student-name" 
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="student-email">Email</Label>
        <Input 
          id="student-email" 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="student-password">Password</Label>
          <Input 
            id="student-password" 
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="student-confirm-password">Confirm Password</Label>
          <Input 
            id="student-confirm-password" 
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="student-institute">Institute</Label>
        <Input 
          id="student-institute" 
          name="institute"
          value={formData.institute}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="student-branch">Branch</Label>
          <Select onValueChange={(value) => handleSelectChange("branch", value)}>
            <SelectTrigger id="student-branch">
              <SelectValue placeholder="Select Branch" />
            </SelectTrigger>
            <SelectContent>
              {branches.map((branch) => (
                <SelectItem key={branch} value={branch}>
                  {branch}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="student-year">Expected Graduation Year</Label>
          <Select onValueChange={(value) => handleSelectChange("graduationYear", value)}>
            <SelectTrigger id="student-year">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              {graduationYears.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="student-terms" 
          checked={formData.agreeTerms}
          onCheckedChange={(checked) => handleSelectChange("agreeTerms", checked)}
          required
        />
        <Label htmlFor="student-terms" className="text-sm">
          I agree to the{" "}
          <Link to="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </Label>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  );
};

export default StudentRegistrationForm;
