"use client";
import { language } from "@/types/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface LanguageFilterProps {
  languages: language[];
}

export function SetLanguage({ languages }: LanguageFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const with_original_language =
    searchParams.get("with_original_language") || "";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "") {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleLanguageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const queryString = createQueryString(
        "with_original_language",
        e.target.value
      );
      router.push(`${pathname}?${queryString}`, { scroll: false });
    },
    [createQueryString, pathname, router]
  );

  // Tri des langues par nom
  const sortedLanguages = [...languages].sort((a, b) =>
    (a.name || a.english_name).localeCompare(b.name || b.english_name)
  );

  if (languages.length === 0) {
    return (
      <div className="space-y-2">
        <label
          htmlFor="languages"
          className="block text-sm font-medium text-gray-200"
        >
          Langues
        </label>
        <select
          disabled
          className="w-full px-4 py-2.5 rounded-lg border border-gray-700 bg-gray-800 text-gray-400 cursor-not-allowed"
        >
          <option value="">Aucune langue disponible</option>
        </select>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label
        htmlFor="languages"
        className="block text-sm font-medium text-gray-200"
      >
        Langues
      </label>
      <div className="relative">
        <select
          name="languages"
          id="languages"
          value={with_original_language}
          onChange={handleLanguageChange}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-hidden focus:ring-2 focus:ring-red-400 transition-all appearance-none"
          aria-label="Filtrer par langue originale"
        >
          <option value="">Toutes les langues</option>
          {sortedLanguages.map((language) => (
            <option key={language.iso_639_1} value={language.iso_639_1}>
              {language.name || language.english_name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
