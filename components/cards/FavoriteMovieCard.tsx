"use client";
import * as Tooltip from "@radix-ui/react-tooltip";
import Image from "next/image";
import Link from "next/link";
import { FaInfoCircle } from "react-icons/fa";

const FavoriteMovieCard = ({
  showDescription,
  textSelect = true,
  id,
  poster_path,
  title,
  overview,
}: {
  showDescription: boolean;
  textSelect?: boolean;
  id: number;
  poster_path: string;
  title: string;
  overview?: string;
}) => {
  return (
    <article
      tabIndex={0}
      className="relative group overflow-hidden rounded-lg shadow-lg"
    >
      {poster_path ? (
        <Image
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 group-focus-within:scale-110"
          width={358}
          height={537}
          quality={100}
        />
      ) : (
        <div className="w-full h-64 bg-gray-800 flex items-center justify-center text-gray-200">
          {title}
        </div>
      )}
      <div className="absolute inset-0 bg-black/75 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300">
        <h2
          className={`text-white text-md md:text-xl 3xl:text-4xl font-bold mb-2 text-center px-4 ${
            textSelect ? "" : "select-none"
          }`}
        >
          {title}
        </h2>
        {showDescription && (
          <p
            className={`text-white text-sm 3xl:text-xl mb-4 px-4 text-center line-clamp-4 md:line-clamp-6 ${
              textSelect ? "" : "select-none"
            }`}
          >
            {overview || "Aucune description disponible"}
          </p>
        )}
        <div className="flex space-x-4">
          <Tooltip.TooltipProvider delayDuration={300}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <Link
                  // prefetch={false}
                  href={`/movie/${id}`}
                  className="p-2 bg-[#D32F2F] text-white rounded-full  hover:bg-[#FF5252] transition-colors"
                  aria-label="Link to movie"
                >
                  <FaInfoCircle aria-label="Link to movie" />
                </Link>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  className=" bg-[#2C2C2C] text-white px-3 py-1 rounded-md text-sm"
                  sideOffset={5}
                >
                  Voir les détails
                  <Tooltip.Arrow className=" fill-[#2C2C2C]" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.TooltipProvider>
        </div>
      </div>
    </article>
  );
};

export default FavoriteMovieCard;
