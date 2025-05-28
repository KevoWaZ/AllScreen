"use client";
import InTheatersSection from "@/components/main-page/InTheatersSection";
import PopularSection from "@/components/main-page/PopularSection";
import SearchComponent from "@/components/main-page/SearchComponent";
import { motion } from "framer-motion";
import TrendingSection from "@/components/main-page/TrendingSection";
import UpcomingSection from "@/components/main-page/UpcomingSection";
import { useEffect, useState } from "react";
import {
  Movie,
  TopTypes,
  TrendingMovies,
  TrendingTv,
  UpcomingTypes,
} from "@/types/types";
import Loading from "@/app/loading";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [trendingMovies, setTrendingMovies] = useState<TrendingMovies | null>(
    null
  );
  const [trendingTv, setTrendingTv] = useState<TrendingTv | null>(null);
  const [top, setTop] = useState<TopTypes | null>(null);
  const [nowPlaying, setNowPlaying] = useState<Movie[] | null>(null);
  const [upcoming, setUpcoming] = useState<UpcomingTypes | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const url = "/api/main-page";
        const response = await fetch(url);
        const data = await response.json();
        if (data) {
          setTrendingMovies(data.trendingMovies);
          setTrendingTv(data.trendingTv);
          setTop(data.tops);
          setNowPlaying(data.nowPlaying);
          setUpcoming(data.upcomings);
        } else {
          console.error("Aucune donnée n'a été récupérée.");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mt-20 relative">
        <SearchComponent />
      </div>
      <div className="p-4 max-w-full sm:max-w-[70vw] 3xl:max-w-[80vw] mx-auto">
        {trendingMovies && trendingTv && (
          <TrendingSection movies={trendingMovies} tv={trendingTv} />
        )}
        {top && <PopularSection movies={top.topMovies} tv={top.topTv} />}
        {nowPlaying && <InTheatersSection movies={nowPlaying} />}
        {upcoming && <UpcomingSection upcoming={upcoming} />}
      </div>
    </motion.div>
  );
}
