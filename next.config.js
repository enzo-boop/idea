const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    BASE_URL: process.env.BASE_URL,
  },
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  webpack(config, { isServer }) {
    // Aggiungi la configurazione della cache all'interno di Webpack
    config.cache = {
      type: "memory", // Usa la cache in memoria
    };
  return config;
  },
};

module.exports = withContentlayer(nextConfig);
