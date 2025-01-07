import { Movie } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

export function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div className="bg-[#1c1c1c] rounded-lg overflow-hidden shadow-lg transition-transform duration-200 hover:scale-105">
      <Link href={`/movie/${movie.id}`}>
        {movie.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-64 object-cover"
            width={256}
            height={128}
          />
        ) : (
          <div className="w-full h-64 bg-[#2c2c2c] flex items-center justify-center text-[#A1A1A1]">
            Pas d&apos;affiche disponible
          </div>
        )}
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2 text-[#F5A623]">
            {movie.title}
          </h2>
          <p className="text-sm text-[#A1A1A1] mb-2">
            {new Date(movie.release_date).toLocaleDateString("fr-FR")}
          </p>
          <p className="text-sm text-[#F5A623] flex items-center">
            <FaStar className="mr-1" />
            Popularité: {movie.popularity.toFixed(2)}
          </p>
          <p className="text-sm text-[#A1A1A1] mt-2 line-clamp-3">
            {movie.overview || "Aucune description disponible"}
          </p>
        </div>
      </Link>
    </div>
  );
}

