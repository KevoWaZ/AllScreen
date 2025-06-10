"use client";
import Loading from "@/app/loading";
import MovieCard from "@/components/cards/MovieCard";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState, useMemo } from "react";
import { FaStar } from "react-icons/fa";

interface Movie {
  movie: {
    id: number;
    title: string;
    poster: string;
    release_date: string;
    description: string;
    movieId: number;
    vote_count: number;
  };
}

export default function Page() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const params = useParams<{ username: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  // Générer les options de note (0.5 à 5 par pas de 0.5)
  const ratingOptions = useMemo(() => {
    const options = [];
    for (let i = 0.5; i <= 5; i += 0.5) {
      options.push(i);
    }
    return options;
  }, []);

  // Filtrer les films par note (vote_count est la note du film)
  const filteredMovies = useMemo(() => {
    if (selectedRating === null) {
      return movies;
    }
    return movies.filter((movie: Movie) => {
      // Arrondir la note du film au 0.5 le plus proche pour la comparaison
      const movieRating = movie.movie.vote_count || 0;
      const roundedRating = Math.round(movieRating * 2) / 2;
      return roundedRating === selectedRating;
    });
  }, [movies, selectedRating]);

  // Réinitialiser la page quand le filtre change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedRating]);

  const getWatched = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/profile/watched/movies?username=${params.username}`
      );
      const data = await res.json();
      console.log(data);
      setMovies(data.watched);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [params.username]);

  useEffect(() => {
    getWatched();
  }, [getWatched]);

  if (loading) {
    return <Loading />;
  }

  const totalPages = Math.max(
    1,
    Math.ceil(filteredMovies.length / itemsPerPage)
  );

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-xl font-semibold text-white">
          Watched: {filteredMovies.length}
          {selectedRating && ` (Note: ${selectedRating})`}
        </h3>

        {/* Filtre par note */}
        <div className="flex items-center gap-3">
          <FaStar className="text-yellow-400 text-lg" />
          <select
            value={selectedRating || ""}
            onChange={(e) =>
              setSelectedRating(e.target.value ? Number(e.target.value) : null)
            }
            className="bg-[#2C2C2C] border border-[#4A4A4A] text-white px-3 py-2 rounded-lg focus:outline-none focus:border-[#D32F2F] transition-colors"
          >
            <option value="">Toutes les notes</option>
            {ratingOptions.map((rating) => (
              <option key={rating} value={rating}>
                {rating} étoile{rating > 1 ? "s" : ""}
              </option>
            ))}
          </select>

          {selectedRating && (
            <button
              onClick={() => setSelectedRating(null)}
              className="px-3 py-2 bg-[#D32F2F] hover:bg-[#B71C1C] text-white rounded-lg transition-colors text-sm"
            >
              Réinitialiser
            </button>
          )}
        </div>
      </div>

      {filteredMovies && filteredMovies.length > 0 && (
        <div className="flex justify-center mb-8 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-[#D32F2F] hover:bg-[#B71C1C] text-white rounded-lg cursor-pointer disabled:bg-[#D32F2F]/50 disabled:cursor-not-allowed transition-colors"
          >
            Précédent
          </button>
          <span className="px-4 py-2 text-[#BDBDBD]">
            Page {currentPage} sur {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-[#D32F2F] hover:bg-[#B71C1C] text-white rounded-lg cursor-pointer disabled:bg-[#D32F2F]/50 disabled:cursor-not-allowed transition-colors"
          >
            Suivant
          </button>
        </div>
      )}

      {filteredMovies.length === 0 ? (
        <div className="text-center py-12">
          <FaStar className="text-[#4A4A4A] text-4xl mx-auto mb-4" />
          <p className="text-[#BDBDBD] text-lg">
            {selectedRating
              ? `Aucun film avec une note de ${selectedRating} étoile${
                  selectedRating > 1 ? "s" : ""
                }`
              : "Aucun film regardé"}
          </p>
        </div>
      ) : (
        <div className="grid gap-3 md:gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {filteredMovies
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((movie: Movie) => (
              <MovieCard
                key={movie.movie.id}
                showDescription
                showUserAction={false}
                movie={{
                  poster_path: movie.movie.poster,
                  title: movie.movie.title,
                  overview: movie.movie.description,
                  id: movie.movie.id,
                  release_date: movie.movie.release_date,
                  vote_count: movie.movie.vote_count,
                }}
              />
            ))}
        </div>
      )}

      {filteredMovies && filteredMovies.length > 0 && (
        <div className="flex justify-center mt-8 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-[#D32F2F] hover:bg-[#B71C1C] text-white rounded-lg cursor-pointer disabled:bg-[#D32F2F]/50 disabled:cursor-not-allowed transition-colors"
          >
            Précédent
          </button>
          <span className="px-4 py-2 text-[#BDBDBD]">
            Page {currentPage} sur {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-[#D32F2F] hover:bg-[#B71C1C] text-white rounded-lg cursor-pointer disabled:bg-[#D32F2F]/50 disabled:cursor-not-allowed transition-colors"
          >
            Suivant
          </button>
        </div>
      )}
    </>
  );
}
