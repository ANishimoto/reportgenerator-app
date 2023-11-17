const withDotenv = require('dotenv-webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.plugins.push(new withDotenv());
    return config;
  },
}

module.exports = nextConfig
