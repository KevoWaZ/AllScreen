"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import * as Tooltip from "@radix-ui/react-tooltip";
import { FaPlus } from "react-icons/fa6";
import AddToListModal from "./add-to-list-modal";

interface AddToListButtonProps {
  id: number;
  type: "MOVIE" | "TVSHOW";
  userId: string;
}

export default function AddToListButton({
  userId,
  id,
  type,
}: AddToListButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
          {/* Overlay/Background */}
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
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
