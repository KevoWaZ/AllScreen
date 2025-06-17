import Loading from "@/app/loading";
import Recommendations from "@/components/tvId/Recommendations";
import TvHeader from "@/components/tvId/TvHeader";
import { obtainTvLayout, obtainTVRecommendations } from "@/utils/tv";
import { Metadata } from "next";
import { Suspense } from "react";

type Props = {
  params: Promise<{ tvId: string }>;
  children: React.ReactNode;
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
    description: tvData.overview.slice(0, 100) || "Détails de la série",
    openGraph: {
      description: tvData.overview.slice(0, 155) || "Détails de la série",
      images: tvData.poster_path
        ? [`https://image.tmdb.org/t/p/w500${tvData.poster_path}`]
        : [],
    },
    alternates: {
      canonical: `https://www.allscreen.ovh/${tvId}`,
    },
  };
}

export default async function Layout({ children, params }: Props) {
  const { tvId } = await params;
  const [tvData, recommendations] = await Promise.all([
    obtainTvLayout(tvId),
    obtainTVRecommendations(tvId),
  ]);

  return (
    <Suspense fallback={<Loading />}>
      <div>
        {tvData && <TvHeader tvDetails={tvData} />}
        {children}
        {recommendations && (
          <Recommendations recommendations={recommendations} />
        )}
      </div>
    </Suspense>
  );
}
