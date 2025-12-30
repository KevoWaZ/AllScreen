"use client";

import { useCallback, useMemo, useState } from "react";
import * as Select from "@radix-ui/react-select";
import { Dialog } from "@base-ui-components/react/dialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { FiCheck, FiFilter } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { Checkbox } from "@base-ui-components/react/checkbox";
import { BiCheck } from "react-icons/bi";

interface Movie {
  id: number;
  title: string;
  poster: string;
  release_date: string;
  description: string;
  runtime: number;
  genres: { id: number; name: string }[];
  productionCompanies: { id: number; name: string }[];
  productionCountries: { id: number; name: string }[];
}

interface Genre {
  id: number;
  name: string;
  count: number;
}

interface Person {
  id: number;
  name: string;
  count: number;
}

interface Country {
  id: number;
  name: string;
  count: number;
}

interface Props {
  movies: Movie[];
  filteredMovies: Movie[];
  availableGenres: Genre[];
  availableCompanies: Person[];
  availableCountries: Country[];
  availableActors: Person[];
  availableDirectors: Person[];
  availableProducers: Person[];
  availableExecProducers: Person[];
  availableWriters: Person[];
  availableComposers: Person[];
  availableCinematographers: Person[];
  uniqueDecades: string[];
  uniqueYears: string[];
  selectedDecade: string | null;
  selectedYear: string | null;
  selectedGenresFromURL: number[];
  selectedCompaniesFromURL: number[];
  selectedCountriesFromURL: number[];
  selectedActorsFromURL: number[];
  selectedDirectorsFromURL: number[];
  selectedProducersFromURL: number[];
  selectedExecProducersFromURL: number[];
  selectedWritersFromURL: number[];
  selectedComposersFromURL: number[];
  selectedCinematographersFromURL: number[];
  selectedRating: string | null;
  selectedIsPublicUtility: boolean | null;
  sortBy: string | null;
  setSortBy: (sortBy: string | null) => void;
}

