"use client";

import { useState } from "react";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { FaImdb } from "react-icons/fa";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import Form from "next/form";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const pathname = usePathname();

  // Définir une condition pour ne pas afficher le formulaire sur "/" et "/search"
  const showSearchForm = !["/", "/search"].includes(pathname);

  return (
    <header>
      <nav className="dark:bg-gray-900 dark:text-white bg-[#f1f1f1] text-gray-800 shadow-md">
        <div className="px-4 max-w-full sm:max-w-[70vw] 3xl:max-w-[80vw] mx-auto">
          <div className="flex items-center justify-between h-16">
            <Link href={"/"} className="flex items-center flex-shrink-0">
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
                href="/movies"
                className="hover:text-red-600 transition-colors"
              >
                Films
              </Link>
              <Link
                href="/tv-shows"
                className="hover:text-red-600 transition-colors"
              >
                Séries
              </Link>
              <Link
                href="/person"
                className="hover:text-red-600 transition-colors"
              >
                Personnes
              </Link>
              {/* <ThemeToggle /> */}
            </div>
            <div className="md:hidden flex items-center">
              {/* <ThemeToggle /> */}
              <button
                onClick={toggleMenu}
                className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
                        placeholder="Search movies, TV shows..."
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
                  href="/movies"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:text-red-600 transition-colors"
                  onClick={toggleMenu}
                >
                  Movies
                </Link>
                <Link
                  href="/tv-shows"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:text-red-600 transition-colors"
                  onClick={toggleMenu}
                >
                  TV Shows
                </Link>
                <Link
                  href="/person"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:text-red-600 transition-colors"
                  onClick={toggleMenu}
                >
                  Persons
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
