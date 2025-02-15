"use client";
import { getCookie, setCookie } from "cookies-next/client";
import { useEffect, useState } from "react";
import Loading from "../loading";

interface Movie {
  title: string;
  note: number;
  id: number;
}

export default function Home() {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [watched, setWatched] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  // Chargement des listes depuis les cookies
  const loadLists = () => {
    const watchlistCookie = getCookie("watchlist");
    const watchedCookie = getCookie("watched");

    if (watchlistCookie) {
      try {
        const movies = JSON.parse(decodeURIComponent(watchlistCookie)) as Movie[];
        setWatchlist(movies);
      } catch (error) {
        console.error("Erreur lors du parsing des cookies (watchlist) :", error);
      }
    }

    if (watchedCookie) {
      try {
        const movies = JSON.parse(decodeURIComponent(watchedCookie)) as Movie[];
        setWatched(movies);
      } catch (error) {
        console.error("Erreur lors du parsing des cookies (watched) :", error);
      }
    }
  };

  // Fonction pour ajouter un film à watchlist
  const addToWatchlist = (movie: Movie) => {
    // Retirer le film de watched s'il y est
    const updatedWatched = watched.filter((m) => m.id !== movie.id);
    setWatched(updatedWatched);

    const exists = watchlist.some((m) => m.id === movie.id);
    if (!exists) {
      const updatedWatchlist = [...watchlist, movie];
      setWatchlist(updatedWatchlist);
      setCookie("watchlist", JSON.stringify(updatedWatchlist), {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
      setCookie("watched", JSON.stringify(updatedWatched), {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
    }
  };

  // Fonction pour ajouter un film à watched
  const addToWatched = (movie: Movie) => {
    // Retirer le film de watchlist s'il y est
    const updatedWatchlist = watchlist.filter((m) => m.id !== movie.id);
    setWatchlist(updatedWatchlist);

    const exists = watched.some((m) => m.id === movie.id);
    if (!exists) {
      const updatedWatched = [...watched, movie];
      setWatched(updatedWatched);
      setCookie("watched", JSON.stringify(updatedWatched), {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
      setCookie("watchlist", JSON.stringify(updatedWatchlist), {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
    }
  };

  // Fonction pour supprimer un film de watchlist
  const removeFromWatchlist = (id: number) => {
    const updatedWatchlist = watchlist.filter((movie) => movie.id !== id);
    setWatchlist(updatedWatchlist);
    setCookie("watchlist", JSON.stringify(updatedWatchlist), {
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
  };

  // Fonction pour supprimer un film de watched
  const removeFromWatched = (id: number) => {
    const updatedWatched = watched.filter((movie) => movie.id !== id);
    setWatched(updatedWatched);
    setCookie("watched", JSON.stringify(updatedWatched), {
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
  };

  useEffect(() => {
    try {
      setLoading(true);
      loadLists();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const movies = [
    { title: "Transformers", note: 7.0, id: 1 },
    { title: "Mad Max", note: 8.0, id: 2 },
  ];

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Mon App de Films</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {movies.map((movie) => {
          const isInWatchlist = watchlist.some((m) => m.id === movie.id);
          const isInWatched = watched.some((m) => m.id === movie.id);

          return (
            <div
              key={movie.id}
              className={`max-w-[200px] bg-rose-600 p-4 rounded-lg shadow-lg ${
                isInWatchlist
                  ? "border-4 border-blue-500"
                  : isInWatched
                  ? "border-4 border-green-500"
                  : ""
              }`}
            >
              <h2 className="text-lg font-semibold">{movie.title}</h2>
              <p className="mb-2">Note : {movie.note}</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  className={`py-1 px-2 rounded ${
                    isInWatched
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                  onClick={() =>
                    isInWatched
                      ? removeFromWatched(movie.id)
                      : addToWatched(movie)
                  }
                >
                  {isInWatched ? "Remove from Watched" : "Add to Watched"}
                </button>
                <button
                  className={`py-1 px-2 rounded ${
                    isInWatchlist
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                  onClick={() =>
                    isInWatchlist
                      ? removeFromWatchlist(movie.id)
                      : addToWatchlist(movie)
                  }
                >
                  {isInWatchlist
                    ? "Remove from Watchlist"
                    : "Add to Watchlist"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Ma Watchlist</h2>
        {watchlist.length > 0 ? (
          <ul className="list-disc pl-5">
            {watchlist.map((movie) => (
              <li key={movie.id}>
                {movie.title} (Note : {movie.note})
                <button
                  className="ml-4 text-red-500 hover:underline"
                  onClick={() => removeFromWatchlist(movie.id)}
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun film dans votre watchlist.</p>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Films Regardés</h2>
        {watched.length > 0 ? (
          <ul className="list-disc pl-5">
            {watched.map((movie) => (
              <li key={movie.id}>
                {movie.title} (Note : {movie.note})
                <button
                  className="ml-4 text-red-500 hover:underline"
                  onClick={() => removeFromWatched(movie.id)}
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun film regardé.</p>
        )}
      </section>
    </main>
  );
}
