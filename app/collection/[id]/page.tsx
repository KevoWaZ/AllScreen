"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Collection, Movie } from "@/types/types";
import Loading from "@/app/loading";
import { getCollection } from "@/utils/collection";
import MovieCollectionCard from "@/components/collection/MovieCollectionCard";
import MovieCard from "@/components/search/MovieCard";

export default function CollectionPage() {
  const params = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState<Collection | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const collection = await getCollection(params.id);
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
    return <Loading />;
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
            fill
            style={{ objectFit: "cover", opacity: 1 }}
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
            <div className="gap-8 sm:gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2">
              {collection.parts?.length ? (
                collection.parts
                  .sort(
                    (a: Movie, b: Movie) =>
                      new Date(a.release_date).getTime() -
                      new Date(b.release_date).getTime()
                  )
                  .map((movie: Movie) => (
                    <>
                    <MovieCard movie={movie} key={movie.id} showDescription />
                      {/* <MovieCollectionCard movie={movie} key={movie.id} /> */}
                    </>
                  ))
              ) : (
                <p className="text-gray-400">
                  Aucun film dans cette collection.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
