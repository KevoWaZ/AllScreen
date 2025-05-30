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
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Avatar from "@radix-ui/react-avatar";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  // Définir une condition pour ne pas afficher le formulaire sur "/" et "/search"
  const showSearchForm = !["/", "/search"].includes(pathname);

  const navigationItems = [
    { href: "/search/movie", label: "Films" },
    { href: "/search/tv", label: "Séries" },
    { href: "/person", label: "Personnes" },
  ];

  return (
    <header>
      <nav className="bg-gray-900 text-white  shadow-md">
        <div className="px-4 max-w-full sm:max-w-[70vw] 3xl:max-w-[80vw] mx-auto">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              prefetch={false}
              href={"/"}
              className="flex items-center shrink-0"
            >
              <FaImdb
                className="text-3xl text-red-600"
                aria-label="AllScreen Icon"
              />
              <span className="font-bold text-xl ml-2">AllScreen</span>
            </Link>

            {/* Search Form - Desktop */}
            <div className="hidden md:flex md:flex-1 md:justify-center px-4">
              <div className="relative w-full max-w-xl">
                {showSearchForm && (
                  <Form action={"/search"}>
                    <input
                      type="search"
                      name="search"
                      placeholder="Recherchez un film, une série ou une personne..."
                      className="w-full py-2 px-4 rounded-full bg-gray-800 text-white  focus:outline-hidden focus:ring-2 focus:ring-red-600"
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

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <NavigationMenu.Root className="relative">
                <NavigationMenu.List className="flex items-center space-x-4">
                  {navigationItems.map((item) => (
                    <NavigationMenu.Item key={item.href}>
                      <NavigationMenu.Link asChild>
                        <Link
                          prefetch={false}
                          href={item.href}
                          className={`hover:text-red-600 transition-colors px-3 py-2 rounded-md ${
                            pathname === item.href ? "text-red-600" : ""
                          }`}
                        >
                          {item.label}
                        </Link>
                      </NavigationMenu.Link>
                    </NavigationMenu.Item>
                  ))}
                </NavigationMenu.List>
              </NavigationMenu.Root>

              {/* User Profile/Auth */}
              {isPending ? (
                <div className="w-8 h-8 rounded-full  bg-gray-700 animate-pulse"></div>
              ) : session ? (
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button className="flex items-center focus:outline-hidden focus:ring-2 focus:ring-red-600 rounded-full cursor-pointer">
                      <Avatar.Root className="relative w-8 h-8 rounded-full overflow-hidden border-2  border-red-700  hover:border-red-800 transition-colors">
                        <Avatar.Image
                          src={session.user?.image || ""}
                          alt={session.user?.name || "Profil"}
                          className="object-cover w-full h-full"
                        />
                        <Avatar.Fallback className="w-full h-full bg-gray-600 flex items-center justify-center">
                          <FiUser className="text-gray-400" />
                        </Avatar.Fallback>
                      </Avatar.Root>
                    </button>
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      className="min-w-[160px] bg-gray-800 rounded-md p-1 shadow-lg border border-gray-700 z-50"
                      sideOffset={5}
                    >
                      <DropdownMenu.Item asChild>
                        <Link
                          href="/profile"
                          className="flex items-center px-3 py-2 text-white text-sm rounded-md hover:bg-gray-700 cursor-pointer outline-hidden"
                        >
                          Mon Profil
                        </Link>
                      </DropdownMenu.Item>
                      <DropdownMenu.Separator className="h-px bg-gray-700 my-1" />
                      <DropdownMenu.Item asChild>
                        <button
                          onClick={() => authClient.signOut()}
                          className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-gray-700 cursor-pointer outline-hidden text-red-600"
                        >
                          Déconnexion
                        </button>
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              ) : (
                <Link
                  href="/auth/signin"
                  className="flex items-center px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded-lg transition-colors text-sm"
                >
                  Connexion
                </Link>
              )}
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden flex items-center">
              {/* Mobile User Profile/Auth */}
              {isPending ? (
                <div className="w-8 h-8 rounded-full bg-gray-700 animate-pulse mr-2"></div>
              ) : session ? (
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button className="flex items-center mr-2 focus:outline-hidden focus:ring-2 focus:ring-red-600 rounded-full">
                      <Avatar.Root className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-red-700">
                        <Avatar.Image
                          src={session.user?.image || ""}
                          alt={session.user?.name || "Profil"}
                          className="object-cover w-full h-full"
                        />
                        <Avatar.Fallback className="w-full h-full bg-gray-600 flex items-center justify-center">
                          <FiUser className="text-gray-400" />
                        </Avatar.Fallback>
                      </Avatar.Root>
                    </button>
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      className="min-w-[160px] bg-gray-800 rounded-md p-1 shadow-lg border border-gray-700 z-50"
                      sideOffset={5}
                    >
                      <DropdownMenu.Item asChild>
                        <Link
                          href="/profile"
                          className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-700 cursor-pointer outline-hidden"
                        >
                          Mon Profil
                        </Link>
                      </DropdownMenu.Item>
                      <DropdownMenu.Separator className="h-px bg-gray-700 my-1" />
                      <DropdownMenu.Item asChild>
                        <button
                          onClick={() => authClient.signOut()}
                          className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-gray-700 cursor-pointer outline-hidden text-red-600"
                        >
                          Déconnexion
                        </button>
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              ) : (
                <Link
                  href="/auth/signin"
                  className="flex items-center px-3 py-1.5  bg-red-700 hover:bg-red-800 text-white rounded-lg transition-colors text-sm mr-2"
                >
                  Connexion
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400  hover:text-white  hover:bg-gray-700 focus:outline-hidden focus:ring-2 focus:ring-inset focus:ring-red-600"
                aria-expanded={isMenuOpen}
                aria-label="Toggle navigation menu"
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

        {/* Mobile Menu Content */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t  border-gray-700">
                {/* Mobile Search */}
                {showSearchForm && (
                  <div className="relative mb-3">
                    <Form action={"/search"}>
                      <input
                        type="search"
                        name="search"
                        placeholder="Recherchez un film, une série ou une personne..."
                        className="w-full py-2 px-4 rounded-full bg-gray-800 text-white  focus:outline-hidden focus:ring-2 focus:ring-red-600"
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

                {/* Mobile Navigation Links */}
                <NavigationMenu.Root>
                  <NavigationMenu.List className="flex flex-col space-y-1">
                    {navigationItems.map((item) => (
                      <NavigationMenu.Item key={item.href}>
                        <NavigationMenu.Link asChild>
                          <Link
                            prefetch={false}
                            href={item.href}
                            className={`block py-2 px-3 rounded-md hover:bg-gray-700 transition-colors ${
                              pathname === item.href
                                ? "text-red-600 bg-red-900/20"
                                : ""
                            }`}
                            onClick={toggleMenu}
                          >
                            {item.label}
                          </Link>
                        </NavigationMenu.Link>
                      </NavigationMenu.Item>
                    ))}
                  </NavigationMenu.List>
                </NavigationMenu.Root>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
