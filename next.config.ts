import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow optimizing images from external domains (Spotify album art, GitHub avatars)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co", // Spotify CDN for album art
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // GitHub avatars
      },
    ],
  },
};

export default nextConfig;
