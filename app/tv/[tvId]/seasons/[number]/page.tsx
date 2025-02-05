"use client";
import { Episode, Season } from "@/types/types";
import Image from "next/image";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Loading from "@/app/loading";

function formatDate(dateString: string | null): string {
  if (!dateString) return "Date non disponible";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export default function Page() {
  const params = useParams<{ tvId: string; number: string }>();
  const [loading, setLoading] = useState(true);
  const [seasonDetails, setSeasonDetails] = useState<Season | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `/api/tv/seasons/number?tvId=${params.tvId}&number=${params.number}`
        );
        const data = await response.json();

        setSeasonDetails(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.tvId, params.number]);

  if (loading) {
    return <Loading />;
  }

  if (!seasonDetails) {
    <h1>No seasons</h1>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 lg:p-8"
    >
      <div className="max-w-7xl mx-auto">
        {seasonDetails && (
          <>
            <h1 className="text-4xl font-bold mb-6">
              {seasonDetails?.name ?? "Chargement..."}
            </h1>

            <div className="flex flex-col md:flex-row gap-8 mb-8">
              {seasonDetails.poster_path && (
                <Image
                  src={`https://image.tmdb.org/t/p/w300${seasonDetails.poster_path}`}
                  alt={seasonDetails.name}
                  width={300}
                  height={450}
                  className="rounded-lg shadow-lg"
                />
              )}
              <div>
                <p className="text-xl mb-2">
                  Nombre d&apos;épisodes : {seasonDetails.episodes.length}
                </p>
                <p className="text-xl mb-2">
                  Date de diffusion : {formatDate(seasonDetails.air_date)}
                </p>
                <p className="text-xl mb-4">
                  Note moyenne : {seasonDetails.vote_average.toFixed(1)}
                </p>
                {seasonDetails.overview && (
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Synopsis</h2>
                    <p className="text-black dark:text-gray-300">
                      {seasonDetails.overview}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <h2 className="text-3xl font-semibold mb-6">Épisodes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {seasonDetails.episodes.map((episode: Episode) => (
                <div
                  key={episode.id}
                  className="bg-[#1c1c1c] dark:bg-[#2C2C2C] rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
                >
                  {episode.still_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
                      alt={episode.name}
                      width={500}
                      height={281}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-500">
                        Image non disponible
                      </span>
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-xl text-gray-300 font-semibold mb-2">
                      {episode.name}
                    </h3>
                    <p className="text-sm text-gray-400 mb-2">
                      Épisode {episode.episode_number} •{" "}
                      {formatDate(episode.air_date)}
                    </p>
                    <p className="text-gray-300 text-sm mb-2 line-clamp-3">
                      {episode.overview || "Pas de résumé disponible."}
                    </p>
                    <div className="flex items-center">
                      <FaStar className="text-yellow-500 mr-1" />
                      <span className="text-gray-300">
                        {episode.vote_average.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
