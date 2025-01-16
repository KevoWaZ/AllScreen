import { Movie } from "@/types/types";
import { FaTheaterMasks } from "react-icons/fa";
import MovieCard from "../search/MovieCard";
import { motion } from "framer-motion";

export default function InTheatersSection({ movies }: { movies: Movie[] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
        <FaTheaterMasks className="mr-3 text-red-600" /> Au Cinéma
      </h2>
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
    </motion.section>
  );
}

