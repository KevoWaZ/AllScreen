import { Movie } from "@/types/types";
import { FaTheaterMasks } from "react-icons/fa";
import MovieCard from "../cards/MovieCard";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function InTheatersSection({ movies }: { movies: Movie[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });

  useEffect(() => {
    if (containerRef.current) {
      setConstraints({
        left: -(
          containerRef.current.scrollWidth - containerRef.current.offsetWidth
        ),
        right: 0,
      });
    }
  }, []);

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
      <div className="bg-white dark:bg-gray-800 p-3 md:p-6 rounded-lg shadow-lg">
        <div className="relative overflow-hidden">
          <motion.div
            ref={containerRef}
            drag="x"
            dragConstraints={constraints}
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
    </motion.section>
  );
}
