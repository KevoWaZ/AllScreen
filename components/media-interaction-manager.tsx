"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import * as Tooltip from "@radix-ui/react-tooltip";
import * as Toast from "@radix-ui/react-toast";
import type { userMediaActivity } from "@/types/types";
import { FaClock, FaEye, FaRegClock, FaRegEye } from "react-icons/fa6";
import AddToListButton from "./add-to-list-button";
import RatingModal from "./rating-modal";

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
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const handleShowToast = (message: string, type: string) => {
    setToast({ show: true, message, type });
  };

  const handleCloseToast = () => {
    setToast({ ...toast, show: false });
  };

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
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="rounded-xl shadow-lg">
        <div className="mb-8">
          <button
            onClick={() => setIsRatingModalOpen(true)}
            className="w-full px-6 py-4 cursor-pointer bg-[#FF5722] hover:bg-[#E64A19] text-white rounded-lg font-semibold text-lg shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            Donnez une note!
          </button>
        </div>

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
            onSuccess={() =>
              handleShowToast("Ajout à la liste réussi!", "success")
            }
            onError={() =>
              handleShowToast("Erreur lors de l'ajout à la liste.", "error")
            }
          />
        </div>
      </div>

      {/* Modal */}
      {isRatingModalOpen && (
        <RatingModal
          isOpen={isRatingModalOpen}
          onClose={() => setIsRatingModalOpen(false)}
          onSuccess={() =>
            handleShowToast("Merci d'avoir donné votre avis!", "success")
          }
          onError={() => handleShowToast("Erreur lors du vote.", "error")}
          id={id}
          type={type}
          title={title}
          userId={userId}
          review={userMediaActivity?.review}
        />
      )}

      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className={`grid grid-cols-[auto_max-content] items-center gap-x-4 rounded-md bg-[#121212] border ${
            toast.type === "success" ? "border-[#25bb45]" : "border-[#D32F2F]"
          } border-[#2C2C2C] p-4 shadow-lg [grid-template-areas:_'title_action'_'description_action'] data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=closed]:animate-hide data-[state=open]:animate-slideIn data-[swipe=end]:animate-swipeOut data-[swipe=cancel]:transition-[transform_200ms_ease-out]`}
          open={toast.show}
          onOpenChange={handleCloseToast}
        >
          <Toast.Title
            className={`font-bold ${
              toast.type === "success" ? "text-[#4CAF50]" : "text-[#D32F2F]"
            }`}
          >
            {toast.type === "success" ? "Success" : "Error"}
          </Toast.Title>
          <Toast.Description className="text-[#BDBDBD]">
            {toast.message}
          </Toast.Description>
          <Toast.Action asChild altText="Close">
            <button className="inline-flex items-center justify-center rounded px-3 py-1 text-sm font-medium bg-[#2C2C2C] hover:bg-[#3C3C3C] text-[#BDBDBD] transition-colors">
              Fermer
            </button>
          </Toast.Action>
        </Toast.Root>
        <Toast.Viewport className="fixed bottom-0 right-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-4 p-6 outline-none" />
      </Toast.Provider>
    </div>
  );
}
