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
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const DEFAULT_FILTERS = {
  sort_by: "popularity.desc",
  page: "1",
};

export default function Page() {
  const [genres, setGenres] = useState<genre[]>([]);
  const [countries, setCountries] = useState<country[]>([]);
  const [languages, setLanguages] = useState<language[]>([]);
  const [tvs, setTvs] = useState<TVShow[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isLogged = getCookie("isLogged") === "true";
  const userId = getCookie("userId");

  // Initialise les filtres par défaut si absents
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let needsUpdate = false;
    Object.entries(DEFAULT_FILTERS).forEach(([key, value]) => {
      if (!params.has(key)) {
        params.set(key, value);
        needsUpdate = true;
      }
    });
    if (needsUpdate) {
      window.history.replaceState({}, "", `?${params.toString()}`);
    }
  }, []);

  const fetchTvsWithPage = useCallback(
    async (page: number, append = false) => {
      try {
        if (!append) setLoading(true);
        else setLoadingMore(true);

        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(page));
        params.set("isLogged", String(isLogged));
        params.set("userId", String(userId));

        const url = `/api/search/tv?${params.toString()}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Échec du chargement des séries");

        const data = await response.json();
        if (append) {
          setTvs((prev) => [...prev, ...data.results]);
        } else {
          setTvs(data.results);
          window.scrollTo(0, 0); // Remonte en haut
        }
        setTotalPages(data.total_pages);
        setCurrentPage(data.page);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue"
        );
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [searchParams, isLogged, userId]
  );

  // Réinitialise la page à 1 quand les filtres changent
  useEffect(() => {
    fetchTvsWithPage(1);
  }, [searchParams, fetchTvsWithPage]);

  const loadMore = useCallback(async () => {
    if (currentPage < totalPages) {
      await fetchTvsWithPage(currentPage + 1, true);
    }
  }, [currentPage, totalPages, fetchTvsWithPage]);

  // Réinitialiser tous les filtres
  const resetFilters = () => {
    const params = new URLSearchParams();
    Object.entries(DEFAULT_FILTERS).forEach(([key, value]) => {
      params.set(key, value);
    });
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Chargement initial des genres, pays et langues
  useEffect(() => {
    const fetchData = async () => {
      try {
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
  }, []);

  const tagVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    tap: { scale: 0.95 },
  };

  if (loading && tvs.length === 0) return <Loading />;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="p-4 max-w-full sm:max-w-[70vw] 3xl:max-w-[80vw] mx-auto">
      <div className="flex justify-between items-center mt-4 mb-6">
        <button
          onClick={resetFilters}
          className="cursor-pointer px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-hidden focus:ring-2 focus:ring-gray-500/50 transition-colors"
        >
          Réinitialiser les filtres
        </button>
      </div>
      <div className="space-y-6 mb-8">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <GenreFilter genres={genres} tagVariants={tagVariants} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SetCountry countries={countries} />
          <SetLanguage languages={languages} />
          <SetSortBy />
          <PrimaryReleaseYearFilter />
        </div>
      </div>
      <div>
        {tvs.length > 0 ? (
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
        ) : (
          !loading && (
            <div className="text-center text-gray-400">
              Aucune série trouvée.
            </div>
          )
        )}
      </div>
    </div>
  );
}
