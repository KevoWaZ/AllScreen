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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Récupération des params d'URL
  const rating = searchParams.get("rating");
  const decadeParam = searchParams.get("decade");
  const yearParam = searchParams.get("year");

  const selectedRating = rating ? Number.parseFloat(rating) : null;
  const selectedDecade = decadeParam || null;
  const selectedYear = yearParam || null;

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

  // Extraire les décennies uniques
  const getUniqueDecades = useCallback(() => {
    const decades = new Set<string>();
    movies.forEach((movie) => {
      const year = new Date(movie.movie.release_date).getFullYear();
      if (!isNaN(year)) {
        const decade = Math.floor(year / 10) * 10;
        decades.add(`${decade}s`);
      }
    });
    return Array.from(decades).sort();
  }, [movies]);

  // Extraire les années uniques
  const getUniqueYears = useCallback(() => {
    const years = new Set<string>();
    movies.forEach((movie) => {
      const year = new Date(movie.movie.release_date).getFullYear().toString();
      if (!isNaN(parseInt(year))) {
        years.add(year);
      }
    });
    return Array.from(years).sort((a, b) => parseInt(a) - parseInt(b));
  }, [movies]);

  const uniqueDecades = getUniqueDecades();
  const uniqueYears = getUniqueYears();

  // Récupérer les films regardés
  const getWatched = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/profile/watched/movies?username=${params.username}`
      );
      const data = await res.json();
      setMovies(data.watched);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [params.username]);

  // Filtrer les films en fonction des paramètres sélectionnés
  const filteredMovies = useMemo(() => {
    let result = [...movies];

    // Filtre par note
    if (selectedRating !== null) {
      result = result.filter((movie) => {
        const movieRating = movie.movie.vote_count || 0;
        const roundedRating = Math.round(movieRating * 2) / 2;
        return roundedRating === selectedRating;
      });
    }

    // Filtre par décennie
    if (selectedDecade) {
      result = result.filter((movie) => {
        const year = new Date(movie.movie.release_date).getFullYear();
        if (isNaN(year)) return false;
        const decade = Math.floor(year / 10) * 10;
        return `${decade}s` === selectedDecade;
      });
    }

    // Filtre par année
    if (selectedYear) {
      result = result.filter((movie) => {
        const year = new Date(movie.movie.release_date)
          .getFullYear()
          .toString();
        return year === selectedYear;
      });
    }

    return result;
  }, [movies, selectedRating, selectedDecade, selectedYear]);

  // Mettre à jour les params d'URL
  const updateURLParams = useCallback(
    (newParams: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(newParams).forEach(([key, value]) => {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
      setCurrentPage(1); // Réinitialiser la pagination
    },
    [searchParams, pathname, router]
  );

  // Gestion des changements de filtres
  const handleRatingChange = (newRating: string) => {
    updateURLParams({ rating: newRating });
  };

  const handleDecadeChange = (newDecade: string) => {
    updateURLParams({ decade: newDecade, year: null }); // Réinitialise l'année si une décennie est sélectionnée
  };

  const handleYearChange = (newYear: string) => {
    updateURLParams({ year: newYear });
  };

  const handleResetRating = () => {
    updateURLParams({ rating: null });
  };

  const handleResetDecade = () => {
    updateURLParams({ decade: null });
  };

  const handleResetYear = () => {
    updateURLParams({ year: null });
  };

  const handleResetFilters = () => {
    updateURLParams({ rating: null, decade: null, year: null });
  };

  // Charger les films au montage
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
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-xl font-semibold text-white">
            Watched: {filteredMovies.length}
            {selectedRating && ` (Note: ${selectedRating})`}
            {selectedDecade && ` (Décennie: ${selectedDecade})`}
            {selectedYear && ` (Année: ${selectedYear})`}
          </h3>

          {/* Filtres */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full">
            {/* Filtre par note */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <FaStar className="text-yellow-400 text-lg" />
              <select
                value={rating || ""}
                onChange={(e) => handleRatingChange(e.target.value)}
                className="bg-[#2C2C2C] border border-[#4A4A4A] text-white px-3 py-2 rounded-lg focus:outline-none focus:border-[#D32F2F] transition-colors w-full sm:w-auto"
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
                  className="px-3 py-2 bg-[#D32F2F] hover:bg-[#B71C1C] text-white rounded-lg transition-colors text-sm whitespace-nowrap"
                >
                  Réinitialiser note
                </button>
              )}
            </div>

            {/* Filtre par décennie */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={decadeParam || ""}
                onChange={(e) => handleDecadeChange(e.target.value)}
                className="bg-[#2C2C2C] border border-[#4A4A4A] text-white px-3 py-2 rounded-lg focus:outline-none focus:border-[#D32F2F] transition-colors w-full sm:w-auto"
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
                  onClick={handleResetDecade}
                  className="px-3 py-2 bg-[#D32F2F] hover:bg-[#B71C1C] text-white rounded-lg transition-colors text-sm whitespace-nowrap"
                >
                  Réinitialiser décennie
                </button>
              )}
            </div>

            {/* Filtre par année */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={yearParam || ""}
                onChange={(e) => handleYearChange(e.target.value)}
                className="bg-[#2C2C2C] border border-[#4A4A4A] text-white px-3 py-2 rounded-lg focus:outline-none focus:border-[#D32F2F] transition-colors w-full sm:w-auto"
                disabled={!selectedDecade && selectedDecade !== null} // Désactiver si aucune décennie n'est sélectionnée
              >
                <option value="">Toutes les années</option>
                {uniqueYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              {selectedYear && (
                <button
                  onClick={handleResetYear}
                  className="px-3 py-2 bg-[#D32F2F] hover:bg-[#B71C1C] text-white rounded-lg transition-colors text-sm whitespace-nowrap"
                >
                  Réinitialiser année
                </button>
              )}
            </div>

            {/* Bouton pour réinitialiser tous les filtres */}
            {(selectedRating || selectedDecade || selectedYear) && (
              <button
                onClick={handleResetFilters}
                className="px-3 py-2 bg-[#D32F2F] hover:bg-[#B71C1C] text-white rounded-lg transition-colors text-sm w-full sm:w-auto"
              >
                Réinitialiser tous les filtres
              </button>
            )}
          </div>
        </div>
      </div>

      {filteredMovies.length > 0 && (
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
            {selectedRating || selectedDecade || selectedYear
              ? "Aucun film ne correspond aux filtres sélectionnés"
              : "Aucun film regardé"}
          </p>
        </div>
      ) : (
        <div className="grid gap-3 md:gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {filteredMovies
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((movie) => (
              <div key={movie.movie.id} className="flex flex-col">
                <MovieCard
                  showDescription
                  showUserAction={false}
                  movie={{
                    poster_path: movie.movie.poster,
                    poster: movie.movie.poster,
                    title: movie.movie.title,
                    overview: movie.movie.description,
                    id: movie.movie.id,
                    release_date: movie.movie.release_date,
                    vote_count: movie.movie.vote_count,
                  }}
                />
                <p className="text-center text-[#BDBDBD] text-sm mt-1">
                  Note: {movie.movie.vote_count}/5
                </p>
              </div>
            ))}
        </div>
      )}

      {filteredMovies.length > 0 && (
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
