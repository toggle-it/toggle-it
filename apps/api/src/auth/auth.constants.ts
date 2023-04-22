export const JWT_SECRET = "JWT_SECRET";
export const OAUTH2_CLIENT = "OAUTH2_CLIENT";
export const REFRESH_TOKEN_SECRET = "REFRESH_TOKEN_SECRET";
export const WEB_APP_URL = "WEB_APP_URL";

export const JWT_KEY = "jwt";
export const REFRESH_TOKEN_KEY = "refreshToken";
export const IS_PUBLIC_KEY = "isPublic";

export const CLIENT = {
  GOOGLE: {
    ID: "GOOGLE_CLIENT_ID",
    SECRET: "GOOGLE_CLIENT_SECRET",
  },
  MICROSOFT: {
    ID: "MICROSOFT_CLIENT_ID",
    SECRET: "MICROSOFT_CLIENT_SECRET",
  },
} as const;

export const EXPIRY = {
  ACCESS_TOKEN: "30m",
  REFRESH_TOKEN: "30d",
} as const;
