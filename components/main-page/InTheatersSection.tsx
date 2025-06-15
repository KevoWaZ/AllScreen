"use client";

import type { Movie } from "@/types/types";
import { FaInfoCircle, FaTheaterMasks } from "react-icons/fa";
import * as Tooltip from "@radix-ui/react-tooltip";
import { motion } from "framer-motion";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

export default function InTheatersSection({ movies }: { movies: Movie[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
    dragFree: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <h2 className="text-3xl font-bold  text-white mb-6 flex items-center">
        <FaTheaterMasks
          className="mr-3 text-red-600"
          aria-label="In theater icon"
        />{" "}
        Au Cinéma
      </h2>
      <div className=" bg-gray-800 p-3 md:p-6 rounded-lg shadow-lg relative">
        <div className="embla overflow-hidden cursor-grab" ref={emblaRef}>
          <div className="embla__container flex">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="embla__slide flex-none my-auto w-64 mr-6"
              >
                <article
                  tabIndex={0}
                  className="relative group overflow-hidden rounded-lg shadow-lg"
                >
                  {movie.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 group-focus-within:scale-110"
                      width={358}
                      height={537}
                      quality={100}
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-800 flex items-center justify-center text-gray-200">
                      {movie.title}
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/75 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300">
                    <h2
                      className={`text-white text-md md:text-xl 3xl:text-4xl font-bold mb-2 text-center px-4 `}
                    >
                      {movie.title}
                    </h2>
                    {movie.vote_count && (
                      <p className={`text-gray-300 text-md 3xl:text-xl mb-2 `}>
                        {movie.vote_count}
                      </p>
                    )}
                    {movie.vote_average && movie.vote_count && (
                      <p className={`text-gray-300 text-sm 3xl:text-xl mb-2 `}>
                        {movie.vote_average} ({movie.vote_count})
                      </p>
                    )}
                    <p className={`text-gray-300 text-sm 3xl:text-xl mb-2 `}>
                      {new Date(movie.release_date).toLocaleDateString("fr-FR")}
                    </p>
                    <p
                      className={`text-white text-sm 3xl:text-xl mb-4 px-4 text-center line-clamp-4 md:line-clamp-6 `}
                    >
                      {movie.overview || "Aucune description disponible"}
                    </p>
                    <div className="flex space-x-4">
                      <Tooltip.TooltipProvider delayDuration={300}>
                        <Tooltip.Root>
                          <Tooltip.Trigger asChild>
                            <Link
                              href={`/movie/${movie.id}`}
                              className="p-2 bg-[#D32F2F] text-white rounded-full hover:bg-[#FF5252] transition-colors flex items-center gap-1"
                              aria-label="Link to movie"
                            >
                              <FaInfoCircle aria-label="Link to movie" />
                              <span className="text-xs">Détails</span>
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
              </div>
            ))}
          </div>
        </div>
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 cursor-pointer bg-red-600 text-white p-2 rounded-full shadow-md z-10 hover:bg-red-700 transition-colors duration-300"
          onClick={scrollPrev}
          aria-label="Previous button"
        >
          <FaChevronLeft className="w-6 h-6" aria-label="Previous button" />
        </button>
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer bg-red-600 text-white p-2 rounded-full shadow-md z-10 hover:bg-red-700 transition-colors duration-300"
          onClick={scrollNext}
          aria-label="Next button"
        >
          <FaChevronRight className="w-6 h-6" aria-label="Next button" />
        </button>
      </div>
    </motion.section>
  );
}
