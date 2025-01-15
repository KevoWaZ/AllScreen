import { Movie } from "@/types/types";
import { FaTheaterMasks } from "react-icons/fa";
import { MovieCard } from "../search/MovieCard";

export default function InTheatersSection({ movies }: { movies: Movie[] }) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
        <FaTheaterMasks className="mr-2" /> Au Cinéma
      </h2>
      {/* Liste des films au cinéma */}
      <div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide">
              <ul className="flex space-x-4 pb-4">
                {movies.map((movie) => (
                  <li key={movie.id} className="flex-none w-64">
                    <MovieCard key={movie.id} movie={movie} block showDescription={false} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
