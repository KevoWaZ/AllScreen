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
  const getWatched = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/profile/watched/tv-shows?username=${params.username}`
      );
      const data = await res.json();
      console.log(data);
      setTVShows(data.watched);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [params.username]);

  useEffect(() => {
    getWatched();
  }, [getWatched]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <h3>Watched:</h3>
      <div className="grid gap-3 md:gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {tvshows &&
          tvshows.map((show: TVShow) => (
            <TVShowCard
              key={show.TVShow.id}
              showDescription
              tvShow={{
                poster_path: show.TVShow.poster,
                name: show.TVShow.title,
                overview: show.TVShow.description,
                id: show.TVShow.id,
                first_air_date: show.TVShow.first_air_date,
              }}
            />
          ))}
      </div>
    </>
  );
}
