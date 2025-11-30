// import page
"use client";
import { useState, useCallback } from "react";
import {
  FiUpload,
  FiFilm,
  FiList,
  FiCheck,
  FiAlertCircle,
  FiX,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const ImportPage = () => {
  const [watchlistFile, setWatchlistFile] = useState<File | null>(null);
  const [watchedFile, setWatchedFile] = useState<File | null>(null);
  const [ratedFile, setRatedFile] = useState<File | null>(null);
  const [isUploadingWatchlist, setIsUploadingWatchlist] = useState(false);
  const [isUploadingWatched, setIsUploadingWatched] = useState(false);
  const [isUploadingRated, setIsUploadingRated] = useState(false);
  const [watchlistMessage, setWatchlistMessage] = useState({
    type: "",
    text: "",
  });
  const [watchedMessage, setWatchedMessage] = useState({ type: "", text: "" });
  const [ratedMessage, setRatedMessage] = useState({ type: "", text: "" });
  const session = authClient.useSession();
  const userId = session.data?.user.id;
  const router = useRouter();

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
  };

  const handleWatchlistUpload = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!watchlistFile) {
        setWatchlistMessage({
          type: "error",
          text: "Veuillez sélectionner un fichier",
        });
        return;
      }
      setIsUploadingWatchlist(true);
      setWatchlistMessage({ type: "", text: "" });
      try {
        const csv = await readFileAsText(watchlistFile);
        const res = await fetch("/api/profile/import/watchlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ csv, userId }),
        });
        if (!res.ok) throw new Error("Erreur lors de l'import");
        const data = await res.json();
        setWatchlistMessage({
          type: "success",
          text: data.message || "Watchlist importée avec succès !",
        });
      } catch (error) {
        setWatchlistMessage({
          type: "error",
          text: `Erreur lors de l'import: ${
            error instanceof Error ? error.message : String(error)
          }`,
        });
      } finally {
        setIsUploadingWatchlist(false);
      }
    },
    [watchlistFile, userId]
  );

  const handleWatchedUploadTMDB = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!watchedFile) {
        setWatchedMessage({
          type: "error",
          text: "Veuillez sélectionner un fichier",
        });
        return;
      }
      setIsUploadingWatched(true);
      setWatchedMessage({ type: "", text: "" });
      try {
        const csv = await readFileAsText(watchedFile);
        const res = await fetch("/api/profile/import/watched/TMDB", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ csv, userId }),
        });
        if (!res.ok) throw new Error("Erreur lors de l'import");
        const data = await res.json();
        setWatchedMessage({
          type: "success",
          text: data.message || "Films vus importés avec succès !",
        });
      } catch (error) {
        setWatchedMessage({
          type: "error",
          text: `Erreur lors de l'import: ${
            error instanceof Error ? error.message : String(error)
          }`,
        });
      } finally {
        setIsUploadingWatched(false);
      }
    },
    [watchedFile, userId]
  );

  const handleRatedUploadTMDB = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!ratedFile) {
        setRatedMessage({
          type: "error",
          text: "Veuillez sélectionner un fichier",
        });
        return;
      }
      setIsUploadingRated(true);
      setRatedMessage({ type: "", text: "" });
      try {
        const csv = await readFileAsText(ratedFile);
        const res = await fetch("/api/profile/import/rated/TMDB", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ csv, userId }),
        });
        if (!res.ok) throw new Error("Erreur lors de l'import");
        const data = await res.json();
        setRatedMessage({
          type: "success",
          text: data.message || "Films rated importés avec succès !",
        });
      } catch (error) {
        setRatedMessage({
          type: "error",
          text: `Erreur lors de l'import: ${
            error instanceof Error ? error.message : String(error)
          }`,
        });
      } finally {
        setIsUploadingRated(false);
      }
    },
    [ratedFile, userId]
  );

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-[#121212]">
      <div className="border border-[#2C2C2C] bg-[#121212] shadow-lg rounded-lg p-8 max-w-md w-full">
        <div className="flex flex-col items-center mb-6">
          <div className="p-4 rounded-full bg-red-700 mb-4">
            <FiUpload className="text-3xl text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">Importer vos données</h1>
          <p className="text-gray-400 text-center mt-2">
            Importez vos watchlists et films vus depuis un fichier CSV ou JSON.
          </p>
        </div>

        {/* Section Watchlist */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
            <FiList className="mr-2 text-red-500" /> Importer une watchlist
          </h2>
          <form onSubmit={handleWatchlistUpload} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="watchlist"
                className="block text-sm font-medium text-[#BDBDBD]"
              >
                Fichier (CSV/JSON)
              </label>
              <input
                id="watchlist"
                type="file"
                accept=".csv,.json"
                onChange={(e) => setWatchlistFile(e.target.files?.[0] || null)}
                className="w-full rounded-md border border-[#4A4A4A] bg-[#2C2C2C] py-2 px-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-red-700 file:text-white hover:file:bg-red-800"
              />
              {watchlistFile && (
                <div className="flex items-center text-sm text-gray-300">
                  <FiFilm className="mr-2" />
                  <span>{watchlistFile.name}</span>
                  <button
                    type="button"
                    onClick={() => setWatchlistFile(null)}
                    className="ml-2 text-red-500 hover:text-red-400"
                  >
                    <FiX />
                  </button>
                </div>
              )}
            </div>
            {watchlistMessage.text && (
              <div
                className={`flex items-center ${
                  watchlistMessage.type === "error"
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {watchlistMessage.type === "error" ? (
                  <FiAlertCircle className="mr-2" />
                ) : (
                  <FiCheck className="mr-2" />
                )}
                <span>{watchlistMessage.text}</span>
              </div>
            )}
            <button
              type="submit"
              disabled={isUploadingWatchlist || !watchlistFile}
              className="w-full bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
            >
              {isUploadingWatchlist
                ? "Import en cours..."
                : "Importer la watchlist"}
            </button>
          </form>
        </div>

        {/* Section Films Vus TMDB */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
            <FiFilm className="mr-2 text-red-500" /> Importer les films vus TMDB
          </h2>
          <form onSubmit={handleWatchedUploadTMDB} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="watched"
                className="block text-sm font-medium text-[#BDBDBD]"
              >
                Fichier (CSV/JSON)
              </label>
              <input
                id="watched"
                type="file"
                accept=".csv,.json"
                onChange={(e) => setWatchedFile(e.target.files?.[0] || null)}
                className="w-full rounded-md border border-[#4A4A4A] bg-[#2C2C2C] py-2 px-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-red-700 file:text-white hover:file:bg-red-800"
              />
              {watchedFile && (
                <div className="flex items-center text-sm text-gray-300">
                  <FiFilm className="mr-2" />
                  <span>{watchedFile.name}</span>
                  <button
                    type="button"
                    onClick={() => setWatchedFile(null)}
                    className="ml-2 text-red-500 hover:text-red-400"
                  >
                    <FiX />
                  </button>
                </div>
              )}
            </div>
            {watchedMessage.text && (
              <div
                className={`flex items-center ${
                  watchedMessage.type === "error"
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {watchedMessage.type === "error" ? (
                  <FiAlertCircle className="mr-2" />
                ) : (
                  <FiCheck className="mr-2" />
                )}
                <span>{watchedMessage.text}</span>
              </div>
            )}
            <button
              type="submit"
              disabled={isUploadingWatched || !watchedFile}
              className="w-full bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
            >
              {isUploadingWatched
                ? "Import en cours..."
                : "Importer les films vus"}
            </button>
          </form>
        </div>

        {/* Section Films Rated TMDB */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
            <FiFilm className="mr-2 text-red-500" /> Importer les films rated
            TMDB
          </h2>
          <form onSubmit={handleRatedUploadTMDB} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="rated"
                className="block text-sm font-medium text-[#BDBDBD]"
              >
                Fichier (CSV/JSON)
              </label>
              <input
                id="rated"
                type="file"
                accept=".csv,.json"
                onChange={(e) => setRatedFile(e.target.files?.[0] || null)}
                className="w-full rounded-md border border-[#4A4A4A] bg-[#2C2C2C] py-2 px-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-red-700 file:text-white hover:file:bg-red-800"
              />
              {ratedFile && (
                <div className="flex items-center text-sm text-gray-300">
                  <FiFilm className="mr-2" />
                  <span>{ratedFile.name}</span>
                  <button
                    type="button"
                    onClick={() => setRatedFile(null)}
                    className="ml-2 text-red-500 hover:text-red-400"
                  >
                    <FiX />
                  </button>
                </div>
              )}
            </div>
            {ratedMessage.text && (
              <div
                className={`flex items-center ${
                  ratedMessage.type === "error"
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {ratedMessage.type === "error" ? (
                  <FiAlertCircle className="mr-2" />
                ) : (
                  <FiCheck className="mr-2" />
                )}
                <span>{ratedMessage.text}</span>
              </div>
            )}
            <button
              type="submit"
              disabled={isUploadingRated || !ratedFile}
              className="w-full bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
            >
              {isUploadingRated ? "Import en cours..." : "Importer les rated"}
            </button>
          </form>
        </div>

        {/* Lien vers la documentation */}
        <div className="pt-4 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm">
            Besoin d’aide pour formater vos fichiers ?
            <button
              onClick={() => router.push("/docs/import-format")}
              className="text-red-500 hover:underline ml-1"
            >
              Voir la documentation
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImportPage;
