// Client-side accessible environment variables (must start with NEXT_PUBLIC_)

type AppEnv = "dev" | "stag" | "prod";

// General
const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "Petzap";
const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION ?? "1.0.0";
const APP_ENV = (process.env.NEXT_PUBLIC_APP_ENV ?? "dev") as AppEnv;
const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "Root_Domain";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
const CHAT_SOCKET_HOST = process.env.NEXT_PUBLIC_CHAT_SOCKET_HOST ?? "";

// Cookies
const USER_COOKIE = process.env.NEXT_PUBLIC_USER_COOKIE ?? "Petzap_user";
const ACCESS_TOKEN_COOKIE =
  process.env.NEXT_PUBLIC_ACCESS_TOKEN_COOKIE ?? "Petzap_access_token";
const ACCESS_TOKEN_EXPIRY_COOKIE =
  process.env.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRY_COOKIE ??
  "Petzap_access_token_expiry";
const REFRESH_TOKEN_COOKIE =
  process.env.NEXT_PUBLIC_REFRESH_TOKEN_COOKIE ?? "Petzap_refresh_token";

// Export all client-side accessible variables
export {
  APP_NAME,
  APP_VERSION,
  APP_ENV,
  ROOT_DOMAIN,
  API_URL,
  USER_COOKIE,
  ACCESS_TOKEN_COOKIE,
  ACCESS_TOKEN_EXPIRY_COOKIE,
  REFRESH_TOKEN_COOKIE,
  CHAT_SOCKET_HOST,
};
