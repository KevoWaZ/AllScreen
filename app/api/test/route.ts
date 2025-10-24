import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const movie = await prisma.movie.findMany({
    where: {
      genres: {
        some: {},
      },
    },
    include: {
      genres: true,
      productionCompanies: true,
    },
  });

  return NextResponse.json(movie);
}
