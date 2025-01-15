import { Collection as CollectionType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaChevronRight } from "react-icons/fa";

interface CollectionProps {
  collection: CollectionType;
}

export default function Collection({ collection }: CollectionProps) {
  return (
    <section className="mb-12 bg-gray-800 rounded-lg overflow-hidden shadow-lg mx-auto max-w-7xl">
      <div className="relative">
        <Image
          width={1440}
          height={320}
          alt={collection.name}
          src={`https://media.themoviedb.org/t/p/w1440_and_h320_multi_faces${collection.backdrop_path}`}
          className="w-full h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent flex flex-col justify-end p-8">
          <h3 className="text-4xl font-bold text-white mb-6">
            Fait partie de la collection : {collection.name}
          </h3>
          <div className="space-y-6">
            <p className="text-gray-300 text-xl">Cette collection comprend :</p>
            <div className="flex flex-wrap gap-3 mb-6">
              {collection.parts.map((movie) => (
                <Link
                  key={movie.id}
                  href={`/movie/${movie.id}`}
                  className="bg-gray-700 text-white text-sm px-4 py-2 rounded-full hover:bg-gray-600 transition-colors"
                >
                  {movie.title}
                </Link>
              ))}
            </div>
            <Link
              href={`/collection/${collection.id}`}
              className="inline-flex items-center bg-orange-500 text-white px-8 py-4 rounded-full hover:bg-orange-400 transition-colors text-xl font-semibold"
            >
              Afficher la collection
              <FaChevronRight className="ml-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
