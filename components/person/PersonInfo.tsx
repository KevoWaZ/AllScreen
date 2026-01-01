import { ExternalLink } from "@/app/person/[id]/page";
import { formatDate } from "@/lib/utils";
import { Person } from "@/types/types";
import Image from "next/image";
import Link from "@/components/utils/Link";
import { IconType } from "react-icons";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaX,
  FaYoutube,
} from "react-icons/fa6";

interface PersonInfoProps {
  person: Person;
  externals: ExternalLink[];
  images?: [];
}

const iconComponents: { [key: string]: IconType } = {
  FaFacebook,
  FaX,
  FaInstagram,
  FaTiktok,
  FaYoutube,
};

export default function PersonInfo({
  person,
  externals,
  images,
}: PersonInfoProps) {
  const externalArray = Object.values(externals);
  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <Image
          src={
            person?.profile_path
              ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
              : "/placeholder.svg"
          }
          alt={person?.name || "Nom inconnu"}
          width={500}
          height={750}
          quality={100}
          className="rounded-lg shadow-md"
          priority
        />
        {images && images.length > 0 && (
          <Link href={`/person/${person.id}/images/profiles`}>
            Plus de photos de profile
          </Link>
        )}
      </div>
      <div className="md:col-span-2">
        <h1 className="text-4xl font-bold mb-4">
          {person?.name || "Nom inconnu"}
        </h1>
        <p>
          <span className="font-semibold">Date de naissance:</span>{" "}
          {formatDate(person?.birthday || "")}
        </p>
        <p>
          <span className="font-semibold">Lieu de naissance:</span>{" "}
          {person?.place_of_birth || "Lieu inconnu"}
        </p>
        {person?.deathday && (
          <p>
            <span className="font-semibold">Date de décès:</span>{" "}
            {formatDate(person?.deathday || "")}
          </p>
        )}
        {Array.isArray(externalArray) && externalArray.length > 0 && (
          <div className="flex gap-2 my-2">
            {externalArray.map((external) => {
              const IconComponent =
                iconComponents[external.icon as keyof typeof iconComponents];
              return (
                <Link key={external.label} href={external.url} target="_blank">
                  <IconComponent className="h-8 w-8 gap-4 text-red-700" />
                </Link>
              );
            })}
          </div>
        )}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Biographie</h2>
          <p>{person?.biography || "Biographie non disponible"}</p>
        </div>
      </div>
    </div>
  );
}
