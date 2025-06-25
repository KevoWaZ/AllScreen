import { genre } from "@/types/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
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

  const selectedGenresFromURL =
    searchParams.get("with_genres")?.split(",") || [];

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

  const toggleGenreSelection = (genre: genre) => {
    let newSelectedGenres: string[];

    if (selectedGenresFromURL.includes(genre.id.toString())) {
      newSelectedGenres = selectedGenresFromURL.filter(
        (id) => id !== genre.id.toString()
      );
    } else {
      newSelectedGenres = [...selectedGenresFromURL, genre.id.toString()];
    }

    const queryString = createQueryString("with_genres", newSelectedGenres);
    router.push(pathname + "?" + queryString, { scroll: false });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 font-semibold text-gray-200">
        <FiFilter className="text-red-400" />
        <h3 className="text-sm">Filtrer par genres</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {genres.map((genre, index) => (
          <motion.div
            key={genre.id}
            onClick={() => toggleGenreSelection(genre)}
            className={`cursor-pointer border px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedGenresFromURL.includes(genre.id.toString())
                ? "text-white bg-red-700 border-red-700"
                : "bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700"
            }`}
            initial="initial"
            animate="animate"
            whileTap="tap"
            transition={{ duration: 0.2, delay: index * 0.03 }}
            variants={tagVariants}
          >
            <div className="flex items-center gap-1.5">
              {selectedGenresFromURL.includes(genre.id.toString()) && (
                <FiCheck className="w-3 h-3" />
              )}
              <span>{genre.name}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
