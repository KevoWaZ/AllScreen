"use client";
import Loading from "@/app/loading";
import MovieCard from "@/components/cards/MovieCard";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import * as Select from "@radix-ui/react-select";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import * as Dialog from "@radix-ui/react-dialog";
import { FiFilter, FiCheck } from "react-icons/fi";

interface Movie {
  movie: {
    id: number;
    title: string;
    poster: string;
    release_date: string;
    description: string;
    movieId: number;
    runtime: number;
    genres: {
      id: number;
      name: string;
    }[];
    productionCompanies: {
      id: number;
      name: string;
    }[];
  };
}

interface Genre {
  id: number;
  name: string;
}

interface Company {
  id: number;
  name: string;
}

export default function Page() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const params = useParams<{ username: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  // États synchronisés avec les params d'URL
  const selectedDecade = searchParams.get("decade") || null;
  const selectedYear = searchParams.get("year") || null;
  const selectedGenres = searchParams.get("genres") || null;
  const selectedGenresFromURL = useMemo(
    () => (selectedGenres ? selectedGenres.split(",").map(Number) : []),
    [selectedGenres]
  );
  const selectedCompanies = searchParams.get("companies") || null;
  const selectedCompaniesFromURL = useMemo(
    () => (selectedCompanies ? selectedCompanies.split(",").map(Number) : []),
    [selectedCompanies]
  );

  const getWatchlists = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/profile/watchlists/movies?username=${params.username}`
      );
      const data = await res.json();
      setMovies(data.watchlists);
      const allGenres = data.watchlists.flatMap(
        (watchlist: Movie) => watchlist.movie.genres
      );

      const uniqueGenres = Array.from(
        new Map(allGenres.map((genre: Genre) => [genre.id, genre])).values()
      ) as Genre[];
      setGenres(uniqueGenres);
      const allCompanies = data.watchlists.flatMap(
        (watchlist: Movie) => watchlist.movie.productionCompanies
      );
      const uniqueCompanies = Array.from(
        new Map(
          allCompanies.map((company: Company) => [company.id, company])
        ).values()
      ) as Company[];
      setCompanies(uniqueCompanies);
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
      params.delete("filter");
      params.delete("decade");
      params.delete("year");
      params.delete("onlyReleased");
      params.delete("genres");
      params.delete("companies");
      Object.entries(newParams).forEach(([key, value]) => {
        if (value !== null && value !== "tout") {
          params.set(key, value);
        }
      });
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
      setCurrentPage(1);
    },
    [searchParams, pathname, router]
  );

  const handleDecadeChange = (value: string | null) => {
    updateURLParams({
      decade: value,
      filter: "tout",
      year: null,
      onlyReleased: null,
    });
  };

  const handleYearChange = (value: string | null) => {
    updateURLParams({
      year: value,
      filter: "tout",
      decade: null,
      onlyReleased: null,
    });
  };

  const handleGenreChange = (genreId: number) => {
    const params = new URLSearchParams(searchParams.toString());
    let newSelectedGenres: number[] = [...selectedGenresFromURL];
    if (newSelectedGenres.includes(genreId)) {
      newSelectedGenres = newSelectedGenres.filter((id) => id !== genreId);
    } else {
      newSelectedGenres.push(genreId);
    }
    if (newSelectedGenres.length > 0) {
      params.set("genres", newSelectedGenres.join(","));
    } else {
      params.delete("genres");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    setCurrentPage(1);
  };

  const handleCompanyChange = (companyId: number) => {
    const params = new URLSearchParams(searchParams.toString());
    let newSelectedCompanies: number[] = [...selectedCompaniesFromURL];
    if (newSelectedCompanies.includes(companyId)) {
      newSelectedCompanies = newSelectedCompanies.filter(
        (id) => id !== companyId
      );
    } else {
      newSelectedCompanies.push(companyId);
    }
    if (newSelectedCompanies.length > 0) {
      params.set("companies", newSelectedCompanies.join(","));
    } else {
      params.delete("companies");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    setCurrentPage(1);
  };

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

  const filteredMovies = useMemo(() => {
    let result = [...movies];
    if (selectedDecade) {
      result = result.filter((movie) => {
        const year = new Date(movie.movie.release_date).getFullYear();
        if (isNaN(year)) return null;
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
    if (selectedGenresFromURL.length > 0) {
      result = result.filter((movie) => {
        const movieGenreIds = movie.movie.genres.map((genre) => genre.id);
        return selectedGenresFromURL.every((genreId) =>
          movieGenreIds.includes(genreId)
        );
      });
    }
    if (selectedCompaniesFromURL.length > 0) {
      result = result.filter((movie) => {
        const movieCompanyIds = movie.movie.productionCompanies.map(
          (company) => company.id
        );
        return selectedCompaniesFromURL.every((companyId) =>
          movieCompanyIds.includes(companyId)
        );
      });
    }
    return result;
  }, [
    movies,
    selectedDecade,
    selectedYear,
    selectedGenresFromURL,
    selectedCompaniesFromURL,
  ]);

  const availableGenres = useMemo(() => {
    const filteredMoviesGenres = filteredMovies.flatMap(
      (movie) => movie.movie.genres
    );
    const uniqueGenres = Array.from(
      new Map(
        filteredMoviesGenres.map((genre: Genre) => [genre.id, genre])
      ).values()
    );
    return uniqueGenres;
  }, [filteredMovies]);

  const availableCompanies = useMemo(() => {
    const filteredMoviesCompanies = filteredMovies.flatMap(
      (movie) => movie.movie.productionCompanies
    );
    const uniqueCompanies = Array.from(
      new Map(
        filteredMoviesCompanies.map((company: Company) => [company.id, company])
      ).values()
    );
    return uniqueCompanies;
  }, [filteredMovies]);

  const filteredCompanies = availableCompanies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const uniqueDecades = getUniqueDecades();
  const uniqueYears = getUniqueYears();
  const totalPages = Math.max(
    1,
    Math.ceil(filteredMovies.length / itemsPerPage)
  );

  useEffect(() => {
    getWatchlists();
  }, [getWatchlists]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDecade, selectedYear, selectedGenres]);

  if (loading) {
    return <Loading />;
  }

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
          Watchlists: {filteredMovies.length}
        </h3>
        <div className="flex flex-col lg:flex-row justify-center mb-8 gap-6">
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
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-semibold text-gray-200">
              <FiFilter className="text-red-400" />
              <h3 className="text-sm">Filtrer par genres</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {availableGenres.map((genre) => (
                <div
                  key={genre.id}
                  className={`cursor-pointer border px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedGenresFromURL.includes(genre.id)
                      ? "text-white bg-red-700 border-red-700"
                      : "bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700"
                  }`}
                  onClick={() => handleGenreChange(genre.id)}
                  aria-label={`Filtrer par genre ${genre.name}`}
                >
                  <div className="flex items-center gap-1.5">
                    {selectedGenresFromURL.includes(genre.id) && (
                      <FiCheck className="w-3 h-3" />
                    )}
                    <span>{genre.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-semibold text-gray-200">
              <FiFilter className="text-red-400" />
              <h3 className="text-sm">Filtrer par companies</h3>
            </div>
            <button
              onClick={() => setOpen(true)}
              className="px-4 py-2 bg-[#2C2C2C] text-white rounded-lg border border-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#FF5252] focus:ring-offset-2 focus:ring-offset-[#121212]"
            >
              Sélectionner des companies
            </button>
            <Dialog.Root open={open} onOpenChange={setOpen}>
              <Dialog.Portal>
                <Dialog.Overlay className="bg-blackA6 fixed inset-0" />
                <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#2C2C2C] p-6 rounded-lg border border-[#4A4A4A] shadow-lg w-[90vw] max-w-[500px] max-h-[80vh] overflow-y-auto">
                  <Dialog.Title className="text-white font-semibold mb-4">
                    Sélectionner des companies
                  </Dialog.Title>
                  <input
                    type="text"
                    placeholder="Rechercher une company..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 bg-[#121212] text-white rounded-lg border border-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#FF5252] focus:ring-offset-2 focus:ring-offset-[#121212] mb-4"
                  />
                  <div className="flex flex-wrap gap-2">
                    {filteredCompanies.map((company) => (
                      <div
                        key={company.id}
                        className={`cursor-pointer border px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          selectedCompaniesFromURL.includes(company.id)
                            ? "text-white bg-red-700 border-red-700"
                            : "bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700"
                        }`}
                        onClick={() => handleCompanyChange(company.id)}
                        aria-label={`Filtrer par company ${company.name}`}
                      >
                        <div className="flex items-center gap-1.5">
                          {selectedCompaniesFromURL.includes(company.id) && (
                            <FiCheck className="w-3 h-3" />
                          )}
                          <span>{company.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Dialog.Close asChild>
                    <button className="mt-4 px-4 py-2 bg-[#D32F2F] text-white rounded-lg font-semibold cursor-pointer transition-colors hover:bg-[#B71C1C]">
                      Fermer
                    </button>
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
        {filteredMovies.length > 20 && (
          <div className="mb-8">
            <PaginationControls />
          </div>
        )}
        <div className="grid gap-3 md:gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {filteredMovies
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
        {filteredMovies.length > 20 && (
          <div className="mt-8">
            <PaginationControls />
          </div>
        )}
      </div>
    </div>
  );
}
