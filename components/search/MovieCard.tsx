import { Movie } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

export function MovieCard({
  movie,
  block = false,
}: {
  movie: Movie;
  block: boolean;
}) {
  return (
    <div className="bg-[#1c1c1c] rounded-lg overflow-hidden shadow-lg transition-transform duration-200 hover:scale-105">
      <Link
        className={block ? "block" : "flex md:block"}
        href={`/movie/${movie.id}`}
      >
        <div className={block ? "w-full" : "w-1/4 md:w-full"}>
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full object-cover"
              width={358}
              height={537}
              quality={100}
            />
          ) : (
            <div className="w-1/3 md:w-full h-48 md:h-64 bg-[#2c2c2c] flex items-center justify-center text-[#A1A1A1]">
              Pas d&apos;affiche disponible
            </div>
          )}
        </div>
        <div className="p-2 md:p-4 w-2/3 md:w-full">
          <h2 className="text-sm md:text-xl font-semibold md:mb-2 text-[#F5A623]">
            {movie.title}
          </h2>
          <p className="text-sm text-[#A1A1A1] md:mb-2">
            {new Date(movie.release_date).toLocaleDateString("fr-FR")}
          </p>
          <p className="text-sm text-[#F5A623] flex items-center">
            <FaStar className="mr-1" />
            Popularité: {movie.popularity.toFixed(2)}
          </p>
          <p className="text-sm text-[#A1A1A1] md:mt-2 line-clamp-2 md:line-clamp-4">
            {movie.overview || "Aucune description disponible"}
          </p>
        </div>
      </Link>
    </div>
  );
}
