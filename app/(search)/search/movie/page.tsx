"use client";
import Loading from "@/app/loading";
import MovieCard from "@/components/cards/MovieCard";
import { country, genre, language, Movie } from "@/types/types";
import {
  movies_sort_by,
  obtainCountriesConfigurations,
  obtainGenres,
  obtainLanguagesConfigurations,
} from "@/utils/utils";
import { getCookie } from "cookies-next";
import { motion, Variants } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import React, { useCallback, useEffect, useState } from "react";
import { FiCheck, FiFilter } from "react-icons/fi";

interface GenreFilterProps {
  genres: genre[];
  tagVariants: Variants;
}

function GenreFilter({ genres, tagVariants }: GenreFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedGenresFromURL =
    searchParams.get("with_genres")?.split(",") || [];

  const createQueryString = useCallback(
    (name: string, value: string[]) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value.length === 0) {
        params.delete(name);
      } else {
        params.set(name, value.join(","));
      }
      return params.toString();
    },
    [searchParams]
  );

  const toggleGenreSelection = (genre: genre) => {
    let newSelectedGenres: string[];

    if (selectedGenresFromURL.includes(genre.id.toString())) {
      newSelectedGenres = selectedGenresFromURL.filter(
        (id) => id !== genre.id.toString()
      );
    } else {
      newSelectedGenres = [...selectedGenresFromURL, genre.id.toString()];
    }

    const queryString = createQueryString("with_genres", newSelectedGenres);
    router.push(pathname + "?" + queryString);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 font-semibold text-gray-200">
        <FiFilter className="text-red-400" />
        <h3 className="text-sm">Filtrer par genres</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {genres.map((genre, index) => (
          <motion.div
            key={genre.id}
            onClick={() => toggleGenreSelection(genre)}
            className={`cursor-pointer border px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedGenresFromURL.includes(genre.id.toString())
                ? "text-white bg-red-700 border-red-700"
                : "bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700"
            }`}
            initial="initial"
            animate="animate"
            whileTap="tap"
            transition={{ duration: 0.2, delay: index * 0.03 }}
            variants={tagVariants}
          >
            <div className="flex items-center gap-1.5">
              {selectedGenresFromURL.includes(genre.id.toString()) && (
                <FiCheck className="w-3 h-3" />
              )}
              <span>{genre.name}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

interface CountryFilterProps {
  countries: country[];
}

function SetCountry({ countries }: CountryFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const with_origin_country = searchParams.get("with_origin_country");

  console.log("with_origin_country: ", with_origin_country);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "") {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="space-y-2">
      <label
        htmlFor="countries"
        className="block text-sm font-medium text-gray-200"
      >
        Pays
      </label>
      <div className="relative">
        <select
          name="countries"
          id="countries"
          value={with_origin_country || ""}
          onChange={(e) =>
            router.push(
              pathname +
                "?" +
                createQueryString("with_origin_country", e.target.value)
            )
          }
          className="w-full px-4 py-2.5 rounded-lg border  border-gray-700  bg-gray-800  text-white appearance-none focus:outline-hidden focus:ring-2  focus:ring-red-400 focus:border-transparent transition-all"
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
  );
}

interface LanguageFilterProps {
  languages: language[];
}

function SetLanguage({ languages }: LanguageFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const with_original_language = searchParams.get("with_original_language");

  console.log(languages);

  console.log("with_original_language: ", with_original_language);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "") {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="space-y-2">
      <label
        htmlFor="languages"
        className="block text-sm font-medium text-gray-200"
      >
        Langues
      </label>
      <div className="relative">
        <select
          name="languages"
          id="languages"
          value={with_original_language || ""}
          onChange={(e) =>
            router.push(
              pathname +
                "?" +
                createQueryString("with_original_language", e.target.value)
            )
          }
          className="w-full px-4 py-2.5 rounded-lg border border-gray-700 bg-gray-800 text-white appearance-none focus:outline-hidden focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all"
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
  );
}
function SetSortBy() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sort_by = searchParams.get("sort_by");

  console.log("sort_by: ", sort_by);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "") {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams]
  );
  return (
    <div className="space-y-2">
      <label
        htmlFor="filter"
        className="block text-sm font-medium text-gray-200"
      >
        Trier les résultats par
      </label>
      <div className="relative">
        <select
          name="filter"
          id="filter"
          value={sort_by || "popularity.desc"}
          onChange={(e) =>
            router.push(
              pathname + "?" + createQueryString("sort_by", e.target.value)
            )
          }
          className="w-full px-4 py-2.5 rounded-lg border  border-gray-700  bg-gray-800  text-white appearance-none focus:outline-hidden focus:ring-2  focus:ring-red-400 focus:border-transparent transition-all"
        >
          {movies_sort_by.map((filter) => (
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
  );
}

function ReleaseYearFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedPrimaryReleaseYear =
    searchParams.get("primary_release_year") || "";

  const [inputValue, setInputValue] = useState(selectedPrimaryReleaseYear);

  useEffect(() => {
    setInputValue(selectedPrimaryReleaseYear);
  }, [selectedPrimaryReleaseYear]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "") {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handlePrimaryReleaseYearChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setInputValue(value);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== selectedPrimaryReleaseYear) {
        const queryString = createQueryString(
          "primary_release_year",
          inputValue
        );
        router.push(pathname + "?" + queryString);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [
    inputValue,
    selectedPrimaryReleaseYear,
    createQueryString,
    pathname,
    router,
  ]);

  return (
    <div className="space-y-2">
      <label
        htmlFor="primary_release_year"
        className="block text-sm font-medium text-gray-200"
      >
        Année de sortie
      </label>
      <div className="relative">
        <input
          type="number"
          name="primary_release_year"
          id="primary_release_year"
          value={inputValue}
          onChange={handlePrimaryReleaseYearChange}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-700 bg-gray-800 text-white appearance-none focus:outline-hidden focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all"
          min="1900"
          max={new Date().getFullYear()}
        />
      </div>
    </div>
  );
}

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
        await fetchMoviesWithPage(currentPage + 1, true); // append = true
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
  }, [fetchInitialMovies]); // Dépend de fetchInitialMovies

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
