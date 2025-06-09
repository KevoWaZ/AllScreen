"use client";
import Loading from "@/app/loading";
import MovieCard from "@/components/cards/MovieCard";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

interface Movie {
  movie: {
    id: number;
    title: string;
    poster: string;
    release_date: string;
    description: string;
    movieId: number;
  };
}

export default function Page() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams<{ username: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  const getWatched = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/profile/watched/movies?username=${params.username}`
      );
      const data = await res.json();
      console.log(data);
      setMovies(data.watched);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [params.username]);

  useEffect(() => {
    getWatched();
  }, [getWatched]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <h3>Watched: {movies.length}</h3>
      {movies && movies?.length > 0 && (
        <div className="flex justify-center mb-8 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer disabled:bg-red-600/50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of{" "}
            {Math.max(1, Math.ceil(movies.length / itemsPerPage))}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, Math.ceil(movies.length / itemsPerPage))
              )
            }
            disabled={currentPage === Math.ceil(movies.length / itemsPerPage)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer disabled:bg-red-600/50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
      <div className="grid gap-3 md:gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {movies &&
          movies
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((movie: Movie) => (
              <MovieCard
                key={movie.movie.id}
                showDescription
                showUserAction={false}
                movie={{
                  poster_path: movie.movie.poster,
                  title: movie.movie.title,
                  overview: movie.movie.description,
                  id: movie.movie.id,
                  release_date: movie.movie.release_date,
                }}
              />
            ))}
      </div>
      {movies && movies?.length > 0 && (
        <div className="flex justify-center mt-8 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer disabled:bg-red-600/50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of{" "}
            {Math.max(1, Math.ceil(movies.length / itemsPerPage))}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, Math.ceil(movies.length / itemsPerPage))
              )
            }
            disabled={currentPage === Math.ceil(movies.length / itemsPerPage)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer disabled:bg-red-600/50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