export default function WatchedMovieFilters({
  availableGenres,
  availableCompanies,
  availableCountries,
  availableActors,
  availableDirectors,
  availableProducers,
  availableExecProducers,
  availableWriters,
  availableComposers,
  availableCinematographers,
  uniqueDecades,
  uniqueYears,
  selectedDecade,
  selectedYear,
  selectedRating,
  selectedGenresFromURL,
  selectedCompaniesFromURL,
  selectedCountriesFromURL,
  selectedActorsFromURL,
  selectedDirectorsFromURL,
  selectedProducersFromURL,
  selectedExecProducersFromURL,
  selectedWritersFromURL,
  selectedComposersFromURL,
  selectedCinematographersFromURL,
  selectedIsPublicUtility,
  sortBy,
  setSortBy,
}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openCountries, setOpenCountries] = useState(false);
  const [openActors, setOpenActors] = useState(false);
  const [openDirectors, setOpenDirectors] = useState(false);
  const [openProducers, setOpenProducers] = useState(false);
  const [openExecProducers, setOpenExecProducers] = useState(false);
  const [openWriters, setOpenWriters] = useState(false);
  const [openComposers, setOpenComposers] = useState(false);
  const [openCinematographers, setOpenCinematographers] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [actorSearchTerm, setActorSearchTerm] = useState("");
  const [directorSearchTerm, setDirectorSearchTerm] = useState("");
  const [producerSearchTerm, setProducerSearchTerm] = useState("");
  const [execProducerSearchTerm, setExecProducerSearchTerm] = useState("");
  const [writerSearchTerm, setWriterSearchTerm] = useState("");
  const [composerSearchTerm, setComposerSearchTerm] = useState("");
  const [cinematographerSearchTerm, setCinematographerSearchTerm] =
    useState("");

  const ratingOptions = useMemo(() => {
    const options = [];
    for (let i = 0.5; i <= 5; i += 0.5) {
      options.push(i);
    }
    return options;
  }, []);

  const updateURLParams = useCallback(
    (newParams: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(newParams).forEach(([key, value]) => {
        if (value === null || value === "tout") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  const handleIsPublicUtilityChange = (checked: boolean) => {
    updateURLParams({ isPublicUtility: checked ? "true" : null });
  };

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

  const handleRatingChange = (value: string | null) => {
    updateURLParams({ rating: value });
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

  const handleCountryChange = (countryId: number) => {
    const params = new URLSearchParams(searchParams.toString());
    let newSelectedCountries: number[] = [...selectedCountriesFromURL];
    if (newSelectedCountries.includes(countryId)) {
      newSelectedCountries = newSelectedCountries.filter(
        (id) => id !== countryId
      );
    } else {
      newSelectedCountries.push(countryId);
    }
    if (newSelectedCountries.length > 0) {
      params.set("countries", newSelectedCountries.join(","));
    } else {
      params.delete("countries");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  const filteredCountries = useMemo(() => {
    return availableCountries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [availableCountries, searchTerm]);

  const handleActorChange = (actorId: number) => {
    const params = new URLSearchParams(searchParams.toString());
    let newSelectedActors: number[] = [...selectedActorsFromURL];
    if (newSelectedActors.includes(actorId)) {
      newSelectedActors = newSelectedActors.filter((id) => id !== actorId);
    } else {
      newSelectedActors.push(actorId);
    }
    if (newSelectedActors.length > 0) {
      params.set("actors", newSelectedActors.join(","));
    } else {
      params.delete("actors");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const filteredActors = useMemo(() => {
    return availableActors.filter((actor) =>
      actor.name.toLowerCase().includes(actorSearchTerm.toLowerCase())
    );
  }, [availableActors, actorSearchTerm]);

  const handleDirectorChange = (directorId: number) => {
    const params = new URLSearchParams(searchParams.toString());
    let newSelectedDirectors: number[] = [...selectedDirectorsFromURL];
    if (newSelectedDirectors.includes(directorId)) {
      newSelectedDirectors = newSelectedDirectors.filter(
        (id) => id !== directorId
      );
    } else {
      newSelectedDirectors.push(directorId);
    }
    if (newSelectedDirectors.length > 0) {
      params.set("directors", newSelectedDirectors.join(","));
    } else {
      params.delete("directors");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const filteredDirectors = useMemo(() => {
    return availableDirectors.filter((director) =>
      director.name.toLowerCase().includes(directorSearchTerm.toLowerCase())
    );
  }, [availableDirectors, directorSearchTerm]);

  const handleProducerChange = (producerId: number) => {
    const params = new URLSearchParams(searchParams.toString());
    let newSelectedProducers: number[] = [...selectedProducersFromURL];
    if (newSelectedProducers.includes(producerId)) {
      newSelectedProducers = newSelectedProducers.filter(
        (id) => id !== producerId
      );
    } else {
      newSelectedProducers.push(producerId);
    }
    if (newSelectedProducers.length > 0) {
      params.set("producers", newSelectedProducers.join(","));
    } else {
      params.delete("producers");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const filteredProducers = useMemo(() => {
    return availableProducers.filter((producer) =>
      producer.name.toLowerCase().includes(producerSearchTerm.toLowerCase())
    );
  }, [availableProducers, producerSearchTerm]);

  const handleExecProducerChange = (execProducerId: number) => {
    const params = new URLSearchParams(searchParams.toString());
    let newSelectedExecProducers: number[] = [...selectedExecProducersFromURL];
    if (newSelectedExecProducers.includes(execProducerId)) {
      newSelectedExecProducers = newSelectedExecProducers.filter(
        (id) => id !== execProducerId
      );
    } else {
      newSelectedExecProducers.push(execProducerId);
    }
    if (newSelectedExecProducers.length > 0) {
      params.set("execProducers", newSelectedExecProducers.join(","));
    } else {
      params.delete("execProducers");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const filteredExecProducers = useMemo(() => {
    return availableExecProducers.filter((execProducer) =>
      execProducer.name
        .toLowerCase()
        .includes(execProducerSearchTerm.toLowerCase())
    );
  }, [availableExecProducers, execProducerSearchTerm]);

  const handleWriterChange = (writerId: number) => {
    const params = new URLSearchParams(searchParams.toString());
    let newSelectedWriters: number[] = [...selectedWritersFromURL];
    if (newSelectedWriters.includes(writerId)) {
      newSelectedWriters = newSelectedWriters.filter((id) => id !== writerId);
    } else {
      newSelectedWriters.push(writerId);
    }
    if (newSelectedWriters.length > 0) {
      params.set("writers", newSelectedWriters.join(","));
    } else {
      params.delete("writers");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const filteredWriters = useMemo(() => {
    return availableWriters.filter((writer) =>
      writer.name.toLowerCase().includes(writerSearchTerm.toLowerCase())
    );
  }, [availableWriters, writerSearchTerm]);

  const handleComposerChange = (composerId: number) => {
    const params = new URLSearchParams(searchParams.toString());
    let newSelectedComposers: number[] = [...selectedComposersFromURL];
    if (newSelectedComposers.includes(composerId)) {
      newSelectedComposers = newSelectedComposers.filter(
        (id) => id !== composerId
      );
    } else {
      newSelectedComposers.push(composerId);
    }
    if (newSelectedComposers.length > 0) {
      params.set("composers", newSelectedComposers.join(","));
    } else {
      params.delete("composers");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const filteredComposers = useMemo(() => {
    return availableComposers.filter((composer) =>
      composer.name.toLowerCase().includes(composerSearchTerm.toLowerCase())
    );
  }, [availableComposers, composerSearchTerm]);

  const handleCinematographersChange = (cinematographerId: number) => {
    const params = new URLSearchParams(searchParams.toString());
    let newSelectedCinematographers: number[] = [
      ...selectedCinematographersFromURL,
    ];
    if (newSelectedCinematographers.includes(cinematographerId)) {
      newSelectedCinematographers = newSelectedCinematographers.filter(
        (id) => id !== cinematographerId
      );
    } else {
      newSelectedCinematographers.push(cinematographerId);
    }
    if (newSelectedCinematographers.length > 0) {
      params.set("cinematographers", newSelectedCinematographers.join(","));
    } else {
      params.delete("cinematographers");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const filteredCinematographers = useMemo(() => {
    return availableCinematographers.filter((cinematographer) =>
      cinematographer.name
        .toLowerCase()
        .includes(cinematographerSearchTerm.toLowerCase())
    );
  }, [availableCinematographers, cinematographerSearchTerm]);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FiFilter className="text-red-400 w-5 h-5" />
          <h2 className="text-lg font-bold text-white">Filtres</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Rating Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#BDBDBD]">Note</label>
            <Select.Root
              value={selectedRating || "tout"}
              onValueChange={handleRatingChange}
            >
              <Select.Trigger className="inline-flex items-center justify-between px-4 py-2.5 bg-[#2C2C2C] text-white rounded-lg border border-[#4A4A4A] hover:border-[#FF5252] focus:outline-none focus:ring-2 focus:ring-[#FF5252] focus:ring-offset-2 focus:ring-offset-[#121212] transition-colors">
                <Select.Value>
                  {selectedRating
                    ? `${selectedRating} étoile${
                        Number(selectedRating) > 1 ? "s" : ""
                      }`
                    : "Toutes les notes"}
                </Select.Value>
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
                    {ratingOptions.map((ratingOption) => (
                      <Select.Item
                        key={ratingOption}
                        value={String(ratingOption)}
                        className="relative flex items-center px-8 py-2 text-white rounded cursor-pointer hover:bg-[#4A4A4A] focus:bg-[#4A4A4A] focus:outline-none data-[state=checked]:bg-[#D32F2F] data-[state=checked]:text-white"
                      >
                        <Select.ItemText>
                          {ratingOption} étoile{ratingOption > 1 ? "s" : ""}
                        </Select.ItemText>
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
          {/* Decade Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#BDBDBD]">
              Décennie
            </label>
            <Select.Root
              value={selectedDecade || "tout"}
              onValueChange={handleDecadeChange}
            >
              <Select.Trigger className="inline-flex items-center justify-between px-4 py-2.5 bg-[#2C2C2C] text-white rounded-lg border border-[#4A4A4A] hover:border-[#FF5252] focus:outline-none focus:ring-2 focus:ring-[#FF5252] focus:ring-offset-2 focus:ring-offset-[#121212] transition-colors">
                <Select.Value>
                  {selectedDecade || "Toutes les décennies"}
                </Select.Value>
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
          {/* Year Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#BDBDBD]">Année</label>
            <Select.Root
              value={selectedYear || "tout"}
              onValueChange={handleYearChange}
            >
              <Select.Trigger className="inline-flex items-center justify-between px-4 py-2.5 bg-[#2C2C2C] text-white rounded-lg border border-[#4A4A4A] hover:border-[#FF5252] focus:outline-none focus:ring-2 focus:ring-[#FF5252] focus:ring-offset-2 focus:ring-offset-[#121212] transition-colors">
                <Select.Value>
                  {selectedYear || "Toutes les années"}
                </Select.Value>
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
          {/* Sort Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#BDBDBD]">
              Trier par
            </label>
            <Select.Root value={sortBy || "default"} onValueChange={setSortBy}>
              <Select.Trigger className="inline-flex items-center justify-between px-4 py-2.5 bg-[#2C2C2C] text-white rounded-lg border border-[#4A4A4A] hover:border-[#FF5252] focus:outline-none focus:ring-2 focus:ring-[#FF5252] focus:ring-offset-2 focus:ring-offset-[#121212] transition-colors">
                <Select.Value>
                  {sortBy === "runtime-desc"
                    ? "Durée (du plus long au plus court)"
                    : sortBy === "runtime-asc"
                    ? "Durée (du plus court au plus long)"
                    : "Par défaut"}
                </Select.Value>
                <Select.Icon>
                  <BiChevronDown className="w-4 h-4" />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="overflow-hidden bg-[#2C2C2C] rounded-lg border border-[#4A4A4A] shadow-lg">
                  <Select.Viewport className="p-1">
                    <Select.Item
                      value="default"
                      className="relative flex items-center px-8 py-2 text-white rounded cursor-pointer hover:bg-[#4A4A4A] focus:bg-[#4A4A4A] focus:outline-none data-[state=checked]:bg-[#D32F2F] data-[state=checked]:text-white"
                    >
                      <Select.ItemText>Par défaut</Select.ItemText>
                    </Select.Item>
                    <Select.Item
                      value="runtime-desc"
                      className="relative flex items-center px-8 py-2 text-white rounded cursor-pointer hover:bg-[#4A4A4A] focus:bg-[#4A4A4A] focus:outline-none data-[state=checked]:bg-[#D32F2F] data-[state=checked]:text-white"
                    >
                      <Select.ItemText>
                        Durée (du plus long au plus court)
                      </Select.ItemText>
                    </Select.Item>
                    <Select.Item
                      value="runtime-asc"
                      className="relative flex items-center px-8 py-2 text-white rounded cursor-pointer hover:bg-[#4A4A4A] focus:bg-[#4A4A4A] focus:outline-none data-[state=checked]:bg-[#D32F2F] data-[state=checked]:text-white"
                    >
                      <Select.ItemText>
                        Durée (du plus court au plus long)
                      </Select.ItemText>
                    </Select.Item>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>
          {/* Film d'utilité publique Filter */}
          <label className="flex items-center gap-2 text-base text-[#BDBDBD]">
            <Checkbox.Root
              checked={selectedIsPublicUtility === true}
              onCheckedChange={handleIsPublicUtilityChange}
              className="flex size-5 items-center justify-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 data-checked:bg-[#D32F2F] data-unchecked:border data-unchecked:border-gray-300"
            >
              <Checkbox.Indicator className="flex text-gray-50 data-unchecked:hidden">
                <BiCheck className="size-6" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Film d'utilité publique
          </label>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FiFilter className="text-red-400 w-5 h-5" />
          <h2 className="text-lg font-bold text-white">Genres</h2>
          {selectedGenresFromURL.length > 0 && (
            <span className="px-2 py-0.5 text-xs font-semibold bg-red-700 text-white rounded-full">
              {selectedGenresFromURL.length}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {availableGenres
            .sort((a, b) => b.count - a.count)
            .map((genre) => (
              <button
                key={genre.id}
                className={`cursor-pointer border px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedGenresFromURL.includes(genre.id)
                    ? "text-white bg-red-700 border-red-700 shadow-lg shadow-red-700/20"
                    : "bg-[#2C2C2C] text-gray-200 border-[#4A4A4A] hover:bg-[#3A3A3A] hover:border-[#FF5252]"
                }`}
                onClick={() => handleGenreChange(genre.id)}
                aria-label={`Filtrer par genre ${genre.name}`}
              >
                <div className="flex items-center gap-1.5">
                  {selectedGenresFromURL.includes(genre.id) && (
                    <FiCheck className="w-3 h-3" />
                  )}
                  <span>
                    {genre.name}: {genre.count}
                  </span>
                </div>
              </button>
            ))}
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FiFilter className="text-red-400 w-5 h-5" />
          <h2 className="text-lg font-bold text-white">Métiers</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 justify-items-stretch">
          {/* Companies */}
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>
              <FilterButton
                label="Companies"
                count={selectedCompaniesFromURL.length}
                onClick={() => setOpen(true)}
              />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-20 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:opacity-70 supports-[-webkit-touch-callout:none]:absolute" />
              <Dialog.Popup className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#121212] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl z-50 border border-[#2C2C2C] transition-all duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 dark:outline-gray-300">
                <div className="flex items-center justify-between p-6 border-b border-[#2C2C2C]">
                  <div className="flex items-center gap-3">
                    <div>
                      <Dialog.Title className="text-lg font-bold text-white">
                        Sélectionner des companies
                      </Dialog.Title>
                    </div>
                  </div>
                  <Dialog.Close className="w-8 h-8 rounded-full hover:bg-[#2C2C2C] flex items-center justify-center transition-colors cursor-pointer">
                    <IoClose className="text-[#BDBDBD]" size={18} />
                  </Dialog.Close>
                </div>
                <div className="p-4 space-y-6 max-h-[80vh] overflow-y-auto">
                  <input
                    type="text"
                    placeholder="Rechercher une company..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 bg-[#121212] text-white rounded-lg border border-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#FF5252] focus:ring-offset-2 focus:ring-offset-[#121212] mb-4 w-full"
                  />
                  <div className="flex flex-wrap gap-2">
                    {filteredCompanies
                      .sort((a, b) => b.count - a.count)
                      .map((company) => (
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
                            <span>
                              {company.name}: {company.count}
                            </span>
                          </div>
                        </div>
                      ))
                      .slice(0, 40)}
                  </div>
                </div>
                <div className="p-6 border-t border-[#2C2C2C] bg-[#2C2C2C]/30"></div>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>

          {/* Countries */}
          <Dialog.Root open={openCountries} onOpenChange={setOpenCountries}>
            <Dialog.Trigger>
              <FilterButton
                label="Countries"
                count={selectedCountriesFromURL.length}
                onClick={() => setOpen(openCountries)}
              />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-20 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:opacity-70 supports-[-webkit-touch-callout:none]:absolute" />
              <Dialog.Popup className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#121212] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl z-50 border border-[#2C2C2C] transition-all duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 dark:outline-gray-300">
                <div className="flex items-center justify-between p-6 border-b border-[#2C2C2C]">
                  <div className="flex items-center gap-3">
                    <div>
                      <Dialog.Title className="text-lg font-bold text-white">
                        Sélectionner des pays
                      </Dialog.Title>
                    </div>
                  </div>
                  <Dialog.Close className="w-8 h-8 rounded-full hover:bg-[#2C2C2C] flex items-center justify-center transition-colors cursor-pointer">
                    <IoClose className="text-[#BDBDBD]" size={18} />
                  </Dialog.Close>
                </div>
                <div className="p-4 space-y-6 max-h-[80vh] overflow-y-auto">
                  <input
                    type="text"
                    placeholder="Rechercher un pays..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 bg-[#121212] text-white rounded-lg border border-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#FF5252] focus:ring-offset-2 focus:ring-offset-[#121212] mb-4 w-full"
                  />
                  <div className="flex flex-wrap gap-2">
                    {filteredCountries
                      .sort((a, b) => b.count - a.count)
                      .map((country) => (
                        <div
                          key={country.id}
                          className={`cursor-pointer border px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            selectedCountriesFromURL.includes(country.id)
                              ? "text-white bg-red-700 border-red-700"
                              : "bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700"
                          }`}
                          onClick={() => handleCountryChange(country.id)}
                          aria-label={`Filtrer par pays ${country.name}`}
                        >
                          <div className="flex items-center gap-1.5">
                            {selectedCountriesFromURL.includes(country.id) && (
                              <FiCheck className="w-3 h-3" />
                            )}
                            <span>
                              {country.name}: {country.count}
                            </span>
                          </div>
                        </div>
                      ))
                      .slice(0, 40)}
                  </div>
                </div>
                <div className="p-6 border-t border-[#2C2C2C] bg-[#2C2C2C]/30"></div>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>

          {/* Actors */}
          <Dialog.Root open={openActors} onOpenChange={setOpenActors}>
            <Dialog.Trigger>
              <FilterButton
                label="Acteurs"
                count={selectedActorsFromURL.length}
                onClick={() => setOpenActors(true)}
              />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-20 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:opacity-70 supports-[-webkit-touch-callout:none]:absolute" />
              <Dialog.Popup className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#121212] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl z-50 border border-[#2C2C2C] transition-all duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 dark:outline-gray-300">
                <div className="flex items-center justify-between p-6 border-b border-[#2C2C2C]">
                  <div className="flex items-center gap-3">
                    <div>
                      <Dialog.Title className="text-lg font-bold text-white">
                        Sélectionner des acteurs
                      </Dialog.Title>
                    </div>
                  </div>
                  <Dialog.Close className="w-8 h-8 rounded-full hover:bg-[#2C2C2C] flex items-center justify-center transition-colors cursor-pointer">
                    <IoClose className="text-[#BDBDBD]" size={18} />
                  </Dialog.Close>
                </div>
                <div className="p-4 space-y-6 max-h-[80vh] overflow-y-auto">
                  <input
                    type="text"
                    placeholder="Rechercher acteurs..."
                    value={actorSearchTerm}
                    onChange={(e) => setActorSearchTerm(e.target.value)}
                    className="px-4 py-2 bg-[#121212] text-white rounded-lg border border-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#FF5252] focus:ring-offset-2 focus:ring-offset-[#121212] mb-4 w-full"
                  />
                  <div className="flex flex-wrap gap-2">
                    {filteredActors
                      .sort((a, b) => b.count - a.count)
                      .map((actor) => (
                        <div
                          key={actor.id}
                          className={`cursor-pointer border px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            selectedActorsFromURL.includes(actor.id)
                              ? "text-white bg-red-700 border-red-700"
                              : "bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700"
                          }`}
                          onClick={() => handleActorChange(actor.id)}
                          aria-label={`Filtrer par acteur ${actor.name}`}
                        >
                          <div className="flex items-center gap-1.5">
                            {selectedActorsFromURL.includes(actor.id) && (
                              <FiCheck className="w-3 h-3" />
                            )}
                            <span>
                              {actor.name}: {actor.count}
                            </span>
                          </div>
                        </div>
                      ))
                      .slice(0, 40)}
                  </div>
                </div>
                <div className="p-6 border-t border-[#2C2C2C] bg-[#2C2C2C]/30"></div>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
          {/* Directors */}
          <Dialog.Root open={openDirectors} onOpenChange={setOpenDirectors}>
            <Dialog.Trigger>
              <FilterButton
                label="Réalisateurs"
                count={selectedDirectorsFromURL.length}
                onClick={() => setOpenDirectors(true)}
              />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-20 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:opacity-70 supports-[-webkit-touch-callout:none]:absolute" />
              <Dialog.Popup className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#121212] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl z-50 border border-[#2C2C2C] transition-all duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 dark:outline-gray-300">
                <div className="flex items-center justify-between p-6 border-b border-[#2C2C2C]">
                  <div className="flex items-center gap-3">
                    <div>
                      <Dialog.Title className="text-lg font-bold text-white">
                        Sélectionner des réalisateurs
                      </Dialog.Title>
                    </div>
                  </div>
                  <Dialog.Close className="w-8 h-8 rounded-full hover:bg-[#2C2C2C] flex items-center justify-center transition-colors cursor-pointer">
                    <IoClose className="text-[#BDBDBD]" size={18} />
                  </Dialog.Close>
                </div>
                <div className="p-4 space-y-6 max-h-[80vh] overflow-y-auto">
                  <input
                    type="text"
                    placeholder="Rechercher réalisateur..."
                    value={directorSearchTerm}
                    onChange={(e) => setDirectorSearchTerm(e.target.value)}
                    className="px-4 py-2 bg-[#121212] text-white rounded-lg border border-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#FF5252] focus:ring-offset-2 focus:ring-offset-[#121212] mb-4 w-full"
                  />
                  <div className="flex flex-wrap gap-2">
                    {filteredDirectors
                      .sort((a, b) => b.count - a.count)
                      .map((director) => (
                        <div
                          key={director.id}
                          className={`cursor-pointer border px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            selectedDirectorsFromURL.includes(director.id)
                              ? "text-white bg-red-700 border-red-700"
                              : "bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700"
                          }`}
                          onClick={() => handleDirectorChange(director.id)}
                          aria-label={`Filtrer par realisateur ${director.name}`}
                        >
                          <div className="flex items-center gap-1.5">
                            {selectedDirectorsFromURL.includes(director.id) && (
                              <FiCheck className="w-3 h-3" />
                            )}
                            <span>
                              {director.name}: {director.count}
                            </span>
                          </div>
                        </div>
                      ))
                      .slice(0, 40)}
                  </div>
                </div>
                <div className="p-6 border-t border-[#2C2C2C] bg-[#2C2C2C]/30"></div>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
          {/* Producers */}
          <Dialog.Root open={openProducers} onOpenChange={setOpenProducers}>
            <Dialog.Trigger>
              <FilterButton
                label="Producteurs"
                count={selectedProducersFromURL.length}
                onClick={() => setOpenProducers(true)}
              />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-20 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:opacity-70 supports-[-webkit-touch-callout:none]:absolute" />
              <Dialog.Popup className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#121212] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl z-50 border border-[#2C2C2C] transition-all duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 dark:outline-gray-300">
                <div className="flex items-center justify-between p-6 border-b border-[#2C2C2C]">
                  <div className="flex items-center gap-3">
                    <div>
                      <Dialog.Title className="text-lg font-bold text-white">
                        Sélectionner des producteurs
                      </Dialog.Title>
                    </div>
                  </div>
                  <Dialog.Close className="w-8 h-8 rounded-full hover:bg-[#2C2C2C] flex items-center justify-center transition-colors cursor-pointer">
                    <IoClose className="text-[#BDBDBD]" size={18} />
                  </Dialog.Close>
                </div>
                <div className="p-4 space-y-6 max-h-[80vh] overflow-y-auto">
                  <input
                    type="text"
                    placeholder="Rechercher producteurs..."
                    value={producerSearchTerm}
                    onChange={(e) => setProducerSearchTerm(e.target.value)}
                    className="px-4 py-2 bg-[#121212] text-white rounded-lg border border-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#FF5252] focus:ring-offset-2 focus:ring-offset-[#121212] mb-4 w-full"
                  />
                  <div className="flex flex-wrap gap-2">
                    {filteredProducers
                      .sort((a, b) => b.count - a.count)
                      .map((producer) => (
                        <div
                          key={producer.id}
                          className={`cursor-pointer border px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            selectedProducersFromURL.includes(producer.id)
                              ? "text-white bg-red-700 border-red-700"
                              : "bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700"
                          }`}
                          onClick={() => handleProducerChange(producer.id)}
                          aria-label={`Filtrer par producteur ${producer.name}`}
                        >
                          <div className="flex items-center gap-1.5">
                            {selectedProducersFromURL.includes(producer.id) && (
                              <FiCheck className="w-3 h-3" />
                            )}
                            <span>
                              {producer.name}: {producer.count}
                            </span>
                          </div>
                        </div>
                      ))
                      .slice(0, 40)}
                  </div>
                </div>
                <div className="p-6 border-t border-[#2C2C2C] bg-[#2C2C2C]/30"></div>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
          {/* Executive Producers */}
          <Dialog.Root
            open={openExecProducers}
            onOpenChange={setOpenExecProducers}
          >
            <Dialog.Trigger>
              <FilterButton
                label="Producteurs exécutifs"
                count={selectedExecProducersFromURL.length}
                onClick={() => setOpenExecProducers(true)}
              />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-20 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:opacity-70 supports-[-webkit-touch-callout:none]:absolute" />
              <Dialog.Popup className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#121212] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl z-50 border border-[#2C2C2C] transition-all duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 dark:outline-gray-300">
                <div className="flex items-center justify-between p-6 border-b border-[#2C2C2C]">
                  <div className="flex items-center gap-3">
                    <div>
                      <Dialog.Title className="text-lg font-bold text-white">
                        Sélectionner des producteurs exécutifs
                      </Dialog.Title>
                    </div>
                  </div>
                  <Dialog.Close className="w-8 h-8 rounded-full hover:bg-[#2C2C2C] flex items-center justify-center transition-colors cursor-pointer">
                    <IoClose className="text-[#BDBDBD]" size={18} />
                  </Dialog.Close>
                </div>
                <div className="p-4 space-y-6 max-h-[80vh] overflow-y-auto">
                  <input
                    type="text"
                    placeholder="Rechercher producteurs exécutifs..."
                    value={execProducerSearchTerm}
                    onChange={(e) => setExecProducerSearchTerm(e.target.value)}
                    className="px-4 py-2 bg-[#121212] text-white rounded-lg border border-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#FF5252] focus:ring-offset-2 focus:ring-offset-[#121212] mb-4 w-full"
                  />
                  <div className="flex flex-wrap gap-2">
                    {filteredExecProducers
                      .sort((a, b) => b.count - a.count)
                      .map((execProducer) => (
                        <div
                          key={execProducer.id}
                          className={`cursor-pointer border px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            selectedExecProducersFromURL.includes(
                              execProducer.id
                            )
                              ? "text-white bg-red-700 border-red-700"
                              : "bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700"
                          }`}
                          onClick={() =>
                            handleExecProducerChange(execProducer.id)
                          }
                          aria-label={`Filtrer par producteur exécutif ${execProducer.name}`}
                        >
                          <div className="flex items-center gap-1.5">
                            {selectedExecProducersFromURL.includes(
                              execProducer.id
                            ) && <FiCheck className="w-3 h-3" />}
                            <span>
                              {execProducer.name}: {execProducer.count}
                            </span>
                          </div>
                        </div>
                      ))
                      .slice(0, 40)}
                  </div>
                </div>
                <div className="p-6 border-t border-[#2C2C2C] bg-[#2C2C2C]/30"></div>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
          {/* Writers */}
          <Dialog.Root open={openWriters} onOpenChange={setOpenWriters}>
            <Dialog.Trigger>
              <FilterButton
                label="Scénaristes"
                count={selectedWritersFromURL.length}
                onClick={() => setOpenWriters(true)}
              />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-20 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:opacity-70 supports-[-webkit-touch-callout:none]:absolute" />
              <Dialog.Popup className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#121212] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl z-50 border border-[#2C2C2C] transition-all duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 dark:outline-gray-300">
                <div className="flex items-center justify-between p-6 border-b border-[#2C2C2C]">
                  <div className="flex items-center gap-3">
                    <div>
                      <Dialog.Title className="text-lg font-bold text-white">
                        Sélectionner des scénaristes
                      </Dialog.Title>
                    </div>
                  </div>
                  <Dialog.Close className="w-8 h-8 rounded-full hover:bg-[#2C2C2C] flex items-center justify-center transition-colors cursor-pointer">
                    <IoClose className="text-[#BDBDBD]" size={18} />
                  </Dialog.Close>
                </div>
                <div className="p-4 space-y-6 max-h-[80vh] overflow-y-auto">
                  <input
                    type="text"
                    placeholder="Rechercher scénaristes..."
                    value={writerSearchTerm}
                    onChange={(e) => setWriterSearchTerm(e.target.value)}
                    className="px-4 py-2 bg-[#121212] text-white rounded-lg border border-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#FF5252] focus:ring-offset-2 focus:ring-offset-[#121212] mb-4 w-full"
                  />
                  <div className="flex flex-wrap gap-2">
                    {filteredWriters
                      .sort((a, b) => b.count - a.count)
                      .map((writer) => (
                        <div
                          key={writer.id}
                          className={`cursor-pointer border px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            selectedWritersFromURL.includes(writer.id)
                              ? "text-white bg-red-700 border-red-700"
                              : "bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700"
                          }`}
                          onClick={() => handleWriterChange(writer.id)}
                          aria-label={`Filtrer par scénariste ${writer.name}`}
                        >
                          <div className="flex items-center gap-1.5">
                            {selectedWritersFromURL.includes(writer.id) && (
                              <FiCheck className="w-3 h-3" />
                            )}
                            <span>
                              {writer.name}: {writer.count}
                            </span>
                          </div>
                        </div>
                      ))
                      .slice(0, 40)}
                  </div>
                </div>
                <div className="p-6 border-t border-[#2C2C2C] bg-[#2C2C2C]/30"></div>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
          {/* Composers */}
          <Dialog.Root open={openComposers} onOpenChange={setOpenComposers}>
            <Dialog.Trigger>
              <FilterButton
                label="Compositeurs"
                count={selectedComposersFromURL.length}
                onClick={() => setOpenComposers(true)}
              />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-20 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:opacity-70 supports-[-webkit-touch-callout:none]:absolute" />
              <Dialog.Popup className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#121212] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl z-50 border border-[#2C2C2C] transition-all duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 dark:outline-gray-300">
                <div className="flex items-center justify-between p-6 border-b border-[#2C2C2C]">
                  <div className="flex items-center gap-3">
                    <div>
                      <Dialog.Title className="text-lg font-bold text-white">
                        Sélectionner des compositeurs
                      </Dialog.Title>
                    </div>
                  </div>
                  <Dialog.Close className="w-8 h-8 rounded-full hover:bg-[#2C2C2C] flex items-center justify-center transition-colors cursor-pointer">
                    <IoClose className="text-[#BDBDBD]" size={18} />
                  </Dialog.Close>
                </div>
                <div className="p-4 space-y-6 max-h-[80vh] overflow-y-auto">
                  <input
                    type="text"
                    placeholder="Rechercher compositeurs..."
                    value={composerSearchTerm}
                    onChange={(e) => setComposerSearchTerm(e.target.value)}
                    className="px-4 py-2 bg-[#121212] text-white rounded-lg border border-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#FF5252] focus:ring-offset-2 focus:ring-offset-[#121212] mb-4 w-full"
                  />
                  <div className="flex flex-wrap gap-2">
                    {filteredComposers
                      .sort((a, b) => b.count - a.count)
                      .map((composer) => (
                        <div
                          key={composer.id}
                          className={`cursor-pointer border px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            selectedComposersFromURL.includes(composer.id)
                              ? "text-white bg-red-700 border-red-700"
                              : "bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700"
                          }`}
                          onClick={() => handleComposerChange(composer.id)}
                          aria-label={`Filtrer par compositeur ${composer.name}`}
                        >
                          <div className="flex items-center gap-1.5">
                            {selectedComposersFromURL.includes(composer.id) && (
                              <FiCheck className="w-3 h-3" />
                            )}
                            <span>
                              {composer.name}: {composer.count}
                            </span>
                          </div>
                        </div>
                      ))
                      .slice(0, 40)}
                  </div>
                </div>
                <div className="p-6 border-t border-[#2C2C2C] bg-[#2C2C2C]/30"></div>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
          {/* Cinematographers */}
          <Dialog.Root
            open={openCinematographers}
            onOpenChange={setOpenCinematographers}
          >
            <Dialog.Trigger>
              <FilterButton
                label="Directeurs photo"
                count={selectedCinematographersFromURL.length}
                onClick={() => setOpenCinematographers(true)}
              />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-20 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:opacity-70 supports-[-webkit-touch-callout:none]:absolute" />
              <Dialog.Popup className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#121212] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl z-50 border border-[#2C2C2C] transition-all duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 dark:outline-gray-300">
                <div className="flex items-center justify-between p-6 border-b border-[#2C2C2C]">
                  <div className="flex items-center gap-3">
                    <div>
                      <Dialog.Title className="text-lg font-bold text-white">
                        Sélectionner des directeurs de la photographie
                      </Dialog.Title>
                    </div>
                  </div>
                  <Dialog.Close className="w-8 h-8 rounded-full hover:bg-[#2C2C2C] flex items-center justify-center transition-colors cursor-pointer">
                    <IoClose className="text-[#BDBDBD]" size={18} />
                  </Dialog.Close>
                </div>
                <div className="p-4 space-y-6 max-h-[80vh] overflow-y-auto">
                  <input
                    type="text"
                    placeholder="Rechercher directeurs de la photographie..."
                    value={cinematographerSearchTerm}
                    onChange={(e) =>
                      setCinematographerSearchTerm(e.target.value)
                    }
                    className="px-4 py-2 bg-[#121212] text-white rounded-lg border border-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#FF5252] focus:ring-offset-2 focus:ring-offset-[#121212] mb-4 w-full"
                  />
                  <div className="flex flex-wrap gap-2">
                    {filteredCinematographers
                      .sort((a, b) => b.count - a.count)
                      .map((cinematographer) => (
                        <div
                          key={cinematographer.id}
                          className={`cursor-pointer border px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            selectedCinematographersFromURL.includes(
                              cinematographer.id
                            )
                              ? "text-white bg-red-700 border-red-700"
                              : "bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700"
                          }`}
                          onClick={() =>
                            handleCinematographersChange(cinematographer.id)
                          }
                          aria-label={`Filtrer par directeur de la photographie ${cinematographer.name}`}
                        >
                          <div className="flex items-center gap-1.5">
                            {selectedCinematographersFromURL.includes(
                              cinematographer.id
                            ) && <FiCheck className="w-3 h-3" />}
                            <span>
                              {cinematographer.name}: {cinematographer.count}
                            </span>
                          </div>
                        </div>
                      ))
                      .slice(0, 40)}
                  </div>
                </div>
                <div className="p-6 border-t border-[#2C2C2C] bg-[#2C2C2C]/30"></div>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </div>
  );
}

function FilterButton({
  label,
  count,
  onClick,
}: {
  label: string;
  count: number;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer px-4 py-2.5 bg-[#2C2C2C] text-white rounded-lg border border-[#4A4A4A] hover:border-[#FF5252] focus:outline-none focus:ring-2 focus:ring-[#FF5252] focus:ring-offset-2 focus:ring-offset-[#121212] transition-all text-left flex items-center justify-between gap-2"
    >
      <span className="text-sm font-medium truncate">{label}</span>
      {count > 0 && (
        <span className="shrink-0 px-2 py-0.5 text-xs font-semibold bg-red-700 text-white rounded-full">
          {count}
        </span>
      )}
    </div>
  );
}
