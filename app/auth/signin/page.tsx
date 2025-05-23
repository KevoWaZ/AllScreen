"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    // Simuler une connexion
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    window.location.href = "/";
  };

  const handleSocialSignIn = async (provider: string) => {
    setLoading(true);
    // Simuler une connexion sociale
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    window.location.href = "/";
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-[#121212] p-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 dark:border-[#2C2C2C] bg-white dark:bg-[#121212] p-6 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-[#212121] dark:text-white font-inter">
            Connexion
          </h1>
          <p className=" text-[#212121] dark:text-[#BDBDBD] font-inter mt-1">
            Accedez a votre compte AllScreen
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#212121] dark:text-[#BDBDBD] font-inter"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-[#BDBDBD] dark:border-[#4A4A4A] bg-white dark:bg-[#2C2C2C] py-2 px-3 text-[#212121] dark:text-white placeholder:text-[#BDBDBD] dark:placeholder:text-[#4A4A4A] focus:border-[#D32F2F] focus:outline-none focus:ring-1 focus:ring-[#D32F2F] font-inter"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#212121] dark:text-[#BDBDBD] font-inter"
              >
                Mot de passe
              </label>
            </div>
            <input
              id="password"
              type="password"
              placeholder="Mot de passe"
              autoComplete="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-[#BDBDBD] dark:border-[#4A4A4A] bg-white dark:bg-[#2C2C2C] py-2 px-3 text-[#212121] dark:text-white placeholder:text-[#BDBDBD] dark:placeholder:text-[#4A4A4A] focus:border-[#D32F2F] focus:outline-none focus:ring-1 focus:ring-[#D32F2F] font-inter"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            onClick={async () => {
              await authClient.signIn.email(
                {
                  email,

                  password,
                  callbackURL: "/profile",
                },

                {
                  onRequest: (ctx) => {
                    setLoading(true);
                  },

                  onResponse: (ctx) => {
                    setLoading(false);
                  },
                }
              );
            }}
            className="w-full flex justify-center items-center rounded-md bg-[#D32F2F] dark:bg-[#B71C1C] py-2 px-4 text-sm font-medium text-white hover:bg-[#B71C1C] dark:hover:bg-[#D32F2F] focus:outline-none focus:ring-2 focus:ring-[#D32F2F] focus:ring-offset-2 transition-colors font-inter disabled:opacity-70"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <span>Se connecter</span>
            )}
          </button>

          <div className="relative flex items-center my-4">
            <div className="flex-grow border-t border-[#BDBDBD] dark:border-[#4A4A4A]"></div>
            <span className="mx-4 flex-shrink text-sm text-[#212121] dark:text-[#BDBDBD] font-inter">
              ou continuer avec
            </span>
            <div className="flex-grow border-t border-[#BDBDBD] dark:border-[#4A4A4A]"></div>
          </div>

          <div className="w-full gap-2 flex items-center justify-between flex-wrap">
            <button
              type="button"
              disabled={loading}
              onClick={async () => {
                await authClient.signIn.social(
                  {
                    provider: "google",

                    callbackURL: "/profile",
                  },

                  {
                    onRequest: (ctx) => {
                      setLoading(true);
                    },

                    onResponse: (ctx) => {
                      setLoading(false);
                    },
                  }
                );
              }}
              className="flex-grow flex items-center justify-center gap-2 rounded-md border border-[#BDBDBD] dark:border-[#4A4A4A] bg-white dark:bg-[#2C2C2C] py-2 px-3 text-sm font-medium text-[#212121] dark:text-white hover:bg-[#F5F5F5] dark:hover:bg-[#212121] transition-colors font-inter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="0.98em"
                height="1em"
                viewBox="0 0 256 262"
              >
                <path
                  fill="#4285F4"
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                ></path>
                <path
                  fill="#34A853"
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                ></path>
                <path
                  fill="#EB4335"
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                ></path>
              </svg>
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={async () => {
                await authClient.signIn.social(
                  {
                    provider: "twitch",

                    callbackURL: "/profile",
                  },

                  {
                    onRequest: (ctx) => {
                      setLoading(true);
                    },

                    onResponse: (ctx) => {
                      setLoading(false);
                    },
                  }
                );
              }}
              className="flex-grow flex items-center justify-center gap-2 rounded-md border border-[#BDBDBD] dark:border-[#4A4A4A] bg-white dark:bg-[#2C2C2C] py-2 px-3 text-sm font-medium text-[#212121] dark:text-white hover:bg-[#F5F5F5] dark:hover:bg-[#212121] transition-colors font-inter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.2em"
                height="1.2em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M11.64 5.93h1.43v4.28h-1.43m3.93-4.28H17v4.28h-1.43M7 2L3.43 5.57v12.86h4.28V22l3.58-3.57h2.85L20.57 12V2m-1.43 9.29l-2.85 2.85h-2.86l-2.5 2.5v-2.5H7.71V3.43h11.43Z"
                ></path>
              </svg>
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={async () => {
                await authClient.signIn.social(
                  {
                    provider: "github",

                    callbackURL: "/profile",
                  },

                  {
                    onRequest: (ctx) => {
                      setLoading(true);
                    },

                    onResponse: (ctx) => {
                      setLoading(false);
                    },
                  }
                );
              }}
              className="flex-grow flex items-center justify-center gap-2 rounded-md border border-[#BDBDBD] dark:border-[#4A4A4A] bg-white dark:bg-[#2C2C2C] py-2 px-3 text-sm font-medium text-[#212121] dark:text-white hover:bg-[#F5F5F5] dark:hover:bg-[#212121] transition-colors font-inter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-[#212121] dark:text-[#BDBDBD] font-inter">
            Pas encore de compte?{" "}
            <Link
              href="/auth/signup"
              className="font-medium text-[#D32F2F] dark:text-[#FF5252] hover:underline dark:hover:underline font-inter"
            >
              S&apos;inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
