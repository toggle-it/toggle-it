export const configuration = () => ({
  PORT: parseInt(process.env.NEST_API_PORT, 10) || 3000,
  MONGODB_URI: process.env.NEST_MONGODB_URI || "mongodb://localhost:27017/test",
  WEB_APP_URL: process.env.NEST_WEB_APP_URL || "http://localhost:3002",

  // Throttler
  MAX_REQUESTS_PER_MINUTE: process.env.NEST_MAX_REQUESTS_PER_MINUTE || 10,

  // Swagger api documentation
  ENABLE_SWAGGER_UI: process.env.NEST_ENABLE_SWAGGER_UI ?? true,

  // Passport Auth service
  JWT_SECRET: process.env.NEST_JWT_SECRET,
  REFRESH_TOKEN_SECRET: process.env.NEST_REFRESH_TOKEN_SECRET,
  GOOGLE_CLIENT_ID: process.env.NEST_GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.NEST_GOOGLE_CLIENT_SECRET,
  MICROSOFT_CLIENT_ID: process.env.NEST_MICROSOFT_CLIENT_ID,
  MICROSOFT_CLIENT_SECRET: process.env.NEST_MICROSOFT_CLIENT_SECRET,
});
