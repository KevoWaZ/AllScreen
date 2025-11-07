"use client";
import MovieCard from "@/components/cards/MovieCard";
import { useParams, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useMemo, useRef } from "react";
import WatchedMovieFilters from "@/components/watched/movie/Filters";

interface Movie {
  movie: {
    id: number;
    title: string;
    poster: string;
    release_date: string;
    description: string;
    movieId: number;
    vote_count: number;
    runtime: number;
    genres: {
      id: number;
      name: string;
      count: number;
    }[];
    productionCompanies: {
      id: number;
      name: string;
      count: number;
    }[];
    actors: {
      id: number;
      name: string;
      count: number;
    }[];
    directors: {
      id: number;
      name: string;
      count: number;
    }[];
    producers: {
      id: number;
      name: string;
      count: number;
    }[];
    execProducers: {
      id: number;
      name: string;
      count: number;
    }[];
    writers: {
      id: number;
      name: string;
      count: number;
    }[];
    composers: {
      id: number;
      name: string;
      count: number;
    }[];
    cinematographers: {
      id: number;
      name: string;
      count: number;
    }[];
  };
}
interface Genre {
  id: number;
  name: string;
  count: number;
}
interface ApiResponse {
  watched: Movie[];
  pagination: {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    totalMovies: number;
  };
  facets: Facets;
}

interface Facets {
  genres: { id: number; name: string; count: number }[];
  companies: { id: number; name: string; count: number }[];
  actors: { id: number; name: string; count: number }[];
  directors: { id: number; name: string; count: number }[];
  producers: { id: number; name: string; count: number }[];
  execProducers: { id: number; name: string; count: number }[];
  writers: { id: number; name: string; count: number }[];
  composers: { id: number; name: string; count: number }[];
  cinematographers: { id: number; name: string; count: number }[];
  decades: string[];
  years: string[];
}

