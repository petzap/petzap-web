"use server";

import { cookies, headers as nextHeaders } from "next/headers";
import {
  ACCESS_TOKEN_COOKIE,
  APP_NAME,
  APP_ENV,
  APP_VERSION,
} from "@/constants";

const HEADER_PETZAP_APPLICATION = "Petzap-Application";
const HEADER_PETZAP_APP_VERSION = "Petzap-AppVersion";
const HEADER_PETZAP_RUN_ENVIRONMENT = "Petzap-RunEnvironment";
const HEADER_PETZAP_DEVICE = "Petzap-Device";
const HEADER_AUTHORIZATION = "Authorization";
const HEADER_CONTENT_TYPE = "Content-Type";
const HEADER_USER_AGENT = "user-agent";
const BEARER_AUTHENTICATION = "Bearer";
const CONTENT_TYPE_JSON = "application/json; charset=utf-8";

const createHeaders = async (init?: HeadersInit) => {
  const headers = new Headers(init);

  const token = (await cookies()).get(ACCESS_TOKEN_COOKIE)?.value;

  if (token && !headers.get(HEADER_AUTHORIZATION)) {
    headers.set(HEADER_AUTHORIZATION, `${BEARER_AUTHENTICATION} ${token}`);
  }

  const userAgent = (await nextHeaders()).get(HEADER_USER_AGENT) ?? "";

  // Set required Petzap headers.
  headers.set(HEADER_PETZAP_APPLICATION, APP_NAME);
  headers.set(HEADER_PETZAP_APP_VERSION, APP_VERSION);
  headers.set(HEADER_PETZAP_RUN_ENVIRONMENT, APP_ENV);
  headers.set(HEADER_PETZAP_DEVICE, userAgent);

  return headers;
};

const createAuthzHeader = (token: string) => ({
  [HEADER_AUTHORIZATION]: `${BEARER_AUTHENTICATION} ${token}`,
});

const createJsonHeader = () => ({
  [HEADER_CONTENT_TYPE]: CONTENT_TYPE_JSON,
});

export { createHeaders, createAuthzHeader, createJsonHeader };
