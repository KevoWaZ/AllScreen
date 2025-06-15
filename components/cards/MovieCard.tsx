"use client";

import Link from "next/link";

type MovieCardProps = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  overview: string;
  watched?: boolean;
  watchlist?: boolean;
  vote_average?: number;
  vote_count?: number;
};

const MovieCard = ({
  movie,
  showDescription,
  textSelect = true,
  showUserAction = true,
}: {
  movie: MovieCardProps;
  showDescription: boolean;
  textSelect?: boolean;
  showUserAction?: boolean;
}) => {
  console.log({ showDescription, textSelect, showUserAction });

  return (
    <div>
      <Link href={`/movie/${movie.id}`}>{movie.title}</Link>
    </div>
  );
};

export default MovieCard;
