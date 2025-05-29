"use client";
import { Movie } from "@/types/types";
import * as Tooltip from "@radix-ui/react-tooltip";
import { getCookie, setCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { FaBookmark, FaCheck, FaEye, FaEyeSlash } from "react-icons/fa6";
import { IoAdd, IoClose } from "react-icons/io5";

const MovieCard = ({
  movie,
  showDescription,
  textSelect = true,
}: {
  movie: Movie;
  showDescription: boolean;
  textSelect?: boolean;
}) => {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [watched, setWatched] = useState<Movie[]>([]);

  const isInWatchlist = watchlist.some((m) => m.id === movie.id);
  const isInWatched = watched.some((m) => m.id === movie.id);

  const loadLists = async () => {
    const watchlistCookie = await getCookie("watchlist");
    const watchedCookie = await getCookie("watched");

    if (watchlistCookie) {
      try {
        const movies = JSON.parse(
          decodeURIComponent(watchlistCookie)
        ) as Movie[];
        setWatchlist(movies);
      } catch (error) {
        console.error(
          "Erreur lors du parsing des cookies (watchlist) :",
          error
        );
      }
    }

    if (watchedCookie) {
      try {
        const movies = JSON.parse(decodeURIComponent(watchedCookie)) as Movie[];
        setWatched(movies);
      } catch (error) {
        console.error("Erreur lors du parsing des cookies (watched) :", error);
      }
    }
  };

  const addToWatchlist = (movie: Movie) => {
    const updatedWatched = watched.filter((m) => m.id !== movie.id);
    setWatched(updatedWatched);

    const exists = watchlist.some((m) => m.id === movie.id);
    if (!exists) {
      const updatedWatchlist = [...watchlist, movie];
      setWatchlist(updatedWatchlist);
      setCookie("watchlist", JSON.stringify(updatedWatchlist), {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
      setCookie("watched", JSON.stringify(updatedWatched), {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
    }
  };

  const addToWatched = (movie: Movie) => {
    const updatedWatchlist = watchlist.filter((m) => m.id !== movie.id);
    setWatchlist(updatedWatchlist);

    const exists = watched.some((m) => m.id === movie.id);
    if (!exists) {
      const updatedWatched = [...watched, movie];
      setWatched(updatedWatched);
      setCookie("watched", JSON.stringify(updatedWatched), {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
      setCookie("watchlist", JSON.stringify(updatedWatchlist), {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
    }
  };

  const removeFromWatchlist = (id: number) => {
    const updatedWatchlist = watchlist.filter((movie) => movie.id !== id);
    setWatchlist(updatedWatchlist);
    setCookie("watchlist", JSON.stringify(updatedWatchlist), {
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
  };

  const removeFromWatched = (id: number) => {
    const updatedWatched = watched.filter((movie) => movie.id !== id);
    setWatched(updatedWatched);
    setCookie("watched", JSON.stringify(updatedWatched), {
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
  };

  useEffect(() => {
    const provider = async () => {
      try {
        await loadLists();
      } catch (error) {
        console.error(error);
      }
    };
    provider();
  }, []);

  return (
    <article
      tabIndex={0}
      className="relative group overflow-hidden rounded-lg shadow-lg"
    >
      {movie.poster_path ? (
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 group-focus-within:scale-110"
          width={358}
          height={537}
          quality={100}
        />
      ) : (
        <div className="w-full h-64 bg-gray-800 flex items-center justify-center text-gray-200">
          {movie.title}
        </div>
      )}
      {/* Status Icon */}
      {(isInWatchlist || isInWatched) && (
        <div className="absolute top-2 left-2 bg-black bg-opacity-50 rounded-full p-1">
          {isInWatchlist ? (
            <FaBookmark className="text-green-500" />
          ) : (
            <FaCheck className="text-blue-500" />
          )}
        </div>
      )}
      <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300">
        <h2
          className={`text-white text-md md:text-xl 3xl:text-4xl font-bold mb-2 text-center px-4 ${
            textSelect ? "" : "select-none"
          }`}
        >
          {movie.title}
        </h2>
        <p
          className={`text-gray-300 text-sm 3xl:text-xl mb-2 ${
            textSelect ? "" : "select-none"
          }`}
        >
          {new Date(movie.release_date).toLocaleDateString("fr-FR")}
        </p>
        {showDescription && (
          <p
            className={`text-white text-sm 3xl:text-xl mb-4 px-4 text-center line-clamp-4 md:line-clamp-6 ${
              textSelect ? "" : "select-none"
            }`}
          >
            {movie.overview || "Aucune description disponible"}
          </p>
        )}
        <div className="flex space-x-4">
          <Tooltip.TooltipProvider delayDuration={300}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <Link
                  prefetch={false}
                  href={`/movie/${movie.id}`}
                  className="p-2 bg-[#D32F2F] text-white rounded-full  hover:bg-[#FF5252] transition-colors"
                  aria-label="Link to movie"
                >
                  <FaInfoCircle aria-label="Link to movie" />
                </Link>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  className=" bg-[#2C2C2C] text-white px-3 py-1 rounded-md text-sm"
                  sideOffset={5}
                >
                  Voir les détails
                  <Tooltip.Arrow className=" fill-[#2C2C2C]" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.TooltipProvider>
          <Tooltip.TooltipProvider delayDuration={300}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button
                  onClick={() =>
                    isInWatched
                      ? removeFromWatched(movie.id)
                      : addToWatched(movie)
                  }
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors cursor-pointer"
                  aria-label="Watched button"
                >
                  {isInWatched ? (
                    <FaEyeSlash aria-label="Remove from watched" />
                  ) : (
                    <FaEye aria-label="Add to watched" />
                  )}
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  className=" bg-[#2C2C2C] text-white px-3 py-1 rounded-md text-sm"
                  sideOffset={5}
                >
                  {isInWatched
                    ? "Enlever des films vues"
                    : "Ajouter aux films vues"}
                  <Tooltip.Arrow className=" fill-[#2C2C2C]" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.TooltipProvider>
          <Tooltip.TooltipProvider delayDuration={300}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button
                  onClick={() =>
                    isInWatchlist
                      ? removeFromWatchlist(movie.id)
                      : addToWatchlist(movie)
                  }
                  className={`p-2 ${
                    isInWatchlist
                      ? "bg-rose-500 hover:bg-rose-600"
                      : "bg-green-500 hover:bg-green-600"
                  }  text-white rounded-full  transition-colors cursor-pointer`}
                  aria-label="Watchlist button"
                >
                  {isInWatchlist ? (
                    <IoClose aria-label="Remove from watchlist" />
                  ) : (
                    <IoAdd aria-label="Add to watchlist" />
                  )}
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  className=" bg-[#2C2C2C] text-white px-3 py-1 rounded-md text-sm"
                  sideOffset={5}
                >
                  {isInWatchlist
                    ? "Enlever de la watchlist"
                    : "Ajouter a la watchlist"}
                  <Tooltip.Arrow className=" fill-[#2C2C2C]" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.TooltipProvider>
        </div>
      </div>
    </article>
  );
};

export default MovieCard;
