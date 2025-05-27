"use client";
import {
  IoClose,
  IoCheckmarkCircleOutline,
  IoAddCircleOutline,
} from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface ListModal {
  id: number;
  type: "MOVIE" | "TVSHOW";
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

export default function AddToListModalV3({
  isOpen,
  onClose,
  userId,
  id,
  type,
}: ListModal) {
  const [userLists, setUserLists] = useState<any>([]);
  const [selectedLists, setSelectedLists] = useState<string[]>([]);

  const getUserLists = async () => {
    try {
      const res = await fetch(`/api/list/get?userId=${userId}`);
      const data = await res.json();
      setUserLists(data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleList = (listId: string) => {
    setSelectedLists((prev) =>
      prev.includes(listId)
        ? prev.filter((id) => id !== listId)
        : [...prev, listId]
    );
  };

  const handleAddToLists = async () => {
    const res = await fetch("/api/list/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: type,
        userId: userId,
        id: id,
        listId: selectedLists,
      }),
    });
    onClose();
    setSelectedLists([]);
  };

  useEffect(() => {
    if (isOpen) {
      getUserLists();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 400 }}
            className="bg-white dark:bg-[#121212] rounded-3xl w-full max-w-md overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Compact */}
            <div className="p-6 text-center border-b border-[#F5F5F5] dark:border-[#2C2C2C]">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-[#F5F5F5] dark:hover:bg-[#2C2C2C] flex items-center justify-center transition-colors"
              >
                <IoClose
                  className="text-[#212121] dark:text-[#BDBDBD]"
                  size={20}
                />
              </button>
              <h2 className="text-xl font-bold text-[#212121] dark:text-white mb-2">
                Ajouter à une liste
              </h2>
              <p className="text-sm text-[#212121]/60 dark:text-[#BDBDBD]">
                Sélectionnez une ou plusieurs listes
              </p>
            </div>

            {/* Content */}
            <div className="p-6">
              {userLists.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-[#F5F5F5] dark:bg-[#2C2C2C] rounded-full flex items-center justify-center mx-auto mb-3">
                    <IoAddCircleOutline
                      className="text-[#212121]/40 dark:text-[#BDBDBD]/40"
                      size={20}
                    />
                  </div>
                  <p className="text-[#212121] dark:text-[#BDBDBD] font-medium text-sm">
                    Aucune liste trouvée
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Selected Counter */}
                  {selectedLists.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="bg-[#4CAF50]/10 border border-[#4CAF50]/20 rounded-xl p-3 text-center"
                    >
                      <p className="text-[#4CAF50] font-medium text-sm">
                        {selectedLists.length}{" "}
                        {selectedLists.length > 1
                          ? "listes sélectionnées"
                          : "liste sélectionnée"}
                      </p>
                    </motion.div>
                  )}

                  {/* Lists as Chips */}
                  <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto">
                    {userLists.map((list: any, index: number) => (
                      <motion.button
                        key={list.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                          selectedLists.includes(list.id)
                            ? "bg-[#D32F2F] text-white shadow-md"
                            : "bg-[#F5F5F5] dark:bg-[#2C2C2C] text-[#212121] dark:text-[#BDBDBD] hover:bg-[#D32F2F]/10 hover:text-[#D32F2F]"
                        }`}
                        onClick={() => toggleList(list.id)}
                      >
                        {selectedLists.includes(list.id) ? (
                          <IoCheckmarkCircleOutline size={16} />
                        ) : (
                          <IoAddCircleOutline size={16} />
                        )}
                        <span>{list.name}</span>
                        {list._count && (
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              selectedLists.includes(list.id)
                                ? "bg-white/20"
                                : "bg-[#212121]/10 dark:bg-[#BDBDBD]/10"
                            }`}
                          >
                            Films: {list._count.movies || 0} Séries:{" "}
                            {list._count.TVShows || 0}
                          </span>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 text-[#212121] dark:text-[#BDBDBD] font-medium rounded-xl hover:bg-[#F5F5F5] dark:hover:bg-[#2C2C2C] transition-colors"
                >
                  Annuler
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToLists}
                  disabled={selectedLists.length === 0}
                  className="flex-1 px-4 py-3 bg-[#FF5722] hover:bg-[#E64A19] disabled:bg-[#212121]/20 disabled:text-[#212121]/40 text-white font-medium rounded-xl transition-colors"
                >
                  Valider
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
