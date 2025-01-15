"use client";
import { FaSearch } from "react-icons/fa";
import Form from "next/form";

export default function SearchComponent() {
  return (
    <div>
      <header className="bg-[#1c1c1c] p-6 shadow-md">
        <h1 className="text-4xl font-bold text-center text-red-500">
          AllScreen
        </h1>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Form action={"/search"} className="flex gap-2 mb-8">
          <input
            type="search"
            name="search"
            placeholder="Rechercher un film, une série, une personne..."
            className="max-w-[200px] md:max-w-full flex-1 px-4 py-3 bg-[#1c1c1c] border-2 border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-[#A1A1A1]"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-red-500 text-[#1c1c1c] rounded-lg hover:bg-red-600/90 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-[#121212] disabled:opacity-50 flex items-center transition-colors duration-200"
          >
            <>
              <FaSearch className="w-5 h-5" />
              <span className="ml-2 text-sm font-semibold">Rechercher</span>
            </>
          </button>
        </Form>
      </main>
    </div>
  );
}
