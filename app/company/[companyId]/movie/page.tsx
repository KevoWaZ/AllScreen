"use client";
import Loading from "@/app/loading";
import { MovieCard } from "@/components/search/MovieCard";
import { Movie } from "@/types/types";
import { obtainCompanyName } from "@/utils/company";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(18);
  const params = useParams<{ companyId: string }>();
  const companyId = params.companyId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setCurrentPage(1);
        const data = await obtainCompanyName(companyId, "movie");
        setName(data.name);
        setResults(data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [companyId]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <main className="container mx-auto px-4 py-8">
        {name && (
          <h1
            className={`text-4xl font-bold text-[#F5A623] mb-8 text-center transform transition-all duration-500 ease-out`}
          >
            {name}
          </h1>
        )}
        {results.length > 0 && (
          <section className="my-8">
            <h2 className="mb-4 text-2xl font-bold text-[#F5A623]">Films</h2>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
              {results
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
          </section>
        )}
        {results.length >= 18 && (
          <div className="flex justify-center mt-8 gap-2">
            <button
              onClick={() => {
                setCurrentPage((prev) => Math.max(prev - 1, 1));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg disabled:bg-gray-300"
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {currentPage} of{" "}
              {Math.max(1, Math.ceil(results.length / itemsPerPage))}
            </span>
            <button
              onClick={() => {
                setCurrentPage((prev) =>
                  Math.min(prev + 1, Math.ceil(results.length / itemsPerPage))
                );
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }, 1);
              }}
              disabled={
                currentPage === Math.ceil(results.length / itemsPerPage)
              }
              className="px-4 py-2 bg-orange-500 text-white rounded-lg disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
