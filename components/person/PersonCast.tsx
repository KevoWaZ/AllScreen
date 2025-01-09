import { Credit } from "@/app/person/[id]/page";
import { formatDate } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PersonCastProps {
  cast: Credit;
}

export default function PersonCast({ cast }: PersonCastProps) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <Link href={`/${cast.media_type}/${cast.id}`}>
        <Image
          src={
            cast.poster_path
              ? `https://image.tmdb.org/t/p/w500${cast.poster_path}`
              : "/placeholder.svg"
          }
          alt={cast.title || cast.name || "Affiche non disponible"}
          width={500}
          height={750}
          className="w-full h-64 object-cover"
        />
      </Link>
      <div className="p-4">
        <h4 className="text-lg font-semibold mb-2">
          {cast.title || cast.name}
        </h4>
        <p className="text-sm text-gray-400 mb-2">Rôle: {cast.character}</p>
        <p className="text-sm text-gray-400">
          {formatDate(cast.release_date || cast.first_air_date || "")}
        </p>
      </div>
    </div>
  );
}