export default function Page() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [facets, setFacets] = useState<Facets>({
    genres: [],
    companies: [],
    actors: [],
    directors: [],
    producers: [],
    execProducers: [],
    writers: [],
    composers: [],
    cinematographers: [],
    decades: [],
    years: [],
  });
  const [totalMovies, setTotalMovies] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [isLoadingMovies, setIsLoadingMovies] = useState<boolean>(false);
  const params = useParams<{ username: string }>();

  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  const previousFiltersRef = useRef<string>("");

  const searchParams = useSearchParams();
  const rating = searchParams.get("rating");
  const selectedDecade = searchParams.get("decade") || null;
  const selectedYear = searchParams.get("year") || null;
  const getParamAsArray = (param: string | null) => {
    return param ? param.split(",").map(Number) : [];
  };
  const selectedGenres = searchParams.get("genres") || null;
  const selectedCompanies = searchParams.get("companies") || null;
  const selectedActors = searchParams.get("actors") || null;
  const selectedDirectors = searchParams.get("directors") || null;
  const selectedProducers = searchParams.get("producers") || null;
  const selectedExecProducers = searchParams.get("execProducers") || null;
  const selectedWriters = searchParams.get("writers") || null;
  const selectedComposers = searchParams.get("composers") || null;
  const selectedCinematographers = searchParams.get("cinematographers") || null;
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
  const selectedRating = rating ? Number.parseFloat(rating) : null;
  const [sortBy, setSortBy] = useState<string | null>(null);

  const getCurrentFiltersString = useCallback(() => {
    return [
      selectedGenres,
      selectedCompanies,
      selectedActors,
      selectedDirectors,
      selectedProducers,
      selectedExecProducers,
      selectedWriters,
      selectedComposers,
      selectedCinematographers,
      rating,
      selectedDecade,
      selectedYear,
      sortBy,
    ].join("|");
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
    rating,
    selectedDecade,
    selectedYear,
    sortBy,
  ]);

  const buildFilterQuery = useCallback(() => {
    const filterParams = new URLSearchParams();
    if (selectedGenres) filterParams.set("genres", selectedGenres);
    if (selectedCompanies) filterParams.set("companies", selectedCompanies);
    if (selectedActors) filterParams.set("actors", selectedActors);
    if (selectedDirectors) filterParams.set("directors", selectedDirectors);
    if (selectedProducers) filterParams.set("producers", selectedProducers);
    if (selectedExecProducers)
      filterParams.set("execProducers", selectedExecProducers);
    if (selectedWriters) filterParams.set("writers", selectedWriters);
    if (selectedComposers) filterParams.set("composers", selectedComposers);
    if (selectedCinematographers)
      filterParams.set("cinematographers", selectedCinematographers);
    if (rating) filterParams.set("rating", rating);
    if (selectedDecade)
      filterParams.set("decade", selectedDecade.replace("s", ""));
    if (selectedYear) filterParams.set("year", selectedYear);
    if (sortBy) filterParams.set("sort", sortBy);
    return filterParams.toString();
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
    rating,
    selectedDecade,
    selectedYear,
    sortBy,
  ]);

  const fetchMovies = useCallback(
    async (page: number, forceIncludeFacets = false) => {
      try {
        setIsLoadingMovies(true);

        const currentFilters = getCurrentFiltersString();
        const filtersChanged = currentFilters !== previousFiltersRef.current;
        const includeFacets = forceIncludeFacets || filtersChanged;

        const filterQuery = buildFilterQuery();
        const res: Response = await fetch(
          `/api/profile/watched/movies?username=${
            params.username
          }&page=${page}&includeFacets=${includeFacets}${
            filterQuery ? `&${filterQuery}` : ""
          }`,
          { cache: "force-cache" }
        );
        const data: ApiResponse = await res.json();

        if (!data.watched || data.watched.length === 0) {
          setMovies([]);
          if (data.facets) {
            setFacets(data.facets);
          }
          setTotalMovies(data.pagination?.totalMovies || 0);
          setTotalPages(data.pagination?.totalPages || 0);
          setHasNextPage(false);
          setHasPrevPage(false);
          return;
        }

        setMovies(data.watched);
        if (data.facets) {
          setFacets(data.facets);
        }
        setTotalMovies(data.pagination.totalMovies);
        setTotalPages(data.pagination.totalPages);
        setHasNextPage(data.pagination.hasNextPage);
        setHasPrevPage(data.pagination.hasPrevPage);

        previousFiltersRef.current = currentFilters;
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingMovies(false);
      }
    },
    [params.username, buildFilterQuery, getCurrentFiltersString]
  );

  const goToNextPage = () => {
    if (hasNextPage) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchMovies(nextPage);
    }
  };

  const goToPrevPage = () => {
    if (hasPrevPage) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      fetchMovies(prevPage);
    }
  };

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
    rating,
    selectedDecade,
    selectedYear,
    sortBy,
  ]);

  useEffect(() => {
    const loadData = async () => {
      await fetchMovies(1, true);
      setInitialLoading(false);
    };
    loadData();
  }, []);

  const PaginationControls = () => (
    <div className="flex justify-center gap-2 items-center">
      <button
        onClick={goToPrevPage}
        disabled={!hasPrevPage}
        className="px-4 py-2 bg-[#D32F2F] text-white rounded-lg font-semibold cursor-pointer transition-colors hover:bg-[#B71C1C] disabled:bg-[#D32F2F]/50 disabled:cursor-not-allowed"
      >
        Précédent
      </button>
      <span className="px-4 py-2 text-[#BDBDBD] font-medium">
        Page {currentPage} - {totalPages}
      </span>
      <button
        onClick={goToNextPage}
        disabled={!hasNextPage}
        className="px-4 py-2 bg-[#D32F2F] text-white rounded-lg font-semibold cursor-pointer transition-colors hover:bg-[#B71C1C] disabled:bg-[#D32F2F]/50 disabled:cursor-not-allowed"
      >
        Suivant
      </button>
    </div>
  );

  const MovieGridSkeleton = () => (
    <div className="grid gap-3 md:gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {Array.from({ length: 20 }).map((_, index) => (
        <div key={index} className="flex flex-col animate-pulse">
          <div className="aspect-[2/3] bg-[#1E1E1E] rounded-lg" />
          <div className="h-4 bg-[#1E1E1E] rounded mt-1 w-20 mx-auto" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-[#121212] min-h-screen text-white font-sans">
      <div className="container mx-auto px-4 py-8">
        <h3 className="text-xl font-semibold text-white">
          Watched: {totalMovies}
        </h3>
        <WatchedMovieFilters
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
          uniqueDecades={facets.decades}
          uniqueYears={facets.years}
          selectedRating={rating}
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
          setSortBy={setSortBy}
        />
      </div>
      {(hasPrevPage || hasNextPage) && (
        <div className="mb-8">
          <PaginationControls />
        </div>
      )}
      {isLoadingMovies ? (
        <MovieGridSkeleton />
      ) : (
        <div className="grid gap-3 md:gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {movies.map((movie) => (
            <div key={movie.movie.id} className="flex flex-col">
              <MovieCard
                showDescription={false}
                showUserAction={false}
                movie={{
                  poster_path: movie.movie.poster,
                  poster: movie.movie.poster,
                  title: movie.movie.title,
                  overview: movie.movie.description,
                  id: movie.movie.id,
                  release_date: movie.movie.release_date,
                  vote_count: movie.movie.vote_count,
                  runtime: movie.movie.runtime,
                }}
              />
              <p className="text-center text-[#BDBDBD] text-sm mt-1">
                Note: {movie.movie.vote_count}/5
              </p>
            </div>
          ))}
        </div>
      )}
      {(hasPrevPage || hasNextPage) && (
        <div className="mt-8">
          <PaginationControls />
        </div>
      )}
    </div>
  );
}
