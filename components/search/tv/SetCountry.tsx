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
  const with_origin_country = searchParams.get("with_origin_country");

  console.log("with_origin_country: ", with_origin_country);

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
          value={with_origin_country || ""}
          onChange={(e) =>
            router.push(
              pathname +
                "?" +
                createQueryString("with_origin_country", e.target.value),
              { scroll: false }
            )
          }
          className="w-full px-4 py-2.5 rounded-lg border  border-gray-700  bg-gray-800  text-white appearance-none focus:outline-hidden focus:ring-2  focus:ring-red-400 focus:border-transparent transition-all"
        >
          <option value="">Aucune sélection</option>
          {countries.map((country, id) => (
            <option
              key={`${country.iso_3166_1}-${
                country.native_name || country.english_name
              }-${id}`}
              value={country.iso_3166_1}
            >
              {country.native_name || country.english_name}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="w-5 h-5  text-gray-400"
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
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
