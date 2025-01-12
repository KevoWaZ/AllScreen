import { obtainTvLayout } from "@/utils/tv";
import { Metadata } from "next";

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
    description: tvData.overview || "Détails de la série",
    openGraph: {
      images: tvData.poster_path
        ? [`https://image.tmdb.org/t/p/original${tvData.poster_path}`]
        : [],
    },
  };
}

export default async function Layout({ children, params }: Props) {
  await params; // Assurez-vous que params est résolu avant de rendre le composant
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {children}
    </div>
  );
}
