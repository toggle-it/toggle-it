export const configuration = () => ({
  PORT: parseInt(process.env.NEST_API_PORT, 10) || 3000,
  JWT_SECRET: process.env.NEST_JWT_SECRET || "zDt43m0jYdp4fjQm71kciJ",
  MONGODB_URI: process.env.NEST_MONGODB_URI || "mongodb://localhost:27017/test",
  MAX_REQUESTS_PER_MINUTE: process.env.NEST_MAX_REQUESTS_PER_MINUTE || 10,
  ENABLE_SWAGGER_UI: process.env.NEST_ENABLE_SWAGGER_UI ?? true,
});
