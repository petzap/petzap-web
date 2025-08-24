"use server";

import { API_URL } from "@/constants";
import type {
  AuthRequest,
  AuthResponse,
  ProfileUpdateData,
  ProfileUpdateResponse,
  PasswordResetData,
  PasswordResetResponse,
  OtpVerificationResponse,
  ForgotPasswordResponse,
} from "@/types";

// Server action for login - runs on server, secure
export const login = async (
  data: AuthRequest
): Promise<AuthResponse | null> => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(
        "Login failed:",
        errorData.message || `HTTP ${response.status}`
      );
      return null;
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error during login:", error);
    return null;
  }
};

// Server action for logout - runs on server, secure
export const logout = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.ok;
  } catch (error) {
    console.error("Error during logout:", error);
    return false;
  }
};

// Server action for username validation
export const validateUsername = async (username: string): Promise<boolean> => {
  try {
    const response = await fetch(
      `${API_URL}/auth/register/username?username=${username}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.ok;
  } catch (error) {
    console.error("Error validating username:", error);
    return false;
  }
};

// Server action for registration
export const register = async (
  data: Record<string, unknown>
): Promise<unknown> => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Registration failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

// Server action for OTP verification
export const verifyOtp = async (
  data: Record<string, unknown>
): Promise<unknown> => {
  try {
    const response = await fetch(`${API_URL}/auth/register/otp-verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "OTP verification failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error during OTP verification:", error);
    throw error;
  }
};

// Server action for OTP resend
export const resendOtp = async (email: string): Promise<unknown> => {
  try {
    const response = await fetch(`${API_URL}/auth/register/otp-resend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "OTP resend failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error during OTP resend:", error);
    throw error;
  }
};

// Server action for profile completion
export const completeProfile = async (
  data: ProfileUpdateData
): Promise<ProfileUpdateResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/register/profile-update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Profile completion failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error during profile completion:", error);
    throw error;
  }
};

// Server action for forgot password
export const forgotPassword = async (
  email: string
): Promise<ForgotPasswordResponse | null> => {
  try {
    const response = await fetch(`${API_URL}/auth/forgot-password-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Password reset request failed:", errorData.message);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error during password reset request:", error);
    return null;
  }
};

// Server action for reset OTP verification
export const resetVerifyOtp = async (
  email: string,
  otp: string
): Promise<OtpVerificationResponse | null> => {
  try {
    const response = await fetch(`${API_URL}/auth/validate-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("OTP verification failed:", errorData.message);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error during OTP verification:", error);
    return null;
  }
};

// Server action for password reset
export const resetPassword = async (
  data: PasswordResetData
): Promise<PasswordResetResponse | null> => {
  try {
    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Password reset failed:", errorData.message);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error during password reset:", error);
    return null;
  }
};

// Remove the object export - only export individual functions in "use server" files
