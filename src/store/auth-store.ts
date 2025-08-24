import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, AuthRequest, AuthResponse } from "@/types";

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (credentials: AuthRequest) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  clearError: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (credentials: AuthRequest) => {
        set({ isLoading: true, error: null });
        try {
          // This would typically call your API service
          // For now, we'll simulate a successful login
          const mockResponse: AuthResponse = {
            message: "Login successful",
            data: {
              _id: "1",
              email: credentials.email,
              interests: [],
              otp: "",
              otpExpires: "",
              type: credentials.email.includes("super") ? "superAdmin" : "admin",
              channels: [],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              city: "",
              dob: "",
              fullName: credentials.email.split("@")[0],
              image: "",
              username: credentials.email.split("@")[0],
              device: "web",
              platform: "web",
              token: "mock-jwt-token",
            },
          };

          set({
            user: mockResponse.data,
            token: mockResponse.data.token,
            refreshToken: "mock-refresh-token",
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : "Login failed",
          });
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
          error: null,
        });
      },

      setUser: (user: User) => {
        set({ user, isAuthenticated: true });
      },

      setToken: (token: string) => {
        set({ token });
      },

      setRefreshToken: (refreshToken: string) => {
        set({ refreshToken });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
