"use client";
import Link from "next/link";
import { FiHeart, FiBookmark } from "react-icons/fi";

import FavoriteMovieCard from "../cards/FavoriteMovieCard";
import { useRouter } from "next/navigation";

interface Movie {
  id: number;
  title: string;
  poster: string;
  year: number;
  description: string;
  movieId: number;
}

interface ProfileContentProps {
  favoriteFilms: Movie[];
  watchLists: Movie[];
  watchlistsCount: number;
}

export function ProfileContent({
  favoriteFilms,
  watchlistsCount,
  watchLists,
}: ProfileContentProps) {
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Films favoris - 2/3 de la largeur */}
      <div className="lg:col-span-2">
        <div className="flex items-center gap-2 mb-4">
          <FiHeart className="text-[#D32F2F] w-5 h-5" />
          <h2 className="text-xl font-semibold text-white">Films favoris</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {favoriteFilms ? (
            favoriteFilms.map((film) => (
              <FavoriteMovieCard
                key={film.movieId}
                id={film.movieId}
                poster_path={film.poster || ""}
                title={film.title}
                overview={film.description}
                showDescription
              />
            ))
          ) : (
            <p>Ajoutez des favoris!</p>
          )}
        </div>
      </div>

      {/* Watchlists - 1/3 de la largeur */}
      <div className="lg:col-span-1">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FiBookmark className="text-[#D32F2F] w-5 h-5" />
            <h2 className="text-xl font-semibold text-white">Watchlists</h2>
          </div>
          <span className="text-2xl font-bold text-white">
            {watchlistsCount}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {watchLists &&
            watchLists.map((film) => (
              <button
                key={film.movieId}
                onClick={() => router.push(`/movie/${film.movieId}`)}
                className="cursor-pointer"
              >
                <FavoriteMovieCard
                  id={film.movieId}
                  poster_path={film.poster || ""}
                  title={film.title}
                  overview={film.description}
                  showDescription={false}
                />
              </button>
            ))}
        </div>

        {/* Lien vers toutes les watchlists */}
        <div className="mt-4">
          <Link
            href="/watchlists"
            className="text-[#D32F2F] hover:text-[#FF5252] text-sm font-medium transition-colors"
          >
            Voir toutes les watchlists →
          </Link>
        </div>
      </div>
    </div>
  );
}
