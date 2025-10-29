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
    // Récupérer les films de l'utilisateur avec les acteurs, en utilisant les curseurs
    const movies = await prisma.movie.findMany({
      where: {
        watched: {
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

    // Récupérer les reviews de l'utilisateur pour ajouter les ratings
    const user = await prisma.user.findUnique({
      where: {
        name: username,
      },
      select: {
        reviews: true,
      },
    });

    if (!user) {
      return NextResponse.json("NO USER");
    }

    // Ajouter les ratings aux films
    const moviesWithRatings = movies.map((movie) => {
      const review = user.reviews.find(
        (reviewItem) => reviewItem.movieId === movie.id
      );
      if (review) {
        return {
          ...movie,
          vote_count: review.rating,
        };
      }
      return movie;
    });

    // Déterminer le prochain curseur
    const lastMovie = movies[movies.length - 1];
    const nextCursor = lastMovie ? lastMovie.id.toString() : null;

    return NextResponse.json({
      watched: moviesWithRatings.map((movie) => ({
        movie,
      })),
      nextCursor,
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}
