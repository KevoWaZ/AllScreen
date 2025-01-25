import { Movie, TVShow } from "@/types/types";
import { FaFilm, FaTv } from "react-icons/fa";
import MovieCard from "../cards/MovieCard";
import TVShowCard from "../cards/TVShowCard";
import { motion } from "framer-motion";
import { useRef } from "react";

export default function PopularSection({
  movies,
  tv,
}: {
  movies: Movie[];
  tv: TVShow[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
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
          <div className="bg-white dark:bg-gray-800 p-3 md:p-6 rounded-lg shadow-lg">
            <div className="relative overflow-hidden">
              <motion.div
                ref={containerRef}
                drag="x"
                dragConstraints={{
                  left: containerRef.current
                    ? -containerRef.current.scrollWidth +
                      containerRef.current.offsetWidth
                    : 0,
                  right: 0,
                }}
                className="flex space-x-6 cursor-grab"
              >
                {movies.map((movie) => (
                  <motion.div
                    key={movie.id}
                    className="flex-none w-64"
                    whileTap={{ cursor: "grabbing" }}
                  >
                    <MovieCard movie={movie} showDescription />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
            <FaTv className="mr-3 text-red-600" /> Séries
          </h3>
          <div className="bg-white dark:bg-gray-800 p-3 md:p-6 rounded-lg shadow-lg">
            <div className="relative overflow-hidden">
              <motion.div
                ref={containerRef}
                drag="x"
                dragConstraints={{
                  left: containerRef.current
                    ? -containerRef.current.scrollWidth +
                      containerRef.current.offsetWidth
                    : 0,
                  right: 0,
                }}
                className="flex space-x-6 cursor-grab"
              >
                {tv.map((tvShow) => (
                  <motion.div
                    key={tvShow.id}
                    className="flex-none w-64"
                    whileTap={{ cursor: "grabbing" }}
                  >
                    <TVShowCard tvShow={tvShow} showDescription />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
