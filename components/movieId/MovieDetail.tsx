import {
  Keyword,
  Movie,
  Person,
  Provider,
  Review,
  userMediaActivity,
} from "@/types/types";
import LeftMovieDetails from "./LeftMovieDetails";
import RightMovieDetails from "./RightMovieDetails";
import { Video } from "./MovieVideos";

interface MovieDetailProps {
  movieDetails: Movie;
  cast: Person[];
  keywords: Keyword[];
  movieId: string;
  externals: object;
  videos: Video[];
  providers: Provider;
  userMediaActivity?: userMediaActivity;
}

export default function MovieDetail({
  movieDetails,
  cast,
  keywords,
  movieId,
  externals,
  videos,
  providers,
  userMediaActivity,
}: MovieDetailProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <LeftMovieDetails
        movieDetails={movieDetails}
        cast={cast}
        movieId={movieId}
        formatCurrency={formatCurrency}
        videos={videos}
      />
      <RightMovieDetails
        movieDetails={movieDetails}
        keywords={keywords}
        externals={externals}
        providers={providers}
        userMediaActivity={userMediaActivity}
      />
    </div>
  );
}
