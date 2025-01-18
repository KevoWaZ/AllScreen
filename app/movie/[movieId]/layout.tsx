import { obtainMovieLayout } from "@/utils/movie";
import { Metadata } from "next";

type Props = {
  params: Promise<{ movieId: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { movieId } = await params;

  const movieData = await obtainMovieLayout(movieId);

  if (!movieData) {
    return {
      title: "AllScreen - Film non trouvée",
      description: "Désolé, nous n'avons pas pu trouver les détails du film.",
    };
  }

  return {
    title: `AllScreen - ${movieData?.title}` || "Film",
    description: movieData?.overview || "Détails du film",
    openGraph: {
      images: movieData?.poster_path
        ? [`https://image.tmdb.org/t/p/w500${movieData.poster_path}`]
        : [],
    },
  };
}

export default async function Layout({ children, params }: Props) {
  await params;
  return <div>{children}</div>;
}
