"use client";
import { TVShow } from "@/types/types";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import TVShowCard from "../cards/TVShowCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface RecommendationsProps {
  recommendations: TVShow[];
}

export default function Recommendations({
  recommendations,
}: RecommendationsProps) {
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
    <section className="p-8 max-w-[100vw] mx-auto">
      <h2 className="text-2xl font-semibold text-red-500 mb-4">
        Recommandations
      </h2>
      <div className="relative">
        <div className="embla overflow-hidden cursor-grab" ref={emblaRef}>
          <div className="embla__container flex">
            {recommendations.map((show) => (
              <div
                key={show.id}
                className="embla__slide flex-none my-auto w-64 mr-6"
              >
                <TVShowCard
                  tvShow={show}
                  showDescription
                  textSelect={false}
                  showUserAction={false}
                />
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
    </section>
  );
}
