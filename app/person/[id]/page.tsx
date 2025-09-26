"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import Loading from "@/app/loading";
import { FaFilm, FaTv } from "react-icons/fa";
import { PersonCard } from "@/components/cards/PersonCard";
import { PersonCastInfo } from "@/components/cards/PersonCastInfo";
import { PersonCrewInfo } from "@/components/cards/PersonCrewInfo";
import { IconType } from "react-icons";

export type Credit = {
  release_date: string;
  first_air_date: string;
  media_type?: string;
  credit_id: string;
  profile_path: string;
  poster_path: string;
  episode_count: number;
  id: number;
  title: string;
  name: string;
  character: string;
  job: string;
  overview: string;
};

export type ExternalLink = {
  label: string;
  url: string;
  icon: IconType | string;
};

export default function Page() {
  const params = useParams<{ id: string }>();
  const [filter, setFilter] = useState("movie");
  const [jobs, setJobs] = useState<string[]>([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [loading, setLoading] = useState(true);

  const [cast, setCast] = useState<Credit[]>([]);
  const [crew, setCrew] = useState<Credit[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const url = `/api/person/personId?personId=${params.id}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data) {
          const { cast, crew } = data;

          setCast(cast);
          setCrew(crew);

          const filteredCrew = crew.filter(
            (credit: Credit) => filter === "all" || credit.media_type === filter
          );

          const jobSet = new Set<string>();

          filteredCrew.forEach((credit: Credit) => {
            if (credit.job) {
              jobSet.add(credit.job);
            }
          });

          const uniqueJobs = Array.from(jobSet);

          setJobs(uniqueJobs);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.id, filter]);

  const filteredCast = cast.filter(
    (credit) => filter === "all" || credit.media_type === filter
  );

  const filteredCrew = crew.filter(
    (credit) => filter === "all" || credit.media_type === filter
  );

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handleJobChange = (newJob: string) => {
    console.log(newJob);

    setSelectedJob(newJob);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4 max-w-[90vw] md:max-w-[70vw] mx-auto">
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Filmographie</h2>
          <div className="mb-6 flex flex-wrap gap-4">
            {["movie", "tv"].map((filterType) => (
              <button
                key={filterType}
                onClick={() => handleFilterChange(filterType)}
                className={`flex items-center px-4 py-2 rounded cursor-pointer transition-colors ${
                  filter === filterType
                    ? " bg-red-800 text-white"
                    : " bg-gray-700  text-gray-200  hover:bg-red-700"
                }`}
              >
                {filterType === "movie" && (
                  <FaFilm className="mr-2" aria-label="Movies" />
                )}
                {filterType === "tv" && (
                  <FaTv className="mr-2" aria-label="TV Show" />
                )}
                {filterType === "movie" ? "Films" : "Séries TV"}
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
                      <PersonCard
                        href={`/${credit.media_type}/${credit.id}`}
                        key={credit.credit_id}
                        person={credit}
                      >
                        <PersonCastInfo cast={credit} showDescription />
                      </PersonCard>
                    ))}
                  </div>
                </div>
              )}

              {filteredCrew.length > 0 && (
                <div>
                  <h3 className="text-2xl font-semibold mb-4">
                    Équipe technique
                  </h3>
                  <div className="mb-6 flex flex-wrap gap-4">
                    {jobs.map((job) => (
                      <button
                        key={job}
                        onClick={() => handleJobChange(job)}
                        className={`flex items-center px-4 py-2 rounded transition-colors ${
                          selectedJob === job
                            ? " bg-red-800 text-white"
                            : " bg-gray-700  text-gray-200  hover:bg-red-700"
                        } hover:cursor-pointer`}
                      >
                        {job}
                      </button>
                    ))}
                  </div>

                  <div className="grid gap-3 md:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-4">
                    {filteredCrew
                      .filter(
                        (credit) => !selectedJob || credit.job === selectedJob
                      )
                      .map((credit) => (
                        <PersonCard
                          href={`/${credit.media_type}/${credit.id}`}
                          key={credit.credit_id}
                          person={credit}
                        >
                          <PersonCrewInfo crew={credit} showDescription />
                        </PersonCard>
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
