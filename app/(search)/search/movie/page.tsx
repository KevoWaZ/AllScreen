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
import { motion, Variants } from "framer-motion";

import React, { useCallback, useEffect, useState } from "react";
import { FiCheck, FiFilter } from "react-icons/fi";

interface GenreFilterProps {
  genres: genre[];
  selectedGenres: genre[];
  toggleGenreSelection: (genre: genre) => void;
  tagVariants: Variants;
}

const GenreFilter: React.FC<GenreFilterProps> = ({
  genres,
  selectedGenres,
  toggleGenreSelection,
  tagVariants,
}) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2 font-semibold  text-gray-200">
      <FiFilter className=" text-red-400" />
      <h3 className="text-sm">Filtrer par genres</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {genres.map((genre, index) => (
        <motion.div
          key={genre.id}
          onClick={() => toggleGenreSelection(genre)}
          className={`cursor-pointer border px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedGenres.some((g) => g.id === genre.id)
              ? " text-white  bg-red-700 border-red-700"
              : "    bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700"
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
);

interface CountryFilterProps {
  countries: country[];
  selectedCountries: string;
  handleCountryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CountryFilter: React.FC<CountryFilterProps> = ({
  countries,
  selectedCountries,
  handleCountryChange,
}) => (
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
);

interface LanguageFilterProps {
  languages: language[];
  selectedLanguages: string;
  handleLanguageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const LanguageFilter: React.FC<LanguageFilterProps> = ({
  languages,
  selectedLanguages,
  handleLanguageChange,
}) => (
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
          className="w-5 h-5 text-gray-400"
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

interface SortFilterProps {
  selectedFilters: string;
  handleFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SortFilter: React.FC<SortFilterProps> = ({
  selectedFilters,
  handleFilterChange,
}) => (
  <div className="space-y-2">
    <label htmlFor="filter" className="block text-sm font-medium text-gray-200">
      Trier les résultats par
    </label>
    <div className="relative">
      <select
        name="filter"
        id="filter"
        value={selectedFilters}
        onChange={handleFilterChange}
        className="w-full px-4 py-2.5 rounded-lg border  border-gray-700  bg-gray-800  text-white appearance-none focus:outline-none focus:ring-2  focus:ring-red-400 focus:border-transparent transition-all"
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

interface ReleaseYearFilterProps {
  selectedPrimaryReleaseYear: string;
  handlePrimaryReleaseYearChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const ReleaseYearFilter: React.FC<ReleaseYearFilterProps> = ({
  selectedPrimaryReleaseYear,
  handlePrimaryReleaseYearChange,
}) => (
  <div className="space-y-2">
    <label
      htmlFor="primary_release_year"
      className="block text-sm font-medium  text-gray-200"
    >
      Année de sortie
    </label>
    <div className="relative">
      <input
        type="number"
        name="primary_release_year"
        id="primarty_release_year"
        value={selectedPrimaryReleaseYear}
        onChange={handlePrimaryReleaseYearChange}
        className="w-full px-4 py-2.5 rounded-lg border  border-gray-700  bg-gray-800  text-white appearance-none focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all"
      />
    </div>
  </div>
);

export default function Page() {
  const [genres, setGenres] = useState<genre[]>([]);
  const [countries, setCountries] = useState<country[]>([]);
  const [languages, setLanguages] = useState<language[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<genre[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string>("");
  const [selectedLanguages, setSelectedLanguages] = useState<string>("");
  const [selectedFilters, setSelectedFilters] =
    useState<string>("popularity.desc");
  const [selectedPrimaryReleaseYear, setSelectedPrimaryReleaseYear] =
    useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const formatGenres = useCallback(() => {
    return selectedGenres.map((genre) => genre.id).join(",");
  }, [selectedGenres]);

  const fetchMovies = useCallback(async () => {
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

      if (selectedPrimaryReleaseYear) {
        params.append("primary_release_year", selectedPrimaryReleaseYear);
      }

      const url = `/api/search/movies?${params.toString()}&page=${currentPage}`;

      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
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
    selectedPrimaryReleaseYear,
    currentPage,
    setMovies,
    setTotalPages,
    setCurrentPage,
    formatGenres,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const getGenres = await obtainGenres("movie");
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
    await fetchMovies();
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

        if (selectedPrimaryReleaseYear) {
          params.append("primary_release_year", selectedPrimaryReleaseYear);
        }

        const url = `/api/search/movies?${params.toString()}&page=${
          currentPage + 1
        }`;
        const response = await fetch(url);
        const data = await response.json();
        setMovies((prev) => [...prev, ...data.results]);
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

  const handlePrimaryReleaseYearChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentPage(1);
    setSelectedPrimaryReleaseYear(event.target.value);
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
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <GenreFilter
              genres={genres}
              selectedGenres={selectedGenres}
              toggleGenreSelection={toggleGenreSelection}
              tagVariants={tagVariants}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CountryFilter
            countries={countries}
            selectedCountries={selectedCountries}
            handleCountryChange={handleCountryChange}
          />

          <LanguageFilter
            languages={languages}
            selectedLanguages={selectedLanguages}
            handleLanguageChange={handleLanguageChange}
          />

          <SortFilter
            selectedFilters={selectedFilters}
            handleFilterChange={handleFilterChange}
          />

          <ReleaseYearFilter
            selectedPrimaryReleaseYear={selectedPrimaryReleaseYear}
            handlePrimaryReleaseYearChange={handlePrimaryReleaseYearChange}
          />
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
                  className="px-4 py-2 bg-red-600 text-white rounded-lg disabled:bg-red-300"
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
