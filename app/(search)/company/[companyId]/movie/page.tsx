"use client";

import Loading from "@/app/loading";
import MovieCard from "@/components/cards/MovieCard";
import { Company, Movie } from "@/types/types";
import Image from "next/image";
import Link from "@/components/utils/Link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
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
        const url = `/api/search/company?companyId=${companyId}&type=${"movie"}&page=${1}`;
        const response = await fetch(url);
        const data = await response.json();
        setInfo(data.companyInfo);
        setResults(data.results);
        setTotalPages(data.totalPages);
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
        const url = `/api/search/company?companyId=${companyId}&type=${"movie"}&page=${
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
    <main>
      {info && (
        <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-full md:w-1/4 flex justify-center">
              {info.logo_path && (
                <Image
                  src={`https://image.tmdb.org/t/p/w200${info.logo_path}`}
                  alt={info.name}
                  width={200}
                  height={64}
                  className="rounded-lg"
                />
              )}
            </div>
            <div className="w-full md:w-3/4">
              <h1 className="text-4xl font-bold text-red-600 mb-4">
                {info.name}
              </h1>
              <div className="flex flex-col gap-2 text-[#A1A1A1]">
                {info.headquarters && (
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt
                      className="text-red-600"
                      aria-label="location icon"
                    />
                    <span>{info.headquarters}</span>
                  </p>
                )}
                {info.origin_country && (
                  <p className="flex items-center gap-2">
                    <span className="text-red-400">Pays d&apos;origine:</span>
                    <span>{info.origin_country}</span>
                  </p>
                )}
                {info.homepage && (
                  <Link
                    href={info.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-400 hover:text-red-600 transition-colors duration-300"
                  >
                    <FaGlobe aria-label="globe icon" />
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
          <h2 className="mb-4 text-2xl font-bold text-red-600">Films</h2>
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
                className="px-4 py-2 bg-red-600 text-white rounded-lg disabled:bg-red-300 cursor-pointer"
              >
                {loadingMore ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </section>
      )}
    </main>
  );
}
