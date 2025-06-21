"use client";
import { Episode, Season } from "@/types/types";
import Image from "next/image";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Loading from "@/app/loading";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

export default function Page() {
  const params = useParams<{ tvId: string; number: string }>();
  const tvId = params.tvId;
  const season = params.number;
  const [loading, setLoading] = useState(true);
  const [seasonDetails, setSeasonDetails] = useState<Season | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const url = `/api/tv/seasons/number?tvId=${params.tvId}&number=${params.number}`;
        const response = await fetch(url);
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
      <div className="max-w-[90vw] md:max-w-[70vw] mx-auto">
        <Link
          prefetch={false}
          href={`/tv/${params.tvId}/seasons/`}
          className="inline-flex items-center text-blue-500 hover:text-blue-400 mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Retour aux saisons
        </Link>
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
                    <p className=" text-gray-300">{seasonDetails.overview}</p>
                  </div>
                )}
              </div>
            </div>

            <h2 className="text-3xl font-semibold mb-6">Épisodes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {seasonDetails.episodes.map((episode: Episode) => (
                <div
                  key={episode.id}
                  className=" bg-[#2C2C2C] rounded-lg overflow-hidden shadow-lg"
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
                    <Link
                      prefetch={false}
                      href={`/tv/${tvId}/seasons/${season}/episode/${episode.episode_number}/cast`}
                      className="inline-block mt-4 bg-red-500 text-white p-3 rounded-lg hover:bg-red-400 transition-colors duration-300 text-sm font-semibold"
                    >
                      Distribution des rôles
                    </Link>
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
