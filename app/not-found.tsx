import Link from "@/components/utils/Link";
import { FaHome, FaSearch } from "react-icons/fa";
import { FaFilm } from "react-icons/fa6";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <div className="text-red-500 mb-6">
        <FaFilm size={64} />
      </div>
      <h2
        className="text-4xl font-bold mb-4 text-center"
        style={{ fontFamily: "'Bebas Neue', cursive" }}
      >
        Oops! Page non trouvée
      </h2>
      <p className="mb-8 text-gray-400 text-center max-w-md">
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>
      <div className="flex flex-wrap gap-2">
        <Link
          href="/"
          className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition duration-300 flex items-center"
        >
          <FaHome className="mr-2" size={18} />
          Retour à l&apos;accueil
        </Link>
        <Link
          href="/search"
          className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition duration-300 flex items-center"
        >
          <FaSearch className="mr-2" size={18} />
          Réessayer
        </Link>
      </div>
    </div>
  );
}
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
        href="/"
        className="inline-flex items-center px-4 py-2 text-white rounded bg-red-700 hover:bg-red-800 transition duration-300"
      >
        <FaHome className="mr-2" />
        Retour à l&apos;accueil
      </Link>
      <Link
        href="/search"
        className="inline-flex items-center px-4 py-2 rounded text-red-500 bg-gray-800 border-red-500 hover:bg-gray-700 transition duration-300"
      >
        <FaSearch className="mr-2" />
        Rechercher
      </Link>
    </div>
  </div>
</div>;
