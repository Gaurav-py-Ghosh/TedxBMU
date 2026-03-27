/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        hostname: "coffee4082.wordpress.com",
      },
    ],
  },
};

export default nextConfig;