"use client";
import { useEffect, useState } from "react";
import MovieHeader from "@/components/movieId/MovieHeader";
import MovieDetail from "@/components/movieId/MovieDetail";
import Collection from "@/components/movieId/Collection";
import Recommendations from "@/components/movieId/Recommendations";
import { useParams } from "next/navigation";
import Loading from "@/app/loading";
import { Movie, Collection as CollectionType } from "@/types/types";
import { obtainMovieDetails } from "@/utils/movie";

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
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await obtainMovieDetails(params.movieId);

        if (result) {
          const {
            movieDetails,
            collection,
            keywords,
            recommendations,
            cast,
            externals,
            videos
          } = result;
          setMovieDetails(movieDetails);
          setCollection(collection);
          setKeywords(keywords);
          setRecommendations(recommendations);
          setCast(cast);
          setExternals(externals);
          setVideos(videos)
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
    <div className="min-h-screen bg-[#121212] text-white">
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
    </div>
  );
}
