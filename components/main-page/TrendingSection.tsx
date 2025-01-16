"use client";
import { useState } from "react";
import { FaFilm, FaTv } from "react-icons/fa";
import { TrendingMovies, TrendingTv } from "@/app/page";
import MovieCard from "../search/MovieCard";
import TVShowCard from "../search/TVShowCard";
import { motion, AnimatePresence } from "framer-motion";

export default function TrendingSection({
  movies,
  tv,
}: {
  movies: TrendingMovies;
  tv: TrendingTv;
}) {
  const [activeTab, setActiveTab] = useState<"day" | "week">("day");

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Tendances
      </h2>
      <div className="mb-6">
        <div className="inline-flex rounded-full shadow-md overflow-hidden">
          <button
            type="button"
            className={`px-6 py-3 text-sm font-medium transition-all duration-300 ${
              activeTab === "day"
                ? "bg-red-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab("day")}
          >
            Aujourd&apos;hui
          </button>
          <button
            type="button"
            className={`px-6 py-3 text-sm font-medium transition-all duration-300 ${
              activeTab === "week"
                ? "bg-red-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab("week")}
          >
            Cette semaine
          </button>
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-1 gap-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                <FaFilm className="mr-3 text-red-600" /> Films
              </h3>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="relative overflow-hidden">
                  <div className="overflow-x-auto scrollbar-hide -mx-6">
                    <ul className="flex space-x-6 px-6">
                      {(activeTab === "day"
                        ? movies.dayTrendingMovies
                        : movies.weekTrendingMovies
                      ).map((movie) => (
                        <li key={movie.id} className="flex-none w-64">
                          <MovieCard movie={movie} showDescription />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                <FaTv className="mr-3 text-red-600" /> Séries
              </h3>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="relative overflow-hidden">
                  <div className="overflow-x-auto scrollbar-hide -mx-6">
                    <ul className="flex space-x-6 px-6">
                      {(activeTab === "day"
                        ? tv.dayTrendingTv
                        : tv.weekTrendingTv
                      ).map((tvShow) => (
                        <li key={tvShow.id} className="flex-none w-64">
                          <TVShowCard tvShow={tvShow} showDescription />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
}
