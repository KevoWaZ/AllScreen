"use client";
import { UpcomingTypes } from "@/app/page";
import { useState, useRef, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import MovieCard from "../cards/MovieCard";
import { motion, AnimatePresence } from "framer-motion";

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

  const containerRef = useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });

  useEffect(() => {
    if (containerRef.current) {
      setConstraints({
        left: -(
          containerRef.current.scrollWidth - containerRef.current.offsetWidth
        ),
        right: 0,
      });
    }
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
        <FaCalendarAlt className="mr-3 text-red-600" /> Prochainement
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
      <div className="bg-white dark:bg-gray-800 p-3 md:p-6 rounded-lg shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden"
          >
            <motion.div
              ref={containerRef}
              drag="x"
              dragConstraints={constraints}
              className="flex space-x-6 cursor-grab"
            >
              {upcoming[activeTab]?.map((movie) => (
                <motion.div
                  key={movie.id}
                  className="flex-none w-64"
                  whileTap={{ cursor: "grabbing" }}
                >
                  <MovieCard movie={movie} showDescription />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
