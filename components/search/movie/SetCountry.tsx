"use client";
import { country } from "@/types/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface CountryFilterProps {
  countries: country[];
}

export function SetCountry({ countries }: CountryFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const with_origin_country = searchParams.get("with_origin_country") || "";

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

  const handleCountryChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const queryString = createQueryString(
        "with_origin_country",
        e.target.value
      );
      router.push(`${pathname}?${queryString}`, { scroll: false });
    },
    [createQueryString, pathname, router]
  );

  if (countries.length === 0) {
    return (
      <div className="space-y-2">
        <label
          htmlFor="countries"
          className="block text-sm font-medium text-gray-200"
        >
          Pays
        </label>
        <select
          disabled
          className="w-full px-4 py-2.5 rounded-lg border border-gray-700 bg-gray-800 text-gray-400 cursor-not-allowed"
        >
          <option value="">Aucun pays disponible</option>
        </select>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label
        htmlFor="countries"
        className="block text-sm font-medium text-gray-200"
      >
        Pays
      </label>
      <div className="relative">
        <select
          name="countries"
          id="countries"
          value={with_origin_country}
          onChange={handleCountryChange}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-hidden focus:ring-2 focus:ring-red-400 transition-all appearance-none"
          aria-label="Filtrer par pays d'origine"
        >
          <option value="">Tous les pays</option>
          {countries.map((country) => (
            <option key={country.iso_3166_1} value={country.iso_3166_1}>
              {country.native_name || country.english_name}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
