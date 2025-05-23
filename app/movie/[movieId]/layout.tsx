import MovieHeader from "@/components/movieId/MovieHeader";
import { obtainMovieLayout } from "@/utils/movie";
import { Metadata } from "next";

type Props = {
  params: Promise<{ movieId: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { movieId } = await params;

  const movieData = await obtainMovieLayout(movieId);
  console.log(movieData);

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
  const movieData = await obtainMovieLayout(movieId);
  return (
    <div>
      {movieData && <MovieHeader movieDetails={movieData} />}
      {children}
    </div>
  );
}
