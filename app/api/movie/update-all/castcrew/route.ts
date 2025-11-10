import prisma from "@/lib/prisma";
import { obtainPopularPersons } from "@/utils/person";
import { NextResponse } from "next/server";

interface Person {
  id: number;
  name: string;
  profile_path: string;
  popularity: number;
}

async function createOrUpdatePerson(
  id: number,
  name: string,
  profile_path: string,
  popularity: number
) {
  const existingPerson = await prisma.person.findUnique({
    where: { id: id },
  });

  if (existingPerson) {
    await prisma.person.update({
      where: { id: id },
      data: {
        name: name,
        profile_path: profile_path || "",
        popularity: popularity,
      },
    });
  } else {
    await prisma.person.create({
      data: {
        id: id,
        name: name,
        profile_path: profile_path || "",
        popularity: popularity,
      },
    });
  }
}

export async function GET() {
  try {
    const totalPages = 300; // Nomnre total de pages à traiter
    const delayBetweenBatches = 1000; // Délai en millisecondes entre les pages

    for (let page = 1; page <= totalPages; page++) {
      console.log(`Process page: ${page}`);
      const popularPersons = await obtainPopularPersons(page);

      for (const person of popularPersons.results) {
        await createOrUpdatePerson(
          person.id,
          person.name,
          person.profile_path,
          person.popularity
        );
      }

      if (page < totalPages) {
        await new Promise((resolve) =>
          setTimeout(resolve, delayBetweenBatches)
        );
      }
    }

    return NextResponse.json("fini");
  } catch (error: unknown) {
    console.error(
      "Erreur globale:",
      error instanceof Error ? error.message : error
    );
    return NextResponse.json({ error: "ERROR" });
  }
}
