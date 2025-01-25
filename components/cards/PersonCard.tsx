import { Person } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { FaInfoCircle } from "react-icons/fa";

export function PersonCard({
  person,
  showBio,
}: {
  person: Person;
  showBio: boolean;
}) {
  return (
    <div className="relative group overflow-hidden rounded-lg shadow-lg">
      {person.profile_path ? (
        <Image
          src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
          alt={person.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          width={358}
          height={537}
          quality={100}
        />
      ) : (
        <div className="w-full h-64 bg-gray-800 flex items-center justify-center text-gray-500">
          Pas d&apos;image disponible
        </div>
      )}
      <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h2 className="text-white text-xl font-bold mb-2 text-center px-4">
          {person.name}
        </h2>
        <p className="text-orange-500 dark:text-orange-400 font-semibold mb-4">{person.known_for_department}</p>
        {showBio && (
          <p className="text-white text-sm mb-4 px-4 text-center line-clamp-6">
            {person.biography || "Aucune biographie disponible"}
          </p>
        )}
        <div className="w-full mb-2">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {person.known_for.map((show) => (
              <Link
                key={show.id}
                href={`/${show.media_type}/${show.id}`}
                className="inline-block bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-full px-3 py-1 transition-colors duration-200"
              >
                {show.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex space-x-4">
          <Link
            href={`/person/${person.id}`}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          >
            <FaInfoCircle />
          </Link>
        </div>
      </div>
    </div>
  );
}
