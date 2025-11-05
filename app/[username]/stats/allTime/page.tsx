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
import { useParams, useRouter } from "next/navigation";
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
  topDirectors: {
    id: number;
    name: string;
    profile_path: string;
    logo_path: string;
    count: number;
  }[];
  topProducers: {
    id: number;
    name: string;
    profile_path: string;
    logo_path: string;
    count: number;
  }[];
  topExecProducers: {
    id: number;
    name: string;
    profile_path: string;
    logo_path: string;
    count: number;
  }[];
  topWriters: {
    id: number;
    name: string;
    profile_path: string;
    logo_path: string;
    count: number;
  }[];
  topComposers: {
    id: number;
    name: string;
    profile_path: string;
    logo_path: string;
    count: number;
  }[];
  topCinematographers: {
    id: number;
    name: string;
    profile_path: string;
    logo_path: string;
    count: number;
  }[];
  topActors: {
    id: number;
    name: string;
    profile_path: string;
    logo_path: string;
    count: number;
  }[];
  topCompanies: {
    id: number;
    name: string;
    profile_path: string;
    logo_path: string;
    count: number;
  }[];
}

interface TopWatchlists {
  topDirectors: {
    id: number;
    name: string;
    profile_path: string;
    logo_path: string;
    count: number;
  }[];
  topProducers: {
    id: number;
    name: string;
    profile_path: string;
    logo_path: string;
    count: number;
  }[];
  topExecProducers: {
    id: number;
    name: string;
    profile_path: string;
    logo_path: string;
    count: number;
  }[];
  topWriters: {
    id: number;
    name: string;
    profile_path: string;
    logo_path: string;
    count: number;
  }[];
  topComposers: {
    id: number;
    name: string;
    profile_path: string;
    logo_path: string;
    count: number;
  }[];
  topCinematographers: {
    id: number;
    name: string;
    profile_path: string;
    logo_path: string;
    count: number;
  }[];
  topActors: {
    id: number;
    name: string;
    profile_path: string;
    logo_path: string;
    count: number;
  }[];
  topProductionCompanies: {
    id: number;
    name: string;
    profile_path: string;
    logo_path: string;
    count: number;
  }[];
}

