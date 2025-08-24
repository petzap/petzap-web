import { User } from "./user";

interface AuthRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  message: string;
  data: User;
}

interface AuthCookies {
  user: User;
  accessToken: string;
}

// Profile completion types
interface ProfileUpdateData {
  fullName?: string;
  username?: string;
  city?: string;
  dob?: string;
  interests?: string[];
  image?: string;
}

interface ProfileUpdateResponse {
  message: string;
  data: User;
}

// Password reset types
interface PasswordResetData {
  email: string;
  otp: string;
  newPassword: string;
}

interface PasswordResetResponse {
  message: string;
  success: boolean;
}

// OTP verification types
interface OtpVerificationData {
  email: string;
  otp: string;
}

interface OtpVerificationResponse {
  message: string;
  success: boolean;
  data?: User;
}

// Forgot password types
interface ForgotPasswordResponse {
  message: string;
  success: boolean;
}

export type { 
  User, 
  AuthRequest, 
  AuthResponse, 
  AuthCookies,
  ProfileUpdateData,
  ProfileUpdateResponse,
  PasswordResetData,
  PasswordResetResponse,
  OtpVerificationData,
  OtpVerificationResponse,
  ForgotPasswordResponse
};
