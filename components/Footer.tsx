"use client";

import type React from "react";

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa6";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as Tooltip from "@radix-ui/react-tooltip";
import * as Separator from "@radix-ui/react-separator";

const Footer: React.FC = () => {
  const socialLinks = [
    {
      href: "https://facebook.com",
      icon: FaFacebookF,
      label: "Facebook",
      ariaLabel: "Suivez-nous sur Facebook",
    },
    {
      href: "https://twitter.com",
      icon: FaTwitter,
      label: "Twitter",
      ariaLabel: "Suivez-nous sur Twitter",
    },
    {
      href: "https://instagram.com",
      icon: FaInstagram,
      label: "Instagram",
      ariaLabel: "Suivez-nous sur Instagram",
    },
  ];

  const footerLinks = [
    { href: "/mentions-legales", label: "Mentions légales" },
    {
      href: "/politique-confidentialite",
      label: "Politique de confidentialité",
    },
    { href: "/conditions-utilisation", label: "Conditions d'utilisation" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <Tooltip.Provider>
      <footer className="bg-gray-900 text-white py-8 shadow-md">
        <div className="px-4 max-w-full sm:max-w-[70vw] 3xl:max-w-[80vw] mx-auto">
          <div className="flex flex-wrap justify-between items-start gap-8">
            {/* Brand Section */}
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-red-600 mb-2">
                AllScreen
              </h2>
              <p className=" text-gray-300 leading-relaxed">
                Votre plateforme ultime pour découvrir films et séries TV
              </p>
            </div>

            {/* Navigation Links */}
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-4  text-white">
                Liens utiles
              </h3>
              <NavigationMenu.Root className="relative">
                <NavigationMenu.List className="flex flex-col space-y-2">
                  {footerLinks.map((link) => (
                    <NavigationMenu.Item key={link.href}>
                      <NavigationMenu.Link asChild>
                        <Link
                          prefetch={false}
                          href={link.href}
                          className=" text-gray-300  hover:text-red-400 transition-colors duration-200 text-sm py-1 block focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                        >
                          {link.label}
                        </Link>
                      </NavigationMenu.Link>
                    </NavigationMenu.Item>
                  ))}
                </NavigationMenu.List>
              </NavigationMenu.Root>
            </div>

            {/* Social Media Links */}
            <div className="w-full md:w-1/3">
              <h3 className="text-lg font-semibold mb-4  text-white">
                Suivez-nous
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <Tooltip.Root key={social.label} delayDuration={300}>
                      <Tooltip.Trigger asChild>
                        <Link
                          prefetch={false}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className=" text-gray-300  hover:text-red-400 transition-colors duration-200 p-2 rounded-full  hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-gray-900"
                          aria-label={social.ariaLabel}
                        >
                          <IconComponent
                            className="w-5 h-5"
                            aria-hidden="true"
                          />
                        </Link>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content
                          className=" bg-gray-700 text-white px-3 py-2 rounded-md text-sm shadow-lg z-50"
                          sideOffset={5}
                        >
                          {social.ariaLabel}
                          <Tooltip.Arrow className=" fill-gray-700" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Separator */}
          <Separator.Root className=" bg-gray-600 h-px my-8" />

          {/* Copyright Section */}
          <div className="text-center">
            <p className=" text-gray-300 text-sm">
              &copy; {new Date().getFullYear()} AllScreen. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </Tooltip.Provider>
  );
};

export default Footer;
