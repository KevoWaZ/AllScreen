'use client'
import { Episode } from "@/types/types";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

function formatDate(dateString: string | null): string {
  if (!dateString) return "Date non disponible";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

async function obtainSeasonDetails(tvId: string, season_number: string) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${tvId}/season/${season_number}?language=fr-FR`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZTI2NjM3MjI4ZjlmOGE5N2I1YWQ2ODBkYmNkYjBhOSIsIm5iZiI6MTczMjEzMjgzMC4xNDA4OTU2LCJzdWIiOiI2NTZkY2Q0Zjg4MDU1MTAwYzY4MjA5MTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NwHMjefPWPfb5zCymPy1W9um9oEmjvnJBqQGOW5vHXs",
          accept: "application/json",
        },
      }
    );
    const seasonDetails = await response.json();
    return seasonDetails;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default function Page() {
    const params = useParams<{ tvId: string, number: string }>();
    const [loading, setLoading] = useState(true);
    const [seasonDetails, setSeasonDetails] = useState([])
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const seasonDetails = await obtainSeasonDetails(params.tvId, params.number);
        setSeasonDetails(seasonDetails)
        setLoading(true);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.tvId, params.number]);

  if (loading) {
    return (
      <div>
        <p>CHARGEMENT</p>
      </div>
    );
  }


  return (
    <div className="bg-[#121212] min-h-screen text-white p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{seasonDetails.name}</h1>

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
                <p className="text-gray-300">{seasonDetails.overview}</p>
              </div>
            )}
          </div>
        </div>

        <h2 className="text-3xl font-semibold mb-6">Épisodes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {seasonDetails.episodes.map((episode: Episode) => (
            <div
              key={episode.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
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
                  <span className="text-gray-500">Image non disponible</span>
                </div>
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{episode.name}</h3>
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
      </div>
    </div>
  );
}
