import { Collection } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

export function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <div className="bg-[#1c1c1c] rounded-lg overflow-hidden shadow-lg transition-transform duration-200 hover:scale-105">
      <Link href={`/collection/${collection.id}`}>
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
          <div className="w-full h-64 bg-[#2c2c2c] flex items-center justify-center text-[#A1A1A1]">
            Pas d&apos;image disponible
          </div>
        )}
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2 text-[#F5A623]">
            {collection.name}
          </h2>
          <p className="text-sm text-[#A1A1A1] mt-2 line-clamp-3">
            {collection.overview || "Aucune description disponible"}
          </p>
        </div>
      </Link>
    </div>
  );
}

