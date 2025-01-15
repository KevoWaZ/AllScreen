"use client";
import { TVShow } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

async function obtainTVDetails(tvId: string) {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${tvId}`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZTI2NjM3MjI4ZjlmOGE5N2I1YWQ2ODBkYmNkYjBhOSIsIm5iZiI6MTczMjEzMjgzMC4xNDA4OTU2LCJzdWIiOiI2NTZkY2Q0Zjg4MDU1MTAwYzY4MjA5MTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NwHMjefPWPfb5zCymPy1W9um9oEmjvnJBqQGOW5vHXs",
        accept: "application/json",
      },
    });
    const TVDetails = await response.json();
    return TVDetails;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default function Page() {
  const params = useParams<{ tvId: string }>();
  const [loading, setLoading] = useState(true);
  const [TVDetails, setTVDetails] = useState<TVShow | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const TVDetails = await obtainTVDetails(params.tvId);
        setTVDetails(TVDetails);
        setLoading(true);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.tvId]);

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
        <Link
          href={`/tv/${params.tvId}`}
          className="inline-flex items-center text-[#1E40AF] hover:text-red-500 mb-6 transition-colors duration-300 ease-in-out"
          aria-label="Retour à la série"
        >
          <FaArrowLeft className="mr-2" />
          Retour à la série
        </Link>

        <h1 className="text-4xl font-bold mb-8 text-red-500">
          {TVDetails?.name} - Saisons
        </h1>

        {TVDetails &&
          TVDetails.seasons &&
          TVDetails.seasons.map((season) => (
            <div
              key={season.id}
              className="bg-[#1c1c1c] rounded-lg shadow-md p-6 mb-6 transition-all duration-300 ease-in-out hover:shadow-lg"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <Link
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
                    href={`/tv/${params.tvId}/seasons/${season.season_number}`}
                    className="text-2xl font-semibold mb-2 text-red-500"
                  >
                    {season.name}
                  </Link>
                  <p className="text-[#A1A1A1] mb-4">
                    {new Date(season.air_date).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    •
                    <span className="ml-2 text-red-500">
                      {season.episode_count} épisode
                      {season.episode_count > 1 ? "s" : ""}
                    </span>
                  </p>
                  <p className="text-white">
                    {season.overview || "Aucune description disponible."}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
