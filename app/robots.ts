import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "http://",
    },
    sitemap: "https://www.allscreen.ovh/sitemap.xml",
  };
}
