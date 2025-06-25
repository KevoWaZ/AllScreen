"use client";
import Loading from "@/app/loading";
import MovieCard from "@/components/cards/MovieCard";
import { GenreFilter } from "@/components/search/movie/GenreFilter";
import { ReleaseYearFilter } from "@/components/search/movie/ReleaseYearFilter";
import { SetCountry } from "@/components/search/movie/SetCountry";
import { SetLanguage } from "@/components/search/movie/SetLanguage";
import { SetSortBy } from "@/components/search/movie/SetSortBy";
import { country, genre, language, Movie } from "@/types/types";
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
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const isLogged = getCookie("isLogged") === "true" ? true : false;
  const userId = getCookie("userId");

  const fetchMoviesWithPage = useCallback(
    async (page: number, append = false) => {
      const searchParams = new URLSearchParams(window.location.search);
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set("page", String(page));
      newSearchParams.set("isLogged", String(isLogged));
      newSearchParams.set("userId", String(userId));
      const url = `/api/search/movies?${newSearchParams.toString()}`;

      const response = await fetch(url);
      const data = await response.json();
      if (append) {
        setMovies((prev) => [...prev, ...data.results]);
      } else {
        setMovies(data.results);
      }
      setTotalPages(data.total_pages);
      setCurrentPage(data.page);
    },
    [isLogged, userId, setMovies, setTotalPages, setCurrentPage]
  );

  const fetchMovies = useCallback(async () => {
    await fetchMoviesWithPage(currentPage);
  }, [currentPage, fetchMoviesWithPage]);

  const fetchInitialMovies = useCallback(async () => {
    await fetchMoviesWithPage(1);
  }, [fetchMoviesWithPage]);

  const loadMore = useCallback(async () => {
    if (currentPage < totalPages) {
      try {
        setLoadingMore(true);
        await fetchMoviesWithPage(currentPage + 1, true);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingMore(false);
      }
    }
  }, [currentPage, totalPages, fetchMoviesWithPage]);

  const handleSearch = useCallback(async () => {
    setCurrentPage(1);
    await fetchMovies();
  }, [fetchMovies]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [getGenres, getCountries, getLanguages] = await Promise.all([
          obtainGenres("movie"),
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
    fetchInitialMovies();
  }, [fetchInitialMovies]);

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
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <GenreFilter genres={genres} tagVariants={tagVariants} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SetCountry countries={countries} />

          <SetLanguage languages={languages} />

          <SetSortBy />

          <ReleaseYearFilter />
        </div>
      </div>
      <div>
        {movies && (
          <>
            <div className="grid gap-3 md:gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {movies.map((movie, index) => (
                <motion.div
                  key={`${movie.id}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <MovieCard movie={movie} showDescription />
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
                  {loadingMore ? "Chargement..." : "Rechercher plus"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
