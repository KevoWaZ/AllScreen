import { obtainTvLayout } from "@/utils/tv";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ tvId: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tvId } = await params;

  const tvData = await obtainTvLayout(tvId);

  if (!tvData) {
    notFound();
    return {
      title: "AllScreen - Série non trouvée",
      description:
        "Désolé, nous n'avons pas pu trouver les détails de cette série.",
    };
  }

  return {
    title: `AllScreen - ${tvData.name}`,
    description: tvData.overview || "Détails de la série",
    openGraph: {
      images: tvData.poster_path
        ? [`https://image.tmdb.org/t/p/500${tvData.poster_path}`]
        : [],
    },
  };
}

export default async function Layout({ children, params }: Props) {
  await params;
  return <div>{children}</div>;
}
