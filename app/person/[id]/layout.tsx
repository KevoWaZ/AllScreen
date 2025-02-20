import { obtainPersonLayout } from "@/utils/person";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const personData = await obtainPersonLayout(id);

  if (!personData) {
    notFound()
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
    <div className="bg-white dark:bg-[#121212] text-[#212121] dark:text-[#BDBDBD] min-h-screen">
      {children}
    </div>
  );
}
