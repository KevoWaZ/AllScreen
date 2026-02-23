import PersonInfo from "@/components/person/PersonInfo";
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
    description: personData.biography.slice(0, 100) || "Détails de la personne",
    openGraph: {
      description:
        personData.biography.slice(0, 155) || "Détails de la personne",
      images: personData.profile_path
        ? [`https://image.tmdb.org/t/p/w500${personData.profile_path}`]
        : [],
    },
    alternates: {
      canonical: `https://www.allscreen.ovh/person/${id}`,
    },
  };
}

export default async function Layout({ children, params }: Props) {
  const { id } = await params;

  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001"
      : "https://www.allscreen.ovh";

  const url = `${baseUrl}/api/person/personId?personId=${id}`;
  const response = await fetch(url);
  const personData = await response.json();
  return (
    <div className=" bg-[#121212]  text-[#BDBDBD] min-h-screen">
      <div className="pt-4 px-4 max-w-[90vw] md:max-w-[70vw] mx-auto">
        <PersonInfo
          person={personData.personDetails}
          key={personData.id}
          externals={personData.externals}
          images={personData.images}
        />
      </div>
      {children}
    </div>
  );
}
