"use client";
import Form from "next/form";
import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";

export default function SearchComponent() {
  return (
    <div className="flex flex-col items-center justify-center mt-8 mb-12">
      <motion.h1
        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Découvrez vos prochains <span className="text-[#D32F2F]">films</span> et{" "}
        <span className="text-[#D32F2F]">séries</span> préférés
      </motion.h1>
      <motion.div
        className="relative w-full max-w-2xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Form action={"/search"}>
          <input
            aria-label="Rechercher des films, séries TV..."
            type="search"
            name="search"
            placeholder="Rechercher des films, séries TV..."
            className="w-full py-4 px-6 pl-12 rounded-full  bg-[#2C2C2C]  text-white border-2  border-[#4A4A4A] focus:outline-hidden focus:ring-2 focus:ring-[#D32F2F] focus:border-transparent transition-all duration-300 shadow-md hover:shadow-lg text-lg"
          />
          <button
            type="submit"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer bg-[#D32F2F] text-white p-3 rounded-full hover:bg-[#B71C1C] transition-colors duration-300"
            aria-label="Rechercher"
          >
            <FiSearch className="w-6 h-6" aria-label="Search Icon" />
          </button>
        </Form>
      </motion.div>
    </div>
  );
}
