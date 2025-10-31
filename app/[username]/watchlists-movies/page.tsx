"use client";
import MovieCard from "@/components/cards/MovieCard";
import { useParams, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import WatchlistsMovieFilters from "@/components/watchlists/movie/Filters";

interface Movie {
  id: number;
  title: string;
  poster: string;
  release_date: string;
  description: string;
  runtime: number;
  genres: {
    id: number;
    name: string;
  }[];
  productionCompanies: {
    id: number;
    name: string;
  }[];
  actors: {
    id: number;
    name: string;
  }[];
  directors: {
    id: number;
    name: string;
  }[];
  producers: {
    id: number;
    name: string;
  }[];
  execProducers: {
    id: number;
    name: string;
  }[];
  writers: {
    id: number;
    name: string;
  }[];
  composers: {
    id: number;
    name: string;
  }[];
  cinematographers: {
    id: number;
    name: string;
  }[];
}

interface Facet {
  id: number;
  name: string;
  count: number;
}

interface DecadeYearFacet {
  value: string;
  label: string;
  count: number;
}

interface ApiResponse {
  watchlists: Movie[];
  pagination: {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    totalMovies: number;
  };
  facets: {
    genres: Facet[];
    companies: Facet[];
    actors: Facet[];
    directors: Facet[];
    producers: Facet[];
    execProducers: Facet[];
    writers: Facet[];
    composers: Facet[];
    cinematographers: Facet[];
    decades: DecadeYearFacet[];
    years: DecadeYearFacet[];
  };
}

export default function Page() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [facets, setFacets] = useState<ApiResponse["facets"] | null>(null);
  const [totalMovies, setTotalMovies] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [isLoadingMovies, setIsLoadingMovies] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);

  const params = useParams<{ username: string }>();
  const searchParams = useSearchParams();

  const selectedDecade = searchParams.get("decade") || null;
  const selectedYear = searchParams.get("year") || null;
  const selectedGenres = searchParams.get("genres") || null;
  const selectedCompanies = searchParams.get("companies") || null;
  const selectedActors = searchParams.get("actors") || null;
  const selectedDirectors = searchParams.get("directors") || null;
  const selectedProducers = searchParams.get("producers") || null;
  const selectedExecProducers = searchParams.get("execProducers") || null;
  const selectedWriters = searchParams.get("writers") || null;
  const selectedComposers = searchParams.get("composers") || null;
  const selectedCinematographers = searchParams.get("cinematographers") || null;
  const sortBy = searchParams.get("sort") || null;

  const getParamAsArray = (param: string | null) => {
    return param ? param.split(",").map(Number) : [];
  };

  const selectedGenresFromURL = useMemo(
    () => getParamAsArray(selectedGenres),
    [selectedGenres]
  );
  const selectedCompaniesFromURL = useMemo(
    () => getParamAsArray(selectedCompanies),
    [selectedCompanies]
  );
  const selectedActorsFromURL = useMemo(
    () => getParamAsArray(selectedActors),
    [selectedActors]
  );
  const selectedDirectorsFromURL = useMemo(
    () => getParamAsArray(selectedDirectors),
    [selectedDirectors]
  );
  const selectedProducersFromURL = useMemo(
    () => getParamAsArray(selectedProducers),
    [selectedProducers]
  );
  const selectedExecProducersFromURL = useMemo(
    () => getParamAsArray(selectedExecProducers),
    [selectedExecProducers]
  );
  const selectedWritersFromURL = useMemo(
    () => getParamAsArray(selectedWriters),
    [selectedWriters]
  );
  const selectedComposersFromURL = useMemo(
    () => getParamAsArray(selectedComposers),
    [selectedComposers]
  );
  const selectedCinematographersFromURL = useMemo(
    () => getParamAsArray(selectedCinematographers),
    [selectedCinematographers]
  );

  const buildFilterQuery = useCallback(() => {
    const filters: string[] = [];
    if (selectedGenres) filters.push(`genres=${selectedGenres}`);
    if (selectedCompanies) filters.push(`companies=${selectedCompanies}`);
    if (selectedActors) filters.push(`actors=${selectedActors}`);
    if (selectedDirectors) filters.push(`directors=${selectedDirectors}`);
    if (selectedProducers) filters.push(`producers=${selectedProducers}`);
    if (selectedExecProducers)
      filters.push(`execProducers=${selectedExecProducers}`);
    if (selectedWriters) filters.push(`writers=${selectedWriters}`);
    if (selectedComposers) filters.push(`composers=${selectedComposers}`);
    if (selectedCinematographers)
      filters.push(`cinematographers=${selectedCinematographers}`);
    if (selectedDecade) filters.push(`decade=${selectedDecade}`);
    if (selectedYear) filters.push(`year=${selectedYear}`);
    if (sortBy) filters.push(`sort=${sortBy}`);
    return filters.length > 0 ? `&${filters.join("&")}` : "";
  }, [
    selectedGenres,
    selectedCompanies,
    selectedActors,
    selectedDirectors,
    selectedProducers,
    selectedExecProducers,
    selectedWriters,
    selectedComposers,
    selectedCinematographers,
    selectedDecade,
    selectedYear,
    sortBy,
  ]);

  const fetchMovies = useCallback(
    async (page = 1) => {
      try {
        setIsLoadingMovies(true);
        const filterQuery = buildFilterQuery();
        const res = await fetch(
          `/api/profile/watchlists/movies?username=${params.username}&page=${page}${filterQuery}`
        );
        const data: ApiResponse = await res.json();

        setMovies(data.watchlists);
        setFacets(data.facets);
        setTotalMovies(data.pagination.totalMovies);
        setTotalPages(data.pagination.totalPages);
        setCurrentPage(data.pagination.currentPage);

        return data;
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoadingMovies(false);
        setInitialLoading(false);
      }
    },
    [params.username, buildFilterQuery]
  );

  const goToNextPage = useCallback(async () => {
    if (currentPage < totalPages) {
      await fetchMovies(currentPage + 1);
    }
  }, [currentPage, totalPages, fetchMovies]);

  const goToPrevPage = useCallback(async () => {
    if (currentPage > 1) {
      await fetchMovies(currentPage - 1);
    }
  }, [currentPage, fetchMovies]);

  useEffect(() => {
    setCurrentPage(1);
    fetchMovies(1);
  }, [
    selectedGenres,
    selectedCompanies,
    selectedActors,
    selectedDirectors,
    selectedProducers,
    selectedExecProducers,
    selectedWriters,
    selectedComposers,
    selectedCinematographers,
    selectedDecade,
    selectedYear,
    sortBy,
  ]);

  const MoviesSkeleton = () => (
    <div className="grid gap-3 md:gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="flex flex-col animate-pulse">
          <div className="aspect-[2/3] bg-[#1E1E1E] rounded-lg" />
        </div>
      ))}
    </div>
  );

  if (initialLoading) {
    return (
      <div className="bg-[#121212] min-h-screen text-white font-sans">
        <div className="container mx-auto px-4 py-8">
          <div className="h-8 w-48 bg-[#1E1E1E] rounded animate-pulse mb-8" />
          <MoviesSkeleton />
        </div>
      </div>
    );
  }

  const PaginationControls = () => (
    <div className="flex justify-center gap-2">
      <button
        onClick={goToPrevPage}
        disabled={currentPage === 1 || isLoadingMovies}
        className="px-4 py-2 bg-[#D32F2F] text-white rounded-lg font-semibold cursor-pointer transition-colors hover:bg-[#B71C1C] disabled:bg-[#D32F2F]/50 disabled:cursor-not-allowed"
      >
        Précédent
      </button>
      <span className="px-4 py-2 text-[#BDBDBD] font-medium">
        Page {currentPage} - {totalPages}
      </span>
      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages || isLoadingMovies}
        className="px-4 py-2 bg-[#D32F2F] text-white rounded-lg font-semibold cursor-pointer transition-colors hover:bg-[#B71C1C] disabled:bg-[#D32F2F]/50 disabled:cursor-not-allowed"
      >
        Suivant
      </button>
    </div>
  );

  return (
    <div className="bg-[#121212] min-h-screen text-white font-sans">
      <div className="container mx-auto px-4 py-8">
        <h3 className="text-xl font-semibold text-white">
          Watchlists: {totalMovies}
        </h3>
        {facets && (
          <WatchlistsMovieFilters
            movies={movies}
            filteredMovies={movies}
            availableGenres={facets.genres}
            availableCompanies={facets.companies}
            availableActors={facets.actors}
            availableDirectors={facets.directors}
            availableProducers={facets.producers}
            availableExecProducers={facets.execProducers}
            availableWriters={facets.writers}
            availableComposers={facets.composers}
            availableCinematographers={facets.cinematographers}
            uniqueDecades={facets.decades.map((d) => d.label)}
            uniqueYears={facets.years.map((y) => y.value)}
            selectedDecade={selectedDecade}
            selectedYear={selectedYear}
            selectedGenresFromURL={selectedGenresFromURL}
            selectedCompaniesFromURL={selectedCompaniesFromURL}
            selectedActorsFromURL={selectedActorsFromURL}
            selectedDirectorsFromURL={selectedDirectorsFromURL}
            selectedProducersFromURL={selectedProducersFromURL}
            selectedExecProducersFromURL={selectedExecProducersFromURL}
            selectedWritersFromURL={selectedWritersFromURL}
            selectedComposersFromURL={selectedComposersFromURL}
            selectedCinematographersFromURL={selectedCinematographersFromURL}
            sortBy={sortBy}
            setSortBy={() => {}}
          />
        )}
      </div>
      {totalMovies > 20 && (
        <div className="mb-8">
          <PaginationControls />
        </div>
      )}
      {isLoadingMovies ? (
        <MoviesSkeleton />
      ) : (
        <div className="grid gap-3 md:gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              showDescription={false}
              showUserAction={false}
              movie={{
                poster_path: movie.poster,
                poster: movie.poster,
                title: movie.title,
                overview: movie.description,
                id: movie.id,
                release_date: movie.release_date,
              }}
            />
          ))}
        </div>
      )}
      {totalMovies > 20 && (
        <div className="mt-8">
          <PaginationControls />
        </div>
      )}
    </div>
  );
}
