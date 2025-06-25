import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function ReleaseYearFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedPrimaryReleaseYear =
    searchParams.get("primary_release_year") || "";

  const [inputValue, setInputValue] = useState(selectedPrimaryReleaseYear);

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
    if (value === "" || /^\d+$/.test(value)) {
      setInputValue(value);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== selectedPrimaryReleaseYear) {
        const queryString = createQueryString(
          "primary_release_year",
          inputValue
        );
        router.push(pathname + "?" + queryString, { scroll: false });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [
    inputValue,
    selectedPrimaryReleaseYear,
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
          className="w-full px-4 py-2.5 rounded-lg border border-gray-700 bg-gray-800 text-white appearance-none focus:outline-hidden focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all"
          min="1900"
          max={new Date().getFullYear()}
        />
      </div>
    </div>
  );
}
