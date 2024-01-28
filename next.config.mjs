/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    dirs: ["src"],
  },
  images: {
    domains: ["https://lh3.googleusercontent.com"],
  },
};

export default nextConfig;
