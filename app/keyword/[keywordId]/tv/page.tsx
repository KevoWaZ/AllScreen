"use client";
import Loading from "@/app/loading";
import TVShowCard from "@/components/search/TVShowCard";
import { TVShow } from "@/types/types";
import { obtainKeywordName } from "@/utils/keyword";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [name, setName] = useState("");
  const [results, setResults] = useState<TVShow[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const params = useParams<{ keywordId: string }>();
  const keywordId = params.keywordId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await obtainKeywordName(keywordId, "tv", 1);
        setName(data.name);
        setResults(data.results);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [keywordId]);

  const loadMore = async () => {
    if (currentPage < totalPages) {
      try {
        setLoadingMore(true);
        const { results: newResults } = await obtainKeywordName(
          keywordId,
          "tv",
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
        {name && (
          <h1
            className={`text-4xl font-bold text-red-500 mb-8 text-center transform transition-all duration-500 ease-out`}
          >
            {name}
          </h1>
        )}
        {results.length > 0 && (
          <section className="my-8">
            <h2 className="mb-4 text-2xl font-bold text-red-500">Séries</h2>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
              {results.map((tvShow) => (
                <TVShowCard key={tvShow.id} tvShow={tvShow} showDescription />
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
