"use client";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa6";

const Footer: React.FC = () => {
  return (
    <footer
      className={`dark:bg-gray-900 dark:text-white bg-[#f1f1f1] text-gray-800 py-8 shadow-md`}
    >
      <div className="px-4 max-w-full sm:max-w-[70vw] 3xl:max-w-[80vw] mx-auto">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-red-600">AllScreen</h2>
            <p className="mt-2">
              Votre plateforme ultime pour films et séries TV
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <ul className="flex justify-center space-x-4">
              <li>
                <Link
                  href="/mentions-legales"
                  className="hover:text-red-600 transition-colors"
                >
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 flex justify-end space-x-4">
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-red-600 transition-colors"
              aria-label="Facebook"
            >
              <FaFacebookF aria-label="Facebook Icon" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-red-600 transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter aria-label="Twitter Icon" />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-red-600 transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram aria-label="Instagram Icon" />
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} AllScreen. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
