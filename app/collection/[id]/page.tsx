"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Collection, Movie } from "@/types/types";
import Loading from "@/app/loading";
import MovieCard from "@/components/cards/MovieCard";
import { motion } from "framer-motion";
import { FaFilm, FaInfoCircle } from "react-icons/fa";

export default function CollectionPage() {
  const params = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState<Collection | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const url = `/api/collection?collectionId=${params.id}`;
        const options = {
          cache: "force-cache" as RequestCache,
        };
        const response = await fetch(url, options);
        const data = await response.json();
        setCollection(data);
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
      <div className="min-h-screen bg-white dark:bg-[#121212] text-gray-800 dark:text-white flex items-center justify-center">
        <p className="text-xl font-semibold">Aucune collection trouvée.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
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
      <div className="max-w-[90vw] md:max-w-[70vw] mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-bold mb-6 text-red-600 dark:text-red-500"
        >
          {collection.name}
        </motion.h1>

        {collection.overview && (
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-800 dark:text-gray-200 mb-8 max-w-3xl text-lg leading-relaxed"
          >
            {collection.overview}
          </motion.p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {collection.poster_path && (
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-1"
            >
              <Image
                src={`https://image.tmdb.org/t/p/w500${collection.poster_path}`}
                alt={collection.name}
                width={500}
                height={750}
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          )}

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2"
          >
            <h2 className="text-3xl font-semibold mb-6 text-red-600 dark:text-red-500 flex items-center">
              <FaFilm className="mr-2" />
              Films de la collection
            </h2>
            {collection.parts?.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <MovieCard movie={movie} showDescription />
                    </motion.div>
                  ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400 flex items-center text-lg">
                <FaInfoCircle className="mr-2" />
                Aucun film dans cette collection.
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
