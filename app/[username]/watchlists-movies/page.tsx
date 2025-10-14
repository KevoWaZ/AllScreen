"use client";
import Loading from "@/app/loading";
import MovieCard from "@/components/cards/MovieCard";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as Select from "@radix-ui/react-select";
import { BiCheck, BiChevronDown, BiChevronUp } from "react-icons/bi";
import * as Checkbox from "@radix-ui/react-checkbox";

interface Movie {
  movie: {
    id: number;
    title: string;
    poster: string;
    release_date: string;
    description: string;
    movieId: number;
  };
}

export default function Page() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams<{ username: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  // États synchronisés avec les params d'URL
  const radioFilter = searchParams.get("filter") || "tout";
  const selectedDecade = searchParams.get("decade") || null;
  const selectedYear = searchParams.get("year") || null;
  const onlyReleased = searchParams.get("onlyReleased") === "true";

  // Récupère les watchlists
  const getWatchlists = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/profile/watchlists/movies?username=${params.username}`
      );
      const data = await res.json();
      setMovies(data.watchlists);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [params.username]);

  // Met à jour les params d'URL en fonction des filtres
  const updateURLParams = useCallback(
    (newParams: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(newParams).forEach(([key, value]) => {
        if (value === null) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
      setCurrentPage(1); // Réinitialise la pagination
    },
    [searchParams, pathname, router]
  );

  // Gère le changement de filtre radio
  const handleRadioFilterChange = (value: string) => {
    updateURLParams({
      filter: value,
      decade: value !== "tout" ? null : selectedDecade,
      year: value !== "tout" ? null : selectedYear,
    });
  };

  // Gère le changement de décennie
  const handleDecadeChange = (value: string | null) => {
    updateURLParams({ decade: value });
  };

  // Gère le changement d'année
  const handleYearChange = (value: string | null) => {
    updateURLParams({ year: value });
  };

  // Gère le changement du filtre "seulement sortis"
  const handleOnlyReleasedChange = (checked: boolean) => {
    updateURLParams({ onlyReleased: checked.toString() });
  };

  // Récupère les décennies uniques
  const getUniqueDecades = () => {
    const decades = new Set<string>();
    movies.forEach((movie) => {
      const year = new Date(movie.movie.release_date).getFullYear();
      const decade = Math.floor(year / 10) * 10;
      decades.add(`${decade}s`);
    });
    return Array.from(decades).sort();
  };

  // Récupère les années uniques
  const getUniqueYears = () => {
    const years = new Set<string>();
    movies.forEach((movie) => {
      const year = new Date(movie.movie.release_date).getFullYear().toString();
      years.add(year);
    });
    return Array.from(years).sort((a, b) => parseInt(a) - parseInt(b));
  };

  // Applique les filtres aux films
  const filteredMovies = () => {
    let filtered = [...movies];
    const today = new Date();

    // Filtre par radio (prochainement, aujourd'hui, released, tout)
    if (radioFilter === "prochainement") {
      filtered = filtered.filter((movie) => {
        const releaseDate = new Date(movie.movie.release_date);
        return releaseDate > today;
      });
    } else if (radioFilter === "aujourd'hui") {
      filtered = filtered.filter((movie) => {
        const releaseDate = new Date(movie.movie.release_date);
        return (
          releaseDate.getDate() === today.getDate() &&
          releaseDate.getMonth() === today.getMonth() &&
          releaseDate.getFullYear() === today.getFullYear()
        );
      });
    } else if (radioFilter === "released") {
      filtered = filtered.filter((movie) => {
        const releaseDate = new Date(movie.movie.release_date);
        return releaseDate <= today;
      });
    } else if (radioFilter === "tout") {
      if (selectedDecade) {
        filtered = filtered.filter((movie) => {
          const year = new Date(movie.movie.release_date).getFullYear();
          const decade = Math.floor(year / 10) * 10;
          return `${decade}s` === selectedDecade;
        });
      }
      if (selectedYear) {
        filtered = filtered.filter((movie) => {
          const year = new Date(movie.movie.release_date)
            .getFullYear()
            .toString();
          return year === selectedYear;
        });
      }
    }

    // Applique le filtre "uniquement sortis"
    if (onlyReleased) {
      if (selectedYear) {
        filtered = filtered.filter((movie) => {
          const releaseDate = new Date(movie.movie.release_date);
          const year = releaseDate.getFullYear().toString();
          return year === selectedYear && releaseDate <= today;
        });
      } else if (selectedDecade) {
        filtered = filtered.filter((movie) => {
          const releaseDate = new Date(movie.movie.release_date);
          const year = releaseDate.getFullYear();
          const decade = Math.floor(year / 10) * 10;
          return `${decade}s` === selectedDecade && releaseDate <= today;
        });
      } else if (radioFilter === "tout") {
        filtered = filtered.filter((movie) => {
          const releaseDate = new Date(movie.movie.release_date);
          return releaseDate <= today;
        });
      }
    }

    return filtered;
  };

  // Charge les watchlists au montage
  useEffect(() => {
    getWatchlists();
  }, [getWatchlists]);

  // Réinitialise la pagination quand les filtres changent
  useEffect(() => {
    setCurrentPage(1);
  }, [radioFilter, selectedDecade, selectedYear, onlyReleased]);

  if (loading) {
    return <Loading />;
  }

  const uniqueDecades = getUniqueDecades();
  const uniqueYears = getUniqueYears();
  const currentFilteredMovies = filteredMovies();
  const totalPages = Math.max(
    1,
    Math.ceil(currentFilteredMovies.length / itemsPerPage)
  );

  // Contrôles de pagination
  const PaginationControls = () => (
    <div className="flex justify-center gap-2">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-[#D32F2F] text-white rounded-lg font-semibold cursor-pointer transition-colors hover:bg-[#B71C1C] disabled:bg-[#D32F2F]/50 disabled:cursor-not-allowed"
      >
        Précédent
      </button>
      <span className="px-4 py-2 text-[#BDBDBD] font-medium">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-[#D32F2F] text-white rounded-lg font-semibold cursor-pointer transition-colors hover:bg-[#B71C1C] disabled:bg-[#D32F2F]/50 disabled:cursor-not-allowed"
      >
        Suivant
      </button>
    </div>
  );

  return (
    <div className="bg-[#121212] min-h-screen text-white font-sans">
      <div className="container mx-auto px-4 py-8">
        <h3 className="text-2xl font-bold text-white mb-8">
          Watchlists: {movies.length}
        </h3>
        <div className="flex flex-col lg:flex-row justify-center mb-8 gap-6">
          <div className="flex flex-col">
            <label className="text-[#BDBDBD] font-medium mb-3">
              Filtrer par:
            </label>
            <RadioGroup.Root
              value={radioFilter}
              onValueChange={handleRadioFilterChange}
              className="flex flex-wrap gap-4"
            >
              <div className="flex items-center">
                <RadioGroup.Item
                  value="tout"
                  id="tout"
                  className="w-5 h-5 rounded-full border-2 border-[#4A4A4A] bg-transparent hover:border-[#FF5252] focus:outline-none focus:ring-2 focus:ring-[#FF5252] focus:ring-offset-2 focus:ring-offset-[#121212] data-[state=checked]:border-[#D32F2F] data-[state=checked]:bg-[#D32F2F]"
                >
                  <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-full after:bg-white" />
                </RadioGroup.Item>
                <label
                  htmlFor="tout"
                  className="ml-2 text-white font-medium cursor-pointer"
                >
                  Tout
                </label>
              </div>
              <div className="flex items-center">
                <RadioGroup.Item
                  value="prochainement"
                  id="prochainement"
                  className="w-5 h-5 rounded-full border-2 border-[#4A4A4A] bg-transparent hover:border-[#FF5252] focus:outline-none focus:ring-2 focus:ring-[#FF5252] focus:ring-offset-2 focus:ring-offset-[#121212] data-[state=checked]:border-[#D32F2F] data-[state=checked]:bg-[#D32F2F]"
                >
                  <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-full after:bg-white" />
                </RadioGroup.Item>
                <label
                  htmlFor="prochainement"
                  className="ml-2 text-white font-medium cursor-pointer"
                >
                  Prochainement
                </label>
              </div>
              <div className="flex items-center">
                <RadioGroup.Item
                  value="aujourd'hui"
                  id="aujourd'hui"
                  className="w-5 h-5 rounded-full border-2 border-[#4A4A4A] bg-transparent hover:border-[#FF5252] focus:outline-none focus:ring-2 focus:ring-[#FF5252] focus:ring-offset-2 focus:ring-offset-[#121212] data-[state=checked]:border-[#D32F2F] data-[state=checked]:bg-[#D32F2F]"
                >
                  <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-full after:bg-white" />
                </RadioGroup.Item>
                <label
                  htmlFor="aujourd'hui"
                  className="ml-2 text-white font-medium cursor-pointer"
                >
                  Aujourd&apos;hui
                </label>
              </div>
              <div className="flex items-center">
                <RadioGroup.Item
                  value="released"
                  id="released"
                  className="w-5 h-5 rounded-full border-2 border-[#4A4A4A] bg-transparent hover:border-[#FF5252] focus:outline-none focus:ring-2 focus:ring-[#FF5252] focus:ring-offset-2 focus:ring-offset-[#121212] data-[state=checked]:border-[#D32F2F] data-[state=checked]:bg-[#D32F2F]"
                >
                  <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-full after:bg-white" />
                </RadioGroup.Item>
                <label
                  htmlFor="released"
                  className="ml-2 text-white font-medium cursor-pointer"
                >
                  Déjà sortis
                </label>
              </div>
            </RadioGroup.Root>
          </div>
          {radioFilter === "tout" && (
            <div className="flex flex-col lg:flex-row gap-4">
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
              {(selectedYear || selectedDecade || radioFilter === "tout") && (
                <div className="flex items-center mt-6 lg:mt-8">
                  <Checkbox.Root
                    className="flex items-center gap-2"
                    checked={onlyReleased}
                    onCheckedChange={handleOnlyReleasedChange}
                    id="onlyReleased"
                  >
                    <Checkbox.Indicator className="w-5 h-5 flex items-center justify-center bg-[#D32F2F] text-white rounded">
                      <BiCheck className="w-3.5 h-3.5" />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <label
                    htmlFor="onlyReleased"
                    className="text-white font-medium cursor-pointer"
                  >
                    Seulement sortis
                  </label>
                </div>
              )}
            </div>
          )}
        </div>
        {movies && movies.length > 0 && (
          <div className="mb-8">
            <PaginationControls />
          </div>
        )}
        <div className="grid gap-3 md:gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {currentFilteredMovies
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((movie) => (
              <MovieCard
                key={movie.movie.id}
                showDescription
                showUserAction={false}
                movie={{
                  poster_path: movie.movie.poster,
                  poster: movie.movie.poster,
                  title: movie.movie.title,
                  overview: movie.movie.description,
                  id: movie.movie.id,
                  release_date: movie.movie.release_date,
                }}
              />
            ))}
        </div>
        {movies && movies.length > 0 && (
          <div className="mt-8">
            <PaginationControls />
          </div>
        )}
      </div>
    </div>
  );
}
