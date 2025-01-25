"use client";
import { motion } from "framer-motion";
import Loading from "@/app/loading";
import MovieCard from "@/components/cards/MovieCard";
import { Company, Movie } from "@/types/types";
import { obtainCompanyMedias } from "@/utils/company";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaGlobe, FaMapMarkerAlt } from "react-icons/fa";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [info, setInfo] = useState<Company | null>(null);
  const [results, setResults] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const params = useParams<{ companyId: string }>();
  const companyId = params.companyId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { companyInfo, results, totalPages } = await obtainCompanyMedias(
          companyId,
          "movie",
          1
        );
        setInfo(companyInfo);
        setResults(results);
        setTotalPages(totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [companyId]);

  const loadMore = async () => {
    if (currentPage < totalPages) {
      try {
        setLoadingMore(true);
        const { results: newResults } = await obtainCompanyMedias(
          companyId,
          "movie",
          currentPage + 1
        );
        setResults((prev) => [...prev, ...newResults]);
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
      <main className="container mx-auto px-4 py-8">
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
                <h1 className="text-4xl font-bold text-[#F5A623] mb-4">
                  {info.name}
                </h1>
                <div className="flex flex-col gap-2 text-[#A1A1A1]">
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-[#F5A623]" />
                    <span>{info.headquarters}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-[#F5A623]">Pays d&apos;origine:</span>
                    <span>{info.origin_country}</span>
                  </p>
                  {info.homepage && (
                    <Link
                      href={info.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#1E40AF] hover:text-[#F5A623] transition-colors duration-300"
                    >
                      <FaGlobe />
                      <span>Site Officiel</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {results.length > 0 && (
          <section className="my-8">
            <h2 className="mb-4 text-2xl font-bold text-[#F5A623]">Films</h2>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
              {results.map((tvShow) => (
                <MovieCard key={tvShow.id} movie={tvShow} showDescription />
              ))}
            </div>
            {currentPage < totalPages && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg disabled:bg-gray-300"
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
