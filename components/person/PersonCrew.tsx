import { Credit } from "@/app/person/[id]/page";
import { formatDate } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PersonCrewProps {
  crew: Credit;
}

export default function PersonCrew({ crew }: PersonCrewProps) {
  return (
    <div
      key={crew.credit_id}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
    >
      <Link href={`/${crew.media_type}/${crew.id}`}>
        <Image
          src={
            crew.poster_path
              ? `https://image.tmdb.org/t/p/w500${crew.poster_path}`
              : "/placeholder.svg"
          }
          alt={crew.title || crew.name || "Affiche non disponible"}
          width={500}
          height={750}
          className="w-full h-64 object-cover"
        />
      </Link>
      <div className="p-4">
        <h4 className="text-lg font-semibold mb-2">
          {crew.title || crew.name}
        </h4>
        <p className="text-sm text-gray-400 mb-2">Poste: {crew.job}</p>
        <p className="text-sm text-gray-400">
          {formatDate(crew.release_date || crew.first_air_date || "")}
        </p>
      </div>
    </div>
  );
}
