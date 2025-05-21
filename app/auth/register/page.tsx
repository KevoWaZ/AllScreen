"use client";

import { useState } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash, FaLock, FaUser, FaEnvelope } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-[#121212] p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl border border-gray-200 dark:border-[#2C2C2C] bg-white dark:bg-[#121212] p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#212121] dark:text-white font-inter">
            Inscription
          </h1>
          <p className="mt-2 text-[#212121] dark:text-[#BDBDBD] font-inter">
            Créez votre compte AllScreen
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaUser className="text-[#BDBDBD] dark:text-[#4A4A4A]" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-md border border-[#BDBDBD] dark:border-[#4A4A4A] bg-white dark:bg-[#2C2C2C] py-3 pl-10 pr-3 text-[#212121] dark:text-white placeholder:text-[#BDBDBD] dark:placeholder:text-[#4A4A4A] focus:border-[#D32F2F] focus:outline-none focus:ring-1 focus:ring-[#D32F2F] font-inter"
                placeholder="Nom d'utilisateur"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaEnvelope className="text-[#BDBDBD] dark:text-[#4A4A4A]" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-[#BDBDBD] dark:border-[#4A4A4A] bg-white dark:bg-[#2C2C2C] py-3 pl-10 pr-3 text-[#212121] dark:text-white placeholder:text-[#BDBDBD] dark:placeholder:text-[#4A4A4A] focus:border-[#D32F2F] focus:outline-none focus:ring-1 focus:ring-[#D32F2F] font-inter"
                placeholder="Email"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaLock className="text-[#BDBDBD] dark:text-[#4A4A4A]" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-[#BDBDBD] dark:border-[#4A4A4A] bg-white dark:bg-[#2C2C2C] py-3 pl-10 pr-10 text-[#212121] dark:text-white placeholder:text-[#BDBDBD] dark:placeholder:text-[#4A4A4A] focus:border-[#D32F2F] focus:outline-none focus:ring-1 focus:ring-[#D32F2F] font-inter"
                placeholder="Mot de passe"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? (
                  <FaEyeSlash className="text-[#BDBDBD] dark:text-[#4A4A4A] hover:text-[#D32F2F] dark:hover:text-[#FF5252]" />
                ) : (
                  <FaEye className="text-[#BDBDBD] dark:text-[#4A4A4A] hover:text-[#D32F2F] dark:hover:text-[#FF5252]" />
                )}
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaLock className="text-[#BDBDBD] dark:text-[#4A4A4A]" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-md border border-[#BDBDBD] dark:border-[#4A4A4A] bg-white dark:bg-[#2C2C2C] py-3 pl-10 pr-10 text-[#212121] dark:text-white placeholder:text-[#BDBDBD] dark:placeholder:text-[#4A4A4A] focus:border-[#D32F2F] focus:outline-none focus:ring-1 focus:ring-[#D32F2F] font-inter"
                placeholder="Confirmer le mot de passe"
                required
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className="text-[#BDBDBD] dark:text-[#4A4A4A] hover:text-[#D32F2F] dark:hover:text-[#FF5252]" />
                ) : (
                  <FaEye className="text-[#BDBDBD] dark:text-[#4A4A4A] hover:text-[#D32F2F] dark:hover:text-[#FF5252]" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 rounded border-[#BDBDBD] dark:border-[#4A4A4A] text-[#D32F2F] focus:ring-[#D32F2F]"
              required
            />
            <label
              htmlFor="terms"
              className="ml-2 block text-sm text-[#212121] dark:text-[#BDBDBD] font-inter"
            >
              J&apos;accepte les{" "}
              <Link
                href="/terms"
                className="font-medium text-[#D32F2F] dark:text-[#FF5252] hover:underline dark:hover:underline"
              >
                conditions d&apos;utilisation
              </Link>{" "}
              et la{" "}
              <Link
                href="/privacy"
                className="font-medium text-[#D32F2F] dark:text-[#FF5252] hover:underline dark:hover:underline"
              >
                politique de confidentialité
              </Link>
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-[#D32F2F] dark:bg-[#B71C1C] py-3 px-4 text-sm font-medium text-white hover:bg-[#B71C1C] dark:hover:bg-[#D32F2F] focus:outline-none focus:ring-2 focus:ring-[#D32F2F] focus:ring-offset-2 transition-colors font-inter"
            >
              S&apos;inscrire
            </button>
          </div>

          <div className="relative flex items-center">
            <div className="flex-grow border-t border-[#BDBDBD] dark:border-[#4A4A4A]"></div>
            <span className="mx-4 flex-shrink text-[#212121] dark:text-[#BDBDBD] font-inter">
              ou continuer avec
            </span>
            <div className="flex-grow border-t border-[#BDBDBD] dark:border-[#4A4A4A]"></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-md border border-[#BDBDBD] dark:border-[#4A4A4A] bg-white dark:bg-[#2C2C2C] py-2 px-4 text-sm font-medium text-[#212121] dark:text-white hover:bg-[#F5F5F5] dark:hover:bg-[#212121] transition-colors font-inter"
            >
              <FcGoogle className="h-5 w-5" />
              Google
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-md border border-[#BDBDBD] dark:border-[#4A4A4A] bg-white dark:bg-[#2C2C2C] py-2 px-4 text-sm font-medium text-[#212121] dark:text-white hover:bg-[#F5F5F5] dark:hover:bg-[#212121] transition-colors font-inter"
            >
              <FaGithub className="h-5 w-5" />
              GitHub
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-[#212121] dark:text-[#BDBDBD] font-inter">
            Déjà un compte?{" "}
            <Link
              href="/login"
              className="font-medium text-[#D32F2F] dark:text-[#FF5252] hover:underline dark:hover:underline font-inter"
            >
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
