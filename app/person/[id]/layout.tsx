import { obtainPersonLayout } from "@/utils/person";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const personData = await obtainPersonLayout(id);

  if (!personData) {
    return {
      title: "AllScreen - Personne non trouvée",
      description:
        "Désolé, nous n'avons pas pu trouver les détails de cette personne.",
    };
  }

  return {
    title: `AllScreen - ${personData.name}`,
    description: personData.biography || "Détails de la personne",
    openGraph: {
      images: personData.profile_path
        ? [`https://image.tmdb.org/t/p/w500${personData.profile_path}`]
        : [],
    },
  };
}

export default async function Layout({ children, params }: Props) {
  await params;
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {children}
    </div>
  );
}
