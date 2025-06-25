import { movies_sort_by } from "@/utils/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function SetSortBy() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sort_by = searchParams.get("sort_by");

  console.log("sort_by: ", sort_by);

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
        htmlFor="filter"
        className="block text-sm font-medium text-gray-200"
      >
        Trier les résultats par
      </label>
      <div className="relative">
        <select
          name="filter"
          id="filter"
          value={sort_by || "popularity.desc"}
          onChange={(e) =>
            router.push(
              pathname + "?" + createQueryString("sort_by", e.target.value),
              { scroll: false }
            )
          }
          className="w-full px-4 py-2.5 rounded-lg border  border-gray-700  bg-gray-800  text-white appearance-none focus:outline-hidden focus:ring-2  focus:ring-red-400 focus:border-transparent transition-all"
        >
          {movies_sort_by.map((filter) => (
            <option key={filter.value} value={filter.value}>
              {filter.name}
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
