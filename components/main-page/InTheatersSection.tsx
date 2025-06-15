"use client";

import type { Movie } from "@/types/types";
import { FaTheaterMasks } from "react-icons/fa";
import { motion } from "framer-motion";
import MovieCard from "../cards/MovieCard";

export default function InTheatersSection({ movies }: { movies: Movie[] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <h2 className="text-3xl font-bold  text-white mb-6 flex items-center">
        <FaTheaterMasks
          className="mr-3 text-red-600"
          aria-label="In theater icon"
        />{" "}
        Au Cinéma
      </h2>
      <div className=" bg-gray-800 p-3 md:p-6 rounded-lg shadow-lg relative">
        {movies.map((movie) => (
          <MovieCard movie={movie} showDescription />
        ))}
      </div>
    </motion.section>
  );
}
