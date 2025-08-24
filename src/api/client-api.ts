import { API_URL } from "@/constants";
import type {
  AuthRequest,
  AuthResponse,
  ProfileUpdateData,
  ProfileUpdateResponse,
  PasswordResetData,
  PasswordResetResponse,
  OtpVerificationData,
  OtpVerificationResponse,
  ForgotPasswordResponse,
  User,
} from "@/types";

// Client-side API client for use in client components
class ClientApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = API_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Auth methods
  async login(data: AuthRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async logout(): Promise<void> {
    return this.request("/auth/logout", {
      method: "POST",
    });
  }

  async register(data: Record<string, unknown>): Promise<unknown> {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async verifyOtp(data: OtpVerificationData): Promise<OtpVerificationResponse> {
    return this.request("/auth/register/otp-verify", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async resendOtp(email: string): Promise<ForgotPasswordResponse> {
    return this.request("/auth/register/otp-resend", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  async completeProfile(
    data: ProfileUpdateData
  ): Promise<ProfileUpdateResponse> {
    return this.request("/auth/register/profile-update", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async forgotPassword(email: string): Promise<ForgotPasswordResponse> {
    return this.request("/auth/forgot-password-otp", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  async resetVerifyOtp(
    email: string,
    otp: string
  ): Promise<OtpVerificationResponse> {
    return this.request("/auth/validate-otp", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
    });
  }

  async resetPassword(data: PasswordResetData): Promise<PasswordResetResponse> {
    return this.request("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async validateUsername(username: string): Promise<boolean> {
    try {
      await this.request(`/auth/register/username?username=${username}`, {
        method: "POST",
      });
      return true;
    } catch {
      return false;
    }
  }

  // Pet methods
  async getPets(): Promise<unknown[]> {
    return this.request("/pets", {
      method: "GET",
    });
  }

  // User methods
  async getCurrentUser(): Promise<User> {
    return this.request("/auth/me", {
      method: "GET",
    });
  }
}

// Export singleton instance
export const clientApi = new ClientApiClient();
