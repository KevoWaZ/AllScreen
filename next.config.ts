import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'image.tmdb.org'},
      { protocol: 'https', hostname: 'media.themoviedb.org'},
    ]
  }
};

export default nextConfig;
