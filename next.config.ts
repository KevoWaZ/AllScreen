import { NextConfig } from "next";

const dynamicRedirects = ["company", "genre", "keyword"].map((route) => ({
  source: `/${route}/:slug`,
  destination: `/${route}/:slug/movie`,
  permanent: true,
}));

const nextConfig: NextConfig = {
  images: {
    qualities: [100],
    unoptimized: true,
    formats: ["image/avif"],
    remotePatterns: [
      { protocol: "https", hostname: "image.tmdb.org" },
      { protocol: "https", hostname: "media.themoviedb.org" },
    ],
  },
  async redirects() {
    return [...dynamicRedirects];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=()",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://image.tmdb.org https://i.ytimg.com; connect-src 'self' https://api.themoviedb.org;",
          },
        ],
      },
    ];
  },
  experimental: {
    useCache: true,
  },
};

export default nextConfig;
