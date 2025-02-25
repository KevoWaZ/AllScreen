"use client";
import type { UpcomingTypes } from "@/app/page";
import { useState, useCallback } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import MovieCard from "../cards/MovieCard";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function UpcomingSection({
  upcoming,
}: {
  upcoming: UpcomingTypes;
}) {
  const [activeTab, setActiveTab] = useState<
    "today" | "week" | "month" | "year" | "alltime"
  >("today");

  const tabs: {
    id: "today" | "week" | "month" | "year" | "alltime";
    label: string;
  }[] = [
    { id: "today", label: "Aujourd'hui" },
    { id: "week", label: "Cette semaine" },
    { id: "month", label: "Ce mois-ci" },
    { id: "year", label: "Cette année" },
    { id: "alltime", label: "Tout temps" },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
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
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
        <FaCalendarAlt
          className="mr-3 text-red-600"
          aria-label="Upcoming icon"
        />{" "}
        Prochainement
      </h2>
      <div className="flex flex-wrap mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`mr-3 mb-3 px-4 py-2 rounded-full transition-all duration-300 ${
              activeTab === tab.id
                ? "bg-red-600 text-white shadow-md"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="bg-white dark:bg-gray-800 p-3 md:p-6 rounded-lg shadow-lg relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden cursor-grab"
          >
            <div className="embla" ref={emblaRef}>
              <div className="embla__container flex">
                {upcoming[activeTab]?.map((movie) => (
                  <div
                    key={movie.id}
                    className="embla__slide flex-none my-auto w-64 mr-6"
                  >
                    <MovieCard
                      movie={movie}
                      showDescription
                      textSelect={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-2 rounded-full shadow-md z-10 hover:bg-red-700 transition-colors duration-300"
          onClick={scrollPrev}
          aria-label="Previous button"
        >
          <FaChevronLeft className="w-6 h-6" aria-label="Previous button" />
        </button>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-2 rounded-full shadow-md z-10 hover:bg-red-700 transition-colors duration-300"
          onClick={scrollNext}
          aria-label="Next button"
        >
          <FaChevronRight className="w-6 h-6" aria-label="Next button" />
        </button>
      </div>
    </motion.section>
  );
}
