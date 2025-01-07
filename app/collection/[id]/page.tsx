"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiCalendar, FiStar } from "react-icons/fi";
import { useParams } from "next/navigation"; 
import { Collection, Movie } from "@/types/types";
import Loading from "@/app/loading";

async function getCollectionDetails(id: string) {
  const response = await fetch(
    `https://api.themoviedb.org/3/collection/${id}?language=fr-FR`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZTI2NjM3MjI4ZjlmOGE5N2I1YWQ2ODBkYmNkYjBhOSIsIm5iZiI6MTczMjEzMjgzMC4xNDA4OTU2LCJzdWIiOiI2NTZkY2Q0Zjg4MDU1MTAwYzY4MjA5MTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NwHMjefPWPfb5zCymPy1W9um9oEmjvnJBqQGOW5vHXs",
        accept: "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch collection data");
  }
  return response.json();
}

export default function CollectionPage() {
  const params = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState<Collection | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const collection = await getCollectionDetails(params.id);
        setCollection(collection);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.id]);

  if (loading) {
    return (
      <Loading />
    );
  }

  if (!collection) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <p>Aucune collection trouvée.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {collection.backdrop_path && (
        <div className="relative h-[50vh] w-full">
          <Image
            src={`https://image.tmdb.org/t/p/original${collection.backdrop_path}`}
            alt={collection.name}
            layout="fill"
            objectFit="cover"
            className="opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent" />
        </div>
      )}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <h1 className="text-4xl font-bold mb-6 text-[#F5A623]">
          {collection.name}
        </h1>

        {collection.overview && (
          <p className="text-gray-300 mb-8 max-w-3xl">{collection.overview}</p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {collection.poster_path && (
            <div className="lg:col-span-1">
              <Image
                src={`https://image.tmdb.org/t/p/w500${collection.poster_path}`}
                alt={collection.name}
                width={500}
                height={750}
                className="rounded-lg shadow-lg"
              />
            </div>
          )}

          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4 text-[#F5A623]">
              Films de la collection
            </h2>
<div className="space-y-6">
  {collection.parts?.length ? (
    collection.parts
      .sort(
        (a: Movie, b: Movie) =>
          new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
      )
      .map((movie: Movie) => (
        <Link href={`/movie/${movie.id}`} key={movie.id}>
          <div className="bg-[#1c1c1c] p-4 m-4 rounded-lg shadow-md hover:bg-gray-800 transition duration-300 flex">
            {movie.poster_path && (
              <Image
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                width={100}
                height={150}
                className="rounded-md mr-4"
              />
            )}
            <div>
              <h3 className="text-xl font-semibold text-[#F5A623]">
                {movie.title}
              </h3>
              <div className="flex items-center text-gray-400 mt-2">
                <FiCalendar className="mr-2" />
                <span>
                  {new Date(movie.release_date).toLocaleDateString("fr-FR")}
                </span>
                {movie.vote_average > 0 && (
                  <>
                    <FiStar className="ml-4 mr-2" />
                    <span>{movie.vote_average.toFixed(1)}</span>
                  </>
                )}
              </div>
              {movie.overview && (
                <p className="text-gray-300 mt-2 line-clamp-3">
                  {movie.overview}
                </p>
              )}
            </div>
          </div>
        </Link>
      ))
  ) : (
    <p className="text-gray-400">Aucun film dans cette collection.</p>
  )}
</div>

          </div>
        </div>
      </div>
    </div>
  );
}
