"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import * as Tooltip from "@radix-ui/react-tooltip";
import { FaPlus } from "react-icons/fa6";
import AddToListModal from "./add-to-list-modal";
import { IoAdd } from "react-icons/io5";

interface AddToListButtonProps {
  id: number;
  type: "MOVIE" | "TVSHOW";
  userId: string;
  onSuccess: () => void;
  onError: () => void;
  alt?: boolean;
}

export default function AddToListButton({
  userId,
  id,
  type,
  onSuccess,
  onError,
  alt = false,
}: AddToListButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  if (alt) {
    return (
      <>
        <Tooltip.TooltipProvider delayDuration={300}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                onClick={() => setIsModalOpen(true)}
                className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-full  transition-colors cursor-pointer"
                aria-label="Watchlist button"
              >
                <IoAdd aria-label="Add to watchlist" />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className=" bg-[#2C2C2C] text-white px-3 py-1 rounded-md text-sm"
                sideOffset={5}
              >
                Ajouter a la watchlist
                <Tooltip.Arrow className=" fill-[#2C2C2C]" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.TooltipProvider>

        {/* Modal */}
        {isModalOpen && (
          <>
            <div
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/60 z-30"
              style={{ backdropFilter: "blur(4px)" }}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4">
              <div className="flex flex-col items-center justify-center pointer-events-auto">
                <AddToListModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  userId={userId}
                  id={id}
                  type={type}
                  onSuccess={onSuccess}
                  onError={onError}
                />
              </div>
            </div>
          </>
        )}
      </>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center space-y-3">
        <Tooltip.Provider delayDuration={300}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <motion.button
                className="relative p-4 rounded-full  bg-gray-800  hover:bg-gray-700 transition-all duration-200 group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Add to list button"
                onClick={() => setIsModalOpen(true)}
              >
                <FaPlus color="#4CAF50" size={32} aria-label="Add to list" />
              </motion.button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className=" bg-[#212121] text-[#F5F5F5] px-3 py-1.5 rounded-md text-sm font-medium shadow-md z-50"
                sideOffset={5}
              >
                Ajouter à une liste
                <Tooltip.Arrow className=" fill-[#212121]" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
        <div className="text-center">
          <p className="text-sm font-medium  text-white">Ajouter à une liste</p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <>
          <div
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-black/60 z-30"
            style={{ backdropFilter: "blur(4px)" }}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4">
            <div className="flex flex-col items-center justify-center pointer-events-auto">
              <AddToListModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                userId={userId}
                id={id}
                type={type}
                onSuccess={onSuccess}
                onError={onError}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
