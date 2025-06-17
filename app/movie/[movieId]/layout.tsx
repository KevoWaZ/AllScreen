"use cache";
import Loading from "@/app/loading";
import MovieHeader from "@/components/movieId/MovieHeader";
import Recommendations from "@/components/movieId/Recommendations";
import { obtainMovieLayout, obtainMovieRecommendations } from "@/utils/movie";
import { Metadata } from "next";
import { Suspense } from "react";

type Props = {
  params: Promise<{ movieId: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { movieId } = await params;

  const movieData = await obtainMovieLayout(movieId);

  if (movieData.success === false) {
    return {
      title: "AllScreen - Film non trouvée",
      description: "Désolé, nous n'avons pas pu trouver les détails du film.",
    };
  }

  return {
    title: `AllScreen - ${movieData?.title}` || "Film",
    description: movieData?.overview.slice(0, 100) || "Détails du film",
    openGraph: {
      description: movieData?.overview.slice(0, 155) || "Détails du film",
      images: movieData?.poster_path
        ? [`https://image.tmdb.org/t/p/w500${movieData.poster_path}`]
        : [],
    },
    alternates: {
      canonical: `https://www.allscreen.ovh/movie/${movieId}`,
    },
  };
}

export default async function Layout({ children, params }: Props) {
  const { movieId } = await params;
  const [movieData, movieRecommendations] = await Promise.all([
    obtainMovieLayout(movieId),
    obtainMovieRecommendations(movieId),
  ]);

  return (
    <Suspense fallback={<Loading />}>
      <div>
        <p>feses</p>
        {movieData && <MovieHeader movieDetails={movieData} />}
        {children}
        {movieRecommendations && (
          <Recommendations recommendations={movieRecommendations} />
        )}
      </div>
    </Suspense>
  );
}
