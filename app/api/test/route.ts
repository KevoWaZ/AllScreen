import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const companies = await prisma.productionCompany.findMany({
    where: {
      movies: {
        some: {
          watched: {
            some: {
              userId: "kM1EeQFhbt2XFFkQxyZJOTwXVOFPpK07",
            },
          },
        },
      },
    },
  });

  return NextResponse.json(companies);
}
