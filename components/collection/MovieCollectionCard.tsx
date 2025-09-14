import { Movie } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiCalendar, FiStar } from "react-icons/fi";

interface MovieCollectionCardProps {
  movie: Movie;
}

export default function MovieCollectionCard({
  movie,
}: MovieCollectionCardProps) {
  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="bg-[#1c1c1c] p-4 m-4 rounded-lg shadow-md hover:bg-gray-800 transition duration-300 flex">
        {movie.poster_path && (
          <Image
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
            width={100}
            height={150}
            className="rounded-md mr-4"
          />
        )}
        <div>
          <h3 className="text-xl font-semibold text-red-500">{movie.title}</h3>
          <div className="flex items-center text-gray-400 mt-2">
            <FiCalendar className="mr-2" />
            <span>
              {new Date(movie.release_date).toLocaleDateString("fr-FR")}
            </span>
            {movie.vote_average > 0 && (
              <>
                <FiStar className="ml-4 mr-2" />
                <span>{movie.vote_average.toFixed(1)}</span>
              </>
            )}
          </div>
          {movie.overview && (
            <p className="text-gray-300 mt-2 line-clamp-3">{movie.overview}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
