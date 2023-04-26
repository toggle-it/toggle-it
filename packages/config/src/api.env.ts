export const GLOBAL_PREFIX = process.env.NEST_API_GLOBAL_PREFIX;
export const MONGODB_URI = process.env.NEST_MONGODB_URI;
export const WEB_APP_URL = process.env.NEST_WEB_APP_URL;

// Throttle;
export const MAX_REQUESTS_PER_MINUTE =
  Number(process.env.NEST_MAX_REQUESTS_PER_MINUTE) || 10;

// Swagger api documentatio;
export const ENABLE_SWAGGER_UI = process.env.NEST_ENABLE_SWAGGER_UI;

// Auth secret;
export const JWT_SECRET = process.env.NEST_JWT_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.NEST_REFRESH_TOKEN_SECRET;

export const OAUTH2_CLIENT = {
  GOOGLE: {
    CLIENT_ID: process.env.NEST_GOOGLE_CLIENT_ID,
    CLIENT_SECRET: process.env.NEST_GOOGLE_CLIENT_SECRET,
  },
  MICROSOFT: {
    CLIENT_ID: process.env.NEST_MICROSOFT_CLIENT_ID,
    CLIENT_SECRET: process.env.NEST_MICROSOFT_CLIENT_SECRET,
  },
} as const;
