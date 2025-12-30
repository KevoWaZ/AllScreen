"use client";
import { useCallback, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FiBarChart2, FiStar, FiCalendar, FiTrendingUp } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { getCookie } from "cookies-next/client";
import { useParams } from "next/navigation";
import {
  FaBuilding,
  FaFilm,
  FaMusic,
  FaPenNib,
  FaUser,
  FaUserShield,
  FaUserTie,
} from "react-icons/fa6";
import { FaSlidersH } from "react-icons/fa";

// --- Interfaces ---
interface YearData {
  year: number;
  count: number;
  sumRatings: number;
  averageRating: number;
}

interface Film {
  id: number;
  title: string;
  rating: number;
  year: number;
  poster: string;
}

interface DecadeData {
  decade: number;
  count: number;
  sumRatings: number;
  averageRating: number;
  topFilms: Film[];
}

interface TopCrews {
  topDirectors: Array<{
    id: number;
    name: string;
    profile_path?: string;
    logo_path?: string;
    count: number;
    avg_rating?: number;
  }>;
  topProducers: Array<{
    id: number;
    name: string;
    profile_path?: string;
    logo_path?: string;
    count: number;
    avg_rating?: number;
  }>;
  topExecProducers: Array<{
    id: number;
    name: string;
    profile_path?: string;
    logo_path?: string;
    count: number;
    avg_rating?: number;
  }>;
  topWriters: Array<{
    id: number;
    name: string;
    profile_path?: string;
    logo_path?: string;
    count: number;
    avg_rating?: number;
  }>;
  topComposers: Array<{
    id: number;
    name: string;
    profile_path?: string;
    logo_path?: string;
    count: number;
    avg_rating?: number;
  }>;
  topCinematographers: Array<{
    id: number;
    name: string;
    profile_path?: string;
    logo_path?: string;
    count: number;
    avg_rating?: number;
  }>;
  topActors: Array<{
    id: number;
    name: string;
    profile_path: string;
    logo_path: string;
    count: number;
    avg_rating?: number;
  }>;
  topCompanies: Array<{
    id: number;
    name: string;
    profile_path?: string;
    logo_path?: string;
    count: number;
    avg_rating?: number;
  }>;
  topRatedDirectors: Array<{
    id: number;
    name: string;
    profile_path?: string;
    logo_path?: string;
    avg_rating: number;
    count: number;
  }>;
  topRatedProducers: Array<{
    id: number;
    name: string;
    profile_path?: string;
    logo_path?: string;
    avg_rating: number;
    count: number;
  }>;
  topRatedExecProducers: Array<{
    id: number;
    name: string;
    profile_path?: string;
    logo_path?: string;
    avg_rating: number;
    count: number;
  }>;
  topRatedWriters: Array<{
    id: number;
    name: string;
    profile_path?: string;
    logo_path?: string;
    avg_rating: number;
    count: number;
  }>;
  topRatedComposers: Array<{
    id: number;
    name: string;
    profile_path?: string;
    logo_path?: string;
    avg_rating: number;
    count: number;
  }>;
  topRatedCinematographers: Array<{
    id: number;
    name: string;
    profile_path?: string;
    logo_path?: string;
    avg_rating: number;
    count: number;
  }>;
  topRatedActors: Array<{
    id: number;
    name: string;
    profile_path?: string;
    logo_path?: string;
    avg_rating: number;
    count: number;
  }>;
  topRatedCompanies: Array<{
    id: number;
    name: string;
    profile_path?: string;
    logo_path?: string;
    avg_rating: number;
    count: number;
  }>;
}

interface TopGenres {
  topGenres: Array<{
    id: number;
    name: string;
    count: number;
  }>;
  topRatedGenres: Array<{
    id: number;
    name: string;
    avg_rating: number;
    count: number;
  }>;
}

