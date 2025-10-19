"use client";
import Loading from "@/app/loading";
import TVShowCard from "@/components/cards/TVShowCard";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

interface TVShow {
  TVShow: {
    id: number;
    title: string;
    poster: string;
    first_air_date: string;
    description: string;
    TVId: number;
  };
}

export default function Page() {
  const [tvshows, setTVShows] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams<{ username: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  const getWatchlists = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/profile/watchlists/tv-shows?username=${params.username}`
      );
      const data = await res.json();
      console.log(data);
      setTVShows(data.watchlists);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [params.username]);

  useEffect(() => {
    getWatchlists();
  }, [getWatchlists]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <h3>Watchlists: {tvshows.length}</h3>
      {tvshows?.length > 20 && (
        <div className="flex justify-center mb-8 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer disabled:bg-red-600/50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of{" "}
            {Math.max(1, Math.ceil(tvshows.length / itemsPerPage))}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, Math.ceil(tvshows.length / itemsPerPage))
              )
            }
            disabled={currentPage === Math.ceil(tvshows.length / itemsPerPage)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer disabled:bg-red-600/50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
      <div className="grid gap-3 md:gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {tvshows &&
          tvshows
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((tvshow: TVShow) => (
              <TVShowCard
                key={tvshow.TVShow.id}
                showDescription
                showUserAction={false}
                tvShow={{
                  poster_path: tvshow.TVShow.poster,
                  poster: tvshow.TVShow.poster,
                  name: tvshow.TVShow.title,
                  title: tvshow.TVShow.title,
                  overview: tvshow.TVShow.description,
                  id: tvshow.TVShow.id,
                  first_air_date: tvshow.TVShow.first_air_date,
                }}
              />
            ))}
      </div>
      {tvshows?.length > 20 && (
        <div className="flex justify-center mt-8 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer disabled:bg-red-600/50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of{" "}
            {Math.max(1, Math.ceil(tvshows.length / itemsPerPage))}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, Math.ceil(tvshows.length / itemsPerPage))
              )
            }
            disabled={currentPage === Math.ceil(tvshows.length / itemsPerPage)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer disabled:bg-red-600/50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
