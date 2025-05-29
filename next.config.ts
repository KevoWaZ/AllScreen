import { NextConfig } from "next";

const dynamicRedirects = ["company", "genre", "keyword"].map((route) => ({
  source: `/${route}/:slug`,
  destination: `/${route}/:slug/movie`,
  permanent: true,
}));

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    formats: ["image/avif"],
    remotePatterns: [
      { protocol: "https", hostname: "image.tmdb.org" },
      { protocol: "https", hostname: "media.themoviedb.org" },
    ],
  },
  async redirects() {
    return dynamicRedirects;
  },
};

export default nextConfig;
