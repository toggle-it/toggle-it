/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@ti/ui"],
  async redirects() {
    return [
      {
        source: "/((?!login|signup|auth).*)",
        missing: [{ type: "cookie", key: "jwt" }],
        destination: "/login",
        permanent: false,
      },
      {
        source: "/(login|signup|auth)?",
        has: [{ type: "cookie", key: "jwt" }],
        destination: "/dashboard",
        permanent: false,
      },
    ];
  },
};
