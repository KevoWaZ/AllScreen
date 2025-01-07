import { Keyword, Movie } from "@/types/types";
import LeftMovieDetails from "./LeftMovieDetails";
import RightMovieDetails from "./RightMovieDetails";

interface MovieDetailProps {
  movieDetails: Movie;
  cast: [];
  keywords: Keyword;
  movieId: string;
  externals: object
}

export default function MovieDetail({ movieDetails, cast, keywords, movieId, externals }: MovieDetailProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
      <LeftMovieDetails
        movieDetails={movieDetails} 
        cast={cast} 
        movieId={movieId} 
        formatCurrency={formatCurrency} 
      />
      <RightMovieDetails
        movieDetails={movieDetails} 
        keywords={keywords}
        externals={externals}
      />
    </div>
  );
}

