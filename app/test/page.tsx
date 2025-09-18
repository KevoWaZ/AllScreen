"use client";
import { useEffect, useState } from "react";
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
import Link from "next/link";
import Image from "next/image";

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

export default function MovieStatsPage() {
  const [activeTab, setActiveTab] = useState<"count" | "rating">("count");
  const [yearData, setYearData] = useState<YearData[]>([]);
  const [decadeData, setDecadeData] = useState<DecadeData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getData = async () => {
    try {
      const response = await fetch("/api/test");
      const data = await response.json();
      console.log(data);
      setYearData(data.finalResultByYear || []);
      setDecadeData(data.finalResultByDecade || []);
      return data;
    } catch (error) {
      console.error(error);
      setYearData([]);
      setDecadeData([]);
    }
  };

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
  }, []);

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
        <div className="chart-container p-3 shadow-lg">
          <p className="text-gray-300 font-semibold">{`Année: ${label}`}</p>
          {activeTab === "count" ? (
            <p className="text-red-500">{`Films vus: ${payload[0].value}`}</p>
          ) : (
            <p className="text-red-500">{`Note moyenne: ${payload[0].value}/5`}</p>
          )}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 font-inter">
            Statistiques de vos films
          </h1>
          <p className="text-gray-300 text-lg">
            Découvrez vos habitudes de visionnage et vos préférences
            cinématographiques
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="stat-card">
            <div className="flex items-center gap-3 mb-2">
              <FiBarChart2 className="text-xl text-[#D32F2F]" />
              <span className="text-gray-300 font-semibold">Total Films</span>
            </div>
            <p className="text-3xl font-bold text-white">
              {yearData.reduce((acc, year) => acc + year.count, 0)}
            </p>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-3 mb-2">
              <FiStar className="text-xl text-[#4CAF50]" />
              <span className="text-gray-300 font-semibold">Note Moyenne</span>
            </div>
            <p className="text-3xl font-bold text-white">
              {yearData.length > 0
                ? (
                    yearData.reduce((acc, year) => acc + year.sumRatings, 0) /
                    yearData.reduce((acc, year) => acc + year.count, 0)
                  ).toFixed(1)
                : "N/A"}
              /5
            </p>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-3 mb-2">
              <FiCalendar className="text-xl text-[#D32F2F]" />
              <span className="text-gray-300 font-semibold">
                Années Actives
              </span>
            </div>
            <p className="text-3xl font-bold text-white">{yearData.length}</p>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-3 mb-2">
              <FiTrendingUp className="text-xl text-[#4CAF50]" />
              <span className="text-gray-300 font-semibold">Décennies</span>
            </div>
            <p className="text-3xl font-bold text-white">{decadeData.length}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="chart-container mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-white font-inter">
              Évolution par année
            </h2>
            {/* Tabs */}
            <div className="flex rounded-lg p-1 border border-[#4A4A4A] bg-[#121212]">
              <button
                onClick={() => setActiveTab("count")}
                className={`px-4 py-2 rounded-md font-semibold transition-all ${
                  activeTab === "count" ? "tab-active" : "tab-inactive"
                }`}
              >
                Nombre de films
              </button>
              <button
                onClick={() => setActiveTab("rating")}
                className={`px-4 py-2 rounded-md font-semibold transition-all ${
                  activeTab === "rating" ? "tab-active" : "tab-inactive"
                }`}
              >
                Note moyenne
              </button>
            </div>
          </div>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#4A4A4A" />
                <XAxis
                  dataKey="year"
                  stroke="#BDBDBD"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#BDBDBD"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey={activeTab === "count" ? "count" : "rating"}
                  fill="#D32F2F"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Decades Section */}
        <div className="space-y-12">
          <h2 className="text-3xl font-bold text-white font-inter mb-8">
            Analyse par décennie
          </h2>
          {decadeData.map((decade) => (
            <div key={decade.decade} className="chart-container">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-white font-inter">
                    Années {decade.decade}s
                  </h3>
                  <div className="flex items-center gap-6 mt-2">
                    <span className="text-gray-300">
                      <span className="font-semibold text-[#D32F2F]">
                        {decade.count}
                      </span>{" "}
                      films vus
                    </span>
                    <span className="text-gray-300">
                      Note moyenne:{" "}
                      <span className="font-semibold text-[#4CAF50]">
                        {decade.averageRating.toFixed(1)}/5
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              {/* Top Films Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-4">
                {decade.topFilms.slice(0, 20).map((film) => (
                  <div key={film.id} className="group cursor-pointer">
                    <Link href={`/movie/${film.id}`} prefetch={false}>
                      <div className="relative overflow-hidden rounded-lg aspect-[2/3] bg-[#4A4A4A]">
                        <Image
                          src={`https://image.tmdb.org/t/p/w300${film.poster}`}
                          alt={film.title}
                          width={358}
                          height={537}
                          quality={100}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src =
                              "/placeholder.svg?height=450&width=300";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-white text-xs font-semibold line-clamp-2 mb-1">
                              {film.title}
                            </p>
                            <div className="flex items-center gap-1">
                              <FiStar className="text-xs text-[#4CAF50]" />
                              <span className="text-xs font-semibold text-[#4CAF50]">
                                {film.rating}/5
                              </span>
                            </div>
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
    </div>
  );
}
