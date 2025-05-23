import prisma from "@/lib/prisma";
import { obtainMovieDetails } from "@/utils/movie";
import { obtainTVDetails } from "@/utils/tv";
import { NextRequest, NextResponse } from "next/server";

// Fonction externe pour créer un film ou une série
async function createMedia(type: string, id: number) {
  if (type === "MOVIE") {
    const movieDetail = await obtainMovieDetails(id.toString());
    await prisma.movie.create({
      data: {
        id: id,
        title: movieDetail.movieDetails.title,
        description: movieDetail.movieDetails.overview,
        releaseYear: parseInt(
          movieDetail.movieDetails.release_date.split("-")[0]
        ),
      },
    });
  } else if (type === "SERIES") {
    const tvDetail = await obtainTVDetails(id.toString());
    await prisma.series.create({
      data: {
        id: id,
        title: tvDetail?.TvDetails.name,
        description: tvDetail?.TvDetails.overview,
        startYear: parseInt(tvDetail?.TvDetails.first_air_date.split("-")[0]),
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

    console.log("Received data:", { rating, comment, type, userId, id });

    const field = type === "MOVIE" ? "movieId" : "seriesId";

    let mediaExists;
    if (type === "MOVIE") {
      mediaExists = await prisma.movie.findUnique({
        where: {
          id: id,
        },
      });
    } else if (type === "SERIES") {
      mediaExists = await prisma.series.findUnique({
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
