"use client";
import Loading from "@/app/loading";
import TVShowCard from "@/components/cards/TVShowCard";
import { GenreFilter } from "@/components/search/tv/GenreFilter";
import { PrimaryReleaseYearFilter } from "@/components/search/tv/PrimaryReleaseYear";
import { SetCountry } from "@/components/search/tv/SetCountry";
import { SetLanguage } from "@/components/search/tv/SetLanguage";
import { SetSortBy } from "@/components/search/tv/SetSortBy";
import { country, genre, language, TVShow } from "@/types/types";
import {
  obtainCountriesConfigurations,
  obtainGenres,
  obtainLanguagesConfigurations,
} from "@/utils/utils";
import { getCookie } from "cookies-next";
import { motion } from "framer-motion";

import React, { useCallback, useEffect, useState } from "react";

export default function Page() {
  const [genres, setGenres] = useState<genre[]>([]);
  const [countries, setCountries] = useState<country[]>([]);
  const [languages, setLanguages] = useState<language[]>([]);
  const [tvs, setTvs] = useState<TVShow[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const isLogged = getCookie("isLogged") === "true" ? true : false;
  const userId = getCookie("userId");

  const fetchTvsWithPage = useCallback(
    async (page: number, append = false) => {
      const searchParams = new URLSearchParams(window.location.search);
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set("page", String(page));
      newSearchParams.set("isLogged", String(isLogged));
      newSearchParams.set("userId", String(userId));
      const url = `/api/search/tv?${newSearchParams.toString()}`;

      const response = await fetch(url);
      const data = await response.json();
      if (append) {
        setTvs((prev) => [...prev, ...data.results]);
      } else {
        setTvs(data.results);
      }
      setTotalPages(data.total_pages);
      setCurrentPage(data.page);
    },
    [isLogged, userId, setTvs, setTotalPages, setCurrentPage]
  );

  const fetchTvs = useCallback(async () => {
    await fetchTvsWithPage(currentPage);
  }, [currentPage, fetchTvsWithPage]);

  const fetchInitialTvs = useCallback(async () => {
    await fetchTvsWithPage(1);
  }, [fetchTvsWithPage]);

  const loadMore = useCallback(async () => {
    if (currentPage < totalPages) {
      try {
        setLoadingMore(true);
        await fetchTvsWithPage(currentPage + 1, true);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingMore(false);
      }
    }
  }, [currentPage, totalPages, fetchTvsWithPage]);

  const handleSearch = useCallback(async () => {
    setCurrentPage(1);
    await fetchTvs();
  }, [fetchTvs]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [getGenres, getCountries, getLanguages] = await Promise.all([
          obtainGenres("tv"),
          obtainCountriesConfigurations(),
          obtainLanguagesConfigurations(),
        ]);
        setGenres(getGenres);
        setCountries(getCountries);
        setLanguages(getLanguages);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    fetchInitialTvs();
  }, [fetchInitialTvs]);

  const tagVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    tap: { scale: 0.95 },
  };

  if (loading) return <Loading />;

  return (
    <div className="p-4 max-w-full sm:max-w-[70vw] 3xl:max-w-[80vw] mx-auto">
      <div className="mt-4">
        <button
          onClick={handleSearch}
          className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-hidden focus:ring-2 focus:ring-red-500/50 transition-colors"
        >
          Chercher
        </button>
      </div>
      <div className="space-y-6 mb-8">
        {/* Section des genres */}
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <GenreFilter genres={genres} tagVariants={tagVariants} />
          </div>
        </div>

        {/* Section des pays et langues */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SetCountry countries={countries} />

          <SetLanguage languages={languages} />

          <SetSortBy />

          <PrimaryReleaseYearFilter />
        </div>
      </div>
      <div>
        {tvs && (
          <>
            <div className="grid gap-3 md:gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {tvs.map((tv, index) => (
                <motion.div
                  key={`${tv.id}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <TVShowCard tvShow={tv} showDescription />
                </motion.div>
              ))}
            </div>
            {currentPage < totalPages && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded-lg disabled:bg-red-300"
                >
                  {loadingMore ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
