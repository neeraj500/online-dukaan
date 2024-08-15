/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    forceSwcTransforms: true,
  },
 
  images: {
    domains: ['cdn.dummyjson.com'], 
  },
};

export default nextConfig;
