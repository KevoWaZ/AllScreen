"use client";
import Loading from "@/app/loading";
import MovieCard from "@/components/cards/MovieCard";
import { Movie } from "@/types/types";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [results, setResults] = useState<Movie[]>([]);
  const [countryName, setCountryName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const params = useParams<{ country: string }>();
  const country = params.country;

  const options = useMemo(
    () => ({
      cache: "force-cache" as RequestCache,
    }),
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const url = `/api/search/country?country=${country}&type=${"movie"}&page=${1}`;
        const response = await fetch(url, options);
        const data = await response.json();
        setResults(data.results);
        setTotalPages(data.totalPages);
        setCountryName(data.countryName);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [country, options]);

  const loadMore = async () => {
    if (currentPage < totalPages) {
      try {
        setLoadingMore(true);
        const url = `/api/search/country?country=${country}&type=${"movie"}&page=${
          currentPage + 1
        }`;
        const response = await fetch(url, options);
        const data = await response.json();
        setResults((prev) => [...prev, ...data.results]);
        setCurrentPage((prev) => prev + 1);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingMore(false);
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#121212] text-white"
    >
      <main className="p-4 max-w-full sm:max-w-[70vw] 3xl:max-w-[80vw] mx-auto">
        <h1 className="text-center text-4xl font-bold text-red-500">
          {countryName}
        </h1>
        {results.length > 0 && (
          <section className="my-8">
            <h2 className="mb-4 text-2xl font-bold text-red-500">Films</h2>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
              {results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} showDescription />
              ))}
            </div>
            {currentPage < totalPages && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg disabled:bg-red-300"
                >
                  {loadingMore ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </section>
        )}
      </main>
    </motion.div>
  );
}
