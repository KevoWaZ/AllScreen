import { images, Keyword, Movie } from "@/types/types";
import LeftMovieDetails, { Casting } from "./LeftMovieDetails";
import RightMovieDetails from "./RightMovieDetails";
import { Video } from "./MovieVideos";

interface MovieDetailProps {
  movieDetails: Movie;
  cast: Casting[];
  keywords: Keyword[];
  movieId: string;
  externals: object;
  videos: Video[];
  images: {
    posters: [],
    backdrops: [],
    logos: []
  }
}

export default function MovieDetail({
  movieDetails,
  cast,
  keywords,
  movieId,
  externals,
  videos,
  images
}: MovieDetailProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  console.log(images);
  

  return (
    <div className="p-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
      <LeftMovieDetails
        movieDetails={movieDetails}
        cast={cast}
        movieId={movieId}
        formatCurrency={formatCurrency}
        videos={videos}
        images={images}
      />
      <RightMovieDetails
        movieDetails={movieDetails}
        keywords={keywords}
        externals={externals}
      />
    </div>
  );
}
