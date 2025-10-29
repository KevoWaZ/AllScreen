import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const movies = await prisma.movie.findMany({
    where: {
      productionCountries: {
        none: {},
      },
    },
  });

  return NextResponse.json(movies);
}
