"use client";
import * as Tooltip from "@radix-ui/react-tooltip";
import type React from "react";

import { useCookiesNext } from "cookies-next";
import Image from "next/image";
import Link from "@/components/utils/Link";
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
import { useRouter } from "next/navigation";

type MovieCardProps = {
  id: number;
  title: string;
  poster_path: string | null;
  poster: string | null;
  release_date: string;
  overview: string;
  watched?: boolean;
  watchlist?: boolean;
  vote_average?: number;
  vote_count?: number;
  runtime?: number;
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

  const router = useRouter();

  const cookies = useCookiesNext();
  const isLogged = cookies.getCookie("isLogged") === "true";
  const userId = cookies.getCookie("userId");

  function switchWatched() {
    setWatched(!watched);
  }

  function switchWatchlist() {
    setWatchlist(!watchlist);
  }

  async function handleWatched(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
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

  async function handleWatchList(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
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
    <Link
      href={`/movie/${movie.id}`}
      className="block group"
      scroll
      aria-label={`Voir les détails du film ${movie.title}`}
    >
      <article className="relative overflow-hidden rounded-lg shadow-lg">
        {movie.poster_path || movie.poster ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${
              movie.poster_path || movie.poster
            }`}
            alt={`Affiche du film ${movie.title}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 group-focus-within:scale-110"
            width={358}
            height={537}
            quality={100}
          />
        ) : (
          <div className="w-full h-64 bg-[#2C2C2C] flex items-center justify-center text-[#BDBDBD]">
            <span className="text-center px-4">{movie.title}</span>
          </div>
        )}

        {/* Status Icons */}
        {isLogged && (
          <>
            {watched && (
              <div className="absolute top-2 left-2 bg-black rounded-full p-1">
                <FaCheck className="text-[#3279e2]" aria-label="Film vu" />
              </div>
            )}
            {watchlist && (
              <div className="absolute top-2 left-8 bg-black rounded-full p-1">
                <FaBookmark
                  className="text-[#4CAF50]"
                  aria-label="Dans la watchlist"
                />
              </div>
            )}
          </>
        )}

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-black/75 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300">
          <h2
            className={`text-white text-md md:text-xl 3xl:text-4xl font-bold mb-2 text-center px-4 ${
              textSelect ? "" : "select-none"
            }`}
          >
            {movie.title}
          </h2>

          {movie.vote_count && !movie.vote_average && (
            <p
              className={`text-[#BDBDBD] text-sm 3xl:text-xl mb-2 ${
                textSelect ? "" : "select-none"
              }`}
            >
              ⭐ {movie.vote_count}
            </p>
          )}

          {movie.vote_average && movie.vote_count && (
            <p
              className={`text-[#BDBDBD] text-sm 3xl:text-xl mb-2 ${
                textSelect ? "" : "select-none"
              }`}
            >
              ⭐ {Number(movie.vote_average.toFixed(2)) / 2} ({movie.vote_count}{" "}
              votes)
            </p>
          )}

          {movie.runtime && (
            <p className="text-[#BDBDBD] text-sm 3xl:text-xl mb-2">
              {movie.runtime} min
            </p>
          )}

          <p
            className={`text-[#BDBDBD] text-sm 3xl:text-xl mb-2 ${
              textSelect ? "" : "select-none"
            }`}
          >
            📅 {new Date(movie.release_date).toLocaleDateString("fr-FR")}
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

          {/* Action Buttons */}
          <div className="flex space-x-4" onClick={(e) => e.stopPropagation()}>
            <Tooltip.TooltipProvider delayDuration={300}>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(`/movie/${movie.id}`);
                    }}
                    className="p-2 bg-[#D32F2F] text-white rounded-full hover:bg-[#B71C1C] transition-colors cursor-pointer"
                    aria-label="Voir les détails du film"
                  >
                    <FaInfoCircle />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="bg-[#2C2C2C] text-white px-3 py-1 rounded-md text-sm"
                    sideOffset={5}
                  >
                    Voir les détails
                    <Tooltip.Arrow className="fill-[#2C2C2C]" />
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
                        onClick={handleWatched}
                        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors cursor-pointer"
                        aria-label={
                          watched ? "Retirer des films vus" : "Marquer comme vu"
                        }
                      >
                        {watched ? <FaEye /> : <FaRegEye />}
                      </button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        className="bg-[#2C2C2C] text-white px-3 py-1 rounded-md text-sm"
                        sideOffset={5}
                      >
                        {watched
                          ? "Enlever des films vus"
                          : "Ajouter aux films vus"}
                        <Tooltip.Arrow className="fill-[#2C2C2C]" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.TooltipProvider>

                <Tooltip.TooltipProvider delayDuration={300}>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <button
                        onClick={handleWatchList}
                        className={`p-2 ${
                          watchlist
                            ? "bg-rose-500 hover:bg-rose-600"
                            : "bg-[#4CAF50] hover:bg-green-600"
                        } text-white rounded-full transition-colors cursor-pointer`}
                        aria-label={
                          watchlist
                            ? "Retirer de la watchlist"
                            : "Ajouter à la watchlist"
                        }
                      >
                        {watchlist ? <FaClock /> : <FaRegClock />}
                      </button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        className="bg-[#2C2C2C] text-white px-3 py-1 rounded-md text-sm"
                        sideOffset={5}
                      >
                        {watchlist
                          ? "Enlever de la watchlist"
                          : "Ajouter à la watchlist"}
                        <Tooltip.Arrow className="fill-[#2C2C2C]" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.TooltipProvider>

                <div
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <AddToListButton
                    userId={userId as string}
                    id={movie.id}
                    type="MOVIE"
                    onSuccess={() => {}}
                    onError={() => {}}
                    alt
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default MovieCard;
