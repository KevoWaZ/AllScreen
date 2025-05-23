"use client";

import type React from "react";

import { useState } from "react";
import { FiSearch, FiMenu, FiX, FiUser } from "react-icons/fi";
import { FaImdb } from "react-icons/fa";
import Link from "next/link";
import Form from "next/form";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  // Définir une condition pour ne pas afficher le formulaire sur "/" et "/search"
  const showSearchForm = !["/", "/search"].includes(pathname);

  return (
    <header>
      <nav className="dark:bg-gray-900 dark:text-white bg-[#f1f1f1] text-gray-800 shadow-md">
        <div className="px-4 max-w-full sm:max-w-[70vw] 3xl:max-w-[80vw] mx-auto">
          <div className="flex items-center justify-between h-16">
            <Link
              prefetch={false}
              href={"/"}
              className="flex items-center flex-shrink-0"
            >
              <FaImdb
                className="text-3xl text-red-600"
                aria-label="AllScreen Icon"
              />
              <span className="font-bold text-xl ml-2">AllScreen</span>
            </Link>
            <div className="hidden md:flex md:flex-1 md:justify-center px-4">
              <div className="relative w-full max-w-xl">
                {showSearchForm && (
                  <Form action={"/search"}>
                    <input
                      type="search"
                      name="search"
                      placeholder="Recherchez un film, une série ou une personne..."
                      className="w-full py-2 px-4 rounded-full dark:bg-gray-800 dark:text-white bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                    <button type="submit">
                      <FiSearch
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        aria-label="Search Button"
                      />
                    </button>
                  </Form>
                )}
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link
                prefetch={false}
                href="/search/movie"
                className={`hover:text-red-600 transition-colors ${
                  pathname === "/search/movie" ? "text-red-600" : ""
                }`}
                onClick={toggleMenu}
              >
                Films
              </Link>
              <Link
                prefetch={false}
                href="/search/tv"
                className={`hover:text-red-600 transition-colors ${
                  pathname === "/search/tv" ? "text-red-600" : ""
                }`}
                onClick={toggleMenu}
              >
                Séries
              </Link>
              <Link
                prefetch={false}
                href="/person"
                className={`hover:text-red-600 transition-colors ${
                  pathname === "/person" ? "text-red-600" : ""
                }`}
                onClick={toggleMenu}
              >
                Personnes
              </Link>
              {/* <ThemeToggle /> */}

              {/* Afficher soit le bouton de connexion, soit l'image de profil */}
              {isPending ? (
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              ) : session ? (
                <Link href="/profile" className="flex items-center">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-red-600 dark:border-red-700 hover:border-red-700 dark:hover:border-red-800 transition-colors">
                    {session.user?.image ? (
                      <Image
                        src={session.user.image || "/placeholder.svg"}
                        alt={session.user.name || "Profil"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                        <FiUser className="text-gray-500 dark:text-gray-400" />
                      </div>
                    )}
                  </div>
                </Link>
              ) : (
                <Link
                  href="/auth/signin"
                  className="flex items-center px-3 py-1.5 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white rounded-lg transition-colors text-sm"
                >
                  Connexion
                </Link>
              )}
            </div>
            <div className="md:hidden flex items-center">
              {/* <ThemeToggle /> */}

              {/* Afficher soit le bouton de connexion, soit l'image de profil sur mobile */}
              {isPending ? (
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse mr-2"></div>
              ) : session ? (
                <Link href="/profile" className="flex items-center mr-2">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-red-600 dark:border-red-700">
                    {session.user?.image ? (
                      <Image
                        src={session.user.image || "/placeholder.svg"}
                        alt={session.user.name || "Profil"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                        <FiUser className="text-gray-500 dark:text-gray-400" />
                      </div>
                    )}
                  </div>
                </Link>
              ) : (
                <Link
                  href="/auth/signin"
                  className="flex items-center px-3 py-1.5 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white rounded-lg transition-colors text-sm mr-2"
                >
                  Connexion
                </Link>
              )}

              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <FiX className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <FiMenu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {showSearchForm && (
                  <div className="relative mb-3">
                    <Form action={"/search"}>
                      <input
                        type="search"
                        name="search"
                        placeholder="Recherchez un film, une série ou une personne..."
                        className="w-full py-2 px-4 rounded-full dark:bg-gray-800 dark:text-white bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                      <button type="submit">
                        <FiSearch
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          aria-label="Search Button"
                        />
                      </button>
                    </Form>
                  </div>
                )}
                <Link
                  prefetch={false}
                  href="/search/movie"
                  className={`block py-2 px-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ${
                    pathname === "/search/movie" ? "text-red-600" : ""
                  }`}
                  onClick={toggleMenu}
                >
                  Films
                </Link>
                <Link
                  prefetch={false}
                  href="/search/tv"
                  className={`block py-2 px-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ${
                    pathname === "/search/tv" ? "text-red-600" : ""
                  }`}
                  onClick={toggleMenu}
                >
                  Séries
                </Link>
                <Link
                  prefetch={false}
                  href="/person"
                  className={`block py-2 px-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ${
                    pathname === "/person" ? "text-red-600" : ""
                  }`}
                  onClick={toggleMenu}
                >
                  Personnes
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
