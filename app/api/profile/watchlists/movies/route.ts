import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const username = params.get("username");

  if (!username) {
    return NextResponse.json("NO USERNAME");
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        name: username,
      },
      select: {
        watchlists: {
          where: {
            type: "MOVIE",
          },
          select: {
            movie: {
              select: {
                id: true,
                title: true,
                description: true,
                poster: true,
                release_date: true,
                runtime: true,
                genres: true,
                productionCompanies: true,
              },
            },
          },
          orderBy: {
            movie: {
              release_date: "desc",
            },
          },
        },
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(error);
  }
}
