import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Carousel from "../test/Carousel";

interface ImageType {
  images: {
    posters: [];
    backdrops: [];
    logos: [];
  };
}

export default function TVImage({ images }: ImageType) {
  const [activeTab, setActiveTab] = useState<"posters" | "backdrops" | "logos">(
    "posters"
  );

  const tabs: {
    id: "posters" | "backdrops" | "logos";
    label: string;
  }[] = [
    { id: "posters", label: "Affiches" },
    { id: "backdrops", label: "Arrière-plans" },
    { id: "logos", label: "Logos" },
  ];
  return (
    <section className="p-8 max-w-[70vw] mx-auto">
      <h2 className="text-2xl font-semibold text-red-500 mb-4">Images</h2>
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
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden"
        >
          {images[activeTab] && images[activeTab].length > 0 ? (
            <Carousel images={images[activeTab]} />
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-4">
              Aucune image disponible pour cette catégorie.
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
