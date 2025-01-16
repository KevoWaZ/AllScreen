import { Movie, TVShow } from "@/types/types";
import { FaFilm, FaTv } from "react-icons/fa";
import MovieCard from "../search/MovieCard";
import TVShowCard from "../search/TVShowCard";
import { motion } from "framer-motion";

export default function PopularSection({
  movies,
  tv,
}: {
  movies: Movie[];
  tv: TVShow[];
}) {
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
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="relative overflow-hidden">
              <div className="overflow-x-auto scrollbar-hide -mx-6">
                <ul className="flex space-x-6 px-6">
                  {movies.map((movie) => (
                    <li
                      key={movie.id}
                      className="flex-none w-64"
                    >
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
                  {tv.map((tvShow) => (
                    <li
                      key={tvShow.id}
                      className="flex-none w-64"
                    >
                      <TVShowCard tvShow={tvShow} showDescription />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

