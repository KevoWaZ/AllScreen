import Link from "next/link";
import { FaHome, FaSearch } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen  bg-gray-900">
      <div className="text-center">
        <h1 className="text-9xl font-bold  text-red-500">404</h1>
        <p className="mt-4 text-2xl font-semibold  text-gray-200">
          Oops! Page non trouvée
        </p>
        <p className="mt-4  text-gray-400">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <div className="mt-8 space-x-4">
          <Link
            prefetch={false}
            href="/"
            className="inline-flex items-center px-4 py-2 text-white rounded bg-red-700 hover:bg-red-800 transition duration-300"
          >
            <FaHome className="mr-2" />
            Retour à l&apos;accueil
          </Link>
          <Link
            prefetch={false}
            href="/search"
            className="inline-flex items-center px-4 py-2 rounded text-red-500 bg-gray-800 border-red-500 hover:bg-gray-700 transition duration-300"
          >
            <FaSearch className="mr-2" />
            Rechercher
          </Link>
        </div>
      </div>
    </div>
  );
}
