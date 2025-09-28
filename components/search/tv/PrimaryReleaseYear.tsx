"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function PrimaryReleaseYearFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedPrimaryReleaseYear =
    searchParams.get("primary_release_year") || "";
  const [inputValue, setInputValue] = useState(selectedPrimaryReleaseYear);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setInputValue(selectedPrimaryReleaseYear);
  }, [selectedPrimaryReleaseYear]);

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

  const handlePrimaryReleaseYearChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (value === "" || /^\d{0,4}$/.test(value)) {
      setInputValue(value);
      if (
        value &&
        (parseInt(value, 10) < 1900 ||
          parseInt(value, 10) > new Date().getFullYear())
      ) {
        setError(`L'année doit être entre 1900 et ${new Date().getFullYear()}`);
      } else {
        setError(null);
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== selectedPrimaryReleaseYear && !error) {
        const queryString = createQueryString(
          "primary_release_year",
          inputValue
        );
        router.push(`${pathname}?${queryString}`, { scroll: false });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [
    inputValue,
    selectedPrimaryReleaseYear,
    error,
    createQueryString,
    pathname,
    router,
  ]);

  return (
    <div className="space-y-2">
      <label
        htmlFor="primary_release_year"
        className="block text-sm font-medium text-gray-200"
      >
        Année de sortie
      </label>
      <div className="relative">
        <input
          type="number"
          name="primary_release_year"
          id="primary_release_year"
          value={inputValue}
          onChange={handlePrimaryReleaseYearChange}
          className={`w-full px-4 py-2.5 rounded-lg border bg-gray-800 text-white focus:outline-hidden focus:ring-2 focus:ring-red-400 transition-all ${
            error ? "border-red-500" : "border-gray-700"
          }`}
          min="1900"
          max={new Date().getFullYear()}
          placeholder="Ex: 2023"
          aria-label="Filtrer par année de sortie"
          aria-invalid={!!error}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    </div>
  );
}
