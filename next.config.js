const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    BASE_URL: process.env.BASE_URL,
  },
  reactStrictMode: false,
  swcMinify: true,
};

module.exports = withContentlayer(nextConfig);
