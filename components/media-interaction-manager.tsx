"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import * as Tooltip from "@radix-ui/react-tooltip";
import type { userMediaActivity } from "@/types/types";
import { FaClock, FaEye, FaRegClock, FaRegEye } from "react-icons/fa6";
import AddToListButton from "./add-to-list-button";
import RatingModal from "./rating-modal";
import ToastComponent from "./ui/Toast";

interface systemProps {
  id: number;
  type: "MOVIE" | "TVSHOW";
  title: string;
  userId: string;
  userMediaActivity?: userMediaActivity;
}

export default function MediaInteractionManager({
  id,
  type,
  title,
  userId,
  userMediaActivity,
}: systemProps) {
  const [isRatingModalOpen, setIsRatingModalOpen] = useState<boolean>(false);
  const [watched, setWatched] = useState<boolean>(
    Boolean(userMediaActivity?.watched) ?? false
  );
  const [watchlist, setWatchlist] = useState<boolean>(
    Boolean(userMediaActivity?.watchlist) ?? false
  );
  const [isWatchedHovered, setIsWatchedHovered] = useState(false);
  const [isInWatchListHovered, setIsInWatchListHovered] = useState(false);
  const [toastState, setToastState] = useState<{
    status: number;
    statusText: string;
  } | null>(null);

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
          type: type,
          userId: userId,
          id: id,
        }),
      });
      if (res) console.log("HandleWatched");
      switchWatched();
      console.log({ status: res.status, statusText: res.statusText });
      setToastState({ status: res.status, statusText: res.statusText });
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
          type: type,
          userId: userId,
          id: id,
        }),
      });
      if (res) console.log("HandleWatchlist");
      switchWatchlist();
      setToastState({ status: res.status, statusText: res.statusText });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="rounded-xl shadow-lg">
        <RatingModal
          onSuccess={({ status, statusText }) =>
            setToastState({ status, statusText })
          }
          onError={() => setToastState({ status: 500, statusText: "Erreur" })}
          id={id}
          type={type}
          title={title}
          userId={userId}
          review={userMediaActivity?.review}
        />

        <div className="grid grid-cols-3 gap-6">
          <Tooltip.Provider delayDuration={300}>
            <div className="flex flex-col items-center space-y-3">
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <motion.button
                    onClick={handleWatched}
                    onMouseEnter={() => setIsWatchedHovered(true)}
                    onMouseLeave={() => setIsWatchedHovered(false)}
                    className="relative p-4 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-200 group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Watched button"
                  >
                    {watched ? (
                      <FaEye
                        color="#D32F2F"
                        size={32}
                        aria-label="Remove from watched"
                      />
                    ) : (
                      <FaRegEye
                        className="text-gray-400 group-hover:text-[#D32F2F] transition-colors duration-200"
                        size={32}
                        aria-label="Add to watched"
                      />
                    )}
                  </motion.button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="bg-[#212121] text-[#F5F5F5] px-3 py-1.5 rounded-md text-sm font-medium shadow-md z-50"
                    sideOffset={5}
                  >
                    {watched && isWatchedHovered
                      ? "Enlever des regardés"
                      : watched
                      ? "Vue"
                      : "Marquer comme regardé"}
                    <Tooltip.Arrow className="fill-[#212121]" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
              <div className="text-center">
                <p className="text-sm font-medium text-white">
                  {watched && isWatchedHovered
                    ? "Enlever"
                    : watched
                    ? "Vue"
                    : "Marquer comme regardé"}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <motion.button
                    onClick={handleWatchList}
                    onMouseEnter={() => setIsInWatchListHovered(true)}
                    onMouseLeave={() => setIsInWatchListHovered(false)}
                    className="relative p-4 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-200 group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Watchlist button"
                  >
                    {watchlist ? (
                      <FaClock
                        color="#4CAF50"
                        size={32}
                        aria-label="Remove from watchlist"
                      />
                    ) : (
                      <FaRegClock
                        className="text-gray-400 group-hover:text-[#4CAF50] transition-colors duration-200"
                        size={32}
                        aria-label="Add to watchlist"
                      />
                    )}
                  </motion.button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="bg-[#212121] text-[#F5F5F5] px-3 py-1.5 rounded-md text-sm font-medium shadow-md z-50"
                    sideOffset={5}
                  >
                    {watchlist && isInWatchListHovered
                      ? "Elever de la watchlist"
                      : watchlist
                      ? "Dans la watchlist"
                      : "Ajouter à la watchlist"}
                    <Tooltip.Arrow className="fill-[#212121]" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
              <div className="text-center">
                <p className="text-sm font-medium text-white">
                  {watchlist && isInWatchListHovered
                    ? "Enlever"
                    : watchlist
                    ? "Dans la watchlist"
                    : "Ajouter à la watchlist"}
                </p>
              </div>
            </div>
          </Tooltip.Provider>

          <AddToListButton
            userId={userId}
            id={id}
            type={type}
            onSuccess={() => console.log("OnSuccess a faire")}
            onError={() => console.log("OnError a faire")}
          />
        </div>
      </div>

      {/* Modal */}
      {isRatingModalOpen && (
        <RatingModal
          onSuccess={({ status, statusText }) =>
            setToastState({ status, statusText })
          }
          onError={() => setToastState({ status: 500, statusText: "Erreur" })}
          id={id}
          type={type}
          title={title}
          userId={userId}
          review={userMediaActivity?.review}
        />
      )}
      {toastState && (
        <ToastComponent
          key={`${toastState.status}-${toastState.statusText}`}
          status={toastState.status}
          statusText={toastState.statusText}
        />
      )}
    </div>
  );
}
