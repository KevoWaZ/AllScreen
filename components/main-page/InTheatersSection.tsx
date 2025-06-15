"use client";

import type { Movie } from "@/types/types";
import { FaTheaterMasks } from "react-icons/fa";
import { motion } from "framer-motion";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
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
              <Link key={movie.id} href={`/movie/${movie.id}`} />
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
