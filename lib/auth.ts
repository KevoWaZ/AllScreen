import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },

    twitch: {
      clientId: process.env.TWITCH_CLIENT_ID!,
      clientSecret: process.env.TWITCH_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [nextCookies()],
  advanced: {
    useSecureCookies: true,
    ipAddress: {
      ipAddressHeaders: ["cf-connecting-ip"],
      disableIpTracking: false,
    },
  },
});
