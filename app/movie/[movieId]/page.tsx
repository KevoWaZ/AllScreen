"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import MovieHeader from "@/components/movieId/MovieHeader";
import MovieDetail from "@/components/movieId/MovieDetail";
import Collection from "@/components/movieId/Collection";
import Recommendations from "@/components/movieId/Recommendations";
import Loading from "@/app/loading";
import { Movie, Collection as CollectionType } from "@/types/types";

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
  const [recommendations, setRecommendations] = useState([]);
  const [cast, setCast] = useState([]);
  const [externals, setExternals] = useState<ExternalLinks>({});
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/movie', {
          method: 'POST',
          body: JSON.stringify({ movieId: params.movieId })
        })

        const result = await response.json()

        if (result) {
          const {
            movieDetails,
            collection,
            keywords,
            recommendations,
            cast,
            externals,
            videos,
          } = result;
          setMovieDetails(movieDetails);
          setCollection(collection);
          setKeywords(keywords);
          setRecommendations(recommendations);
          setCast(cast);
          setExternals(externals);
          setVideos(videos);
        } else {
          console.error("Les données n'ont pas pu être chargées.");
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
      {movieDetails && <MovieHeader movieDetails={movieDetails} />}

      {movieDetails && (
        <MovieDetail
          movieDetails={movieDetails}
          cast={cast}
          keywords={keywords}
          movieId={params.movieId}
          externals={externals}
          videos={videos}
        />
      )}

      {collection && <Collection collection={collection} />}

      {recommendations && <Recommendations recommendations={recommendations} />}
    </motion.div>
  );
}
