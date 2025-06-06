"use client";
import { motion } from "framer-motion";
import Loading from "@/app/loading";
import TVShowCard from "@/components/cards/TVShowCard";
import { NetworkType, TVShow } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaGlobe, FaMapMarkerAlt } from "react-icons/fa";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [info, setInfo] = useState<NetworkType | null>(null);
  const [results, setResults] = useState<TVShow[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const params = useParams<{ networkId: string }>();
  const networkId = params.networkId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const url = `/api/search/network?networkId=${networkId}&type=${"tv"}&page=${1}`;
        const response = await fetch(url);
        const data = await response.json();
        setInfo(data.networkInfo);
        setResults(data.results);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [networkId]);

  const loadMore = async () => {
    if (currentPage < totalPages) {
      try {
        setLoadingMore(true);
        const url = `/api/search/network?networkId=${networkId}&type=${"tv"}&page=${
          currentPage + 1
        }`;
        const response = await fetch(url);
        const data = await response.json();
        setResults((prev) => [...prev, ...data.results]);
        setCurrentPage((prev) => prev + 1);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingMore(false);
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#121212] text-white"
    >
      <main className="p-4 max-w-full sm:max-w-[70vw] 3xl:max-w-[80vw] mx-auto">
        {info && (
          <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-full md:w-1/4 flex justify-center">
                <Image
                  src={`https://image.tmdb.org/t/p/w200${info.logo_path}`}
                  alt={info.name}
                  width={200}
                  height={64}
                  className="rounded-lg"
                />
              </div>
              <div className="w-full md:w-3/4">
                <h1 className="text-4xl font-bold text-red-500 mb-4">
                  {info.name}
                </h1>
                <div className="flex flex-col gap-2 text-[#A1A1A1]">
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-red-500" />
                    <span>{info.headquarters}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-red-500">Pays d&apos;origine:</span>
                    <span>{info.origin_country}</span>
                  </p>
                  <Link
                    prefetch={false}
                    href={info.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#1E40AF] hover:text-red-500 transition-colors duration-300"
                  >
                    <FaGlobe />
                    <span>Site Officiel</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        {results.length > 0 && (
          <section className="my-8">
            <h2 className="mb-4 text-2xl font-bold text-red-500">Séries</h2>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
              {results.map((tvShow) => (
                <TVShowCard key={tvShow.id} tvShow={tvShow} showDescription />
              ))}
            </div>
            {currentPage < totalPages && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg disabled:bg-red-300"
                >
                  {loadingMore ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </section>
        )}
      </main>
    </motion.div>
  );
}
