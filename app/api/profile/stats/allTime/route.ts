import { ShowType } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type ReviewWithMovie = {
  id: string;
  type: ShowType;
  userId: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  comment: string | null;
  movieId: number | null;
  TVId: number | null;
  movie: {
    id: number;
    title: string;
    poster: string | null;
    release_date: Date | null;
    description: string | null;
  } | null;
};

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const username = params.get("username");
  const userId = params.get("userId");
  const isLogged = params.get("isLogged") === "true";
  const matchUser = params.get("matchUser") === "true";

  try {
    if (isLogged == true && matchUser == true) {
      if (!userId) {
        return NextResponse.json("NO USERID");
      }
      const userReviews = await prisma.review.findMany({
        where: {
          userId: userId,
        },
        include: {
          movie: true,
        },
      });
      const { finalResultByYear, finalResultByDecade } = await handleResult(
        userReviews
      );

      return NextResponse.json({
        finalResultByYear,
        finalResultByDecade,
      });
    } else if (isLogged == true && matchUser == false) {
      if (!username) {
        return NextResponse.json("No Username");
      }
      const obtainUserId = await prisma.user.findUnique({
        where: {
          name: username,
        },
        select: {
          id: true,
        },
      });

      const userReviews = await prisma.review.findMany({
        where: {
          userId: obtainUserId?.id,
        },
        include: {
          movie: true,
        },
      });
      const { finalResultByYear, finalResultByDecade } = await handleResult(
        userReviews
      );

      return NextResponse.json({
        finalResultByYear,
        finalResultByDecade,
      });
    } else if (isLogged == false) {
      console.log("not logged");

      if (!username) {
        return NextResponse.json("No Username");
      }
      const obtainUserId = await prisma.user.findUnique({
        where: {
          name: username,
        },
        select: {
          id: true,
        },
      });

      const userReviews = await prisma.review.findMany({
        where: {
          userId: obtainUserId?.id,
        },
        include: {
          movie: true,
        },
      });
      const { finalResultByYear, finalResultByDecade } = await handleResult(
        userReviews
      );

      return NextResponse.json({
        finalResultByYear,
        finalResultByDecade,
      });
    }
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

async function handleResult(userReviews: ReviewWithMovie[]) {
  const reviewsWithMovie = userReviews.filter(
    (review): review is ReviewWithMovie => review.movie !== null
  );

  const getDecade = (year: number) => Math.floor(year / 10) * 10;

  const resultByYear = {} as Record<
    number,
    { count: number; sumRatings: number; averageRating: number }
  >;

  const resultByDecade = {} as Record<
    number,
    {
      count: number;
      sumRatings: number;
      averageRating: number;
      films: Array<{
        id: number;
        title: string;
        rating: number;
        year: number;
        poster: string;
      }>;
    }
  >;

  reviewsWithMovie.forEach((review) => {
    if (!review.movie?.release_date) {
      return;
    }

    const year = review.movie.release_date.getFullYear();
    const decade = getDecade(year);

    if (!resultByYear[year]) {
      resultByYear[year] = { count: 0, sumRatings: 0, averageRating: 0 };
    }
    resultByYear[year].count += 1;
    resultByYear[year].sumRatings += review.rating;
    resultByYear[year].averageRating =
      resultByYear[year].sumRatings / resultByYear[year].count;

    if (!resultByDecade[decade]) {
      resultByDecade[decade] = {
        count: 0,
        sumRatings: 0,
        averageRating: 0,
        films: [],
      };
    }
    resultByDecade[decade].count += 1;
    resultByDecade[decade].sumRatings += review.rating;
    resultByDecade[decade].averageRating =
      resultByDecade[decade].sumRatings / resultByDecade[decade].count;

    resultByDecade[decade].films.push({
      id: review.movie.id,
      title: review.movie.title,
      rating: review.rating,
      year: year,
      poster: review.movie.poster || "",
    });
  });

  Object.keys(resultByDecade).forEach((decade) => {
    resultByDecade[parseInt(decade)].films.sort((a, b) => b.rating - a.rating);
    resultByDecade[parseInt(decade)].films = resultByDecade[
      parseInt(decade)
    ].films.slice(0, 20);
  });

  const finalResultByYear = Object.entries(resultByYear).map(
    ([year, data]) => ({
      year: parseInt(year),
      ...data,
    })
  );

  const finalResultByDecade = Object.entries(resultByDecade).map(
    ([decade, data]) => ({
      decade: parseInt(decade),
      count: data.count,
      sumRatings: data.sumRatings,
      averageRating: data.averageRating,
      topFilms: data.films,
    })
  );

  return {
    finalResultByYear: finalResultByYear.sort((a, b) => a.year - b.year),
    finalResultByDecade: finalResultByDecade.sort(
      (a, b) => a.decade - b.decade
    ),
  };
}
