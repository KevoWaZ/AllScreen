import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import { Casting } from "./LeftMovieDetails";

export default function MovieCastCard({ casting }: { casting: Casting }) {
  return (
    <div className="relative group overflow-hidden rounded-lg shadow-lg">
      {casting.profile_path ? (
        <Image
          src={`https://image.tmdb.org/t/p/w500${casting.profile_path}`}
          alt={casting.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          width={358}
          height={537}
          quality={100}
          loading="lazy"
        />
      ) : (
        <div className="w-full h-64  bg-gray-700 flex items-center justify-center  text-gray-400">
          Pas d&apos;image disponible
        </div>
      )}
      <div className="absolute inset-0 bg-black/75  flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="p-4 rounded-lg">
          <h2 className="text-white text-xl font-bold mb-2 text-center px-4">
            {casting.name}
          </h2>
          <div className="text-left mb-2">
            <p className="text-sm text-gray-200">Rôle : {casting.character}</p>
          </div>
          <div className="flex justify-center">
            <Link
              prefetch={false}
              href={`/person/${casting.id}`}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
              aria-label={`Plus d'informations sur ${casting.name}`}
            >
              <FaInfoCircle className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
