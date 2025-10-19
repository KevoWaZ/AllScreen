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
import * as Select from "@radix-ui/react-select";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

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
  const rating = searchParams.get("rating");
  const decadeParam = searchParams.get("decade");
  const yearParam = searchParams.get("year");
  const selectedRating = rating ? Number.parseFloat(rating) : null;
  const selectedDecade = decadeParam || null;
  const selectedYear = yearParam || null;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  const ratingOptions = useMemo(() => {
    const options = [];
    for (let i = 0.5; i <= 5; i += 0.5) {
      options.push(i);
    }
    return options;
  }, []);

  const getUniqueDecades = () => {
    const decades = new Set<string>();
    movies.forEach((movie) => {
      const year = new Date(movie.movie.release_date).getFullYear();
      const decade = Math.floor(year / 10) * 10;
      decades.add(`${decade}s`);
    });
    return Array.from(decades).sort((a, b) => parseInt(b) - parseInt(a));
  };

  const getUniqueYears = () => {
    const years = new Set<string>();
    movies.forEach((movie) => {
      const year = new Date(movie.movie.release_date).getFullYear().toString();
      years.add(year);
    });
    return Array.from(years).sort((a, b) => parseInt(b) - parseInt(a));
  };

  const uniqueDecades = getUniqueDecades();
  const uniqueYears = getUniqueYears();

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

  const filteredMovies = useMemo(() => {
    let result = [...movies];
    if (selectedRating !== null) {
      result = result.filter((movie) => {
        const movieRating = movie.movie.vote_count || 0;
        const roundedRating = Math.round(movieRating * 2) / 2;
        return roundedRating === selectedRating;
      });
    }
    if (selectedDecade) {
      result = result.filter((movie) => {
        const year = new Date(movie.movie.release_date).getFullYear();
        if (isNaN(year)) return false;
        const decade = Math.floor(year / 10) * 10;
        return `${decade}s` === selectedDecade;
      });
    }
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

  const updateURLParams = useCallback(
    (newParams: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(newParams).forEach(([key, value]) => {
        if (value === null || value === "tout") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
      setCurrentPage(1);
    },
    [searchParams, pathname, router]
  );

  const handleRatingChange = (value: string | null) => {
    updateURLParams({ rating: value });
  };

  const handleDecadeChange = (value: string | null) => {
    updateURLParams({ decade: value, year: null });
  };

  const handleYearChange = (value: string | null) => {
    updateURLParams({ year: value, decade: null });
  };

  const handleResetFilters = () => {
    updateURLParams({ rating: null, decade: null, year: null });
  };

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
            <div className="flex flex-col">
              <label className="text-[#BDBDBD] font-medium mb-3">
                Filtrer par note:
              </label>
              <Select.Root
                value={rating || "tout"}
                onValueChange={handleRatingChange}
              >
                <Select.Trigger className="inline-flex items-center justify-between px-4 py-2 bg-[#2C2C2C] text-white rounded-lg border border-[#4A4A4A] hover:border-[#FF5252] focus:outline-none focus:ring-2 focus:ring-[#FF5252] focus:ring-offset-2 focus:ring-offset-[#121212] min-w-[160px]">
                  <Select.Value>{rating ? rating : "Tout"}</Select.Value>
                  <Select.Icon>
                    <BiChevronDown className="w-4 h-4" />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="overflow-hidden bg-[#2C2C2C] rounded-lg border border-[#4A4A4A] shadow-lg">
                    <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-[#2C2C2C] text-[#BDBDBD] cursor-default">
                      <BiChevronUp />
                    </Select.ScrollUpButton>
                    <Select.Viewport className="p-1">
                      <Select.Item
                        value="tout"
                        className="relative flex items-center px-8 py-2 text-white rounded cursor-pointer hover:bg-[#4A4A4A] focus:bg-[#4A4A4A] focus:outline-none data-[state=checked]:bg-[#D32F2F] data-[state=checked]:text-white"
                      >
                        <Select.ItemText>Tout</Select.ItemText>
                      </Select.Item>
                      {ratingOptions.map((ratingOption) => (
                        <Select.Item
                          key={ratingOption}
                          value={String(ratingOption)}
                          className="relative flex items-center px-8 py-2 text-white rounded cursor-pointer hover:bg-[#4A4A4A] focus:bg-[#4A4A4A] focus:outline-none data-[state=checked]:bg-[#D32F2F] data-[state=checked]:text-white"
                        >
                          <Select.ItemText>
                            {ratingOption} étoile{ratingOption > 1 ? "s" : ""}
                          </Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                    <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-[#2C2C2C] text-[#BDBDBD] cursor-default">
                      <BiChevronDown />
                    </Select.ScrollDownButton>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>
            {/* Filtre par décennie */}
            <div className="flex flex-col">
              <label className="text-[#BDBDBD] font-medium mb-3">
                Filtrer par décennie:
              </label>
              <Select.Root
                value={selectedDecade || "tout"}
                onValueChange={handleDecadeChange}
              >
                <Select.Trigger className="inline-flex items-center justify-between px-4 py-2 bg-[#2C2C2C] text-white rounded-lg border border-[#4A4A4A] hover:border-[#FF5252] focus:outline-none focus:ring-2 focus:ring-[#FF5252] focus:ring-offset-2 focus:ring-offset-[#121212] min-w-[160px]">
                  <Select.Value>{selectedDecade || "Tout"}</Select.Value>
                  <Select.Icon>
                    <BiChevronDown className="w-4 h-4" />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="overflow-hidden bg-[#2C2C2C] rounded-lg border border-[#4A4A4A] shadow-lg">
                    <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-[#2C2C2C] text-[#BDBDBD] cursor-default">
                      <BiChevronUp />
                    </Select.ScrollUpButton>
                    <Select.Viewport className="p-1">
                      <Select.Item
                        value="tout"
                        className="relative flex items-center px-8 py-2 text-white rounded cursor-pointer hover:bg-[#4A4A4A] focus:bg-[#4A4A4A] focus:outline-none data-[state=checked]:bg-[#D32F2F] data-[state=checked]:text-white"
                      >
                        <Select.ItemText>Tout</Select.ItemText>
                      </Select.Item>
                      {uniqueDecades.map((decade) => (
                        <Select.Item
                          key={decade}
                          value={decade}
                          className="relative flex items-center px-8 py-2 text-white rounded cursor-pointer hover:bg-[#4A4A4A] focus:bg-[#4A4A4A] focus:outline-none data-[state=checked]:bg-[#D32F2F] data-[state=checked]:text-white"
                        >
                          <Select.ItemText>{decade}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                    <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-[#2C2C2C] text-[#BDBDBD] cursor-default">
                      <BiChevronDown />
                    </Select.ScrollDownButton>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>
            {/* Filtre par année */}
            <div className="flex flex-col">
              <label className="text-[#BDBDBD] font-medium mb-3">
                Filtrer par année:
              </label>
              <Select.Root
                value={selectedYear || "tout"}
                onValueChange={handleYearChange}
              >
                <Select.Trigger className="inline-flex items-center justify-between px-4 py-2 bg-[#2C2C2C] text-white rounded-lg border border-[#4A4A4A] hover:border-[#FF5252] focus:outline-none focus:ring-2 focus:ring-[#FF5252] focus:ring-offset-2 focus:ring-offset-[#121212] min-w-[160px]">
                  <Select.Value>{selectedYear || "Tout"}</Select.Value>
                  <Select.Icon>
                    <BiChevronDown className="w-4 h-4" />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="overflow-hidden bg-[#2C2C2C] rounded-lg border border-[#4A4A4A] shadow-lg">
                    <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-[#2C2C2C] text-[#BDBDBD] cursor-default">
                      <BiChevronUp />
                    </Select.ScrollUpButton>
                    <Select.Viewport className="p-1">
                      <Select.Item
                        value="tout"
                        className="relative flex items-center px-8 py-2 text-white rounded cursor-pointer hover:bg-[#4A4A4A] focus:bg-[#4A4A4A] focus:outline-none data-[state=checked]:bg-[#D32F2F] data-[state=checked]:text-white"
                      >
                        <Select.ItemText>Tout</Select.ItemText>
                      </Select.Item>
                      {uniqueYears.map((year) => (
                        <Select.Item
                          key={year}
                          value={year}
                          className="relative flex items-center px-8 py-2 text-white rounded cursor-pointer hover:bg-[#4A4A4A] focus:bg-[#4A4A4A] focus:outline-none data-[state=checked]:bg-[#D32F2F] data-[state=checked]:text-white"
                        >
                          <Select.ItemText>{year}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                    <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-[#2C2C2C] text-[#BDBDBD] cursor-default">
                      <BiChevronDown />
                    </Select.ScrollDownButton>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
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
      {filteredMovies.length > 20 && (
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
      {filteredMovies.length > 20 && (
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
