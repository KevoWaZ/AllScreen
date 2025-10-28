"use client";
import Loading from "@/app/loading";
import MovieCard from "@/components/cards/MovieCard";
import { useParams, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useMemo } from "react";
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

interface Person {
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
  const getParamAsArray = (param: string | null) => {
    return param ? param.split(",").map(Number) : [];
  };
  const selectedGenres = searchParams.get("genres") || null;
  const selectedGenresFromURL = useMemo(
    () => getParamAsArray(selectedGenres),
    [selectedGenres]
  );
  const selectedCompanies = searchParams.get("companies") || null;
  const selectedCompaniesFromURL = useMemo(
    () => getParamAsArray(selectedCompanies),
    [selectedCompanies]
  );
  const selectedActors = searchParams.get("actors") || null;
  const selectedActorsFromURL = useMemo(
    () => getParamAsArray(selectedActors),
    [selectedActors]
  );
  const selectedDirectors = searchParams.get("directors") || null;
  const selectedDirectorsFromURL = useMemo(
    () => getParamAsArray(selectedDirectors),
    [selectedDirectors]
  );
  const selectedProducers = searchParams.get("producers") || null;
  const selectedProducersFromURL = useMemo(
    () => getParamAsArray(selectedProducers),
    [selectedProducers]
  );
  const selectedExecProducers = searchParams.get("execProducers") || null;
  const selectedExecProducersFromURL = useMemo(
    () => getParamAsArray(selectedExecProducers),
    [selectedExecProducers]
  );
  const selectedWriters = searchParams.get("writers") || null;
  const selectedWritersFromURL = useMemo(
    () => getParamAsArray(selectedWriters),
    [selectedWriters]
  );
  const selectedComposers = searchParams.get("composers") || null;
  const selectedComposersFromURL = useMemo(
    () => getParamAsArray(selectedComposers),
    [selectedComposers]
  );
  const selectedCinematographers = searchParams.get("cinematographers") || null;
  const selectedCinematographersFromURL = useMemo(
    () => getParamAsArray(selectedCinematographers),
    [selectedCinematographers]
  );
  const selectedRating = rating ? Number.parseFloat(rating) : null;

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

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
    const filters = [
      {
        condition: selectedRating !== null,
        check: (movie: Movie) => {
          const movieRating = movie.movie.vote_count || 0;
          const roundedRating = Math.round(movieRating * 2) / 2;
          return roundedRating === selectedRating;
        },
      },
      {
        condition: selectedDecade !== null,
        check: (movie: Movie) => {
          const year = new Date(movie.movie.release_date).getFullYear();
          if (isNaN(year)) return false;
          const decade = Math.floor(year / 10) * 10;
          return `${decade}s` === selectedDecade;
        },
      },
      {
        condition: selectedYear !== null,
        check: (movie: Movie) => {
          const year = new Date(movie.movie.release_date)
            .getFullYear()
            .toString();
          return year === selectedYear;
        },
      },
      {
        condition: selectedGenresFromURL.length > 0,
        check: (movie: Movie) => {
          const movieGenreIds = movie.movie.genres.map((genre) => genre.id);
          return selectedGenresFromURL.every((id) =>
            movieGenreIds.includes(id)
          );
        },
      },
      {
        condition: selectedCompaniesFromURL.length > 0,
        check: (movie: Movie) => {
          const movieCompanyIds = movie.movie.productionCompanies.map(
            (company) => company.id
          );
          return selectedCompaniesFromURL.every((id) =>
            movieCompanyIds.includes(id)
          );
        },
      },
      {
        condition: selectedActorsFromURL.length > 0,
        check: (movie: Movie) => {
          const movieActorIds = movie.movie.actors.map((actor) => actor.id);
          return selectedActorsFromURL.every((id) =>
            movieActorIds.includes(id)
          );
        },
      },
      {
        condition: selectedDirectorsFromURL.length > 0,
        check: (movie: Movie) => {
          const movieDirectorIds = movie.movie.directors.map(
            (director) => director.id
          );
          return selectedDirectorsFromURL.every((id) =>
            movieDirectorIds.includes(id)
          );
        },
      },
      {
        condition: selectedProducersFromURL.length > 0,
        check: (movie: Movie) => {
          const movieProducerIds = movie.movie.producers.map(
            (producer) => producer.id
          );
          return selectedProducersFromURL.every((id) =>
            movieProducerIds.includes(id)
          );
        },
      },
      {
        condition: selectedExecProducersFromURL.length > 0,
        check: (movie: Movie) => {
          const movieExecProducerIds = movie.movie.execProducers.map(
            (execProducer) => execProducer.id
          );
          return selectedExecProducersFromURL.every((id) =>
            movieExecProducerIds.includes(id)
          );
        },
      },
      {
        condition: selectedWritersFromURL.length > 0,
        check: (movie: Movie) => {
          const movieWritersIds = movie.movie.writers.map(
            (writer) => writer.id
          );
          return selectedWritersFromURL.every((id) =>
            movieWritersIds.includes(id)
          );
        },
      },
      {
        condition: selectedComposersFromURL.length > 0,
        check: (movie: Movie) => {
          const movieComposersIds = movie.movie.composers.map(
            (composer) => composer.id
          );
          return selectedComposersFromURL.every((id) =>
            movieComposersIds.includes(id)
          );
        },
      },
      {
        condition: selectedCinematographersFromURL.length > 0,
        check: (movie: Movie) => {
          const movieCinematographersIds = movie.movie.cinematographers.map(
            (cinematographer) => cinematographer.id
          );
          return selectedCinematographersFromURL.every((id) =>
            movieCinematographersIds.includes(id)
          );
        },
      },
    ];

