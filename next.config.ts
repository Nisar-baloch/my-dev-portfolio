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
  // Allow 127.0.0.1 in dev (used for Spotify OAuth callback)
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
