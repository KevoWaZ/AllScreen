import { obtainTvLayout } from "@/utils/tv";
import { Metadata } from "next";

type Props = {
  params: { tvId: string };
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tvId } = params;

  const tvData = await obtainTvLayout(tvId);

  return {
    title: tvData?.title ? `AllScreen - ${tvData.title}` : "Série",
    description: tvData?.overview || "Détails de la série",
    openGraph: {
      images: tvData?.poster_path
        ? [`https://image.tmdb.org/t/p/original${tvData.poster_path}`]
        : [],
    },
  };
}

export default function Layout({ children }: Props) {
  return <div className="min-h-screen bg-[#121212] text-white">{children}</div>;
}
