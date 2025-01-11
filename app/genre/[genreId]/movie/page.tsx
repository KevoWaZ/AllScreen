"use client";
import Loading from "@/app/loading";
import { MovieCard } from "@/components/search/MovieCard";
import { Movie } from "@/types/types";
import { obtainGenreResults } from "@/utils/genre";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<Movie[]>([]);
  const params = useParams<{ genreId: string }>();
  const genreId = params.genreId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await obtainGenreResults(genreId, "movie");
        setResults(data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [genreId]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <main className="container mx-auto px-4 py-8">
        {results.length > 0 && (
          <section className="my-8">
            <h2 className="mb-4 text-2xl font-bold text-[#F5A623]">Films</h2>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
              {results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
