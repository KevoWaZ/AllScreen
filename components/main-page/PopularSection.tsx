import { Movie, TVShow } from "@/types/types";
import { FaFilm, FaTv } from "react-icons/fa";
import { MovieCard } from "../search/MovieCard";
import { TVShowCard } from "../search/TVShowCard";

export default function PopularSection({
  movies,
  tv,
}: {
  movies: Movie[];
  tv: TVShow[];
}) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold text-white mb-4">
        Les Plus Populaires
      </h2>
      <div className="grid grid-cols-1 gap-6">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
            <FaFilm className="mr-2" /> Films
          </h3>
          {/* Liste des films populaires */}
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
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
            <FaTv className="mr-2" /> Séries
          </h3>
          {/* Liste des séries populaires */}
          <div>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <div className="relative">
                <div className="overflow-x-auto scrollbar-hide">
                  <ul className="flex space-x-4 pb-4">
                    {tv.map((tv) => (
                      <li key={tv.id} className="flex-none w-64">
                        <TVShowCard key={tv.id} tvShow={tv} block showDescription={false} />
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
