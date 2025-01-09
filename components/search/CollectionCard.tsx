import { Collection } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

export function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <div className="bg-[#1c1c1c] rounded-lg overflow-hidden shadow-lg transition-transform duration-200 hover:scale-105">
      <Link className="flex md:block" href={`/collection/${collection.id}`}>
      <div className="w-1/4 md:w-full">
        {collection.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${collection.poster_path}`}
            alt={collection.name}
            className="w-full object-cover"
            width={358}
            height={537}
            quality={100}
          />
        ) : (
          <div className="w-1/3 md:w-full h-48 md:h-64 bg-[#2c2c2c] flex items-center justify-center text-[#A1A1A1]">
            Pas d&apos;image disponible
          </div>
        )}
        </div>
        <div className="p-2 md:p-4 w-2/3 md:w-full">
          <h2 className="text-sm md:text-xl font-semibold md:mb-2 text-[#F5A623]">
            {collection.name}
          </h2>
          <p className="text-sm text-[#A1A1A1] md:mt-2 line-clamp-2 md:line-clamp-4">
            {collection.overview || "Aucune description disponible"}
          </p>
        </div>
      </Link>
    </div>
  );
}

