"use client";

import Loading from "@/app/loading";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FiCalendar, FiFilm, FiTv } from "react-icons/fi";
import Image from "next/image";

interface Movie {
  id: number;
  title: string;
  description: string;
  release_date: string;
  poster: string;
}

interface TVShow {
  id: number;
  title: string;
  description: string;
  release_date: string;
  poster: string;
}

interface ListData {
  name: string;
  description: string;
  movies: Movie[];
  TVShows: TVShow[];
}

export default function ListPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [list, setList] = useState<ListData | null>(null);
  const params = useParams<{ username: string; listId: string }>();

  const getList = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/profile/lists/unique?username=${params.username}&listId=${params.listId}`
      );
      const data = await res.json();
      setList(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [params.username, params.listId]);

  useEffect(() => {
    getList();
  }, [getList]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).getFullYear();
  };

  if (loading) {
    return <Loading />;
  }

  if (!list) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <p className="text-[#BDBDBD] text-lg">Liste non trouvée</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* En-tête de la liste */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 font-['Inter']">
            {list.name}
          </h1>
          <p className="text-[#BDBDBD] text-lg max-w-3xl font-['Inter']">
            {list.description}
          </p>
          <div className="flex items-center gap-6 mt-6 text-[#BDBDBD]">
            <div className="flex items-center gap-2">
              <FiFilm className="text-[#D32F2F]" />
              <span>{list.movies.length} films</span>
            </div>
            <div className="flex items-center gap-2">
              <FiTv className="text-[#D32F2F]" />
              <span>{list.TVShows.length} séries</span>
            </div>
          </div>
        </div>

        {/* Section Films */}
        {list.movies.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-8 flex items-center gap-3 font-['Inter']">
              <FiFilm className="text-[#D32F2F]" />
              Films
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {list.movies.map((movie) => (
                <div
                  key={movie.id}
                  className="bg-[#2C2C2C] rounded-lg overflow-hidden hover:bg-[#3C3C3C] transition-colors duration-200 group"
                >
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
                      alt={movie.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-white mb-2 line-clamp-2 font-['Inter']">
                      {movie.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[#BDBDBD] text-sm mb-3">
                      <FiCalendar size={14} />
                      <span>{formatDate(movie.release_date)}</span>
                    </div>
                    <p className="text-[#BDBDBD] text-sm line-clamp-3 font-['Inter']">
                      {movie.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section Séries TV */}
        {list.TVShows.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-white mb-8 flex items-center gap-3 font-['Inter']">
              <FiTv className="text-[#D32F2F]" />
              Séries TV
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {list.TVShows.map((show) => (
                <div
                  key={show.id}
                  className="bg-[#2C2C2C] rounded-lg overflow-hidden hover:bg-[#3C3C3C] transition-colors duration-200 group"
                >
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${show.poster}`}
                      alt={show.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-white mb-2 line-clamp-2 font-['Inter']">
                      {show.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[#BDBDBD] text-sm mb-3">
                      <FiCalendar size={14} />
                      <span>{formatDate(show.release_date)}</span>
                    </div>
                    <p className="text-[#BDBDBD] text-sm line-clamp-3 font-['Inter']">
                      {show.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Message si la liste est vide */}
        {list.movies.length === 0 && list.TVShows.length === 0 && (
          <div className="text-center py-16">
            <FiFilm className="text-[#D32F2F] text-6xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2 font-['Inter']">
              Liste vide
            </h3>
            <p className="text-[#BDBDBD] font-['Inter']">
              Cette liste ne contient aucun film ou série pour le moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
