"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { SearchResultsType } from "@/types/types";
import { searchAll } from "@/utils/searchUtils";
import { SearchResults } from "@/components/search/SearchResults";
import { usePathname, useSearchParams } from "next/navigation";
import Form from "next/form";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const initialSearchQuery = searchParams.get("search") || "";
  const [inputQuery, setInputQuery] = useState(initialSearchQuery);
  const [lastSearchedQuery, setLastSearchedQuery] =
    useState(initialSearchQuery);
  const [results, setResults] = useState<SearchResultsType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isInitialMount = useRef(true);

  const handleSearch = useCallback(async (searchTerm: string) => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const searchResults = await searchAll(searchTerm);
      setResults(searchResults);
      setLastSearchedQuery(searchTerm);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (initialSearchQuery) {
        handleSearch(initialSearchQuery);
      }
    } else {
      const currentSearchQuery = searchParams.get("search") || "";
      if (
        currentSearchQuery !== lastSearchedQuery &&
        currentSearchQuery.trim() !== ""
      ) {
        setInputQuery(currentSearchQuery);
        handleSearch(currentSearchQuery);
      }
    }
  }, [searchParams, handleSearch, initialSearchQuery, lastSearchedQuery]);

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <header className="bg-[#1c1c1c] p-6 shadow-md">
        <h1 className="text-4xl font-bold text-center text-[#F5A623]">
          AllScreen
        </h1>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Form
          action={pathname}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <input
            type="search"
            name="search"
            placeholder="Rechercher un film, une série, une personne..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="max-w-[200px] md:max-w-full flex-1 px-4 py-3 bg-[#1c1c1c] border-2 border-[#F5A623] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A623] text-white placeholder-[#A1A1A1]"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-[#F5A623] text-[#1c1c1c] rounded-lg hover:bg-[#F5A623]/90 focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:ring-offset-2 focus:ring-offset-[#121212] disabled:opacity-50 flex items-center transition-colors duration-200"
          >
            {loading ? (
              <div className="animate-spin w-5 h-5 border-2 border-[#1c1c1c] border-t-transparent rounded-full" />
            ) : (
              <>
                <FaSearch className="w-5 h-5" />
                <span className="ml-2 text-sm font-semibold">Rechercher</span>
              </>
            )}
          </button>
        </Form>

        {error && (
          <div className="text-red-500 text-center p-4 bg-[#1c1c1c] rounded-lg mb-8">
            {error}
          </div>
        )}

        {results && <SearchResults results={results} />}
      </main>
    </div>
  );
}
