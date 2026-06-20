import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://backend-go-rent.vercel.app/api/:path*",
        // destination: 'http://localhost:5000/api/:path*',
      },
    ];
  },
};

export default nextConfig;
