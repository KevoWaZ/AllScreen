import { allowedBots, disallowedBots } from "@/utils/utils";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...allowedBots.map((bot) => ({
        userAgent: bot,
        allow: "/",
      })),
      ...disallowedBots.map((bot) => ({
        userAgent: bot,
        disallow: "/",
      })),
    ],
  };
}
