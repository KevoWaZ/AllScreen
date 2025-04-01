import { TVShow } from "@/types/types";
import { obtainTvLayout } from "@/utils/tv";
import { Metadata } from "next";

type Props = {
  params: Promise<{ tvId: string }>;
  children: React.ReactNode;
  tvData: TVShow;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tvId } = await params;

  const tvData = await obtainTvLayout(tvId);

  if (!tvData) {
    return {
      title: "AllScreen - Série non trouvée",
      description:
        "Désolé, nous n'avons pas pu trouver les détails de cette série.",
    };
  }

  return {
    title: `AllScreen - ${tvData.name}`,
    description: tvData.overview.slice(0, 150) || "Détails de la série",
    openGraph: {
      images: tvData.poster_path
        ? [`https://image.tmdb.org/t/p/500${tvData.poster_path}`]
        : [],
    },
    alternates: {
      canonical: `https://allscreen.vercel.app/tv/${tvId}`,
    },
  };
}

export default async function Layout({ children, params, tvData }: Props) {
  await params;
  return (
    <div>
      <h1 className="hidden">{tvData?.name}</h1>
      {children}
    </div>
  );
}
