
import { ChangeEvent, FormEvent } from "react";

export interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  branch: string;
  graduationYear: string;
  institute: string;
  agreeTerms: boolean;
}

export interface RegistrationFormProps {
  formData: RegistrationFormData;
  loading: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string | boolean) => void;
  handleSubmit: (e: FormEvent) => void;
}