interface TopWatchlists {
  topDirectors: Array<{
    id: number;
    name: string;
    profile_path: string;
    logo_path: string;
    count: number;
  }>;
  topProducers: Array<{
    id: number;
    name: string;
    profile_path: string;
    logo_path: string;
    count: number;
  }>;
  topExecProducers: Array<{
    id: number;
    name: string;
    profile_path: string;
    logo_path: string;
    count: number;
  }>;
  topWriters: Array<{
    id: number;
    name: string;
    profile_path: string;
    logo_path: string;
    count: number;
  }>;
  topComposers: Array<{
    id: number;
    name: string;
    profile_path: string;
    logo_path: string;
    count: number;
  }>;
  topCinematographers: Array<{
    id: number;
    name: string;
    profile_path: string;
    logo_path: string;
    count: number;
  }>;
  topActors: Array<{
    id: number;
    name: string;
    profile_path: string;
    logo_path: string;
    count: number;
  }>;
  topCompanies: Array<{
    id: number;
    name: string;
    profile_path: string;
    logo_path: string;
    count: number;
  }>;
}

// --- Genre Color Mapping Utility ---
const genreGradients: Record<number, string> = {
  35: "from-red-500/20 to-orange-500/20 border-red-500/40", // Comédie
  18: "from-cyan-500/20 to-teal-500/20 border-cyan-500/40", // Drame
  10749: "from-pink-500/20 to-rose-500/20 border-pink-500/40", // Romance
  80: "from-emerald-500/20 to-green-500/20 border-emerald-500/40", // Crime
  12: "from-amber-500/20 to-yellow-500/20 border-amber-500/40", // Aventure
  28: "from-purple-500/20 to-violet-500/20 border-purple-500/40", // Action
  878: "from-blue-500/20 to-indigo-500/20 border-blue-500/40", // Science-Fiction
  16: "from-yellow-400/20 to-orange-400/20 border-yellow-400/40", // Animation
  10751: "from-sky-400/20 to-blue-400/20 border-sky-400/40", // Familial
  9648: "from-indigo-400/20 to-purple-400/20 border-indigo-400/40", // Mystère
  99: "from-orange-400/20 to-red-400/20 border-orange-400/40", // Documentaire
  14: "from-fuchsia-500/20 to-purple-500/20 border-fuchsia-500/40", // Fantastique
  27: "from-gray-700/20 to-gray-900/20 border-gray-700/40", // Horreur
  10752: "from-stone-600/20 to-slate-700/20 border-stone-600/40", // Guerre
  53: "from-red-600/20 to-rose-600/20 border-red-600/40", // Thriller
  36: "from-amber-600/20 to-orange-600/20 border-amber-600/40", // Histoire
  10770: "from-lime-500/20 to-green-500/20 border-lime-500/40", // Téléfilm
  37: "from-yellow-700/20 to-amber-700/20 border-yellow-700/40", // Western
  10402: "from-pink-400/20 to-rose-400/20 border-pink-400/40", // Musique
};

// --- Utility Function to Get Genre Gradient ---
const getGenreGradient = (genreId: number) => {
  return (
    genreGradients[genreId] ||
    "from-gray-600/20 to-gray-700/20 border-gray-600/40"
  );
};

// --- Utility Function to Calculate Max Value for Progress Bars ---
const getMaxValue = (genreRatingType: string, topGenres: TopGenres | null) => {
  if (genreRatingType === "count") {
    return Math.max(...(topGenres?.topGenres?.map((g) => g.count) || [1]));
  } else {
    return 5; // Max rating is 5
  }
};

