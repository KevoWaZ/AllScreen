import { Person } from "@/types/types";
import Link from "next/link";
import React from "react";
import { FaInfoCircle } from "react-icons/fa";

export default function PersonMovieCast({ casting }: { casting: Person }) {
  return (
    <div className="ybg-opacity-75 p-4 rounded-lg">
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
  );
}
