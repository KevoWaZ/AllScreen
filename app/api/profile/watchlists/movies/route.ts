import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const username = params.get("username");
  const cursor = params.get("cursor");

  if (!username) {
    return NextResponse.json("NO USERNAME");
  }
  try {
    const movies = await prisma.movie.findMany({
      where: {
        watchlists: {
          some: {
            user: {
              name: username,
            },
            type: "MOVIE",
          },
        },
      },
      select: {
        id: true,
        title: true,
        poster: true,
        release_date: true,
        runtime: true,
        genres: true,
        productionCompanies: true,
        directors: true,
        producers: true,
        execProducers: true,
        writers: true,
        composers: true,
        cinematographers: true,
        actors: true,
      },
      orderBy: {
        release_date: "desc",
      },
      take: 500,
      ...(cursor &&
        !isNaN(parseInt(cursor)) && {
          cursor: {
            id: parseInt(cursor),
          },
          skip: 1,
        }),
    });
    const lastMovie = movies[movies.length - 1];
    const nextCursor = lastMovie ? lastMovie.id.toString() : null;
    return NextResponse.json({ watchlists: movies, nextCursor });
  } catch (error) {
    return NextResponse.json(error);
  }
}
