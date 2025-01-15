"use client";
import { UpcomingTypes } from "@/app/page";
import { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { MovieCard } from "../search/MovieCard";

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
    { id: "alltime", label: "All time" },
  ];

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
        <FaCalendarAlt className="mr-2" /> Prochainement
      </h2>
      <div className="flex flex-wrap mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`mr-2 mb-2 px-4 py-2 rounded-lg ${
              activeTab === tab.id
                ? "bg-orange-500 text-white"
                : "bg-gray-600 text-white hover:bg-gray-500"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Liste des films et séries à venir */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="relative">
          <div className="overflow-x-auto scrollbar-hide">
            <ul className="flex space-x-4 pb-4">
              {upcoming[activeTab]?.map((movie) => (
                <li key={movie.id} className="flex-none w-64">
                  <MovieCard key={movie.id} movie={movie} block />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
