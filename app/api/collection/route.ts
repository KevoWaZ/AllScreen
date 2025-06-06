import prisma from "@/lib/prisma";
import { Movie } from "@/types/types";
import { getCollection } from "@/utils/collection";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const collectionId = searchParams.get("collectionId");
  const isLogged = searchParams.get("isLogged");
  const userId = searchParams.get("userId");

  if (!collectionId) {
    return NextResponse.json(
      { message: "Paramètre collectionId manquant" },
      { status: 400 }
    );
  }

  try {
    const result = await getCollection(collectionId);

    if (isLogged === "false") {
      return NextResponse.json(result);
    }

    if (!userId) {
      return NextResponse.json("invalid userId");
    }

    const moviesId = result.parts.map((movie: Movie) => movie.id);

    const matchWatchedMovies = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        watched: {
          where: {
            type: "MOVIE",
            movieId: {
              in: moviesId,
            },
          },
        },
      },
    });

    const matchWatchListMovies = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        watchlists: {
          where: {
            type: "MOVIE",
            movieId: {
              in: moviesId,
            },
          },
        },
      },
    });

    const results = {
      ...result,
      parts: result.parts.map((movie: Movie) => ({
        ...movie,
        watchlist:
          matchWatchListMovies?.watchlists.some(
            (watchListMovie) => watchListMovie.movieId === movie.id
          ) || false,
        watched:
          matchWatchedMovies?.watched?.some(
            (watchedMovie) => watchedMovie.movieId === movie.id
          ) || false,
      })),
    };

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
