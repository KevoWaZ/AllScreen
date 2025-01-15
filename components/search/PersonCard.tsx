import { Person } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

export function PersonCard({ person }: { person: Person }) {
  return (
    <div className="bg-[#1c1c1c] rounded-lg overflow-hidden shadow-lg transition-transform duration-200 hover:scale-105">
      <Link href={`/person/${person.id}`}>
        {person.profile_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
            alt={person.name}
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
          <h2 className="text-xl font-semibold mb-2 text-red-500">
            {person.name}
          </h2>
          <p className="text-sm text-[#A1A1A1] mb-2">
            {person.known_for_department}
          </p>
        </div>
      </Link>
    </div>
  );
}
