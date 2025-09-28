"use client";
import { tv_sort_by } from "@/utils/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function SetSortBy() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sort_by = searchParams.get("sort_by") || "popularity.desc";

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

  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const queryString = createQueryString("sort_by", e.target.value);
      router.push(`${pathname}?${queryString}`, { scroll: false });
    },
    [createQueryString, pathname, router]
  );

  return (
    <div className="space-y-2">
      <label
        htmlFor="sort_by"
        className="block text-sm font-medium text-gray-200"
      >
        Trier les résultats par
      </label>
      <div className="relative">
        <select
          name="sort_by"
          id="sort_by"
          value={sort_by}
          onChange={handleSortChange}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-hidden focus:ring-2 focus:ring-red-400 transition-all appearance-none"
          aria-label="Trier les séries par"
        >
          {tv_sort_by.map((filter) => (
            <option key={filter.value} value={filter.value}>
              {filter.name}
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
