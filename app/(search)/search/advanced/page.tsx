"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaTimes,
  FaSave,
  FaHistory,
  FaStar,
} from "react-icons/fa";
import {
  obtainCountriesConfigurations,
  obtainGenres,
  obtainLanguagesConfigurations,
} from "@/utils/utils";
import Loading from "@/app/loading";
import { country, genre, language } from "@/types/types";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [savedSearches, setSavedSearches] = useState<string[]>([]);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);
  const [countries, setCountries] = useState<country[]>([]);
  const [languages, setLanguages] = useState<language[]>([]);
  const [moviesGenre, setMoviesGenre] = useState<genre[]>([]);
  const [tvGenre, setTvGenre] = useState<genre[]>([]);
  const [rating, setRating] = useState(0);
  const sortRef = useRef<HTMLDivElement>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const addFilter = (filter: string) => {
    if (!selectedFilters.includes(filter)) {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const removeFilter = (filter: string) => {
    setSelectedFilters(selectedFilters.filter((f) => f !== filter));
  };

  const handleStarClick = (
    event: React.MouseEvent<HTMLDivElement>,
    starIndex: number
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left; // x position within the element
    const starWidth = rect.width;
    const clickPosition = x / starWidth;
    const newRating = starIndex + (Math.floor(clickPosition * 10) + 1) / 10;
    setRating(newRating);
    addFilter(`Note min: ${newRating.toFixed(1)}`);
  };

  const saveSearch = () => {
    if (searchTerm.trim() === "" && selectedFilters.length === 0) {
      alert(
        "Veuillez entrer un terme de recherche ou sélectionner des filtres avant de sauvegarder."
      );
      return;
    }
    const searchToSave = `${searchTerm} ${selectedFilters.join(", ")}`;
    if (savedSearches.includes(searchToSave)) {
      alert("Cette recherche est déjà sauvegardée.");
      return;
    }
    setSavedSearches([...savedSearches, searchToSave]);
    alert("Recherche sauvegardée avec succès !");
  };

  const sorts = [
    {
      name: "Popularité (croissant)",
      type: "popularity-asc",
      param: "sort_by=popularity.asc",
      icon: <FaChevronUp />,
    },
    {
      name: "Popularité (décroissant)",
      type: "popularity-desc",
      param: "sort_by=popularity.desc",
      icon: <FaChevronDown />,
    },
    {
      name: "Revenus (croissant)",
      type: "revenue-asc",
      param: "sort_by=revenue.asc",
      icon: <FaChevronUp />,
    },
    {
      name: "Revenus (décroissant)",
      type: "revenue-desc",
      param: "sort_by=revenue.desc",
      icon: <FaChevronDown />,
    },
    {
      name: "Date de sortie (plus récent)",
      type: "primary_release_date-desc",
      param: "sort_by=primary_release_date.desc",
      icon: <FaChevronDown />,
    },
    {
      name: "Date de sortie (plus ancien)",
      type: "primary_release_date-asc",
      param: "sort_by=primary_release_date.asc",
      icon: <FaChevronUp />,
    },
    {
      name: "Titre (A-Z)",
      type: "title-asc",
      param: "sort_by=title.asc",
      icon: <FaChevronUp />,
    },
    {
      name: "Titre (Z-A)",
      type: "title-desc",
      param: "sort_by=title.desc",
      icon: <FaChevronDown />,
    },
    {
      name: "Note (croissant)",
      type: "vote_average-asc",
      param: "sort_by=vote_average.asc",
      icon: <FaChevronUp />,
    },
    {
      name: "Note (décroissant)",
      type: "vote_average-desc",
      param: "sort_by=vote_average.desc",
      icon: <FaChevronDown />,
    },
    {
      name: "Nombre de votes (croissant)",
      type: "vote_count-asc",
      param: "sort_by=vote_count.asc",
      icon: <FaChevronUp />,
    },
    {
      name: "Nombre de votes (décroissant)",
      type: "vote_count-desc",
      param: "sort_by=vote_count.desc",
      icon: <FaChevronDown />,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(
        "Searching for:",
        searchTerm,
        "with filters:",
        selectedFilters,
        "sort:",
        selectedSort
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedFilters, selectedSort]);

  async function obtainData() {
    try {
      setLoading(true);
      const obtainCountries = await obtainCountriesConfigurations();
      const obtainLanguages = await obtainLanguagesConfigurations();
      const movieGenre = await obtainGenres("movie");
      const tvGenre = await obtainGenres("tv");
      setCountries(obtainCountries);
      setLanguages(obtainLanguages);
      setMoviesGenre(movieGenre);
      setTvGenre(tvGenre);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    obtainData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <input
              type="text"
              placeholder="Rechercher des films..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
            />
            <button className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white p-3 rounded-r-md">
              <FaSearch />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {selectedFilters.map((filter) => (
              <motion.span
                key={filter}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-3 py-1 rounded-full text-sm flex items-center"
              >
                {filter}
                <button
                  onClick={() => removeFilter(filter)}
                  className="ml-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
                >
                  <FaTimes />
                </button>
              </motion.span>
            ))}
            {selectedFilters.length > 0 && (
              <button
                onClick={() => setSelectedFilters([])}
                className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                Effacer tous les filtres
              </button>
            )}
          </div>

          {["genre", "year", "rating", "language", "pays", "sort"].map(
            (section) => (
              <div
                key={section}
                className="mb-4 border-b border-gray-200 dark:border-gray-700 pb-4"
              >
                <button
                  onClick={() => toggleSection(section)}
                  className="w-full flex justify-between items-center text-left text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                >
                  <span className="text-lg font-semibold capitalize">
                    {section === "sort" ? "Trier par" : section}
                  </span>
                  {expandedSection === section ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </button>
                <AnimatePresence>
                  {expandedSection === section && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-2"
                    >
                      {section === "genre" && (
                        <div className="grid grid-cols-2 gap-2">
                          {tvGenre.map((genre) => (
                            <label
                              key={genre.id}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="checkbox"
                                className="form-checkbox text-red-600"
                                onChange={() =>
                                  addFilter(`Genre: ${genre.name}`)
                                }
                                checked={selectedFilters.includes(
                                  `Genre: ${genre.name}`
                                )}
                              />
                              <span className="text-gray-700 dark:text-gray-300">
                                {genre.name}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}
                      {section === "genre" && (
                        <div className="grid grid-cols-2 gap-2">
                          {moviesGenre.map((genre) => (
                            <label
                              key={genre.id}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="checkbox"
                                className="form-checkbox text-red-600"
                                onChange={() =>
                                  addFilter(`Genre: ${genre.name}`)
                                }
                                checked={selectedFilters.includes(
                                  `Genre: ${genre.name}`
                                )}
                              />
                              <span className="text-gray-700 dark:text-gray-300">
                                {genre.name}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}
                      {section === "year" && (
                        <div className="flex space-x-4">
                          <input
                            type="number"
                            placeholder="Année de début"
                            className="w-1/2 p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                            onChange={(e) =>
                              addFilter(`Année début: ${e.target.value}`)
                            }
                          />
                          <input
                            type="number"
                            placeholder="Année de fin"
                            className="w-1/2 p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                            onChange={(e) =>
                              addFilter(`Année fin: ${e.target.value}`)
                            }
                          />
                        </div>
                      )}
                      {section === "rating" && (
                        <div>
                          <div className="flex justify-between mb-2">
                            {[...Array(10)].map((_, index) => (
                              <div
                                key={index}
                                className="relative w-8 h-8 cursor-pointer"
                                onClick={(e) => handleStarClick(e, index)}
                              >
                                <FaStar
                                  className={`w-full h-full ${
                                    index < Math.floor(rating)
                                      ? "text-orange-500"
                                      : "text-gray-300 dark:text-gray-600"
                                  }`}
                                />
                                {index === Math.floor(rating) && (
                                  <div
                                    className="absolute top-0 left-0 h-full overflow-hidden text-orange-500"
                                    style={{ width: `${(rating % 1) * 100}%` }}
                                  >
                                    <FaStar className="w-full h-full" />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
                            <span>0</span>
                            <span>5</span>
                            <span>10</span>
                          </div>
                          <p className="text-center mt-2 text-gray-700 dark:text-gray-300">
                            Note minimale : {rating.toFixed(1)}
                          </p>
                        </div>
                      )}
                      {section === "language" && (
                        <select
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                          onChange={(e) =>
                            addFilter(`Langue: ${e.target.value}`)
                          }
                        >
                          <option value="">Toutes les langues</option>
                          {languages.length === 0 ? (
                            <option disabled>Chargement des langues...</option>
                          ) : (
                            languages.map((language, id) => (
                              <option
                                key={`${language.iso_3166_1}-${
                                  language.name || language.english_name
                                }-${id}`}
                                value={language.iso_3166_1}
                              >
                                {language.name || language.english_name}
                              </option>
                            ))
                          )}
                        </select>
                      )}
                      {section === "pays" && (
                        <select
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                          onChange={(e) => addFilter(`Pays: ${e.target.value}`)}
                        >
                          <option value="">Tous les pays</option>
                          {countries.length === 0 ? (
                            <option disabled>Chargement des pays...</option>
                          ) : (
                            countries.map((country) => (
                              <option
                                key={country.iso_3166_1}
                                value={country.iso_3166_1}
                              >
                                {country.native_name}
                              </option>
                            ))
                          )}
                        </select>
                      )}
                      {section === "sort" && (
                        <div className="relative" ref={sortRef}>
                          <button
                            onClick={() => setIsSortOpen(!isSortOpen)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white flex justify-between items-center"
                          >
                            <span>
                              {selectedSort
                                ? sorts.find((s) => s.type === selectedSort)
                                    ?.name
                                : "Choisir un tri"}
                            </span>
                            <FaChevronDown />
                          </button>
                          <AnimatePresence>
                            {isSortOpen && (
                              <motion.ul
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto"
                              >
                                {sorts.map((sort) => (
                                  <li
                                    key={sort.type}
                                    onClick={() => {
                                      setSelectedSort(sort.type);
                                      setIsSortOpen(false);
                                    }}
                                    className={`flex items-center p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 ${
                                      selectedSort === sort.type
                                        ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                                        : ""
                                    }`}
                                  >
                                    {sort.icon}
                                    <span className="ml-2">{sort.name}</span>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          )}

          <div className="flex justify-between mt-6">
            <button
              onClick={saveSearch}
              className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white p-3 rounded-md flex items-center"
            >
              <FaSave className="mr-2" />
              Sauvegarder la recherche
            </button>
            <button className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white p-3 rounded-md flex items-center">
              <FaSearch className="mr-2" />
              Recherche Avancée
            </button>
          </div>

          {savedSearches.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Recherches sauvegardées
              </h3>
              <ul className="space-y-2">
                {savedSearches.map((search, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-2 rounded-md"
                  >
                    <span className="text-gray-700 dark:text-gray-300">
                      {search}
                    </span>
                    <div>
                      <button
                        onClick={() => {
                          setSearchTerm(search.split(" ")[0]);
                          setSelectedFilters(search.split(", ").slice(1));
                        }}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 mr-2"
                      >
                        <FaHistory />
                      </button>
                      <button
                        onClick={() => {
                          const newSavedSearches = [...savedSearches];
                          newSavedSearches.splice(index, 1);
                          setSavedSearches(newSavedSearches);
                        }}
                        className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
