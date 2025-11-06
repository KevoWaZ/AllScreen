"use client";
import { useCallback, useEffect, useState } from "react";
import { FiSearch, FiSave, FiX, FiInfo, FiCheck } from "react-icons/fi";
import { BiListPlus } from "react-icons/bi";
import { MdTv } from "react-icons/md";
import Loading from "@/app/loading";
import ToastComponent from "@/components/ui/Toast";

interface Item {
  id: number;
  title: string;
  releaseYear?: number;
  startYear?: number;
  type: string;
}

interface User {
  provider: string;
  accountId: string;
}

export default function Page() {
  const [listName, setListName] = useState<string>("");
  const [listDescription, setListDescription] = useState<string>("");
  const [movieSearchTerm, setMovieSearchTerm] = useState<string>("");
  const [moviesList, setMoviesList] = useState<Item[]>([]);
  const [tvShowSearchTerm, setTvShowSearchTerm] = useState<string>("");
  const [tvShowList, setTvShowList] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sendingData, setSendingData] = useState<boolean>(false);
  const [user, setUser] = useState<string>("");
  const [toastState, setToastState] = useState<{
    status: number;
    statusText: string;
  } | null>(null);

  const handleAddItem = (item: Item, type: string) => {
    if (!selectedItems.some((selected) => selected.id === item.id)) {
      const updatedItem = { ...item, type: type };
      setSelectedItems([...selectedItems, updatedItem]);
    }
  };

  const handleRemoveItem = (id: number) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== id));
  };

  const searchMovies = async (value: string) => {
    setMovieSearchTerm(value);
    try {
      const res = await fetch(
        `/api/list/obtain-movies-tvshows?value=${value}&type=movie`
      );
      const data = await res.json();
      setMoviesList(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const searchTVShows = async (value: string) => {
    setTvShowSearchTerm(value);
    try {
      const res = await fetch(
        `/api/list/obtain-movies-tvshows?value=${value}&type=TVShow`
      );
      const data = await res.json();
      setTvShowList(data);
    } catch (error) {
      console.error("Error fetching TV shows:", error);
    }
  };

  const postListData = async (
    items: Item[],
    name: string,
    description: string
  ) => {
    try {
      setSendingData(true);
      const response = await fetch("/api/list/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items, name, description, userId: user }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setToastState({
        status: response.status,
        statusText: response.statusText,
      });
      return response.json();
    } catch (error) {
      console.error(error);
    } finally {
      setSendingData(false);
    }
  };

  const getAccount = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/get-user");
      const data: User = await res.json();
      if (!data) console.log("No accounts");
      setUser(data.accountId);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAccount();
  }, [getAccount]);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-[#121212] text-[#BDBDBD] font-['Inter']">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">
            Créer une nouvelle liste
          </h1>
          <button
            onClick={() =>
              postListData(selectedItems, listName, listDescription)
            }
            disabled={sendingData}
            className={` ${
              sendingData
                ? "bg-[#b71c1c69] hover:bg-[#D32F2F] cursor-not-allowed"
                : "bg-[#B71C1C] hover:bg-[#D32F2F] cursor-pointer"
            } text-white  py-2 px-4 rounded-md font-medium flex items-center transition-colors`}
          >
            <FiSave className="mr-2" size={18} />
            Enregistrer
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-5 lg:col-span-4">
            <div className="bg-[#2C2C2C] rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-6 text-white flex items-center">
                <FiInfo className="mr-2" size={20} />
                Informations
              </h2>

              <div className="mb-4">
                <label htmlFor="listName" className="block mb-2 font-medium">
                  Nom de la liste
                </label>
                <input
                  id="listName"
                  type="text"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                  className="w-full bg-[#121212] border border-[#4A4A4A] rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#D32F2F]"
                  placeholder="Ma liste de films préférés"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="listDescription"
                  className="block mb-2 font-medium"
                >
                  Description
                </label>
                <textarea
                  id="listDescription"
                  value={listDescription}
                  onChange={(e) => setListDescription(e.target.value)}
                  className="w-full bg-[#121212] border border-[#4A4A4A] rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#D32F2F] min-h-[120px]"
                  placeholder="Une description de votre liste..."
                />
              </div>

              <div className="p-4 bg-[#121212] rounded-lg mb-4">
                <div className="flex items-center mb-2">
                  <BiListPlus className="text-[#D32F2F] mr-2" size={20} />
                  <h3 className="font-medium text-white">
                    Éléments sélectionnés
                  </h3>
                </div>
                <p className="text-sm">
                  {selectedItems.length > 0
                    ? `${selectedItems.length} élément${
                        selectedItems.length > 1 ? "s" : ""
                      } dans cette liste`
                    : "Aucun élément sélectionné"}
                </p>
              </div>

              <div className="flex items-center text-sm">
                <div className="w-2 h-2 rounded-full bg-[#4CAF50] mr-2"></div>
                <p>Recherchez et ajoutez des films ou séries à droite</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 lg:col-span-8">
            <div className="bg-[#2C2C2C] rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
                <FiSearch className="mr-2" size={20} />
                Ajouter des films et séries
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="searchMovies"
                    className="block mb-2 font-medium text-white"
                  >
                    Films
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="searchMovies"
                      value={movieSearchTerm}
                      onChange={(e) => searchMovies(e.target.value)}
                      className="w-full bg-[#121212] border border-[#4A4A4A] rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#D32F2F]"
                      placeholder="Rechercher un film..."
                    />
                    <FiSearch
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#BDBDBD]"
                      size={18}
                    />

                    {movieSearchTerm && (
                      <div className="absolute top-full left-0 right-0 bg-[#121212] border border-[#4A4A4A] rounded-md mt-1 max-h-60 overflow-y-auto z-10 shadow-lg">
                        {moviesList.map((movie) => (
                          <button
                            key={movie.id}
                            onClick={() => {
                              handleAddItem(movie, "MOVIE");
                              setMovieSearchTerm("");
                            }}
                            className="w-full text-left p-3 hover:bg-[#2C2C2C] border-b border-[#4A4A4A] last:border-b-0 transition-colors"
                            disabled={selectedItems.some(
                              (item) => item.id === movie.id
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-white font-medium">
                                  {movie.title}
                                </p>
                                <p className="text-[#BDBDBD] text-sm">
                                  {movie.releaseYear}
                                </p>
                              </div>
                              <div className="flex items-center">
                                {selectedItems.some(
                                  (item) => item.id === movie.id
                                ) ? (
                                  <FiCheck
                                    className="text-[#4CAF50] mr-2"
                                    size={16}
                                  />
                                ) : null}
                                <MdTv className="text-[#D32F2F]" size={20} />
                              </div>
                            </div>
                          </button>
                        ))}
                        {moviesList.length === 0 && (
                          <div className="p-3 text-[#BDBDBD] text-center">
                            Aucun film trouvé
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="searchTvShows"
                    className="block mb-2 font-medium text-white"
                  >
                    Séries
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="searchTvShows"
                      value={tvShowSearchTerm}
                      onChange={(e) => searchTVShows(e.target.value)}
                      className="w-full bg-[#121212] border border-[#4A4A4A] rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#D32F2F]"
                      placeholder="Rechercher une série..."
                    />
                    <FiSearch
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#BDBDBD]"
                      size={18}
                    />

                    {tvShowSearchTerm && (
                      <div className="absolute top-full left-0 right-0 bg-[#121212] border border-[#4A4A4A] rounded-md mt-1 max-h-60 overflow-y-auto z-10 shadow-lg">
                        {tvShowList.map((series) => (
                          <button
                            key={series.id}
                            onClick={() => {
                              handleAddItem(series, "TVSHOW");
                              setTvShowSearchTerm("");
                            }}
                            className="w-full text-left p-3 hover:bg-[#2C2C2C] border-b border-[#4A4A4A] last:border-b-0 transition-colors"
                            disabled={selectedItems.some(
                              (item) => item.id === series.id
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-white font-medium">
                                  {series.title}
                                </p>
                                <p className="text-[#BDBDBD] text-sm">
                                  {series.startYear}
                                </p>
                              </div>
                              <div className="flex items-center">
                                {selectedItems.some(
                                  (item) => item.id === series.id
                                ) ? (
                                  <FiCheck
                                    className="text-[#4CAF50] mr-2"
                                    size={16}
                                  />
                                ) : null}
                                <MdTv className="text-[#D32F2F]" size={20} />
                              </div>
                            </div>
                          </button>
                        ))}
                        {tvShowList.length === 0 && (
                          <div className="p-3 text-[#BDBDBD] text-center">
                            Aucune série trouvée
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {selectedItems.length > 0 && (
              <div className="bg-[#2C2C2C] rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white">
                    Éléments sélectionnés
                  </h2>
                  <span className="bg-[#D32F2F] text-white text-sm px-2 py-1 rounded-full">
                    {selectedItems.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {selectedItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center bg-[#121212] rounded-md p-2"
                    >
                      <div className="ml-3 flex-1">
                        <div className="flex items-center">
                          <p className="font-medium text-white">{item.title}</p>
                          <span className="ml-2 text-xs bg-black/50 px-1.5 py-0.5 rounded">
                            {item.releaseYear || item.startYear}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-[#FF5252] hover:text-white p-1"
                      >
                        <FiX size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
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
