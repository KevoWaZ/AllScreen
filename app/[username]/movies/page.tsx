"use client";
import Loading from "@/app/loading";
import MovieCard from "@/components/cards/MovieCard";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
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
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams<{ username: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const rating = searchParams.get("rating");
  const decadeParam = searchParams.get("decade");
  const selectedRating = rating ? Number.parseFloat(rating) : null;
  const selectedDecade = decadeParam ? decadeParam : null;

  // Générer les options de note (0.5 à 5 par pas de 0.5)
  const ratingOptions = useMemo(() => {
    const options = [];
    for (let i = 0.5; i <= 5; i += 0.5) {
      options.push(i);
    }
    return options;
  }, []);

  // Extraire les décennies uniques
  const getUniqueDecades = useCallback(() => {
    const decades = new Set<string>();
    movies.forEach((movie: Movie) => {
      const year = new Date(movie.movie.release_date).getFullYear();
      if (!isNaN(year)) {
        // Vérifier que l'année est valide
        const decade = Math.floor(year / 10) * 10;
        decades.add(`${decade}s`);
      }
    });
    return Array.from(decades).sort();
  }, [movies]);

  const uniqueDecades = getUniqueDecades();

  // Filtrer les films en fonction de la note et de la décennie sélectionnées
  const filteredMovies = useMemo(() => {
    let result = [...movies];

    // Filtre par note
    if (selectedRating !== null) {
      result = result.filter((movie: Movie) => {
        const movieRating = movie.movie.vote_count || 0;
        const roundedRating = Math.round(movieRating * 2) / 2;
        return roundedRating === selectedRating;
      });
    }

    // Filtre par décennie
    if (selectedDecade) {
      result = result.filter((movie: Movie) => {
        const year = new Date(movie.movie.release_date).getFullYear();
        if (isNaN(year)) return false; // Ignorer les dates invalides
        const decade = Math.floor(year / 10) * 10;
        return `${decade}s` === selectedDecade;
      });
    }

    return result;
  }, [movies, selectedRating, selectedDecade]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedRating, selectedDecade]);

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

  const handleResetRating = useCallback(() => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("rating");
    const newUrl = pathname + "?" + newParams.toString();
    router.push(newUrl, { scroll: false });
  }, [pathname, searchParams, router]);

  const handleRatingChange = useCallback(
    (newRating: string) => {
      const newParams = new URLSearchParams(searchParams.toString());
      if (newRating === "") {
        newParams.delete("rating");
      } else {
        newParams.set("rating", newRating);
      }
      const newUrl = pathname + "?" + newParams.toString();
      router.push(newUrl, { scroll: false });
    },
    [pathname, searchParams, router]
  );

  const handleDecadeChange = useCallback(
    (newDecade: string) => {
      const newParams = new URLSearchParams(searchParams.toString());
      if (newDecade === "") {
        newParams.delete("decade");
      } else {
        newParams.set("decade", newDecade);
      }
      const newUrl = pathname + "?" + newParams.toString();
      router.push(newUrl, { scroll: false });
    },
    [pathname, searchParams, router]
  );

  const handleResetFilters = useCallback(() => {
    const newParams = new URLSearchParams();
    const newUrl = pathname + "?" + newParams.toString();
    router.push(newUrl, { scroll: false });
  }, [pathname, router]);

  if (loading) {
    return <Loading />;
  }

  const totalPages = Math.max(
    1,
    Math.ceil(filteredMovies.length / itemsPerPage)
  );

  return (
    <>
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-xl font-semibold text-white">
            Watched: {filteredMovies.length}
            {selectedRating && ` (Note: ${selectedRating})`}
            {selectedDecade && ` (Décennie: ${selectedDecade})`}
          </h3>
          {/* Filtres */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Filtre par note */}
            <div className="flex items-center gap-3">
              <FaStar className="text-yellow-400 text-lg" />
              <select
                value={rating || ""}
                onChange={(e) => handleRatingChange(e.target.value)}
                className="bg-[#2C2C2C] border border-[#4A4A4A] text-white px-3 py-2 rounded-lg focus:outline-none focus:border-[#D32F2F] transition-colors"
              >
                <option value="">Toutes les notes</option>
                {ratingOptions.map((ratingOption) => (
                  <option key={ratingOption} value={ratingOption}>
                    {ratingOption} étoile{ratingOption > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
              {selectedRating && (
                <button
                  onClick={handleResetRating}
                  className="px-3 py-2 bg-[#D32F2F] hover:bg-[#B71C1C] text-white rounded-lg transition-colors text-sm"
                >
                  Réinitialiser note
                </button>
              )}
            </div>

            {/* Filtre par décennie */}
            <div className="flex items-center gap-3">
              <select
                value={decadeParam || ""}
                onChange={(e) => handleDecadeChange(e.target.value)}
                className="bg-[#2C2C2C] border border-[#4A4A4A] text-white px-3 py-2 rounded-lg focus:outline-none focus:border-[#D32F2F] transition-colors"
              >
                <option value="">Toutes les décennies</option>
                {uniqueDecades.map((decade) => (
                  <option key={decade} value={decade}>
                    {decade}
                  </option>
                ))}
              </select>
              {selectedDecade && (
                <button
                  onClick={() => handleDecadeChange("")}
                  className="px-3 py-2 bg-[#D32F2F] hover:bg-[#B71C1C] text-white rounded-lg transition-colors text-sm"
                >
                  Réinitialiser décennie
                </button>
              )}
            </div>

            {/* Bouton pour réinitialiser tous les filtres */}
            {(selectedRating || selectedDecade) && (
              <button
                onClick={handleResetFilters}
                className="px-3 py-2 bg-[#D32F2F] hover:bg-[#B71C1C] text-white rounded-lg transition-colors text-sm"
              >
                Réinitialiser tous les filtres
              </button>
            )}
          </div>
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
            {selectedRating || selectedDecade
              ? "Aucun film ne correspond aux filtres sélectionnés"
              : "Aucun film regardé"}
          </p>
        </div>
      ) : (
        <div className="grid gap-3 md:gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {filteredMovies
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((movie: Movie) => (
            <div key={movie.movie.id} className="flex flex-col">
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
             <p>{movie.movie.vote_count}</p>
            </div>
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
