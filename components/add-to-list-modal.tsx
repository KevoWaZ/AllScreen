"use client";
import { Dialog } from "@base-ui-components/react/dialog";
import * as Tooltip from "@radix-ui/react-tooltip";
import { motion } from "framer-motion";
import {
  IoClose,
  IoCheckmarkCircleOutline,
  IoAddCircleOutline,
  IoListOutline,
  IoRemoveCircleOutline,
  IoCloseCircleOutline,
  IoAdd,
} from "react-icons/io5";
import { useCallback, useEffect, useState, useRef } from "react";
import Link from "@/components/utils/Link";
import { FaPlus } from "react-icons/fa6";

interface ListModal {
  id: number;
  type: "MOVIE" | "TVSHOW";
  userId: string;
  onSuccess: () => void;
  onError: () => void;
  alt?: boolean;
}

type List = {
  userId: string;
  id: string;
  name: string;
  description: string | null;
  inList: boolean;
  _count: {
    movies: number;
    TVShows: number;
  };
};

export default function AddToListModal({
  userId,
  id,
  type,
  onSuccess,
  onError,
  alt,
}: ListModal) {
  const [userLists, setUserLists] = useState<List[]>([]);
  const [selectedLists, setSelectedLists] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sendLists, setSendLists] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const getUserLists = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/list/get?userId=${userId}&type=${type}&id=${id}`
      );
      const data = await res.json();
      setUserLists(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [userId, type, id]);

  const toggleList = (listId: string) => {
    setSelectedLists((prev) =>
      prev.includes(listId)
        ? prev.filter((id) => id !== listId)
        : [...prev, listId]
    );
  };

  const handleAddToLists = async () => {
    try {
      setSendLists(true);
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
      if (res.ok) {
        console.log("Lists process");
        onSuccess();
        setSelectedLists([]);
        // Ferme le modal
        if (closeButtonRef.current) {
          closeButtonRef.current.click();
        }
      } else {
        throw new Error("Failed to add to lists");
      }
    } catch (error) {
      onError();
      console.error(error);
    } finally {
      setSendLists(false);
    }
  };

  // Effet de bord pour charger les listes lorsque le modal est ouvert
  useEffect(() => {
    if (isModalOpen) {
      getUserLists();
    }
  }, [isModalOpen, getUserLists]);

  return (
    <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
      <Dialog.Trigger className="flex flex-col items-center space-y-3">
        {alt ? (
          <>
            <Tooltip.Provider delayDuration={300}>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <motion.div
                    className="relative p-4 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-200 group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Add to list button"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <FaPlus
                      color="#4CAF50"
                      size={32}
                      aria-label="Add to list"
                    />
                  </motion.div>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="bg-[#212121] text-[#F5F5F5] px-3 py-1.5 rounded-md text-sm font-medium shadow-md z-50"
                    sideOffset={5}
                  >
                    Ajouter à une liste
                    <Tooltip.Arrow className="fill-[#212121]" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
            <div className="text-center">
              <p className="text-sm font-medium text-white">
                Ajouter à une liste
              </p>
            </div>
          </>
        ) : (
          <Tooltip.TooltipProvider delayDuration={300}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <div
                  className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-full  transition-colors cursor-pointer"
                  aria-label="Add to list button"
                >
                  <IoAdd aria-label="Add to list" />
                </div>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  className=" bg-[#2C2C2C] text-white px-3 py-1 rounded-md text-sm"
                  sideOffset={5}
                >
                  Ajouter a une liste
                  <Tooltip.Arrow className=" fill-[#2C2C2C]" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.TooltipProvider>
        )}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-20 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-70 supports-[-webkit-touch-callout:none]:absolute" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#121212] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl z-50 border border-[#2C2C2C] transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:outline-gray-300">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#2C2C2C]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#D32F2F]/10 rounded-full flex items-center justify-center">
                <IoListOutline className="text-[#D32F2F]" size={20} />
              </div>
              <div>
                <Dialog.Title className="text-lg font-bold text-white">
                  Ajouter à une liste
                </Dialog.Title>
                <Dialog.Description className="text-sm text-[#BDBDBD]">
                  Choisissez vos listes favorites
                </Dialog.Description>
              </div>
            </div>
            <Dialog.Close
              ref={closeButtonRef}
              className="w-8 h-8 rounded-full hover:bg-[#2C2C2C] flex items-center justify-center transition-colors cursor-pointer"
            >
              <IoClose className="text-[#BDBDBD]" size={18} />
            </Dialog.Close>
          </div>
          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin w-6 h-6 border-2 border-[#D32F2F] border-t-transparent rounded-full"></div>
              </div>
            ) : userLists.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[#2C2C2C] rounded-full flex items-center justify-center mx-auto mb-4">
                  <IoListOutline className="text-[#BDBDBD]/40" size={24} />
                </div>
                <p className="text-[#BDBDBD] font-medium">
                  Aucune liste trouvée
                </p>
                <Link
                  href={"/list/create"}
                  target="_blank"
                  className="font-medium text-[#FF5252] hover:underline font-inter"
                >
                  Créer en une
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {userLists.map((list: List) => (
                  <button
                    key={list.id}
                    onClick={() => toggleList(list.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left cursor-pointer ${
                      selectedLists.includes(list.id)
                        ? `${
                            list.inList
                              ? "border-[#D32F2F] bg-[#D32F2F]/5"
                              : "border-[#25bb45] bg-[#25bb45]/5"
                          } `
                        : ` border-[#2C2C2C] ${
                            list.inList
                              ? "hover:border-[#D32F2F]/30"
                              : "hover:border-[#25bb45]/30"
                          } `
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedLists.includes(list.id)
                              ? `${
                                  list.inList
                                    ? "border-[#D32F2F] bg-[#D32F2F]"
                                    : "border-[#25bb45] bg-[#25bb45]"
                                }`
                              : " border-[#BDBDBD]/20"
                          }`}
                        >
                          {list.inList ? (
                            <IoCloseCircleOutline
                              className="text-white"
                              size={14}
                            />
                          ) : (
                            <IoCheckmarkCircleOutline
                              className="text-white"
                              size={14}
                            />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">
                            {list.name}
                          </h3>
                          {list._count && (
                            <p className="text-xs text-[#BDBDBD]">
                              {list._count.movies || 0} films •{" "}
                              {list._count.TVShows || 0} séries
                            </p>
                          )}
                        </div>
                      </div>
                      {list.inList ? (
                        <IoRemoveCircleOutline
                          className={`${
                            selectedLists.includes(list.id)
                              ? "text-[#D32F2F]"
                              : " text-[#BDBDBD]/40"
                          }`}
                          size={20}
                        />
                      ) : (
                        <IoAddCircleOutline
                          className={`${
                            selectedLists.includes(list.id)
                              ? "text-[#25bb45]"
                              : " text-[#BDBDBD]/40"
                          }`}
                          size={20}
                        />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Footer */}
          <div className="p-6 border-t border-[#2C2C2C] bg-[#2C2C2C]/30">
            {selectedLists.length > 0 && (
              <div className="mb-4 text-center">
                <span className="text-sm text-[#4CAF50] font-medium">
                  {selectedLists.length} liste
                  {selectedLists.length > 1 ? "s" : ""} sélectionnée
                  {selectedLists.length > 1 ? "s" : ""}
                </span>
              </div>
            )}
            <div className="flex gap-3">
              <button className="flex-1 px-4 py-3 cursor-pointer text-[#BDBDBD] font-medium rounded-xl border border-[#BDBDBD]/20 hover:bg-[#2C2C2C] transition-colors">
                Annuler
              </button>
              <button
                onClick={handleAddToLists}
                disabled={selectedLists.length === 0 || sendLists}
                className="flex-1 px-4 py-3 cursor-pointer bg-[#FF5722] hover:bg-[#E64A19] disabled:bg-[#212121]/20 disabled:text-[#212121]/40 text-white font-bold rounded-xl transition-colors"
              >
                Valider
              </button>
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
