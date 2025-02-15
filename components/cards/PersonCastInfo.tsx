import { Credit } from "@/app/person/[id]/page";
import Link from "next/link";
import React from "react";
import { FaInfoCircle } from "react-icons/fa";

interface PersonCastInfoProps {
  cast: Credit;
  showDescription: boolean;
}

export function PersonCastInfo({ cast, showDescription }: PersonCastInfoProps) {
  return (
    <>
      <h2 className="text-white text-md md:text-xl font-bold mb-2 text-center px-4">
        {cast.title || cast.name}
      </h2>
      <h3 className="text-white text-md font-bold text-center px-4">
        Role: {cast.character}
      </h3>
      <p className="text-gray-300 text-sm mb-2">
        {new Date(cast.release_date || cast.first_air_date).toLocaleDateString(
          "fr-FR"
        )}
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
    </>
  );
}
