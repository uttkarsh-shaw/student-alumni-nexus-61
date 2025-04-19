
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { branches, graduationYears } from "@/utils/registerConstants";
import { RegistrationFormProps } from "@/types/auth";

const AlumniRegistrationForm = ({ formData, loading, handleChange, handleSelectChange, handleSubmit }: RegistrationFormProps) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="alumni-name">Full Name</Label>
        <Input 
          id="alumni-name" 
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="alumni-email">Email</Label>
        <Input 
          id="alumni-email" 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="alumni-password">Password</Label>
          <Input 
            id="alumni-password" 
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="alumni-confirm-password">Confirm Password</Label>
          <Input 
            id="alumni-confirm-password" 
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="alumni-institute">Institute</Label>
        <Input 
          id="alumni-institute" 
          name="institute"
          value={formData.institute}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="alumni-branch">Branch</Label>
          <Select onValueChange={(value) => handleSelectChange("branch", value)}>
            <SelectTrigger id="alumni-branch">
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
          <Label htmlFor="alumni-year">Graduation Year</Label>
          <Select onValueChange={(value) => handleSelectChange("graduationYear", value)}>
            <SelectTrigger id="alumni-year">
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
          id="alumni-terms" 
          checked={formData.agreeTerms}
          onCheckedChange={(checked) => handleSelectChange("agreeTerms", checked)}
          required
        />
        <Label htmlFor="alumni-terms" className="text-sm">
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

export default AlumniRegistrationForm;
