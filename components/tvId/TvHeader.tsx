import { TVShow } from "@/types/types";
import Image from "next/image";
import React from "react";

interface TVHeaderProps {
  tvDetails: TVShow;
}

export default function TvHeader({ tvDetails }: TVHeaderProps) {
  return (
    <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] 2xl:h-[60vh] w-full">
      <Image
        src={`https://image.tmdb.org/t/p/original${tvDetails.backdrop_path}`}
        alt={tvDetails.name}
        fill
        style={{ objectFit: "cover", opacity: 1 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/70 to-transparent" />
      <div className="absolute bottom-0 left-0 p-8 w-full max-w-4xl">
        <h1 className="text-5xl font-bold mb-3 text-white">{tvDetails.name}</h1>
        {tvDetails.tagline && (
          <h3 className="text-2xl text-[#A1A1A1] italic mb-5">
            {tvDetails.tagline}
          </h3>
        )}
        <div className="flex flex-wrap gap-4">
          <span className="bg-red-500 text-[#121212] px-4 py-2 rounded-full text-sm font-semibold">
            {tvDetails.status}
          </span>
          {tvDetails.adult && (
            <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              Adulte
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
