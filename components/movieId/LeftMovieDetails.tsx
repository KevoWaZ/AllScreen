import { images, Movie } from "@/types/types";
import Link from "next/link";
import {
  FaStar,
  FaCalendarAlt,
  FaClock,
  FaLanguage,
  FaMoneyBillWave,
  FaFilm,
} from "react-icons/fa";
import MovieVideos, { Video } from "./MovieVideos";
import MovieCastCard from "./MovieCastCard";
import Carousel from "../test/Carousel";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

export interface Casting {
  cast_id: number;
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface LeftMovieDetailsProps {
  movieDetails: Movie;
  cast: Casting[];
  movieId: string;
  videos: Video[];
  images: {
    posters: images[];
    backdrops: images[];
    logos: images[];
  };
  formatCurrency: (value: number) => string;
}

export default function LeftMovieDetails({
  movieDetails,
  cast,
  movieId,
  videos,
  images,
  formatCurrency,
}: LeftMovieDetailsProps) {
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
    <div className="lg:col-span-2">
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-red-500">Synopsis</h2>
        <p className="text-xl leading-relaxed">{movieDetails.overview}</p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-red-500">
          Informations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: FaStar,
              label: "Note",
              value: `${movieDetails.vote_average.toFixed(1)} (${
                movieDetails.vote_count
              } votes)`,
            },
            {
              icon: FaCalendarAlt,
              label: "Date de sortie",
              value: new Date(movieDetails.release_date).toLocaleDateString(
                "fr-FR"
              ),
            },
            {
              icon: FaClock,
              label: "Durée",
              value: `${movieDetails.runtime} min`,
            },
            {
              icon: FaLanguage,
              label: "Langue originale",
              value: movieDetails.original_language.toUpperCase(),
            },
            {
              icon: FaMoneyBillWave,
              label: "Budget",
              value: formatCurrency(movieDetails.budget),
            },
            {
              icon: FaFilm,
              label: "Recettes",
              value: formatCurrency(movieDetails.revenue),
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-800 p-4 rounded-lg"
            >
              <item.icon className="text-red-500 text-2xl mr-4" />
              <div>
                <p className="text-sm text-gray-300">{item.label}</p>
                <p className="text-lg font-semibold text-[#f1f1f1]">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-red-500 mb-4">
          Têtes d&apos;affiche
        </h2>
        <ul className="flex flex-wrap -mx-2">
          {cast &&
            cast.slice(0, 5).map((casting) => (
              <li
                key={casting.cast_id}
                className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 px-2 mb-4"
              >
                <MovieCastCard casting={casting} />
              </li>
            ))}
        </ul>
        <Link
          href={`/movie/${movieId}/cast`}
          className="inline-block mt-4 bg-red-500 text-white p-3 rounded-lg hover:bg-red-400 transition-colors duration-300 text-sm font-semibold"
        >
          Distribution des rôles et équipe technique au complet
        </Link>
        {videos.length > 0 && <MovieVideos videos={videos} />}

      </section>
      
        <section className="rounded-lg shadow-md">
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
    </div>
  );
}
