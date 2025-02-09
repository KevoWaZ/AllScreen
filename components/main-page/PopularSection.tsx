import { Movie, TVShow } from "@/types/types";
import { FaFilm, FaTv } from "react-icons/fa";
import MovieCard from "../cards/MovieCard";
import TVShowCard from "../cards/TVShowCard";
import { motion } from "framer-motion";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default function PopularSection({
  movies,
  tv,
}: {
  movies: Movie[];
  tv: TVShow[];
}) {
  const [movieEmblaRef, movieEmblaApi] = useEmblaCarousel({
    align: "start",
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
    align: "start",
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
        Les Plus Populaires
      </h2>
      <div className="grid grid-cols-1 gap-8">
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
            <FaFilm className="mr-3 text-red-600" /> Films
          </h3>
          <div className="bg-white dark:bg-gray-800 p-3 md:p-6 rounded-lg shadow-lg relative">
            <div
              className="embla overflow-hidden cursor-grab"
              ref={movieEmblaRef}
            >
              <div className="embla__container flex">
                {movies.map((movie) => (
                  <div
                    key={movie.id}
                    className="embla__slide flex-none w-64 mr-6"
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
            >
              <FaChevronLeft className="w-6 h-6" />
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-2 rounded-full shadow-md z-10 hover:bg-red-700 transition-colors duration-300"
              onClick={movieScrollNext}
            >
              <FaChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
          <FaTv className="mr-3 text-red-600" /> Séries
        </h3>
        <div className="bg-white dark:bg-gray-800 p-3 md:p-6 rounded-lg shadow-lg relative">
          <div className="embla overflow-hidden cursor-grab" ref={TVEmblaRef}>
            <div className="embla__container flex">
              {tv.map((tvShow) => (
                <div
                  key={tvShow.id}
                  className="embla__slide flex-none w-64 mr-6"
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
          >
            <FaChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-2 rounded-full shadow-md z-10 hover:bg-red-700 transition-colors duration-300"
            onClick={TVScrollNext}
          >
            <FaChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </motion.section>
  );
}
