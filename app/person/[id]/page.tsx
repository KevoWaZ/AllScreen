"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { Person } from "@/types/types";

function formatDate(dateString: string): string {
  if (!dateString) return "Date inconnue";
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("fr-FR", options);
}

async function obtainPersonDetails(person_id: string) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${person_id}?language=fr-FR`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZTI2NjM3MjI4ZjlmOGE5N2I1YWQ2ODBkYmNkYjBhOSIsIm5iZiI6MTczMjEzMjgzMC4xNDA4OTU2LCJzdWIiOiI2NTZkY2Q0Zjg4MDU1MTAwYzY4MjA5MTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NwHMjefPWPfb5zCymPy1W9um9oEmjvnJBqQGOW5vHXs",
          accept: "application/json",
        },
      }
    );
    const personDetails = await response.json();
    const { cast, crew } = await obtainPersonCredits(person_id);
    return {
      personDetails,
      cast,
      crew,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function obtainPersonCredits(person_id: string) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${person_id}/combined_credits?language=fr-FR`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
          accept: "application/json",
        },
      }
    );
    const personCredits = await response.json();
    return personCredits;
  } catch (error) {
    console.error(error);
    return { cast: [], crew: [] };
  }
}

type Credit = {
  release_date?: string;
  first_air_date?: string;
  media_type?: string;
  credit_id: string;
  poster_path: string;
  id: string;
  title: string;
  name: string;
  character: string;
  job: string;
};

function sortCredits(credits: Credit[]): Credit[] {
  return credits.sort((a, b) => {
    const dateA = a.release_date || a.first_air_date || "0000-00-00";
    const dateB = b.release_date || b.first_air_date || "0000-00-00";
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });
}

export default function Page() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") || "all";
  const [loading, setLoading] = useState(true);
  const [personDetails, setPersonDetails] = useState<Person | null>(null);
  const [sortedCast, setSortedCast] = useState<Credit[]>([]);
  const [sortedCrew, setSortedCrew] = useState<Credit[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await obtainPersonDetails(params.id);
        if (data) {
          const { personDetails, cast, crew } = data;

          const filteredCast = cast.filter(
            (credit: Credit) => filter === "all" || credit.media_type === filter
          );
          const filteredCrew = crew.filter(
            (credit: Credit) => filter === "all" || credit.media_type === filter
          );

          setPersonDetails(personDetails);
          setSortedCast(sortCredits(filteredCast));
          setSortedCrew(sortCredits(filteredCrew));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.id, filter]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 flex items-center justify-center">
        <p className="text-2xl font-bold">Chargement...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Image
              src={
                personDetails?.profile_path
                  ? `https://image.tmdb.org/t/p/w500${personDetails.profile_path}`
                  : "/placeholder.svg" // Image par défaut si profile_path est null
              }
              alt={personDetails?.name || "Nom inconnu"}
              width={500}
              height={750}
              className="rounded-lg shadow-md"
              priority
            />
          </div>
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-4">
              {personDetails?.name || "Nom inconnu"}
            </h1>
            <p>
              <span className="font-semibold">Date de naissance:</span>{" "}
              {formatDate(personDetails?.birthday || "")}
            </p>
            <p>
              <span className="font-semibold">Lieu de naissance:</span>{" "}
              {personDetails?.place_of_birth || "Lieu inconnu"}
            </p>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Biographie</h2>
              <p className="text-gray-300">
                {personDetails?.biography || "Biographie non disponible"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Filmographie</h2>
          <div className="mb-4">
            <Link
              href={`/person/${params.id}`}
              className={`mr-4 px-4 py-2 rounded ${
                filter === "all" ? "bg-orange-500" : "bg-gray-600"
              } hover:bg-orange-400 transition-colors`}
            >
              Tous
            </Link>
            <Link
              href={`/person/${params.id}?filter=movie`}
              className={`mr-4 px-4 py-2 rounded ${
                filter === "movie" ? "bg-orange-500" : "bg-gray-600"
              } hover:bg-orange-400 transition-colors`}
            >
              Films
            </Link>
            <Link
              href={`/person/${params.id}?filter=tv`}
              className={`px-4 py-2 rounded ${
                filter === "tv" ? "bg-orange-500" : "bg-gray-600"
              } hover:bg-orange-400 transition-colors`}
            >
              Séries TV
            </Link>
          </div>

          <h3 className="text-2xl font-semibold mb-4">Acteur</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {sortedCast.map((credit) => (
              <div
                key={credit.credit_id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
              >
                <Link href={`/${credit.media_type}/${credit.id}`}>
                  <Image
                    src={
                      credit.poster_path
                        ? `https://image.tmdb.org/t/p/w500${credit.poster_path}`
                        : "/placeholder.svg"
                    }
                    alt={
                      credit.title || credit.name || "Affiche non disponible"
                    }
                    width={500}
                    height={750}
                    className="w-full h-64 object-cover"
                  />
                </Link>
                <div className="p-4">
                  <h4 className="text-lg font-semibold mb-2">
                    {credit.title || credit.name}
                  </h4>
                  <p className="text-sm text-gray-400 mb-2">
                    Rôle: {credit.character}
                  </p>
                  <p className="text-sm text-gray-400">
                    {formatDate(credit.release_date || credit.first_air_date || "")}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-2xl font-semibold mb-4">Équipe technique</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedCrew.map((credit) => (
              <div
                key={credit.credit_id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
              >
                <Link href={`/${credit.media_type}/${credit.id}`}>
                  <Image
                    src={
                      credit.poster_path
                        ? `https://image.tmdb.org/t/p/w500${credit.poster_path}`
                        : "/placeholder.svg"
                    }
                    alt={
                      credit.title || credit.name || "Affiche non disponible"
                    }
                    width={500}
                    height={750}
                    className="w-full h-64 object-cover"
                  />
                </Link>
                <div className="p-4">
                  <h4 className="text-lg font-semibold mb-2">
                    {credit.title || credit.name}
                  </h4>
                  <p className="text-sm text-gray-400 mb-2">
                    Poste: {credit.job}
                  </p>
                  <p className="text-sm text-gray-400">
                    {formatDate(credit.release_date || credit.first_air_date || "")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
