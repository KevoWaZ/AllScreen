import { Movie } from "@/types/types";
import { obtainMovieLayout } from "@/utils/movie";
import { Metadata } from "next";

type Props = {
  params: Promise<{ movieId: string }>;
  children: React.ReactNode;
  movieData: Movie;
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
    description: movieData?.overview.slice(0, 150) || "Détails du film",
    openGraph: {
      images: movieData?.poster_path
        ? [`https://image.tmdb.org/t/p/w500${movieData.poster_path}`]
        : [],
    },
    alternates: {
      canonical: `https://allscreen.vercel.app/movie/${movieId}`,
    },
  };
}

export default async function Layout({ children, params, movieData }: Props) {
  await params;
  return (
    <div>
      <h1 className="hidden">{movieData?.title}</h1>
      {children}
    </div>
  );
}
