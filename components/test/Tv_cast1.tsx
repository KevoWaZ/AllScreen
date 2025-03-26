import { Person } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Tv_cast1({ casting }: { casting: Person }) {
  return (
    <div className="bg-gray-700 rounded-lg overflow-hidden">
      {casting.profile_path ? (
        <Link prefetch={false} href={`/person/${casting.id}`}>
          <Image
            src={`https://image.tmdb.org/t/p/w185${casting.profile_path}`}
            alt={casting.original_name}
            width={185}
            height={278}
            className="w-full h-auto object-cover"
          />
        </Link>
      ) : (
        <Link
          prefetch={false}
          href={`/person/${casting.id}`}
          className="w-full h-0 pb-[150%] bg-gray-600 flex items-center justify-center"
        >
          <FaUserCircle className="text-gray-500 text-4xl" />
        </Link>
      )}
      <div className="p-2">
        <p className="text-white text-sm font-semibold truncate">
          {casting.name}
        </p>
        <p className="text-gray-400 text-xs truncate">
          {casting.roles[0].character}
        </p>
        <p className="text-gray-400 text-xs truncate">
          {casting.roles[0].episode_count} épisodes
        </p>
      </div>
    </div>
  );
}
