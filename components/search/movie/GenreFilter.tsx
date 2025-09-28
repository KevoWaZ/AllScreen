"use client";
import { genre } from "@/types/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { FiCheck, FiFilter } from "react-icons/fi";
import { motion, Variants } from "framer-motion";

interface GenreFilterProps {
  genres: genre[];
  tagVariants: Variants;
}

export function GenreFilter({ genres, tagVariants }: GenreFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Récupère les genres sélectionnés depuis l'URL
  const selectedGenresFromURL = useMemo(() => {
    return searchParams.get("with_genres")?.split(",") || [];
  }, [searchParams]);

  // Crée une nouvelle query string en fonction des genres sélectionnés
  const createQueryString = useCallback(
    (name: string, value: string[]) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value.length === 0) {
        params.delete(name);
      } else {
        params.set(name, value.join(","));
      }
      return params.toString();
    },
    [searchParams]
  );

  // Bascule la sélection d'un genre
  const toggleGenreSelection = useCallback(
    (genre: genre) => {
      const newSelectedGenres = selectedGenresFromURL.includes(
        genre.id.toString()
      )
        ? selectedGenresFromURL.filter((id) => id !== genre.id.toString())
        : [...selectedGenresFromURL, genre.id.toString()];

      const queryString = createQueryString("with_genres", newSelectedGenres);
      router.push(`${pathname}?${queryString}`, { scroll: false });
    },
    [selectedGenresFromURL, createQueryString, pathname, router]
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 font-semibold text-gray-200">
        <FiFilter className="text-red-400" />
        <h3 className="text-sm">Filtrer par genres</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {genres.map((genreItem, index) => (
          <motion.div
            key={genreItem.id}
            onClick={() => toggleGenreSelection(genreItem)}
            className={`cursor-pointer border px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedGenresFromURL.includes(genreItem.id.toString())
                ? "text-white bg-red-700 border-red-700"
                : "bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700"
            }`}
            initial="initial"
            animate="animate"
            whileTap="tap"
            transition={{ duration: 0.2, delay: index * 0.03 }}
            variants={tagVariants}
            aria-label={`Filtrer par genre ${genreItem.name}`}
          >
            <div className="flex items-center gap-1.5">
              {selectedGenresFromURL.includes(genreItem.id.toString()) && (
                <FiCheck className="w-3 h-3" />
              )}
              <span>{genreItem.name}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
