import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface PersonWithCount {
  id: number;
  name: string;
  profilePath: string | null;
  count: bigint;
}

interface ProductionCompanyWithCount {
  id: number;
  name: string;
  logoPath: string | null;
  count: bigint;
}

interface PersonResult {
  id: number;
  name: string;
  profilePath: string | null;
  count: number;
}

interface ProductionCompanyResult {
  id: number;
  name: string;
  logoPath: string | null;
  count: number;
}

export async function GET(request: Request) {
  const userId = "kM1EeQFhbt2XFFkQxyZJOTwXVOFPpK07";

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  try {
    const getTopPeople = async (
      relationTable: string
    ): Promise<PersonWithCount[]> => {
      return await prisma.$queryRawUnsafe<PersonWithCount[]>(
        `
        SELECT 
          p.id,
          p.name,
          p.profile_path as "profilePath",
          COUNT(*) as count
        FROM "Watchlist" w
        INNER JOIN "${relationTable}" r ON w."movieId" = r."A"
        INNER JOIN "Person" p ON r."B" = p.id
        WHERE w."userId" = $1 AND w.type = 'MOVIE'
        GROUP BY p.id, p.name, p.profile_path
        ORDER BY count DESC
        LIMIT 10
      `,
        userId
      );
    };

    const getTopProductionCompanies = async (): Promise<
      ProductionCompanyWithCount[]
    > => {
      return await prisma.$queryRawUnsafe<ProductionCompanyWithCount[]>(
        `
        SELECT 
          pc.id,
          pc.name,
          pc.logo_path as "logoPath",
          COUNT(*) as count
        FROM "Watchlist" w
        INNER JOIN "_MovieToProductionCompany" r ON w."movieId" = r."A"
        INNER JOIN "ProductionCompany" pc ON r."B" = pc.id
        WHERE w."userId" = $1 AND w.type = 'MOVIE'
        GROUP BY pc.id, pc.name, pc.logo_path
        ORDER BY count DESC
        LIMIT 10
      `,
        userId
      );
    };

    // Exécuter toutes les requêtes en parallèle
    const [
      topDirectors,
      topProducers,
      topExecProducers,
      topWriters,
      topComposers,
      topCinematographers,
      topActors,
      topProductionCompanies,
    ] = await Promise.all([
      getTopPeople("_MovieDirectors"),
      getTopPeople("_MovieProducers"),
      getTopPeople("_MovieExecutiveProducers"),
      getTopPeople("_MovieWriters"),
      getTopPeople("_MovieComposers"),
      getTopPeople("_MovieCinematographers"),
      getTopPeople("_MovieActors"),
      getTopProductionCompanies(),
    ]);

    const convertPeopleBigInt = (items: PersonWithCount[]): PersonResult[] =>
      items.map((item) => ({
        ...item,
        count: Number(item.count),
      }));

    const convertCompaniesBigInt = (
      items: ProductionCompanyWithCount[]
    ): ProductionCompanyResult[] =>
      items.map((item) => ({
        ...item,
        count: Number(item.count),
      }));

    return NextResponse.json({
      topDirectors: convertPeopleBigInt(topDirectors),
      topProducers: convertPeopleBigInt(topProducers),
      topExecProducers: convertPeopleBigInt(topExecProducers),
      topWriters: convertPeopleBigInt(topWriters),
      topComposers: convertPeopleBigInt(topComposers),
      topCinematographers: convertPeopleBigInt(topCinematographers),
      topActors: convertPeopleBigInt(topActors),
      topProductionCompanies: convertCompaniesBigInt(topProductionCompanies),
    });
  } catch (error) {
    console.error("[v0] Error fetching top directors:", error);
    return NextResponse.json(
      { error: "Failed to fetch top directors" },
      { status: 500 }
    );
  }
}
