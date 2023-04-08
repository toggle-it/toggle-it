export const configuration = () => ({
  PORT: parseInt(process.env.API_PORT, 10) || 3000,
  JWT_SECRET: process.env.JWT_SECRET || "zDt43m0jYdp4fjQm71kciJ",
});
