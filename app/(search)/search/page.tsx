"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchResultsType } from "@/types/types";
import { SearchResults } from "@/components/search/SearchResults";
import { useSearchParams } from "next/navigation";
import Form from "next/form";
import { FiSearch } from "react-icons/fi";
import { getCookie } from "cookies-next/client";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialSearchQuery = searchParams.get("search") || "";
  const [inputQuery, setInputQuery] = useState(initialSearchQuery);
  const [lastSearchedQuery, setLastSearchedQuery] =
    useState(initialSearchQuery);
  const [results, setResults] = useState<SearchResultsType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isInitialMount = useRef(true);

  const isLogged = getCookie("isLogged") === "true" ? true : false;
  const userId = getCookie("userId");

  const handleSearch = useCallback(
    async (searchTerm: string) => {
      if (!searchTerm.trim()) return;

      setLoading(true);
      setError(null);

      try {
        const url = `/api/search?params=${searchTerm}&isLogged=${isLogged}&userId=${userId}`;
        const response = await fetch(url);
        const data = await response.json();
        setResults(data);
        setLastSearchedQuery(searchTerm);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue"
        );
      } finally {
        setLoading(false);
      }
    },
    [isLogged, userId]
  );

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
    <div>
      <main className="p-4 max-w-full sm:max-w-[70vw] 3xl:max-w-[80vw] mx-auto">
        <div className="flex flex-col items-center justify-center mt-8 mb-12">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 0.25 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-indigo-600 rounded-full blur-[100px] pointer-events-none"
          />
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 0.25 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="absolute top-1/4 right-1/3 translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-pink-600 rounded-full blur-[100px] pointer-events-none"
          />
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center relative z-10"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Découvrez vos prochains{" "}
            <span className="text-[#D32F2F]">films</span> et{" "}
            <span className="text-[#D32F2F]">séries</span> préférés
          </motion.h1>
          <motion.div
            className="relative w-full max-w-2xl z-10"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Form action={"/search"}>
              <input
                type="search"
                name="search"
                placeholder="Rechercher des films, séries TV..."
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                className="w-full py-4 px-6 pl-12 rounded-full bg-[#2C2C2C] text-white border-2 border-[#4A4A4A] focus:outline-hidden focus:ring-2 focus:ring-[#D32F2F] focus:border-transparent transition-all duration-300 shadow-md hover:shadow-lg text-lg"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer bg-[#D32F2F] text-white p-3 rounded-full hover:bg-[#B71C1C] transition-colors duration-300"
                aria-label="Rechercher"
              >
                {loading ? (
                  <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <FiSearch className="w-6 h-6" aria-label="Search Icon" />
                )}
              </button>
            </Form>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              key="error"
              className="text-white text-center p-6 bg-[#D32F2F] rounded-lg mb-8 shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-xl font-semibold">{error}</p>
            </motion.div>
          )}

          {results && (
            <motion.div
              key={lastSearchedQuery}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SearchResults results={results} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
