"use client";
import { useState } from "react";
import { FaFilm, FaTv } from "react-icons/fa";
import { MovieCard } from "../search/MovieCard";
import { TVShowCard } from "../search/TVShowCard";
import { TrendingMovies, TrendingTv } from "@/app/page";

export default function TrendingSection({
  movies,
  tv,
}: {
  movies: TrendingMovies;
  tv: TrendingTv;
}) {
  const [activeTab, setActiveTab] = useState<"day" | "week">("day");

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold text-white mb-4">Tendances</h2>
      <div className="mb-4">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg focus:z-10 focus:ring-2 focus:ring-red-500 focus:outline-none ${
              activeTab === "day"
                ? "bg-red-500 text-white"
                : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab("day")}
          >
            Aujourd&apos;hui
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg focus:z-10 focus:ring-2 focus:ring-red-500 focus:outline-none ${
              activeTab === "week"
                ? "bg-red-500 text-white"
                : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab("week")}
          >
            Cette semaine
          </button>
        </div>
      </div>
      <div className={activeTab === "day" ? "block" : "hidden"}>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
              <FaFilm className="mr-2" /> Films du jour
            </h3>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <div className="relative">
                <div className="overflow-x-auto scrollbar-hide">
                  <ul className="flex space-x-4 pb-4">
                    {movies.dayTrendingMovies.map((movie) => (
                      <li key={movie.id} className="flex-none w-64">
                        <MovieCard key={movie.id} movie={movie} block showDescription={false} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
              <FaTv className="mr-2" /> Séries du jour
            </h3>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <div className="relative">
                <div className="overflow-x-auto scrollbar-hide">
                  <ul className="flex space-x-4 pb-4">
                    {tv.dayTrendingTv.map((tvShow) => (
                      <li key={tvShow.id} className="flex-none w-64">
                        <TVShowCard key={tvShow.id} tvShow={tvShow} block showDescription={false} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={activeTab === "week" ? "block" : "hidden"}>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
              <FaFilm className="mr-2" /> Films de la semaine
            </h3>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <div className="relative">
                <div className="overflow-x-auto scrollbar-hide">
                  <ul className="flex space-x-4 pb-4">
                    {movies.weekTrendingMovies.map((movie) => (
                      <li key={movie.id} className="flex-none w-64">
                        <MovieCard key={movie.id} movie={movie} block showDescription={false} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
              <FaTv className="mr-2" /> Séries de la semaine
            </h3>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <div className="relative">
                <div className="overflow-x-auto scrollbar-hide">
                  <ul className="flex space-x-4 pb-4">
                    {tv.weekTrendingTv.map((tvShow) => (
                      <li key={tvShow.id} className="flex-none w-64">
                        <TVShowCard key={tvShow.id} tvShow={tvShow} block showDescription={false} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
