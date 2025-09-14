"use client";
import Link from "next/link";
import { FiHeart, FiBookmark, FiBarChart2 } from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import FavoriteMovieCard from "../cards/FavoriteMovieCard";
import { useRouter } from "next/navigation";
import MovieCard from "../cards/MovieCard";

interface Movie {
  id: number;
  title: string;
  poster: string;
  release_date: string;
  description: string;
  movieId: number;
}

interface ProfileContentProps {
  favoriteFilms: Movie[];
  watchLists: Movie[];
  watchlistsCount: number;
  ratings: {
    _count: {
      rating: number;
    };
    rating: number;
  }[];
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    color: string;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#2C2C2C] border border-[#4A4A4A] rounded-lg p-2 shadow-lg">
        <p className="text-[#BDBDBD] text-sm">
          Note: <span className="text-white font-semibold">{label} ⭐</span>
        </p>
        <p className="text-[#BDBDBD] text-sm">
          Films:{" "}
          <span className="text-[#D32F2F] font-semibold">
            {payload[0].value}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export function ProfileContent({
  favoriteFilms,
  watchlistsCount,
  watchLists,
  ratings,
}: ProfileContentProps) {
  const router = useRouter();

  const chartData = Array.from({ length: 10 }, (_, index) => {
    const rating = (index + 1) * 0.5;
    const ratingItem = ratings.find((r) => r.rating === rating);
    const count = ratingItem?._count.rating || 0;

    return {
      rating: rating.toString(),
      films: count,
    };
  });

  const totalRatings = ratings.reduce(
    (sum, item) => sum + item._count.rating,
    0
  );

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
            favoriteFilms.map((movie) => (
              <MovieCard
                key={movie.id}
                showDescription
                showUserAction={false}
                movie={{
                  poster_path: movie.poster,
                  title: movie.title,
                  overview: movie.description,
                  id: movie.id,
                  release_date: new Date(movie.release_date).toISOString(),
                }}
              />
            ))
          ) : (
            <p>Ajoutez des favoris!</p>
          )}
        </div>
      </div>

      {/* Watchlists et Ratings - 1/3 de la largeur */}
      <div className="lg:col-span-1 space-y-8">
        {/* Watchlists */}
        <div>
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
                  key={film.id}
                  onClick={() => router.push(`/movie/${film.id}`)}
                  className="cursor-pointer"
                >
                  <FavoriteMovieCard
                    id={film.id}
                    poster_path={film.poster || ""}
                    title={film.title}
                    overview={film.description}
                    showDescription={false}
                  />
                </button>
              ))}
          </div>

          <div className="mt-4">
            <Link
              prefetch={true}
              href="/watchlists"
              className="text-[#D32F2F] hover:text-[#FF5252] text-sm font-medium transition-colors"
            >
              Voir toutes les watchlists →
            </Link>
          </div>
        </div>

        {/* Graphique des ratings */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FiBarChart2 className="text-[#D32F2F] w-5 h-5" />
            <h2 className="text-xl font-semibold text-white">Mes notes</h2>
          </div>

          <div className="bg-[#2C2C2C] rounded-lg p-4">
            <ResponsiveContainer width="100%" height={120}>
              <BarChart
                data={chartData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <XAxis
                  dataKey="rating"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#BDBDBD", fontSize: 12 }}
                />
                <YAxis hide />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "rgba(211, 47, 47, 0.1)" }}
                />
                <Bar
                  dataKey="films"
                  fill="#D32F2F"
                  radius={[2, 2, 0, 0]}
                  className="hover:opacity-80 transition-opacity"
                />
              </BarChart>
            </ResponsiveContainer>

            {totalRatings > 0 && (
              <div className="pt-2 border-t border-[#4A4A4A] mt-2">
                <p className="text-xs text-[#BDBDBD] text-center">
                  Total: {totalRatings} films notés
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
