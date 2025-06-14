"use client";
import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import MovieDetail from "@/components/movieId/MovieDetail";
import Collection from "@/components/movieId/Collection";
import Loading from "@/app/loading";
import {
  Movie,
  Collection as CollectionType,
  Provider,
  userMediaActivity,
} from "@/types/types";
import MovieImage from "@/components/movieId/Images";

type ExternalLink = {
  url: string;
  icon: React.ElementType;
  label: string;
};
type ExternalLinks = Record<string, ExternalLink>;

export default function Page() {
  const params = useParams<{ movieId: string }>();
  const [loading, setLoading] = useState(true);
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);
  const [collection, setCollection] = useState<CollectionType | null>(null);
  const [keywords, setKeywords] = useState([]);
  const [cast, setCast] = useState([]);
  const [externals, setExternals] = useState<ExternalLinks>({});
  const [userMediaActivity, setUserMediaActivity] =
    useState<userMediaActivity>();
  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState({
    posters: [] as [],
    backdrops: [] as [],
    logos: [] as [],
  });

  const defaultProvider: Provider = {
    link: "",
    buy: [],
    flatrate: [],
  };

  const [providers, setProviders] = useState<Provider>(defaultProvider);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const url = `/api/movie?movieId=${params.movieId}`;
        const response = await fetch(url);
        const result = await response.json();

        if (result) {
          const {
            movieDetails,
            collection,
            keywords,
            cast,
            externals,
            videos,
            images,
            providers,
            userMediaActivity,
          } = result;
          setMovieDetails(movieDetails);
          setCollection(collection);
          setKeywords(keywords);
          setCast(cast);
          setExternals(externals);
          setVideos(videos);
          setImages(images);
          setProviders(providers);
          setUserMediaActivity(userMediaActivity);
        } else {
          notFound();
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.movieId]);

  if (loading) {
    return <Loading />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4 max-w-full sm:max-w-[70vw] 3xl:max-w-[80vw] mx-auto">
        {movieDetails && (
          <MovieDetail
            movieDetails={movieDetails}
            cast={cast}
            keywords={keywords}
            movieId={params.movieId}
            externals={externals}
            videos={videos}
            providers={providers}
            userMediaActivity={userMediaActivity}
          />
        )}

        {images && <MovieImage images={images} />}
      </div>
      {collection && <Collection collection={collection} />}
    </motion.div>
  );
}
