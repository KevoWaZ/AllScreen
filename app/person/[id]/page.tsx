"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import type { Person } from "@/types/types";
import PersonInfo from "@/components/person/PersonInfo";
import Loading from "@/app/loading";
import PersonCast from "@/components/person/PersonCast";
import PersonCrew from "@/components/person/PersonCrew";
import { obtainPersonDetails } from "@/utils/person";
import { FaFilm, FaTv, FaList } from "react-icons/fa";

export type Credit = {
  release_date: string;
  first_air_date: string;
  media_type?: string;
  credit_id: string;
  poster_path: string;
  id: string;
  title: string;
  name: string;
  character: string;
  job: string;
  overview: string;
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
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [personDetails, setPersonDetails] = useState<Person | null>(null);
  const [cast, setCast] = useState<Credit[]>([]);
  const [crew, setCrew] = useState<Credit[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await obtainPersonDetails(params.id);
        if (data) {
          const { personDetails, cast, crew } = data;
          setPersonDetails(personDetails);
          setCast(sortCredits(cast));
          setCrew(sortCredits(crew));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.id]);

  const filteredCast = cast.filter(
    (credit) => filter === "all" || credit.media_type === filter
  );

  const filteredCrew = crew.filter(
    (credit) => filter === "all" || credit.media_type === filter
  );

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-8"
    >
      <div className="max-w-6xl mx-auto">
        {personDetails && (
          <PersonInfo person={personDetails} key={personDetails.id} />
        )}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Filmographie</h2>
          <div className="mb-6 flex flex-wrap gap-4">
            {["all", "movie", "tv"].map((filterType) => (
              <button
                key={filterType}
                onClick={() => handleFilterChange(filterType)}
                className={`flex items-center px-4 py-2 rounded transition-colors ${
                  filter === filterType
                    ? "bg-red-600 dark:bg-red-800 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-red-500 dark:hover:bg-red-700"
                }`}
              >
                {filterType === "all" && <FaList className="mr-2" />}
                {filterType === "movie" && <FaFilm className="mr-2" />}
                {filterType === "tv" && <FaTv className="mr-2" />}
                {filterType === "all"
                  ? "Tous"
                  : filterType === "movie"
                  ? "Films"
                  : "Séries TV"}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-12"
            >
              {filteredCast.length > 0 && (
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Acteur</h3>
                  <div className="grid gap-3 md:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-4">
                    {filteredCast.map((credit) => (
                      <PersonCast
                        cast={credit}
                        key={credit.credit_id}
                        showDescription
                      />
                    ))}
                  </div>
                </div>
              )}

              {filteredCrew.length > 0 && (
                <div>
                  <h3 className="text-2xl font-semibold mb-4">
                    Équipe technique
                  </h3>

                  <div className="grid gap-3 md:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-4">
                    {filteredCrew.map((credit) => (
                      <PersonCrew
                        crew={credit}
                        key={credit.credit_id}
                        showDescription
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.main>
  );
}
