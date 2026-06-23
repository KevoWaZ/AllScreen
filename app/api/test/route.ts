import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const userId = "EULKIR4dIE3asXsx2zRMUNi1Xx24wl0g";

  try {
    const movies = await prisma.movie.findMany({
      where: {
        watched: {
          some: {},
        },
        reviews: {
          none: {},
        },
      },
    });
    return NextResponse.json(movies);
  } catch (error) {
    console.error("Error fetching top directors:", error);
    return NextResponse.json(
      { error: "Failed to fetch top directors" },
      { status: 500 },
    );
  }
}
