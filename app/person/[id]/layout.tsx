import { Person } from "@/types/types";
import { obtainPersonLayout } from "@/utils/person";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
  personData: Person;
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
    description: personData.biography.slice(0, 150) || "Détails de la personne",
    openGraph: {
      images: personData.profile_path
        ? [`https://image.tmdb.org/t/p/w500${personData.profile_path}`]
        : [],
    },
    alternates: {
      canonical: `https://allscreen.vercel.app/person/${id}`,
    },
  };
}

export default async function Layout({ children, params, personData }: Props) {
  await params;
  return (
    <div className="bg-white dark:bg-[#121212] text-[#212121] dark:text-[#BDBDBD] min-h-screen">
      <h1 className="hidden">{personData?.name}</h1>
      {children}
    </div>
  );
}
