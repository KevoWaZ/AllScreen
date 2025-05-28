"use client";
import * as Dialog from "@radix-ui/react-dialog";
import {
  IoClose,
  IoCheckmarkCircleOutline,
  IoAddCircleOutline,
  IoListOutline,
  IoRemoveCircleOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";
import { useEffect, useState } from "react";

interface ListModal {
  id: number;
  type: "MOVIE" | "TVSHOW";
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

export default function AddToListModal({
  isOpen,
  onClose,
  userId,
  id,
  type,
}: ListModal) {
  const [userLists, setUserLists] = useState<any>([]);
  const [selectedLists, setSelectedLists] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getUserLists = async () => {
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
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#121212] rounded-2xl w-full max-w-lg max-h-[80vh] overflow-hidden shadow-2xl z-50 border border-[#F5F5F5] dark:border-[#2C2C2C]">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#F5F5F5] dark:border-[#2C2C2C]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#D32F2F]/10 rounded-full flex items-center justify-center">
                <IoListOutline className="text-[#D32F2F]" size={20} />
              </div>
              <div>
                <Dialog.Title className="text-lg font-bold text-[#212121] dark:text-white">
                  Ajouter à une liste
                </Dialog.Title>
                <Dialog.Description className="text-sm text-[#212121]/60 dark:text-[#BDBDBD]">
                  Choisissez vos listes favorites
                </Dialog.Description>
              </div>
            </div>
            <Dialog.Close className="w-8 h-8 rounded-full hover:bg-[#F5F5F5] dark:hover:bg-[#2C2C2C] flex items-center justify-center transition-colors">
              <IoClose
                className="text-[#212121] dark:text-[#BDBDBD]"
                size={18}
              />
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
                <div className="w-16 h-16 bg-[#F5F5F5] dark:bg-[#2C2C2C] rounded-full flex items-center justify-center mx-auto mb-4">
                  <IoListOutline
                    className="text-[#212121]/40 dark:text-[#BDBDBD]/40"
                    size={24}
                  />
                </div>
                <p className="text-[#212121] dark:text-[#BDBDBD] font-medium">
                  Aucune liste trouvée
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {userLists.map((list: any) => (
                  <button
                    key={list.id}
                    onClick={() => toggleList(list.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      selectedLists.includes(list.id)
                        ? `${
                            list.inList
                              ? "border-[#D32F2F] bg-[#D32F2F]/5"
                              : "border-[#25bb45] bg-[#25bb45]/5"
                          } `
                        : `border-[#F5F5F5] dark:border-[#2C2C2C] ${
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
                              : "border-[#212121]/20 dark:border-[#BDBDBD]/20"
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
                          <h3 className="font-semibold text-[#212121] dark:text-white">
                            {list.name}
                          </h3>
                          {list._count && (
                            <p className="text-xs text-[#212121]/60 dark:text-[#BDBDBD]">
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
                              : "text-[#212121]/40 dark:text-[#BDBDBD]/40"
                          }`}
                          size={20}
                        />
                      ) : (
                        <IoAddCircleOutline
                          className={`${
                            selectedLists.includes(list.id)
                              ? "text-[#25bb45]"
                              : "text-[#212121]/40 dark:text-[#BDBDBD]/40"
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
          <div className="p-6 border-t border-[#F5F5F5] dark:border-[#2C2C2C] bg-[#F5F5F5]/30 dark:bg-[#2C2C2C]/30">
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
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 text-[#212121] dark:text-[#BDBDBD] font-medium rounded-xl border border-[#212121]/20 dark:border-[#BDBDBD]/20 hover:bg-[#F5F5F5] dark:hover:bg-[#2C2C2C] transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleAddToLists}
                disabled={selectedLists.length === 0}
                className="flex-1 px-4 py-3 bg-[#FF5722] hover:bg-[#E64A19] disabled:bg-[#212121]/20 disabled:text-[#212121]/40 text-white font-bold rounded-xl transition-colors"
              >
                Valider
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
