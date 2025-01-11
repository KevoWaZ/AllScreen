"use client";
import Loading from "@/app/loading";
import { TVShowCard } from "@/components/search/TVShowCard";
import { TVShow } from "@/types/types";
import { obtainKeywordName } from "@/utils/keyword";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [results, setResults] = useState<TVShow[]>([]);
  const params = useParams<{ keywordId: string }>();
  const keywordId = params.keywordId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await obtainKeywordName(keywordId, "tv");
        setName(data.name);
        setResults(data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [keywordId]);

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
            <h2 className="mb-4 text-2xl font-bold text-[#F5A623]">Séries</h2>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
              {results.map((tvShow) => (
                <TVShowCard key={tvShow.id} tvShow={tvShow} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
