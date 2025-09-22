"use client";

import { useState } from "react";
import Link from "@/components/utils/Link";
import { authClient } from "@/lib/auth-client";
import { FaGithub, FaGoogle, FaTwitch } from "react-icons/fa6";
import Form from "next/form";
import { BiLoader } from "react-icons/bi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#121212] p-4">
      <div className="w-full max-w-md rounded-xl border  border-[#2C2C2C]  bg-[#121212] p-6 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold  text-white font-inter">
            Connexion
          </h1>
          <p className="  text-[#BDBDBD] font-inter mt-1">
            Accedez a votre compte AllScreen
          </p>
        </div>

        <div className="space-y-4">
          <Form
            action={async () => {
              await authClient.signIn.email(
                {
                  email,

                  password,
                  callbackURL: "/settings",
                },

                {
                  onRequest: () => {
                    setLoading(true);
                  },

                  onResponse: () => {
                    setLoading(false);
                  },
                }
              );
            }}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium  text-[#BDBDBD] font-inter"
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
                  className="w-full rounded-md border  border-[#4A4A4A]  bg-[#2C2C2C] py-2 px-3  text-white  placeholder:text-[#4A4A4A] focus:border-[#D32F2F] focus:outline-hidden focus:ring-1 focus:ring-[#D32F2F] font-inter"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium  text-[#BDBDBD] font-inter"
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
                  className="w-full rounded-md border  border-[#4A4A4A]  bg-[#2C2C2C] py-2 px-3  text-white  placeholder:text-[#4A4A4A] focus:border-[#D32F2F] focus:outline-hidden focus:ring-1 focus:ring-[#D32F2F] font-inter"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center cursor-pointer rounded-md  bg-[#B71C1C] py-2 px-4 text-sm font-medium text-white  hover:bg-[#D32F2F] focus:outline-hidden focus:ring-2 focus:ring-[#D32F2F] focus:ring-offset-2 transition-colors font-inter disabled:opacity-70"
              >
                {loading ? (
                  <BiLoader size={16} className="animate-spin" />
                ) : (
                  <span>Se connecter</span>
                )}
              </button>
            </div>
          </Form>

          <div className="relative flex items-center my-4">
            <div className="grow border-t  border-[#4A4A4A]"></div>
            <span className="mx-4 shrink text-sm  text-[#BDBDBD] font-inter">
              ou continuer avec
            </span>
            <div className="grow border-t  border-[#4A4A4A]"></div>
          </div>

          <div className="w-full gap-2 flex items-center justify-between flex-wrap">
            <button
              type="button"
              disabled={loading}
              onClick={async () => {
                await authClient.signIn.social(
                  {
                    provider: "google",

                    callbackURL: "/settings",
                  },

                  {
                    onRequest: () => {
                      setLoading(true);
                    },

                    onResponse: () => {
                      setLoading(false);
                    },
                  }
                );
              }}
              className="grow flex items-center justify-center gap-2 cursor-pointer rounded-md border  border-[#4A4A4A]  bg-[#2C2C2C] py-2 px-3 text-sm font-medium  text-white ] hover:bg-[#212121] transition-colors font-inter"
            >
              <FaGoogle />
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={async () => {
                await authClient.signIn.social(
                  {
                    provider: "twitch",

                    callbackURL: "/settings",
                  },

                  {
                    onRequest: () => {
                      setLoading(true);
                    },

                    onResponse: () => {
                      setLoading(false);
                    },
                  }
                );
              }}
              className="grow flex items-center justify-center gap-2 cursor-pointer rounded-md border  border-[#4A4A4A]  bg-[#2C2C2C] py-2 px-3 text-sm font-medium  text-white  hover:bg-[#212121] transition-colors font-inter"
            >
              <FaTwitch />
            </button>
            <button
              type="button"
              disabled={loading}
              className="grow flex items-center justify-center gap-2 cursor-pointer rounded-md border  border-[#4A4A4A]  bg-[#2C2C2C] py-2 px-3 text-sm font-medium  text-white  hover:bg-[#212121] transition-colors font-inter"
              onClick={async () => {
                await authClient.signIn.social(
                  {
                    provider: "github",

                    callbackURL: "/settings",
                  },

                  {
                    onRequest: () => {
                      setLoading(true);
                    },

                    onResponse: () => {
                      setLoading(false);
                    },
                  }
                );
              }}
            >
              <FaGithub />
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm  text-[#BDBDBD] font-inter">
            Pas encore de compte?{" "}
            <Link
              href="/auth/signup"
              className="font-medium  text-[#FF5252]  hover:underline font-inter"
            >
              S&apos;inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
