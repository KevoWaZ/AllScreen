import prisma from "@/lib/prisma";
import { obtainMovieDetails } from "@/utils/movie";
import { obtainTVDetails } from "@/utils/tv";
import { NextRequest, NextResponse } from "next/server";

async function createMedia(type: string, id: number) {
  if (type === "MOVIE") {
    const movieDetail = await obtainMovieDetails(id.toString());
    await prisma.movie.create({
      data: {
        id: id,
        title: movieDetail.movieDetails.title,
        description: movieDetail.movieDetails.overview,
        poster: movieDetail.movieDetails.poster_path || "",
        release_date: new Date(movieDetail.movieDetails.release_date),
      },
    });
  } else if (type === "TVSHOW") {
    const tvDetail = await obtainTVDetails(id.toString());
    await prisma.tVShow.create({
      data: {
        id: id,
        title: tvDetail?.TvDetails.name,
        description: tvDetail?.TvDetails.overview,
        poster: tvDetail?.TvDetails.poster_path || "",
        first_air_date: new Date(tvDetail?.TvDetails.first_air_date),
      },
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { rating, comment, type, userId, id } = await req.json();

    if (!rating || !comment || !type || !userId || !id) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const validRatings = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

    if (!validRatings.includes(rating)) {
      return NextResponse.json(
        { message: "Rating is not possible!" },
        { status: 400 }
      );
    }

    const field = type === "MOVIE" ? "movieId" : "TVId";

    let mediaExists;
    if (type === "MOVIE") {
      mediaExists = await prisma.movie.findUnique({
        where: {
          id: id,
        },
      });
    } else if (type === "TVSHOW") {
      mediaExists = await prisma.tVShow.findUnique({
        where: {
          id: id,
        },
      });
    }

    if (!mediaExists) {
      await createMedia(type, id);
    }

    const checkRating = await prisma.review.findMany({
      where: {
        [field]: id,
        userId: userId,
      },
    });

    if (checkRating.length > 0) {
      const updateRating = await prisma.review.update({
        where: {
          id: checkRating[0].id,
        },
        data: {
          rating,
          comment,
          updatedAt: new Date(),
        },
      });

      return NextResponse.json(updateRating, { status: 200 });
    }

    const createRating = await prisma.review.create({
      data: {
        rating,
        comment,
        type,
        userId,
        [field]: id,
      },
    });

    return NextResponse.json(createRating, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
