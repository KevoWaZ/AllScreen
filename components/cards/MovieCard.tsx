"use client";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useCookiesNext } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import {
  FaBookmark,
  FaCheck,
  FaClock,
  FaEye,
  FaRegClock,
  FaRegEye,
} from "react-icons/fa6";
import AddToListButton from "../add-to-list-button";

type MovieCardProps = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
  watched?: boolean;
  watchlist?: boolean;
};

const MovieCard = ({
  movie,
  showDescription,
  textSelect = true,
  showUserAction = true,
}: {
  movie: MovieCardProps;
  showDescription: boolean;
  textSelect?: boolean;
  showUserAction?: boolean;
}) => {
  const [watched, setWatched] = useState<boolean>(
    movie.watched ? movie.watched : false
  );
  const [watchlist, setWatchlist] = useState<boolean>(
    movie.watchlist ? movie.watchlist : false
  );

  const cookies = useCookiesNext();
  const isLogged = cookies.getCookie("isLogged") === "true" ? true : false;
  const userId = cookies.getCookie("userId");

  function switchWatched() {
    setWatched(!watched);
  }

  function switchWatchlist() {
    setWatchlist(!watchlist);
  }

  async function handleWatched() {
    try {
      const res = await fetch("/api/watched", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "MOVIE",
          userId: userId,
          id: movie.id,
        }),
      });
      if (res) console.log("HandleWatched");
      switchWatched();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleWatchList() {
    try {
      const res = await fetch("/api/watchlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "MOVIE",
          userId: userId,
          id: movie.id,
        }),
      });
      if (res) console.log("HandleWatchlist");
      switchWatchlist();
    } catch (error) {
      console.error(error);
    }
  }

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
      {isLogged && (
        <>
          {watched && (
            <div className="absolute top-2 left-2 bg-black/50 rounded-full p-1">
              <FaCheck className="text-blue-500" />
            </div>
          )}
          {watchlist && (
            <div className="absolute top-2 left-8 bg-black/50 rounded-full p-1">
              <FaBookmark className="text-green-500" />
            </div>
          )}
        </>
      )}

      <div className="absolute inset-0 bg-black/75 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300">
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
          {isLogged && showUserAction && (
            <>
              <Tooltip.TooltipProvider delayDuration={300}>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <button
                      onClick={() => handleWatched()}
                      className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors cursor-pointer"
                      aria-label="Watched button"
                    >
                      {watched ? (
                        <FaEye aria-label="Remove from watched" />
                      ) : (
                        <FaRegEye aria-label="Add to watched" />
                      )}
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className=" bg-[#2C2C2C] text-white px-3 py-1 rounded-md text-sm"
                      sideOffset={5}
                    >
                      {watched
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
                      onClick={() => handleWatchList()}
                      className={`p-2 ${
                        watchlist
                          ? "bg-rose-500 hover:bg-rose-600"
                          : "bg-green-500 hover:bg-green-600"
                      }  text-white rounded-full  transition-colors cursor-pointer`}
                      aria-label="Watchlist button"
                    >
                      {watchlist ? (
                        <FaClock aria-label="Remove from watchlist" />
                      ) : (
                        <FaRegClock aria-label="Add to watchlist" />
                      )}
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className=" bg-[#2C2C2C] text-white px-3 py-1 rounded-md text-sm"
                      sideOffset={5}
                    >
                      {watchlist
                        ? "Enlever de la watchlist"
                        : "Ajouter a la watchlist"}
                      <Tooltip.Arrow className=" fill-[#2C2C2C]" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.TooltipProvider>
              <AddToListButton
                userId={userId as string}
                id={movie.id}
                type="MOVIE"
                onSuccess={() => {}}
                onError={() => {}}
                alt
              />
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default MovieCard;
