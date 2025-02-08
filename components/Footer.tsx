"use client";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa6";

export default function Footer1() {
  return (
    <footer
      className={`dark:bg-gray-900 dark:text-white bg-[#f1f1f1] text-gray-800 py-8 shadow-md`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-red-600">AllScreen</h2>
            <p className="mt-2">Your ultimate movie and TV show platform</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <ul className="flex justify-center space-x-4">
              <li>
                <Link
                  href="/about"
                  className="hover:text-red-600 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-red-600 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-red-600 transition-colors"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-red-600 transition-colors"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 flex justify-end space-x-4">
            <a
              href="#"
              className="text-gray-600 hover:text-red-600 transition-colors"
              aria-label="link"
            >
              <FaFacebookF aria-label="Facebook Icon" />
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-red-600 transition-colors"
              aria-label="link"
            >
              <FaTwitter aria-label="Twitter Icon" />
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-red-600 transition-colors"
              aria-label="link"
            >
              <FaInstagram aria-label="Instagram Icon" />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2025 AllScreen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
