import { Movie } from "@/types/types";
import Image from "next/image";
import React from "react";

interface MovieHeaderProps {
  movieDetails: Movie;
}

export default function MovieHeader({ movieDetails }: MovieHeaderProps) {
  return (
    <div className="relative h-[70vh] w-full">
      <Image
        src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
        alt={movieDetails.title}
        fill
        style={{ objectFit: "cover", opacity: 0.4 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/70 to-transparent" />
      <div className="absolute bottom-0 left-0 p-8 w-full max-w-4xl">
        <h1 className="text-5xl font-bold mb-3 text-white">
          {movieDetails.title}
        </h1>
        {movieDetails.tagline && (
          <p className="text-2xl text-[#A1A1A1] italic mb-5">
            {movieDetails.tagline}
          </p>
        )}
        <div className="flex flex-wrap gap-4">
          <span className="bg-red-500 text-[#121212] px-4 py-2 rounded-full text-sm font-semibold">
            {movieDetails.status}
          </span>
          {movieDetails.adult && (
            <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              Adulte
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
