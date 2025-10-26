import { useCallback, useMemo, useState } from "react";
import * as Select from "@radix-ui/react-select";
import * as Dialog from "@radix-ui/react-dialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { FiCheck, FiFilter } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

interface Movie {
  id: number;
  title: string;
  poster: string;
  release_date: string;
  description: string;
  runtime: number;
  genres: { id: number; name: string }[];
  productionCompanies: { id: number; name: string }[];
}

interface WatchlistItem {
  movie: Movie;
}

interface Genre {
  id: number;
  name: string;
}

interface Company {
  id: number;
  name: string;
}

interface Props {
  movies: WatchlistItem[];
  filteredMovies: WatchlistItem[];
  availableGenres: Genre[];
  availableCompanies: Company[];
  uniqueDecades: string[];
  uniqueYears: string[];
  selectedDecade: string | null;
  selectedYear: string | null;
  selectedGenresFromURL: number[];
  selectedCompaniesFromURL: number[];
}

export default function WatchlistsMovieFilters({
  availableGenres,
  availableCompanies,
  uniqueDecades,
  uniqueYears,
  selectedDecade,
  selectedYear,
  selectedGenresFromURL,
  selectedCompaniesFromURL,
}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const updateURLParams = useCallback(
    (newParams: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("filter");
      params.delete("decade");
      params.delete("year");
      params.delete("genres");
      params.delete("companies");
      Object.entries(newParams).forEach(([key, value]) => {
        if (value !== null && value !== "tout") {
          params.set(key, value);
        }
      });
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  const handleDecadeChange = (value: string | null) => {
    updateURLParams({
      decade: value,
      filter: "tout",
      year: null,
    });
  };

  const handleYearChange = (value: string | null) => {
    updateURLParams({
      year: value,
      filter: "tout",
      decade: null,
    });
  };

  const handleGenreChange = (genreId: number) => {
    const params = new URLSearchParams(searchParams.toString());
    let newSelectedGenres: number[] = [...selectedGenresFromURL];
    if (newSelectedGenres.includes(genreId)) {
      newSelectedGenres = newSelectedGenres.filter((id) => id !== genreId);
    } else {
      newSelectedGenres.push(genreId);
    }
    if (newSelectedGenres.length > 0) {
      params.set("genres", newSelectedGenres.join(","));
    } else {
      params.delete("genres");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleCompanyChange = (companyId: number) => {
    const params = new URLSearchParams(searchParams.toString());
    let newSelectedCompanies: number[] = [...selectedCompaniesFromURL];
    if (newSelectedCompanies.includes(companyId)) {
      newSelectedCompanies = newSelectedCompanies.filter(
        (id) => id !== companyId
      );
    } else {
      newSelectedCompanies.push(companyId);
    }
    if (newSelectedCompanies.length > 0) {
      params.set("companies", newSelectedCompanies.join(","));
    } else {
      params.delete("companies");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const filteredCompanies = useMemo(() => {
    return availableCompanies.filter((company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [availableCompanies, searchTerm]);

  return (
    <div className="flex flex-col lg:flex-row justify-center mb-8 gap-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="div flex flex-col">
          <label className="text-[#BDBDBD] font-medium mb-3">
            Filtrer par décennie:
          </label>
          <Select.Root
            value={selectedDecade || "tout"}
            onValueChange={handleDecadeChange}
          >
            <Select.Trigger className="inline-flex items-center justify-between px-4 py-2 bg-[#2C2C2C] text-white rounded-lg border border-[#4A4A4A] hover:border-[#FF5252] focus:outline-none focus:ring-2 focus:ring-[#FF5252] focus:ring-offset-2 focus:ring-offset-[#121212] min-w-[160px]">
              <Select.Value>{selectedDecade || "Tout"}</Select.Value>
              <Select.Icon>
                <BiChevronDown className="w-4 h-4" />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="overflow-hidden bg-[#2C2C2C] rounded-lg border border-[#4A4A4A] shadow-lg">
                <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-[#2C2C2C] text-[#BDBDBD] cursor-default">
                  <BiChevronUp />
                </Select.ScrollUpButton>
                <Select.Viewport className="p-1">
                  <Select.Item
                    value="tout"
                    className="relative flex items-center px-8 py-2 text-white rounded cursor-pointer hover:bg-[#4A4A4A] focus:bg-[#4A4A4A] focus:outline-none data-[state=checked]:bg-[#D32F2F] data-[state=checked]:text-white"
                  >
                    <Select.ItemText>Tout</Select.ItemText>
                  </Select.Item>
                  {uniqueDecades.map((decade) => (
                    <Select.Item
                      key={decade}
                      value={decade}
                      className="relative flex items-center px-8 py-2 text-white rounded cursor-pointer hover:bg-[#4A4A4A] focus:bg-[#4A4A4A] focus:outline-none data-[state=checked]:bg-[#D32F2F] data-[state=checked]:text-white"
                    >
                      <Select.ItemText>{decade}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
                <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-[#2C2C2C] text-[#BDBDBD] cursor-default">
                  <BiChevronDown />
                </Select.ScrollDownButton>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>
        <div className="flex flex-col">
          <label className="text-[#BDBDBD] font-medium mb-3">
            Filtrer par année:
          </label>
          <Select.Root
            value={selectedYear || "tout"}
            onValueChange={handleYearChange}
          >
            <Select.Trigger className="inline-flex items-center justify-between px-4 py-2 bg-[#2C2C2C] text-white rounded-lg border border-[#4A4A4A] hover:border-[#FF5252] focus:outline-none focus:ring-2 focus:ring-[#FF5252] focus:ring-offset-2 focus:ring-offset-[#121212] min-w-[160px]">
              <Select.Value>{selectedYear || "Tout"}</Select.Value>
              <Select.Icon>
                <BiChevronDown className="w-4 h-4" />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="overflow-hidden bg-[#2C2C2C] rounded-lg border border-[#4A4A4A] shadow-lg">
                <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-[#2C2C2C] text-[#BDBDBD] cursor-default">
                  <BiChevronUp />
                </Select.ScrollUpButton>
                <Select.Viewport className="p-1">
                  <Select.Item
                    value="tout"
                    className="relative flex items-center px-8 py-2 text-white rounded cursor-pointer hover:bg-[#4A4A4A] focus:bg-[#4A4A4A] focus:outline-none data-[state=checked]:bg-[#D32F2F] data-[state=checked]:text-white"
                  >
                    <Select.ItemText>Tout</Select.ItemText>
                  </Select.Item>
                  {uniqueYears.map((year) => (
                    <Select.Item
                      key={year}
                      value={year}
                      className="relative flex items-center px-8 py-2 text-white rounded cursor-pointer hover:bg-[#4A4A4A] focus:bg-[#4A4A4A] focus:outline-none data-[state=checked]:bg-[#D32F2F] data-[state=checked]:text-white"
                    >
                      <Select.ItemText>{year}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
                <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-[#2C2C2C] text-[#BDBDBD] cursor-default">
                  <BiChevronDown />
                </Select.ScrollDownButton>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-2 font-semibold text-gray-200">
          <FiFilter className="text-red-400" />
          <h3 className="text-sm">Filtrer par genres</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {availableGenres.map((genre) => (
            <div
              key={genre.id}
              className={`cursor-pointer border px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedGenresFromURL.includes(genre.id)
                  ? "text-white bg-red-700 border-red-700"
                  : "bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700"
              }`}
              onClick={() => handleGenreChange(genre.id)}
              aria-label={`Filtrer par genre ${genre.name}`}
            >
              <div className="flex items-center gap-1.5">
                {selectedGenresFromURL.includes(genre.id) && (
                  <FiCheck className="w-3 h-3" />
                )}
                <span>{genre.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-2 font-semibold text-gray-200">
          <FiFilter className="text-red-400" />
          <h3 className="text-sm">Filtrer par companies</h3>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-[#2C2C2C] text-white rounded-lg border border-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#FF5252] focus:ring-offset-2 focus:ring-offset-[#121212]"
        >
          Sélectionner des companies
        </button>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50" />
            <Dialog.Content
              aria-describedby="Dialog Content"
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-[#121212] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl z-50 border  border-[#2C2C2C]"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b  border-[#2C2C2C]">
                <div className="flex items-center gap-3">
                  <div>
                    <Dialog.Title className="text-lg font-bold  text-white">
                      Sélectionner des companies
                    </Dialog.Title>
                  </div>
                </div>
                <Dialog.Close className="w-8 h-8 rounded-full  hover:bg-[#2C2C2C] flex items-center justify-center transition-colors cursor-pointer">
                  <IoClose className=" text-[#BDBDBD]" size={18} />
                </Dialog.Close>
              </div>
              {/* Content */}
              <div className="p-4 space-y-6 max-h-[80vh] overflow-y-auto">
                <input
                  type="text"
                  placeholder="Rechercher une company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 bg-[#121212] text-white rounded-lg border border-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#FF5252] focus:ring-offset-2 focus:ring-offset-[#121212] mb-4"
                />
                <div className="flex flex-wrap gap-2">
                  {filteredCompanies.map((company) => (
                    <div
                      key={company.id}
                      className={`cursor-pointer border px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedCompaniesFromURL.includes(company.id)
                          ? "text-white bg-red-700 border-red-700"
                          : "bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700"
                      }`}
                      onClick={() => handleCompanyChange(company.id)}
                      aria-label={`Filtrer par company ${company.name}`}
                    >
                      <div className="flex items-center gap-1.5">
                        {selectedCompaniesFromURL.includes(company.id) && (
                          <FiCheck className="w-3 h-3" />
                        )}
                        <span>{company.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Footer */}
              <div className="p-6 border-t  border-[#2C2C2C]  bg-[#2C2C2C]/30"></div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
}
