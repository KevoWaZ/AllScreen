"use client";
import Form from "next/form";
import { FiSearch } from "react-icons/fi";

export default function SearchComponent() {
  return (
    <div className="hidden md:flex md:flex-col md:items-center md:justify-center mt-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Découvrez vos prochains films et séries préférés
      </h2>
      <div className="relative w-full max-w-xl">
        <Form action={"/search"}>
          <input
            type="search"
            name="search"
            placeholder="Rechercher des films, séries TV..."
            className={`w-full py-3 px-12 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-2 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300 shadow-md hover:shadow-lg`}
          />
          <button
            type="submit"
            className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-600 transition-colors duration-300"
            aria-label="Rechercher"
          >
            <FiSearch className="w-6 h-6" />
          </button>
        </Form>
      </div>
    </div>
  );
}

