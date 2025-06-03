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
      <h3>Watchlists:</h3>
      <div className="grid gap-3 md:gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {tvshows &&
          tvshows.map((tvshow: TVShow) => (
            <TVShowCard
              key={tvshow.TVShow.id}
              showDescription
              tvShow={{
                poster_path: tvshow.TVShow.poster,
                name: tvshow.TVShow.title,
                overview: tvshow.TVShow.description,
                id: tvshow.TVShow.id,
                first_air_date: tvshow.TVShow.first_air_date,
              }}
            />
          ))}
      </div>
    </>
  );
}
