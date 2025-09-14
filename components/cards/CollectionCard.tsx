import { Collection } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { FaInfoCircle } from "react-icons/fa";

export function CollectionCard({
  collection,
  showDescription,
}: {
  collection: Collection;
  showDescription: boolean;
}) {
  return (
    <article
      tabIndex={0}
      className="relative group overflow-hidden rounded-lg shadow-lg"
    >
      {collection.poster_path ? (
        <Image
          src={`https://image.tmdb.org/t/p/w500${collection.poster_path}`}
          alt={collection.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 group-focus-within:scale-110"
          width={358}
          height={537}
          quality={100}
        />
      ) : (
        <div className="w-full h-64 bg-gray-800 flex items-center justify-center text-gray-500">
          {collection.name}
        </div>
      )}
      <div className="absolute inset-0 bg-black/75 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300">
        <h2 className="text-white text-md md:text-xl 3xl:text-4xl font-bold mb-2 text-center px-4">
          {collection.name}
        </h2>
        {showDescription && (
          <p className="text-white text-sm 3xl:text-xl mb-4 px-4 text-center line-clamp-6">
            {collection.overview || "Aucune description disponible"}
          </p>
        )}
        <div className="flex space-x-4">
          <Link
            // prefetch={false}
            href={`/collection/${collection.id}`}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            aria-label="Collection page link"
          >
            <FaInfoCircle aria-label="Collection page link" />
          </Link>
        </div>
      </div>
    </article>
  );
}
