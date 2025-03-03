import { formatDate } from "@/lib/utils";
import { Person } from "@/types/types";
import Image from "next/image";
import React from "react";

interface PersonInfoProps {
  person: Person;
}

export default function PersonInfo({ person }: PersonInfoProps) {
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
        <div>
          <h2 className="text-2xl font-semibold mb-2">Biographie</h2>
          <p>{person?.biography || "Biographie non disponible"}</p>
        </div>
      </div>
    </div>
  );
}
