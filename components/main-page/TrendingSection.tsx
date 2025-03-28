"use client";
import { useCallback, useState } from "react";
import { FaFilm, FaTv } from "react-icons/fa";
import MovieCard from "../cards/MovieCard";
import TVShowCard from "../cards/TVShowCard";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { TrendingMovies, TrendingTv } from "@/types/types";

export default function TrendingSection({
  movies,
  tv,
}: {
  movies: TrendingMovies;
  tv: TrendingTv;
}) {
  const [activeTab, setActiveTab] = useState<"day" | "week">("day");

  const [movieEmblaRef, movieEmblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
    dragFree: true,
  });

  const movieScrollPrev = useCallback(() => {
    if (movieEmblaApi) movieEmblaApi.scrollPrev();
  }, [movieEmblaApi]);

  const movieScrollNext = useCallback(() => {
    if (movieEmblaApi) movieEmblaApi.scrollNext();
  }, [movieEmblaApi]);

  const [TVEmblaRef, TVEmblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
    dragFree: true,
  });

  const TVScrollPrev = useCallback(() => {
    if (TVEmblaApi) TVEmblaApi.scrollPrev();
  }, [TVEmblaApi]);

  const TVScrollNext = useCallback(() => {
    if (TVEmblaApi) TVEmblaApi.scrollNext();
  }, [TVEmblaApi]);

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
                <FaFilm className="mr-3 text-red-600" aria-label="Film Icon" />{" "}
                Films
              </h3>
              <div className="bg-white dark:bg-gray-800 p-3 md:p-6 rounded-lg shadow-lg relative">
                <div
                  className="embla overflow-hidden cursor-grab"
                  ref={movieEmblaRef}
                >
                  <div className="embla__container flex">
                    {(activeTab === "day"
                      ? movies.dayTrendingMovies
                      : movies.weekTrendingMovies
                    ).map((movie) => (
                      <div
                        key={movie.id}
                        className="embla__slide flex-none my-auto w-64 mr-6"
                      >
                        <MovieCard
                          movie={movie}
                          showDescription
                          textSelect={false}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-2 rounded-full shadow-md z-10 hover:bg-red-700 transition-colors duration-300"
                  onClick={movieScrollPrev}
                  aria-label="Previous button"
                >
                  <FaChevronLeft
                    className="w-6 h-6"
                    aria-label="previous icon"
                  />
                </button>
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-2 rounded-full shadow-md z-10 hover:bg-red-700 transition-colors duration-300"
                  onClick={movieScrollNext}
                  aria-label="Next button"
                >
                  <FaChevronRight className="w-6 h-6" aria-label="next icon" />
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                <FaTv className="mr-3 text-red-600" aria-label="TV icon" />{" "}
                Séries
              </h3>
              <div className="bg-white dark:bg-gray-800 p-3 md:p-6 rounded-lg shadow-lg relative">
                <div
                  className="embla overflow-hidden cursor-grab"
                  ref={TVEmblaRef}
                >
                  <div className="embla__container flex">
                    {(activeTab === "day"
                      ? tv.dayTrendingTv
                      : tv.weekTrendingTv
                    ).map((tvShow) => (
                      <div
                        key={tvShow.id}
                        className="embla__slide flex-none my-auto w-64 mr-6"
                      >
                        <TVShowCard
                          tvShow={tvShow}
                          showDescription
                          textSelect={false}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-2 rounded-full shadow-md z-10 hover:bg-red-700 transition-colors duration-300"
                  onClick={TVScrollPrev}
                  aria-label="Previous button"
                >
                  <FaChevronLeft
                    className="w-6 h-6"
                    aria-label="previous icon"
                  />
                </button>
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-2 rounded-full shadow-md z-10 hover:bg-red-700 transition-colors duration-300"
                  onClick={TVScrollNext}
                  aria-label="Next button"
                >
                  <FaChevronRight className="w-6 h-6" aria-label="next icon" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
}
