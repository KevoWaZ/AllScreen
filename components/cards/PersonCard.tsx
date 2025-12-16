import Image from "next/image";
import Link from "../utils/Link";

interface PersonCardProps {
  href: string;
  person: {
    profile_path?: string | null;
    poster_path?: string | null;
    name?: string;
    title?: string;
    id?: number;
  };
  children: React.ReactNode;
}

export function PersonCard({ href, person, children }: PersonCardProps) {
  const altText = person.name || person.title || "Image description";

  return (
    <Link href={href} scroll>
      <article
        tabIndex={0}
        className="relative group overflow-hidden rounded-lg shadow-2xl"
      >
        {person.profile_path || person.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${
              person.profile_path || person.poster_path
            }`}
            alt={altText}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 group-focus-within:scale-110"
            width={358}
            height={537}
            quality={100}
          />
        ) : (
          <div className="w-full h-64 bg-gray-800 flex items-center justify-center text-center text-gray-200">
            {person.title || person.name}
          </div>
        )}
        <div className="absolute inset-0 bg-black/75 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300">
          {children}
        </div>
      </article>
    </Link>
  );
}