// --- Composant Principal ---
export default function MovieStatsVariation2() {
  // --- États ---
  const [activeTab, setActiveTab] = useState<"count" | "rating">("count");
  const [ratingType, setRatingType] = useState<"count" | "rating">("count");
  const [genreRatingType, setGenreRatingType] = useState<"count" | "rating">(
    "count"
  );
  const [filter, setFilter] = useState<string>("actors");
  const [watchlistsFilter, setWatchlistsFilter] = useState<string>("actors");
  const [yearData, setYearData] = useState<YearData[]>([]);
  const [decadeData, setDecadeData] = useState<DecadeData[]>([]);
  const [topCrews, setTopCrews] = useState<TopCrews | null>(null);
  const [topGenres, setTopGenres] = useState<TopGenres | null>(null);
  const [topWatchlists, setTopWatchlists] = useState<TopWatchlists | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  // --- Hooks ---
  const params = useParams<{ username: string }>();
  const cookieUsername = getCookie("username");
  const matchUsername = cookieUsername === params.username;
  const isLogged = getCookie("isLogged") === "true";
  const userId = getCookie("userId");

  // --- Fonctions ---
  const getData = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/profile/stats/allTime/v2?isLogged=${isLogged}&matchUser=${matchUsername}&userId=${userId}&username=${params.username}`
      );
      const data = await response.json();
      setYearData(data.finalResultByYear || []);
      setDecadeData(data.finalResultByDecade || []);
      setTopCrews(data.topCrews || null);
      setTopGenres(data.topGenres || null);
      setTopWatchlists(data.topWatchlists || null);
    } catch (error) {
      console.error(error);
      setYearData([]);
      setDecadeData([]);
    } finally {
      setLoading(false);
    }
  }, [isLogged, matchUsername, params.username, userId]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleFilterChange = (filterType: string) => setFilter(filterType);
  const handleWatchlistsFilterChange = (watchlistsFilterType: string) =>
    setWatchlistsFilter(watchlistsFilterType);

  const getFilteredCrewData = () => {
    if (!topCrews) return [];
    switch (filter) {
      case "directors":
        return ratingType === "count"
          ? topCrews.topDirectors
          : topCrews.topRatedDirectors;
      case "producers":
        return ratingType === "count"
          ? topCrews.topProducers
          : topCrews.topRatedProducers;
      case "execProducers":
        return ratingType === "count"
          ? topCrews.topExecProducers
          : topCrews.topRatedExecProducers;
      case "writers":
        return ratingType === "count"
          ? topCrews.topWriters
          : topCrews.topRatedWriters;
      case "composers":
        return ratingType === "count"
          ? topCrews.topComposers
          : topCrews.topRatedComposers;
      case "cinematographers":
        return ratingType === "count"
          ? topCrews.topCinematographers
          : topCrews.topRatedCinematographers;
      case "actors":
        return ratingType === "count"
          ? topCrews.topActors
          : topCrews.topRatedActors;
      case "companies":
        return ratingType === "count"
          ? topCrews.topCompanies
          : topCrews.topRatedCompanies;
      default:
        return [];
    }
  };

  const getWatchlistsFilteredCrewData = () => {
    if (!topWatchlists) return [];
    switch (watchlistsFilter) {
      case "directors":
        return topWatchlists.topDirectors;
      case "producers":
        return topWatchlists.topProducers;
      case "execProducers":
        return topWatchlists.topExecProducers;
      case "writers":
        return topWatchlists.topWriters;
      case "composers":
        return topWatchlists.topComposers;
      case "cinematographers":
        return topWatchlists.topCinematographers;
      case "actors":
        return topWatchlists.topActors;
      case "companies":
        return topWatchlists.topCompanies;
      default:
        return [];
    }
  };

  const getFilterTitle = () => {
    const titles: Record<string, string> = {
      directors: "Réalisateurs",
      producers: "Producteurs",
      execProducers: "Producteurs Exécutifs",
      writers: "Scénaristes",
      composers: "Compositeurs",
      cinematographers: "Directeurs de la Photographie",
      actors: "Acteurs",
      companies: "Companies",
    };
    return titles[filter] || "";
  };

  const getWatchlistsFilterTitle = () => {
    const titles: Record<string, string> = {
      directors: "Réalisateurs",
      producers: "Producteurs",
      execProducers: "Producteurs Exécutifs",
      writers: "Scénaristes",
      composers: "Compositeurs",
      cinematographers: "Directeurs de la Photographie",
      actors: "Acteurs",
      companies: "Companies",
    };
    return titles[watchlistsFilter] || "";
  };

  const getFilterJob = () => {
    const jobs: Record<string, string> = {
      directors: "directors",
      producers: "producers",
      execProducers: "execProducers",
      writers: "writers",
      composers: "composers",
      cinematographers: "cinematographers",
      actors: "actors",
      companies: "companies",
    };
    return jobs[filter] || "";
  };

  const getWatchlistsFilterJob = () => {
    const jobs: Record<string, string> = {
      directors: "directors",
      producers: "producers",
      execProducers: "execProducers",
      writers: "writers",
      composers: "composers",
      cinematographers: "cinematographers",
      actors: "actors",
      companies: "companies",
    };
    return jobs[watchlistsFilter] || "";
  };

  const chartData = yearData.map((item) => ({
    year: item.year,
    count: item.count,
    rating: Math.round(item.averageRating * 10) / 10,
  }));

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{ value: number }>;
    label?: string;
  }) => {
    if (!active || !payload || !payload.length) return null;
    return (
      <div className="bg-[#2c2c2c] rounded-lg p-3 shadow-lg border border-[#4a4a4a]">
        <p className="text-gray-300 font-semibold">{`Année: ${label}`}</p>
        {activeTab === "count" ? (
          <p className="text-[#D32F2F]">{`Films: ${payload[0].value}`}</p>
        ) : (
          <p className="text-[#4CAF50]">{`Note: ${payload[0].value}/5`}</p>
        )}
      </div>
    );
  };

  const handleBarClick = (data: { year: string }) => {
    if (data?.year) window.open(`/${params.username}/movies?year=${data.year}`);
  };

  const totalFilms = yearData.reduce((acc, year) => acc + year.count, 0);
  const avgRating =
    yearData.length > 0
      ? (
          yearData.reduce((acc, year) => acc + year.sumRatings, 0) / totalFilms
        ).toFixed(1)
      : "N/A";

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-white text-xl">Chargement en cours...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-3">
            {matchUsername
              ? "Statistiques de vos notes"
              : `Statistiques des notes de ${params.username}`}
          </h1>
          <p className="text-gray-400 text-lg">
            Un aperçu complet de {matchUsername ? "vos" : "ses"} statistiques de
            visionnage
          </p>
        </div>

        {/* Large Stats Cards - 2x2 Grid */}
        <div className="grid grid-cols-2 gap-6 mb-12">
          <div className="bg-linear-to-br from-[#2c2c2c] to-[#1a1a1a] p-4 rounded-2xl border-2 border-[#D32F2F] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D32F2F]/10 rounded-full blur-3xl"></div>
            <FiBarChart2 className="text-2xl md:text-4xl text-[#D32F2F] mb-4" />
            <p className="text-gray-400 text-xs md:text-sm uppercase tracking-wider mb-2">
              films notés
            </p>
            <p className="text-4xl md:text-6xl font-bold mb-2">{totalFilms}</p>
          </div>

          <div className="bg-linear-to-br from-[#2c2c2c] to-[#1a1a1a] p-4 rounded-2xl border-2 border-[#4CAF50] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#4CAF50]/10 rounded-full blur-3xl"></div>
            <FiStar className="text-2xl md:text-4xl text-[#4CAF50] mb-4" />
            <p className="text-gray-400 text-xs md:text-sm uppercase tracking-wider mb-2">
              Note Moyenne
            </p>
            <p className="text-4xl md:text-6xl font-bold mb-2">
              {avgRating}
              <span className="text-2xl md:text-4xl text-gray-400">/5</span>
            </p>
          </div>

          <div className="bg-linear-to-br from-[#2c2c2c] to-[#1a1a1a] p-4 rounded-2xl border border-[#4a4a4a] relative overflow-hidden">
            <FiCalendar className="text-2xl md:text-4xl text-[#D32F2F] mb-4" />
            <p className="text-gray-400 text-xs md:text-sm uppercase tracking-wider mb-2">
              Années actives
            </p>
            <p className="text-3xl md:text-5xl font-bold mb-2">
              {yearData.length}
            </p>
          </div>

          <div className="bg-linear-to-br from-[#2c2c2c] to-[#1a1a1a] p-4 rounded-2xl border border-[#4a4a4a] relative overflow-hidden">
            <FiTrendingUp className="text-2xl md:text-4xl text-[#4CAF50] mb-4" />
            <p className="text-gray-400 text-xs md:text-sm uppercase tracking-wider mb-2">
              Décennies couvertes
            </p>
            <p className="text-3xl md:text-5xl font-bold mb-2">
              {decadeData.length}
            </p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-[#2c2c2c] rounded-2xl p-2 md:p-8 mb-12 border border-[#4a4a4a]">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Par Années</h2>
            <div className="inline-flex gap-2 bg-[#121212] rounded-full p-1 border border-[#4a4a4a]">
              <button
                onClick={() => setActiveTab("count")}
                className={`px-8 py-3 rounded-full font-semibold transition-all ${
                  activeTab === "count"
                    ? "bg-[#D32F2F] text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                } cursor-pointer`}
              >
                Nombre de Films
              </button>
              <button
                onClick={() => setActiveTab("rating")}
                className={`px-8 py-3 rounded-full font-semibold transition-all ${
                  activeTab === "rating"
                    ? "bg-[#4CAF50] text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                } cursor-pointer`}
              >
                Note Moyenne
              </button>
            </div>
          </div>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  left: -33,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#4A4A4A" />
                <XAxis dataKey="year" stroke="#BDBDBD" />
                <YAxis stroke="#BDBDBD" />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey={activeTab === "count" ? "count" : "rating"}
                  fill={activeTab === "count" ? "#D32F2F" : "#4CAF50"}
                  radius={[8, 8, 0, 0]}
                  onClick={handleBarClick}
                  cursor="pointer"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Decades Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Répartition par décennie
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {decadeData.map((decade) => (
              <div
                key={decade.decade}
                className="bg-[#2c2c2c] rounded-2xl p-3 md:p-6 border border-[#4a4a4a]"
              >
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#4a4a4a]">
                  <div>
                    <h3 className="text-3xl font-bold">{decade.decade}s</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#D32F2F]">
                      {decade.count}
                    </p>
                    <p className="text-sm text-gray-400">films</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#4CAF50]">
                      {decade.averageRating.toFixed(1)}
                    </p>
                    <p className="text-sm text-gray-400">note moyenne</p>
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-3">
                  {decade.topFilms.slice(0, 20).map((film, idx) => (
                    <div key={film.id || idx} className="group cursor-pointer">
                      <Link href={`/movie/${film.id}`}>
                        <div className="relative overflow-hidden rounded-xs aspect-2/3 bg-[#4A4A4A]">
                          <Image
                            src={`https://image.tmdb.org/t/p/w300${film.poster}`}
                            alt={film.title}
                            width={100}
                            height={150}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src =
                                "/placeholder.svg?height=150&width=100";
                            }}
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="flex items-center gap-1">
                              <FiStar className="text-[#4CAF50]" />
                              <span className="font-bold">{film.rating}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          {/* Sélecteur de type de classement */}
          <div className="mb-4 flex justify-center gap-4">
            <button
              onClick={() => setRatingType("count")}
              className={`px-4 py-2 rounded-full font-semibold ${
                ratingType === "count"
                  ? "bg-[#D32F2F] text-white"
                  : "bg-[#2c2c2c] text-gray-400"
              }`}
            >
              Par nombre de films
            </button>
            <button
              onClick={() => setRatingType("rating")}
              className={`px-4 py-2 rounded-full font-semibold ${
                ratingType === "rating"
                  ? "bg-[#D32F2F] text-white"
                  : "bg-[#2c2c2c] text-gray-400"
              }`}
            >
              Par moyenne de note
            </button>
          </div>

          {/* Tabs de filtres */}
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            {[
              { key: "actors", icon: FaUser, label: "Acteurs" },
              { key: "directors", icon: FaFilm, label: "Réalisateurs" },
              { key: "producers", icon: FaUserTie, label: "Producteurs" },
              {
                key: "execProducers",
                icon: FaUserShield,
                label: "Prod. Exécutifs",
              },
              { key: "writers", icon: FaPenNib, label: "Scénaristes" },
              { key: "composers", icon: FaMusic, label: "Compositeurs" },
              {
                key: "cinematographers",
                icon: FaSlidersH,
                label: "Dir. Photo",
              },
              { key: "companies", icon: FaBuilding, label: "Companies" },
            ].map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => handleFilterChange(key)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all cursor-pointer ${
                  filter === key
                    ? "bg-[#D32F2F] text-white shadow-lg scale-105"
                    : "bg-[#2c2c2c] text-gray-400 hover:text-white hover:bg-[#3c3c3c] border border-[#4a4a4a]"
                }`}
              >
                <Icon className="text-lg" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Grille des membres d'équipe */}
          <div className="bg-[#2c2c2c] rounded-2xl p-8 border border-[#4a4a4a]">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Top {getFilterTitle()}{" "}
              {ratingType === "count"
                ? "par nombre de films"
                : "par moyenne de note"}
            </h3>
            {getFilteredCrewData().length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {getFilteredCrewData().map((person) => (
                  <div key={person.id}>
                    <Link
                      href={`/${params.username}/movies?${getFilterJob()}=${
                        person.id
                      }`}
                      target="_blank"
                    >
                      <div className="relative overflow-hidden rounded-lg aspect-2/3 bg-[#4A4A4A] mb-3">
                        {person.profile_path || person.logo_path ? (
                          <Image
                            src={
                              person.profile_path || person.logo_path
                                ? `https://image.tmdb.org/t/p/w300${
                                    person.profile_path || person.logo_path
                                  }`
                                : "/placeholder.svg?height=225&width=150"
                            }
                            alt={person.name}
                            width={150}
                            height={225}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src =
                                "/placeholder.svg?height=225&width=150";
                            }}
                          />
                        ) : (
                          person.name
                        )}
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-sm line-clamp-2">
                          {person.name}
                        </p>
                        {ratingType === "count" ? (
                          <p className="text-xs text-gray-400 mt-1">
                            {person.count} {person.count > 1 ? "films" : "film"}
                          </p>
                        ) : (
                          <p className="text-xs text-gray-400 mt-1">
                            Note moyenne: {person.avg_rating?.toFixed(1)} (
                            {person.count} {person.count > 1 ? "films" : "film"}
                            )
                          </p>
                        )}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <p className="text-lg">
                  Aucune donnée disponible pour cette catégorie
                </p>
              </div>
            )}
          </div>
        </div>

        {/* --- Top Genres Section --- */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Vos Genres Favoris</h2>
            <p className="text-gray-400 mb-6">
              Découvrez {matchUsername ? "vos" : "les"} préférences
              cinématographiques
            </p>
            <div className="inline-flex gap-2 bg-[#121212] rounded-full p-1 border border-[#4a4a4a]">
              <button
                onClick={() => setGenreRatingType("count")}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  genreRatingType === "count"
                    ? "bg-[#D32F2F] text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                } cursor-pointer`}
              >
                Nombre de films
              </button>
              <button
                onClick={() => setGenreRatingType("rating")}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  genreRatingType === "rating"
                    ? "bg-[#4CAF50] text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                } cursor-pointer`}
              >
                Moyenne de note
              </button>
            </div>
          </div>

          <div className="bg-[#2c2c2c] rounded-2xl p-8 border border-[#4a4a4a]">
            {genreRatingType === "count" ? (
              topGenres?.topGenres?.length ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {topGenres.topGenres.map((genre) => {
                    const percentage =
                      (genre.count / getMaxValue(genreRatingType, topGenres)) *
                      100;
                    const gradientClass = getGenreGradient(genre.id);
                    return (
                      <Link
                        key={genre.id}
                        href={`/${params.username}/movies?genres=${genre.id}`}
                        target="_blank"
                        className="block"
                      >
                        <div
                          className={`bg-linear-to-br ${gradientClass} rounded-xl p-4 hover:scale-105 transition-all cursor-pointer border`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-bold text-sm">{genre.name}</h4>
                            <span className="text-xs font-bold px-2 py-1 rounded-full bg-black/30">
                              {genre.count}
                            </span>
                          </div>

                          {/* Barre de progression rouge pour count */}
                          <div className="w-full bg-black/30 rounded-full h-2 overflow-hidden">
                            <div
                              className="h-full bg-[#D32F2F] transition-all duration-500 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>

                          <p className="text-xs text-gray-400 mt-2">
                            {genre.count} films
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <p className="text-lg">Aucun genre disponible</p>
                </div>
              )
            ) : topGenres?.topRatedGenres?.length ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {topGenres.topRatedGenres.map((genre) => {
                  const percentage = (genre.avg_rating / 5) * 100;
                  const gradientClass = getGenreGradient(genre.id);
                  return (
                    <Link
                      key={genre.id}
                      href={`/${params.username}/movies?genres=${genre.id}`}
                      target="_blank"
                      className="block"
                    >
                      <div
                        className={`bg-linear-to-br ${gradientClass} rounded-xl p-4 hover:scale-105 transition-all cursor-pointer border`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-sm">{genre.name}</h4>
                          <span className="text-xs font-bold px-2 py-1 rounded-full bg-black/30">
                            {genre.avg_rating.toFixed(1)}
                          </span>
                        </div>

                        {/* Barre de progression verte pour rating */}
                        <div className="w-full bg-black/30 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-[#4CAF50] transition-all duration-500 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>

                        <p className="text-xs text-gray-400 mt-2">
                          Note: {genre.avg_rating.toFixed(1)}/5
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <p className="text-lg">Aucun genre disponible</p>
              </div>
            )}
          </div>
        </div>

        {/* Watchlists */}
        <div>
          {/* introduction */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Vos Watchlists</h2>
            <p className="text-gray-400 text-sm">
              {matchUsername
                ? "Vous avez tant à découvrir, basé sur votre watchlist."
                : `${params.username} a tant à découvrir, basé sur sa watchlist.`}
            </p>
          </div>

          {/* Tabs de filtres */}
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            {[
              { key: "actors", icon: FaUser, label: "Acteurs" },
              { key: "directors", icon: FaFilm, label: "Réalisateurs" },
              { key: "producers", icon: FaUserTie, label: "Producteurs" },
              {
                key: "execProducers",
                icon: FaUserShield,
                label: "Prod. Exécutifs",
              },
              { key: "writers", icon: FaPenNib, label: "Scénaristes" },
              { key: "composers", icon: FaMusic, label: "Compositeurs" },
              {
                key: "cinematographers",
                icon: FaSlidersH,
                label: "Dir. Photo",
              },
              { key: "companies", icon: FaBuilding, label: "Companies" },
            ].map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => handleWatchlistsFilterChange(key)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all cursor-pointer ${
                  watchlistsFilter === key
                    ? "bg-[#D32F2F] text-white shadow-lg scale-105"
                    : "bg-[#2c2c2c] text-gray-400 hover:text-white hover:bg-[#3c3c3c] border border-[#4a4a4a]"
                }`}
              >
                <Icon className="text-lg" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Grille des membres d'équipe - 5 par ligne */}
          <div className="bg-[#2c2c2c] rounded-2xl p-8 border border-[#4a4a4a]">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Top {getWatchlistsFilterTitle()}
            </h3>
            {getWatchlistsFilteredCrewData().length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {getWatchlistsFilteredCrewData().map((person) => (
                  <div key={person.id}>
                    <Link
                      href={`/${
                        params.username
                      }/watchlists-movies?${getWatchlistsFilterJob()}=${
                        person.id
                      }`}
                      target="_blank"
                    >
                      <div className="relative overflow-hidden rounded-lg aspect-2/3 bg-[#4A4A4A] mb-3">
                        {person.profile_path || person.logo_path ? (
                          <Image
                            src={
                              person.profile_path || person.logo_path
                                ? `https://image.tmdb.org/t/p/w300${
                                    person.profile_path || person.logo_path
                                  }`
                                : "/placeholder.svg?height=225&width=150"
                            }
                            alt={person.name}
                            width={150}
                            height={225}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src =
                                "/placeholder.svg?height=225&width=150";
                            }}
                          />
                        ) : (
                          person.name
                        )}
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-sm line-clamp-2">
                          {person.name}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {person.count} {person.count > 1 ? "films" : "film"}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <p className="text-lg">
                  Aucune donnée disponible pour cette catégorie
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
