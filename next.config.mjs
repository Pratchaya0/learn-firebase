/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "lh3.googleusercontent.com",
  ]
  },
  experimental: {
    urlImports: ["https://firebasestorage.googleapis.com/v0/b/"],
  },
};

export default nextConfig;
