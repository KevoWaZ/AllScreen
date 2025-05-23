"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import RatingModal from "@/components/rating-modal";

export default function RatingModalDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6">
      <motion.h1
        className="text-3xl font-bold text-[#D32F2F] dark:text-[#D32F2F] mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Movie Rating Demo
      </motion.h1>

      <motion.button
        onClick={() => setIsModalOpen(true)}
        className="px-6 py-3 bg-[#FF5722] dark:bg-[#FF5722] text-white rounded-md font-medium shadow-md hover:bg-[#E64A19] dark:hover:bg-[#E64A19] transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Rate This Movie
      </motion.button>

      <RatingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        id={11835}
        type="MOVIE"
        title="Notez ce film!"
      />
    </div>
  );
}
