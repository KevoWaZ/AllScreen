"use client";
import Loading from "@/app/loading";
import { MovieCard } from "@/components/search/MovieCard";
import { Company, Movie, TVShow } from "@/types/types";
import { obtainCompanyMedias } from "@/utils/company";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [info, setInfo] = useState<Company | null>(null);
  const [results, setResults] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const params = useParams<{ companyId: string }>();
  const companyId = params.companyId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { companyInfo, results, totalPages } = await obtainCompanyMedias(
          companyId,
          "movie",
          1
        );
        setInfo(companyInfo);
        setResults(results);
        setTotalPages(totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [companyId]);

  const loadMore = async () => {
    if (currentPage < totalPages) {
      try {
        setLoadingMore(true);
        const { results: newResults } = await obtainCompanyMedias(
          companyId,
          "movie",
          currentPage + 1
        );
        setResults((prev) => [...prev, ...newResults]);
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
    <div className="min-h-screen bg-[#121212] text-white">
      <main className="container mx-auto px-4 py-8">
        {info &&
          (info.logo_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w200${info.logo_path}`}
              alt={info.name}
              width={200}
              height={64}
            />
          ) : (
            <h1 className="text-4xl font-bold text-[#F5A623] mb-8 text-center">
              {info.name}
            </h1>
          ))}
        {results.length > 0 && (
          <section className="my-8">
            <h2 className="mb-4 text-2xl font-bold text-[#F5A623]">Films</h2>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
              {results.map((tvShow) => (
                <MovieCard key={tvShow.id} movie={tvShow} />
              ))}
            </div>
            {currentPage < totalPages && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg disabled:bg-gray-300"
                >
                  {loadingMore ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
