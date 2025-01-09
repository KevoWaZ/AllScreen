"use client";
import { useState, FormEvent } from "react";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SearchComponent() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div>
      <header className="bg-[#1c1c1c] p-6 shadow-md">
        <h1 className="text-4xl font-bold text-center text-[#F5A623]">
          AllScreen
        </h1>
      </header>
      <main className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
          <input
            type="search"
            placeholder="Rechercher un film..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-3 bg-[#1c1c1c] border-2 border-[#F5A623] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A623] text-white placeholder-[#A1A1A1]"
          />
          <Link
            href={`/search?search=${encodeURIComponent(query)}`}
            className="px-6 py-3 bg-[#F5A623] text-[#1c1c1c] rounded-lg hover:bg-[#F5A623]/90 focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:ring-offset-2 focus:ring-offset-[#121212] disabled:opacity-50 flex items-center transition-colors duration-200"
          >
            <FaSearch className="w-5 h-5" />
            <span className="ml-2 text-sm font-semibold">Rechercher</span>
          </Link>
        </form>
      </main>
    </div>
  );
}