    return movies.filter((movie) => {
      return filters.every(
        (filter) => !filter.condition || filter.check(movie)
      );
    });
  }, [
    movies,
    selectedRating,
    selectedDecade,
    selectedYear,
    selectedGenresFromURL,
    selectedCompaniesFromURL,
    selectedActorsFromURL,
    selectedDirectorsFromURL,
    selectedProducersFromURL,
    selectedExecProducersFromURL,
    selectedWritersFromURL,
    selectedComposersFromURL,
    selectedCinematographersFromURL,
  ]);

  const {
    availableGenres,
    availableCompanies,
    availableActors,
    availableDirectors,
    availableProducers,
    availableExecProducers,
    availableWriters,
    availableComposers,
    availableCinematographers,
  } = useMemo(() => {
    const genresMap = new Map();
    const companiesMap = new Map();
    const actorsMap = new Map();
    const directorsMap = new Map();
    const producersMap = new Map();
    const execProducersMap = new Map();
    const writersMap = new Map();
    const composersMap = new Map();
    const cinematographersMap = new Map();

    filteredMovies.forEach((movie) => {
      movie.movie.genres.forEach((genre) => genresMap.set(genre.id, genre));
      movie.movie.productionCompanies.forEach((company) =>
        companiesMap.set(company.id, company)
      );
      movie.movie.actors.forEach((actor) => actorsMap.set(actor.id, actor));
      movie.movie.directors.forEach((director) =>
        directorsMap.set(director.id, director)
      );
      movie.movie.producers.forEach((producer) =>
        producersMap.set(producer.id, producer)
      );
      movie.movie.execProducers.forEach((execProducer) =>
        execProducersMap.set(execProducer.id, execProducer)
      );
      movie.movie.writers.forEach((writer) =>
        writersMap.set(writer.id, writer)
      );
      movie.movie.composers.forEach((composer) =>
        composersMap.set(composer.id, composer)
      );
      movie.movie.cinematographers.forEach((cinematographer) =>
        cinematographersMap.set(cinematographer.id, cinematographer)
      );
    });

    return {
      availableGenres: Array.from(genresMap.values()),
      availableCompanies: Array.from(companiesMap.values()),
      availableActors: Array.from(actorsMap.values()),
      availableDirectors: Array.from(directorsMap.values()),
      availableProducers: Array.from(producersMap.values()),
      availableExecProducers: Array.from(execProducersMap.values()),
      availableWriters: Array.from(writersMap.values()),
      availableComposers: Array.from(composersMap.values()),
      availableCinematographers: Array.from(cinematographersMap.values()),
    };
  }, [filteredMovies]);

  const { uniqueDecades, uniqueYears } = useMemo(() => {
    const decades = new Set<string>();
    const years = new Set<string>();

    movies.forEach((movie) => {
      const date = new Date(movie.movie.release_date);
      const year = date.getFullYear();
      const decade = Math.floor(year / 10) * 10;

      if (!isNaN(year)) {
        years.add(year.toString());
        decades.add(`${decade}s`);
      }
    });

    return {
      uniqueDecades: Array.from(decades).sort(
        (a, b) => parseInt(b) - parseInt(a)
      ),
      uniqueYears: Array.from(years).sort((a, b) => parseInt(b) - parseInt(a)),
    };
  }, [movies]);

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
          availableActors={availableActors}
          availableDirectors={availableDirectors}
          availableProducers={availableProducers}
          availableExecProducers={availableExecProducers}
          availableWriters={availableWriters}
          availableComposers={availableComposers}
          availableCinematographers={availableCinematographers}
          uniqueDecades={uniqueDecades}
          uniqueYears={uniqueYears}
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
