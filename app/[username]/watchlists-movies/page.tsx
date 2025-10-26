"use client";
import Loading from "@/app/loading";
import MovieCard from "@/components/cards/MovieCard";
import { useParams, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import WatchlistsMovieFilters from "@/components/watchlists/movie/page";

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

interface WatchlistItem {
  movie: Movie;
}

export default function Page() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams<{ username: string }>();
  const searchParams = useSearchParams();
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

  // Logique de filtrage centralisée ici
  const filteredMovies = useMemo(() => {
    let result = [...movies];
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

  // Calcul des données pour les filtres
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

  const uniqueDecades = useMemo(() => {
    const decades = new Set<string>();
    movies.forEach((movie) => {
      const year = new Date(movie.movie.release_date).getFullYear();
      const decade = Math.floor(year / 10) * 10;
      decades.add(`${decade}s`);
    });
    return Array.from(decades).sort((a, b) => parseInt(b) - parseInt(a));
  }, [movies]);

  const uniqueYears = useMemo(() => {
    const years = new Set<string>();
    movies.forEach((movie) => {
      const year = new Date(movie.movie.release_date).getFullYear().toString();
      years.add(year);
    });
    return Array.from(years).sort((a, b) => parseInt(b) - parseInt(a));
  }, [movies]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredMovies.length / itemsPerPage)
  );

  useEffect(() => {
    getWatchlists();
  }, [getWatchlists]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDecade, selectedYear, selectedGenres, selectedCompanies]);

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
        <h3 className="text-xl font-semibold text-white">
          Watchlists: {filteredMovies.length}
        </h3>
        <WatchlistsMovieFilters
          movies={movies}
          filteredMovies={filteredMovies}
          availableGenres={availableGenres}
          availableCompanies={availableCompanies}
          uniqueDecades={uniqueDecades}
          uniqueYears={uniqueYears}
          selectedDecade={selectedDecade}
          selectedYear={selectedYear}
          selectedGenresFromURL={selectedGenresFromURL}
          selectedCompaniesFromURL={selectedCompaniesFromURL}
        />
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
  );
}