export default function MovieStatsVariation2() {
  const [activeTab, setActiveTab] = useState<"count" | "rating">("count");
  const [filter, setFilter] = useState<string>("actors");
  const [watchlistsFilter, setWatchlistsFilter] = useState<string>("actors");
  const [yearData, setYearData] = useState<YearData[]>([]);
  const [decadeData, setDecadeData] = useState<DecadeData[]>([]);
  const [topCrews, setTopCrews] = useState<TopCrews | null>(null);
  const [topWatchlists, setTopWatchlists] = useState<TopWatchlists | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  const params = useParams<{ username: string }>();

  const cookieUsername = getCookie("username");
  const matchUsername = cookieUsername === params.username;

  const isLogged = getCookie("isLogged") === "true" ? true : false;
  const userId = getCookie("userId");

  const getData = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/profile/stats/allTime?isLogged=${isLogged}&matchUser=${matchUsername}&userId=${userId}&username=${params.username}`
      );
      const data = await response.json();
      console.log(data);
      setYearData(data.finalResultByYear || []);
      setDecadeData(data.finalResultByDecade || []);
      setTopCrews(data.topCrews || null);
      setTopWatchlists(data.topWatchlists || null);
      return data;
    } catch (error) {
      console.error(error);
      setYearData([]);
      setDecadeData([]);
    }
  }, [isLogged, matchUsername, params.username, userId]);

  useEffect(() => {
    const load = async () => {
      try {
        await getData();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [getData]);

  const handleFilterChange = (filterType: string) => {
    setFilter(filterType);
  };

  const handleWatchlistsFilterChange = (watchlistsFilterType: string) => {
    setWatchlistsFilter(watchlistsFilterType);
  };

  const getFilteredCrewData = () => {
    if (!topCrews) return [];

    switch (filter) {
      case "directors":
        return topCrews.topDirectors || [];
      case "producers":
        return topCrews.topProducers || [];
      case "execProducers":
        return topCrews.topExecProducers || [];
      case "writers":
        return topCrews.topWriters || [];
      case "composers":
        return topCrews.topComposers || [];
      case "cinematographers":
        return topCrews.topCinematographers || [];
      case "actors":
        return topCrews.topActors || [];
      case "companies":
        return topCrews.topCompanies || [];
      default:
        return [];
    }
  };

  const getWatchlistsFilteredCrewData = () => {
    if (!topWatchlists) return [];

    switch (watchlistsFilter) {
      case "directors":
        return topWatchlists.topDirectors || [];
      case "producers":
        return topWatchlists.topProducers || [];
      case "execProducers":
        return topWatchlists.topExecProducers || [];
      case "writers":
        return topWatchlists.topWriters || [];
      case "composers":
        return topWatchlists.topComposers || [];
      case "cinematographers":
        return topWatchlists.topCinematographers || [];
      case "actors":
        return topWatchlists.topActors || [];
      case "companies":
        return topWatchlists.topProductionCompanies || [];
      default:
        return [];
    }
  };

  const getFilterTitle = () => {
    switch (filter) {
      case "directors":
        return "Réalisateurs";
      case "producers":
        return "Producteurs";
      case "execProducers":
        return "Producteurs Exécutifs";
      case "writers":
        return "Scénaristes";
      case "composers":
        return "Compositeurs";
      case "cinematographers":
        return "Directeurs de la Photographie";
      case "actors":
        return "Acteurs";
      case "companies":
        return "Companies";
      default:
        return "";
    }
  };

  const getWatchlistsFilterTitle = () => {
    switch (watchlistsFilter) {
      case "directors":
        return "Réalisateurs";
      case "producers":
        return "Producteurs";
      case "execProducers":
        return "Producteurs Exécutifs";
      case "writers":
        return "Scénaristes";
      case "composers":
        return "Compositeurs";
      case "cinematographers":
        return "Directeurs de la Photographie";
      case "actors":
        return "Acteurs";
      case "companies":
        return "Companies";
      default:
        return "";
    }
  };

  const getFilterJob = () => {
    switch (filter) {
      case "directors":
        return "directors";
      case "producers":
        return "producers";
      case "execProducers":
        return "execProducers";
      case "writers":
        return "writers";
      case "composers":
        return "composers";
      case "cinematographers":
        return "cinematographers";
      case "actors":
        return "actors";
      case "companies":
        return "companies";
      default:
        return "";
    }
  };

  const getWatchlistsFilterJob = () => {
    switch (watchlistsFilter) {
      case "directors":
        return "directors";
      case "producers":
        return "producers";
      case "execProducers":
        return "execProducers";
      case "writers":
        return "writers";
      case "composers":
        return "composers";
      case "cinematographers":
        return "cinematographers";
      case "actors":
        return "actors";
      case "companies":
        return "companies";
      default:
        return "";
    }
  };

  const chartData = yearData.map((item) => ({
    year: item.year,
    count: item.count,
    rating: Math.round(item.averageRating * 10) / 10,
  }));

  interface TooltipProps {
    active?: boolean;
    payload?: Array<{ value: number }>;
    label?: string;
  }

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
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
    }
    return null;
  };

  interface barData {
    year: string;
  }

  const handleBarClick = (data: barData) => {
    if (data && data.year) {
      window.open(`/${params.username}/movies?year=${data.year}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-white text-xl">Chargement en cours...</div>
      </div>
    );
  }

  const totalFilms = yearData.reduce((acc, year) => acc + year.count, 0);
  const avgRating =
    yearData.length > 0
      ? (
          yearData.reduce((acc, year) => acc + year.sumRatings, 0) /
          yearData.reduce((acc, year) => acc + year.count, 0)
        ).toFixed(1)
      : "N/A";

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Variation 2: Card-Focused Layout with Prominent Metrics */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gradient-to-br from-[#2c2c2c] to-[#1a1a1a] p-8 rounded-2xl border-2 border-[#D32F2F] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D32F2F]/10 rounded-full blur-3xl"></div>
            <FiBarChart2 className="text-4xl text-[#D32F2F] mb-4" />
            <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">
              films notés
            </p>
            <p className="text-6xl font-bold mb-2">{totalFilms}</p>
            <p className="text-gray-400">films dans votre collection</p>
          </div>

          <div className="bg-gradient-to-br from-[#2c2c2c] to-[#1a1a1a] p-8 rounded-2xl border-2 border-[#4CAF50] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#4CAF50]/10 rounded-full blur-3xl"></div>
            <FiStar className="text-4xl text-[#4CAF50] mb-4" />
            <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">
              Note Moyenne
            </p>
            <p className="text-6xl font-bold mb-2">
              {avgRating}
              <span className="text-3xl text-gray-400">/5</span>
            </p>
            <p className="text-gray-400">parmis toutes vos notes</p>
          </div>

          <div className="bg-gradient-to-br from-[#2c2c2c] to-[#1a1a1a] p-8 rounded-2xl border border-[#4a4a4a] relative overflow-hidden">
            <FiCalendar className="text-4xl text-[#D32F2F] mb-4" />
            <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">
              Années actives
            </p>
            <p className="text-5xl font-bold mb-2">{yearData.length}</p>
            <p className="text-gray-400">années de visionnage de films</p>
          </div>

          <div className="bg-gradient-to-br from-[#2c2c2c] to-[#1a1a1a] p-8 rounded-2xl border border-[#4a4a4a] relative overflow-hidden">
            <FiTrendingUp className="text-4xl text-[#4CAF50] mb-4" />
            <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">
              Décennies couvertes
            </p>
            <p className="text-5xl font-bold mb-2">{decadeData.length}</p>
            <p className="text-gray-400">différentes décennies explorées</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-[#2c2c2c] rounded-2xl p-8 mb-12 border border-[#4a4a4a]">
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
              <BarChart data={chartData}>
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
                className="bg-[#2c2c2c] rounded-2xl p-6 border border-[#4a4a4a]"
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
                  {decade.topFilms.slice(0, 10).map((film, idx) => (
                    <div key={film.id || idx} className="group cursor-pointer">
                      <Link href={`/movie/${film.id}`}>
                        <div className="relative overflow-hidden rounded-lg aspect-[2/3] bg-[#4A4A4A]">
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
              {
                key: "companies",
                icon: FaBuilding,
                label: "Companies",
              },
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

          {/* Grille des membres d'équipe - 5 par ligne */}
          <div className="bg-[#2c2c2c] rounded-2xl p-8 border border-[#4a4a4a]">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Top {getFilterTitle()}
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
                      <div className="relative overflow-hidden rounded-lg aspect-[2/3] bg-[#4A4A4A] mb-3">
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
                      <div className="relative overflow-hidden rounded-lg aspect-[2/3] bg-[#4A4A4A] mb-3">
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
