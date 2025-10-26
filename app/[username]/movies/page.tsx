"use client";
import Loading from "@/app/loading";
import MovieCard from "@/components/cards/MovieCard";
import { useParams, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useMemo } from "react";
import { FaStar } from "react-icons/fa";
import WatchedMovieFilters from "@/components/watched/movie/page";

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
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams<{ username: string }>();

  const searchParams = useSearchParams();
  const rating = searchParams.get("rating");
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
  const selectedRating = rating ? Number.parseFloat(rating) : null;

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

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
      const allGenres = data.watched.flatMap(
        (watched: Movie) => watched.movie.genres
      );
      // Utiliser un Set pour éliminer les doublons (basé sur l'id)
      const uniqueGenres = Array.from(
        new Map(allGenres.map((genre: Genre) => [genre.id, genre])).values()
      ) as Genre[];
      setGenres(uniqueGenres);
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
    selectedRating,
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
          Watched: {filteredMovies.length}
        </h3>
        <WatchedMovieFilters
          movies={movies}
          filteredMovies={filteredMovies}
          availableGenres={availableGenres}
          availableCompanies={availableCompanies}
          uniqueDecades={uniqueDecades}
          uniqueYears={uniqueYears}
          selectedRating={rating}
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
      {filteredMovies.length > 20 && (
        <div className="mt-8">
          <PaginationControls />
        </div>
      )}
    </div>
  );
}
