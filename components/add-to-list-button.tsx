import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
        <motion.button
          className="relative p-4 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Add to list button"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus color="#4CAF50" size={32} aria-label="Add to list" />
        </motion.button>
        <div className="text-center">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            Add to list
          </p>
        </div>
      </div>
      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Overlay/Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
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
                <AddToListModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  userId={userId}
                  id={id}
                  type={type}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
