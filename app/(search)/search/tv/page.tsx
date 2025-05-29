"use client";
import Loading from "@/app/loading";
import TVShowCard from "@/components/cards/TVShowCard";
import { country, genre, language, TVShow } from "@/types/types";
import {
  obtainCountriesConfigurations,
  obtainGenres,
  obtainLanguagesConfigurations,
  tv_sort_by,
} from "@/utils/utils";
import { motion } from "framer-motion";

import React, { useCallback, useEffect, useState } from "react";
import { FiCheck, FiFilter } from "react-icons/fi";

export default function Page() {
  const [genres, setGenres] = useState<genre[]>([]);
  const [countries, setCountries] = useState<country[]>([]);
  const [languages, setLanguages] = useState<language[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<genre[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string>("");
  const [selectedLanguages, setSelectedLanguages] = useState<string>("");
  const [selectedFilters, setSelectedFilters] =
    useState<string>("popularity.desc");
  const [selectedFirstAirDateYear, setSelectedFirstAirDateYear] =
    useState<string>("");
  const [tvs, setTvs] = useState<TVShow[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const formatGenres = useCallback(() => {
    return selectedGenres.map((genre) => genre.id).join(",");
  }, [selectedGenres]);

  const fetchTvs = useCallback(async () => {
    try {
      const params = new URLSearchParams();

      if (selectedGenres.length > 0) {
        params.append("with_genres", formatGenres());
      }

      if (selectedCountries) {
        params.append("with_origin_country", selectedCountries);
      }

      if (selectedLanguages) {
        params.append("with_original_language", selectedLanguages);
      }

      if (selectedFilters) {
        params.append("sort_by", selectedFilters);
      }

      if (selectedFirstAirDateYear) {
        params.append("first_air_date_year", selectedFirstAirDateYear);
      }

      const response = await fetch(
        `/api/search/tv?${params.toString()}&page=${currentPage}`
      );
      const data = await response.json();
      setTvs(data.results);
      setTotalPages(data.total_pages);
      setCurrentPage(data.page);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }, [
    selectedGenres,
    selectedCountries,
    selectedLanguages,
    selectedFilters,
    selectedFirstAirDateYear,
    currentPage,
    formatGenres,
    setTvs,
    setTotalPages,
    setCurrentPage,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const getGenres = await obtainGenres("tv");
        const getCountries = await obtainCountriesConfigurations();
        const getLanguages = await obtainLanguagesConfigurations();
        console.log(getGenres);
        console.log(getCountries);
        console.log(getLanguages);
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

  const handleSearch = async () => {
    setCurrentPage(1);
    await fetchTvs();
  };

  const loadMore = async () => {
    if (currentPage < totalPages) {
      try {
        setLoadingMore(true);
        const params = new URLSearchParams();

        if (selectedGenres.length > 0) {
          params.append("with_genres", formatGenres());
        }

        if (selectedCountries) {
          params.append("with_origin_country", selectedCountries);
        }

        if (selectedLanguages) {
          params.append("with_original_language", selectedLanguages);
        }

        if (selectedFilters) {
          params.append("sort_by", selectedFilters);
        }

        if (selectedFirstAirDateYear) {
          params.append("first_air_date_year", selectedFirstAirDateYear);
        }

        const url = `/api/search/tv?${params.toString()}&page=${
          currentPage + 1
        }`;
        const response = await fetch(url);
        const data = await response.json();
        setTvs((prev) => [...prev, ...data.results]);
        setCurrentPage((prev) => prev + 1);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingMore(false);
      }
    }
  };

  const toggleGenreSelection = (genre: genre) => {
    setCurrentPage(1);
    setSelectedGenres((prevSelectedGenres) => {
      if (prevSelectedGenres.some((g) => g.id === genre.id)) {
        return prevSelectedGenres.filter((g) => g.id !== genre.id);
      } else {
        return [...prevSelectedGenres, genre];
      }
    });
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(1);
    setSelectedCountries(event.target.value);
  };

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCurrentPage(1);
    setSelectedLanguages(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(1);
    setSelectedFilters(event.target.value);
  };

  const handleFirstAirDateYearChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentPage(1);
    setSelectedFirstAirDateYear(event.target.value);
  };

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
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors"
        >
          Chercher
        </button>
      </div>
      <div className="space-y-6 mb-8">
        {/* Section des genres */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-semibold  text-gray-200">
            <FiFilter className=" text-red-400" />
            <h3 className="text-sm">Filtrer par genres</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {genres &&
              genres.map((genre, index) => (
                <motion.div
                  key={genre.id}
                  onClick={() => toggleGenreSelection(genre)}
                  className={`cursor-pointer border px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedGenres.some((g) => g.id === genre.id)
                      ? " text-white  bg-red-700 border-red-700"
                      : "  bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700"
                  }`}
                  initial="initial"
                  animate="animate"
                  whileTap="tap"
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  variants={tagVariants}
                >
                  <div className="flex items-center gap-1.5">
                    {selectedGenres.some((g) => g.id === genre.id) && (
                      <FiCheck className="w-3 h-3" />
                    )}
                    <span>{genre.name}</span>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

        {/* Section des pays et langues */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {countries && (
            <div className="space-y-2">
              <label
                htmlFor="countries"
                className="block text-sm font-medium  text-gray-200"
              >
                Pays
              </label>
              <div className="relative">
                <select
                  name="countries"
                  id="countries"
                  value={selectedCountries}
                  onChange={handleCountryChange}
                  className="w-full px-4 py-2.5 rounded-lg border  border-gray-700  bg-gray-800  text-white appearance-none focus:outline-none focus:ring-2  focus:ring-red-400 focus:border-transparent transition-all"
                >
                  <option value="">Aucune sélection</option>
                  {countries.map((country, id) => (
                    <option
                      key={`${country.iso_3166_1}-${
                        country.native_name || country.english_name
                      }-${id}`}
                      value={country.iso_3166_1}
                    >
                      {country.native_name || country.english_name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-5 h-5  text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          )}

          {languages && (
            <div className="space-y-2">
              <label
                htmlFor="languages"
                className="block text-sm font-medium  text-gray-200"
              >
                Langues
              </label>
              <div className="relative">
                <select
                  name="languages"
                  id="languages"
                  value={selectedLanguages}
                  onChange={handleLanguageChange}
                  className="w-full px-4 py-2.5 rounded-lg border  border-gray-700  bg-gray-800  text-white appearance-none focus:outline-none focus:ring-2  focus:ring-red-400 focus:border-transparent transition-all"
                >
                  <option value="">Aucune sélection</option>
                  {languages.map((language, id) => (
                    <option
                      key={`${language.iso_639_1}-${
                        language.name || language.english_name
                      }-${id}`}
                      value={language.iso_639_1}
                    >
                      {language.name || language.english_name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-5 h-5  text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="languages"
              className="block text-sm font-medium  text-gray-200"
            >
              Trier les résultats par
            </label>
            <div className="relative">
              <select
                name="languages"
                id="languages"
                value={selectedFilters}
                onChange={handleFilterChange}
                className="w-full px-4 py-2.5 rounded-lg border  border-gray-700  bg-gray-800  text-white appearance-none focus:outline-none focus:ring-2  focus:ring-red-400 focus:border-transparent transition-all"
              >
                {tv_sort_by.map((filter) => (
                  <option key={filter.value} value={filter.value}>
                    {filter.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-5 h-5  text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="primarty_release_year"
              className="block text-sm font-medium  text-gray-200"
            >
              Année de sortie
            </label>
            <div className="relative">
              <input
                type="number"
                name="primary_release_year"
                id="primarty_release_year"
                value={selectedFirstAirDateYear}
                onChange={handleFirstAirDateYearChange}
                className="w-full px-4 py-2.5 rounded-lg border  border-gray-700  bg-gray-800  text-white appearance-none focus:outline-none focus:ring-2  focus:ring-red-400 focus:border-transparent transition-all"
              />
            </div>
          </div>
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
                  className="px-4 py-2 bg-red-600 text-white rounded-lg disabled:bg-red-300"
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
