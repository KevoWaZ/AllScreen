// app/tv/[tvId]/seasons/page.tsx
"use client";
import Loading from "@/app/loading";
import { TVShow } from "@/types/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function Page() {
  const params = useParams<{ tvId: string }>();
  const [loading, setLoading] = useState(true);
  const [TVDetails, setTVDetails] = useState<TVShow | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `/api/tv/seasons?tvId=${params.tvId}`;
        const options = {
          cache: "force-cache" as RequestCache,
        };
        const response = await fetch(url, options);
        const data = await response.json();
        setTVDetails(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.tvId]);

  if (loading) {
    return <Loading />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 lg:p-8 dark:bg-[#121212] min-h-screen"
    >
      <div className="max-w-[90vw] md:max-w-[70vw] mx-auto">
        <Link
          href={`/tv/${params.tvId}`}
          className="inline-flex items-center text-[#1E40AF] hover:text-red-500 dark:text-[#FF5252] dark:hover:text-red-400 mb-6 transition-colors duration-300 ease-in-out"
          aria-label="Retour à la série"
        >
          <FaArrowLeft className="mr-2" />
          Retour à la série
        </Link>

        <h1 className="text-4xl font-bold mb-8 text-red-500 dark:text-[#FF5252]">
          {TVDetails?.name} - Saisons
        </h1>

        {TVDetails && TVDetails.seasons && TVDetails.seasons.length > 0 ? (
          TVDetails.seasons.map((season) => (
            <div
              key={season.id}
              className="bg-[#1c1c1c] dark:bg-[#2C2C2C] rounded-lg shadow-md p-6 mb-6 transition-all duration-300 ease-in-out hover:shadow-lg"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <Link
                    prefetch={false}
                    href={`/tv/${params.tvId}/seasons/${season.season_number}`}
                  >
                    <Image
                      src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${season.poster_path}`}
                      alt={season.name}
                      width={200}
                      height={300}
                      className="rounded-lg shadow-md"
                    />
                  </Link>
                </div>
                <div className="flex-grow">
                  <Link
                    prefetch={false}
                    href={`/tv/${params.tvId}/seasons/${season.season_number}`}
                    className="text-2xl font-semibold mb-2 text-red-500 dark:text-[#FF5252]"
                  >
                    {season.name}
                  </Link>
                  <p className="text-[#A1A1A1] dark:text-[#BDBDBD] mb-4">
                    {new Date(season.air_date).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    •
                    <span className="ml-2 text-red-500 dark:text-[#FF5252]">
                      {season.episode_count} épisode
                      {season.episode_count > 1 ? "s" : ""}
                    </span>
                  </p>
                  <p className="text-white dark:text-[#BDBDBD]">
                    {season.overview || "Aucune description disponible."}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Aucune saison disponible pour cette série.
          </p>
        )}
      </div>
    </motion.div>
  );
}
