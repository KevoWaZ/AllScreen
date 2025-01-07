"use client";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Component() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  return (
    <div>
      <header className="bg-[#1c1c1c] p-6 shadow-md">
        <h1 className="text-4xl font-bold text-center text-[#F5A623]">
          AllScreen
        </h1>
      </header>
      <main className="container mx-auto px-4 py-8">
        <form
          onSubmit={() => {
            router.push(`/search?search=${query}`);
          }}
          className="flex gap-2 mb-8"
        >
          <input
            type="search"
            placeholder="Rechercher un film..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-3 bg-[#1c1c1c] border-2 border-[#F5A623] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A623] text-white placeholder-[#A1A1A1]"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-[#F5A623] text-[#1c1c1c] rounded-lg hover:bg-[#F5A623]/90 focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:ring-offset-2 focus:ring-offset-[#121212] disabled:opacity-50 flex items-center transition-colors duration-200"
          >
            <>
              <FaSearch className="w-5 h-5" />
              <span className="ml-2 text-sm font-semibold">Rechercher</span>
            </>
          </button>
        </form>
      </main>
    </div>
  );
}
