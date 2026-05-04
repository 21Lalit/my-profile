/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/my-profile',
  assetPrefix: '/my-profile',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
