"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import type { Collection, Movie } from "@/types/types";
import Loading from "@/app/loading";
import MovieCard from "@/components/cards/MovieCard";
import { motion } from "framer-motion";
import { FaFilm } from "react-icons/fa";
import { getCookie } from "cookies-next";

export default function CollectionPage() {
  const params = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState<Collection | null>(null);

  const isLogged = getCookie("isLogged") === "true" ? true : false;
  const userId = getCookie("userId");

  const getCollection = useCallback(async () => {
    try {
      setLoading(true);
      const url = `/api/collection?collectionId=${params.id}&isLogged=${isLogged}&userId=${userId}`;
      const response = await fetch(url);
      const data = await response.json();
      setCollection(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [params.id, isLogged, userId]);

  useEffect(() => {
    getCollection();
  }, [getCollection]);

  if (loading) {
    return <Loading />;
  }

  if (!collection) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4">
          <FaFilm className="text-6xl text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-300">
            Collection introuvable
          </h2>
          <p className="text-gray-400 max-w-md">
            La collection que vous recherchez n'existe pas ou a ete supprimee.
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-[#121212] min-h-screen"
    >
      {collection.backdrop_path && (
        <div className="relative h-[50vh] w-full">
          <Image
            src={`https://image.tmdb.org/t/p/original${collection.backdrop_path}`}
            alt={collection.name}
            fill
            style={{ objectFit: "cover", opacity: 1 }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#121212] to-transparent" />
        </div>
      )}

      <div className="max-w-[95vw] sm:max-w-[90vw] lg:max-w-[85vw] xl:max-w-[80vw] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 relative">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight"
        >
          {collection.name}
        </motion.h1>

        {collection.overview && (
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 mb-12 max-w-4xl text-base sm:text-lg leading-relaxed"
          >
            {collection.overview}
          </motion.p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[350px_1fr] 2xl:grid-cols-[400px_1fr] gap-8 lg:gap-12">
          {collection.poster_path && (
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="flex justify-center lg:justify-start"
            >
              <div className="w-[280px] sm:w-[300px] lg:w-full">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${collection.poster_path}`}
                  alt={collection.name}
                  width={400}
                  height={600}
                  className="rounded-lg shadow-2xl w-full h-auto"
                />
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-800">
              <FaFilm className="text-red-500 text-2xl" />
              <h2 className="text-2xl sm:text-3xl font-semibold text-white">
                Films de la collection
              </h2>
            </div>

            {collection.parts?.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {collection.parts
                  .sort(
                    (a: Movie, b: Movie) =>
                      new Date(a.release_date).getTime() -
                      new Date(b.release_date).getTime()
                  )
                  .map((movie: Movie, index: number) => (
                    <motion.div
                      key={movie.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.35 + index * 0.05, duration: 0.3 }}
                    >
                      <MovieCard movie={movie} showDescription />
                    </motion.div>
                  ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <FaFilm className="text-5xl text-gray-700 mb-4" />
                <p className="text-gray-400 text-lg">
                  Aucun film dans cette collection pour le moment.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
