import { Credit } from "@/app/person/[id]/page";
import Image from "next/image";
import Link from "@/components/utils/Link";
import React from "react";
import { FaInfoCircle } from "react-icons/fa";

export default function PersonCast({
  cast,
  showDescription,
}: {
  cast: Credit;
  showDescription: boolean;
}) {
  return (
    <div className="relative group overflow-hidden rounded-lg shadow-lg">
      {cast.poster_path ? (
        <Image
          src={
            cast.poster_path
              ? `https://image.tmdb.org/t/p/w500${cast.poster_path}`
              : "/placeholder.svg"
          }
          alt={cast.title || cast.name || "Affiche non disponible"}
          width={358}
          height={537}
          quality={100}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      ) : (
        <div className="w-full h-64 bg-gray-800 flex items-center justify-center text-gray-500">
          Pas d&apos;affiche disponible
        </div>
      )}
      <div className="absolute inset-0 bg-black/75 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h2 className="text-white text-md md:text-xl font-bold mb-2 text-center px-4">
          {cast.title || cast.name}
        </h2>
        <h3 className="text-white text-md font-bold text-center px-4">
          Role: {cast.character}
        </h3>
        <p className="text-gray-300 text-sm mb-2">
          {new Date(
            cast.release_date || cast.first_air_date
          ).toLocaleDateString("fr-FR")}
        </p>
        {showDescription && (
          <p className="text-white text-sm mb-4 px-4 text-center line-clamp-4 md:line-clamp-6">
            {cast.overview || "Aucune description disponible"}
          </p>
        )}
        <div className="flex space-x-4">
          <Link
            href={`/${cast.media_type}/${cast.id}`}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          >
            <FaInfoCircle />
          </Link>
        </div>
      </div>
    </div>
  );
}
