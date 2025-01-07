import Link from "next/link";
import Image from "next/image";
import { Company } from "@/types/types";

export function CompanyCard({ company }: { company: Company }) {
  return (
    <div className="bg-[#1c1c1c] rounded-lg overflow-hidden shadow-md transition-transform duration-200 hover:scale-105">
      <Link href={`/company/${company.id}`} className="block">
        <div className="relative w-full h-40 bg-[#2c2c2c] flex items-center justify-center">
          {company.logo_path ? (
            <Image
              src={`https://media.themoviedb.org/t/p/w500${company.logo_path}`}
              alt={company.name}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-contain p-4"
            />
          ) : (
            <span className="text-[#A1A1A1] text-sm">
              Pas de logo disponible
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-[#F5A623] mb-2">
            {company.name}
          </h3>
          <p className="text-sm text-[#A1A1A1]">
            {company.origin_country || "Pays d'origine inconnu"}
          </p>
        </div>
      </Link>
    </div>
  );
}

