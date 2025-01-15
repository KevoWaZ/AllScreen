"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { Person } from "@/types/types";
import PersonInfo from "@/components/person/PersonInfo";
import Loading from "@/app/loading";
import PersonCast from "@/components/person/PersonCast";
import PersonCrew from "@/components/person/PersonCrew";
import { obtainPersonDetails } from "@/utils/person";

export type Credit = {
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
    return <Loading />;
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {personDetails && (
          <PersonInfo person={personDetails} key={personDetails.id} />
        )}
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
              <PersonCast cast={credit} key={credit.credit_id} />
            ))}
          </div>

          <h3 className="text-2xl font-semibold mb-4">Équipe technique</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedCrew.map((credit) => (
              <PersonCrew crew={credit} key={credit.credit_id} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
