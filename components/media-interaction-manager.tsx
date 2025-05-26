"use client";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { motion } from "framer-motion";
import RatingModal from "./rating-modal";
import type { userMediaActivity } from "@/types/types";
import { FaClock, FaEye, FaRegClock, FaRegEye } from "react-icons/fa6";

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

  function switchWatched() {
    if (watched) {
      setWatched(false);
    } else {
      setWatched(true);
    }
  }
  function switchWatchlist() {
    if (watchlist) {
      setWatchlist(false);
    } else {
      setWatchlist(true);
    }
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
          type: type,
          userId: userId,
          id: id,
        }),
      });
      switchWatchlist();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="w-full max-w-md mx-auto">
      <div className=" rounded-xl  shadow-lg">
        <div className="mb-8">
          <button
            onClick={() => setIsRatingModalOpen(true)}
            className="w-full px-6 py-4 bg-[#FF5722] hover:bg-[#E64A19] text-white rounded-lg font-semibold text-lg shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            Rate This {type === "MOVIE" ? "Movie" : "TV Show"}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col items-center space-y-3">
            <motion.button
              onClick={handleWatched}
              onMouseEnter={() => setIsWatchedHovered(true)}
              onMouseLeave={() => setIsWatchedHovered(false)}
              className="relative p-4 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 group"
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
                  className="text-gray-600 dark:text-gray-400 group-hover:text-[#D32F2F] transition-colors duration-200"
                  size={32}
                  aria-label="Add to watched"
                />
              )}
            </motion.button>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {watched && isWatchedHovered
                  ? "Remove"
                  : watched
                  ? "Watched"
                  : "Mark as Watched"}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-3">
            <motion.button
              onClick={handleWatchList}
              onMouseEnter={() => setIsInWatchListHovered(true)}
              onMouseLeave={() => setIsInWatchListHovered(false)}
              className="relative p-4 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 group"
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
                  className="text-gray-600 dark:text-gray-400 group-hover:text-[#4CAF50] transition-colors duration-200"
                  size={32}
                  aria-label="Add to watchlist"
                />
              )}
            </motion.button>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {watchlist && isInWatchListHovered
                  ? "Remove"
                  : watchlist
                  ? "In Watchlist"
                  : "Add to Watchlist"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isRatingModalOpen && (
          <>
            {/* Overlay/Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsRatingModalOpen(false)}
              className="fixed inset-0 bg-black/60 z-30"
              style={{ backdropFilter: "blur(4px)" }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.75, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.75, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4"
            >
              <div className="flex flex-col items-center justify-center pointer-events-auto">
                <RatingModal
                  isOpen={isRatingModalOpen}
                  onClose={() => setIsRatingModalOpen(false)}
                  id={id}
                  type={type}
                  title={title}
                  userId={`${userId}`}
                  review={userMediaActivity?.review}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
