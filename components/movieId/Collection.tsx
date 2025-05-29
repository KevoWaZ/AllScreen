"use client";
import { Collection as CollectionType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";

interface CollectionProps {
  collection: CollectionType;
}

export default function Collection({ collection }: CollectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12  bg-gray-800 rounded-lg overflow-hidden shadow-lg mx-auto max-w-[80vw]"
    >
      <div className="relative">
        <Image
          width={1440}
          height={320}
          alt={collection.name}
          src={`https://image.tmdb.org/t/p/w1440_and_h320_multi_faces${collection.backdrop_path}`}
          className="w-full h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent flex flex-col justify-end p-4 sm:p-8">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl sm:text-4xl font-bold text-white mb-4 sm:mb-6"
          >
            Fait partie de la collection : {collection.name}
          </motion.h3>
          <div className="space-y-4 sm:space-y-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-gray-300 text-lg sm:text-xl"
            >
              Cette collection comprend :
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6"
            >
              {collection.parts.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                >
                  <Link
                    href={`/movie/${movie.id}`}
                    className="bg-gray-700 text-white text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2 rounded-full hover:bg-gray-600 transition-colors"
                  >
                    {movie.title}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Link
                href={`/collection/${collection.id}`}
                className="inline-flex items-center  bg-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full  hover:bg-red-600 transition-colors text-lg sm:text-xl font-semibold"
              >
                Afficher la collection
                <FaChevronRight
                  className="ml-2 sm:ml-3"
                  aria-label="Go to collection page"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
