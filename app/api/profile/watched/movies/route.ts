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
        reviews: true,
        watched: {
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

    if (!user) {
      return NextResponse.json("NO USER");
    }

    // Ajouter les ratings aux films visionnés qui ont des revues correspondantes
    const watchedWithRatings = user.watched.map((watchedItem) => {
      if (!watchedItem.movie) {
        return watchedItem;
      }
      const review = user.reviews.find(
        (reviewItem) => reviewItem.movieId === watchedItem.movie!.id
      );
      if (review) {
        return {
          ...watchedItem,
          movie: {
            ...watchedItem.movie!,
            vote_count: review.rating,
          },
        };
      }
      return watchedItem;
    });

    return NextResponse.json({ ...user, watched: watchedWithRatings });
  } catch (error) {
    return NextResponse.json(error);
  }
}
