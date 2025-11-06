import prisma from "@/lib/prisma";
import { obtainMovieDetails } from "@/utils/movie";
import { obtainTVDetails } from "@/utils/tv";
import { NextRequest, NextResponse } from "next/server";

interface type {
  type: number;
}

interface iso {
  iso_3166_1: string;
}

async function createOrUpdateMedia(type: string, id: number) {
  if (type === "MOVIE") {
    const movieDetail = await obtainMovieDetails(id.toString());

    const frRelease = movieDetail.movieDetails.release_dates.results.find(
      (iso: iso) => iso.iso_3166_1 === "FR"
    );
    const release_date = frRelease
      ? frRelease.release_dates.find((t: type) => t.type === 3) ||
        frRelease.release_dates.find((t: type) => t.type === 4) ||
        frRelease.release_dates[0]
      : movieDetail.movieDetails.release_date;

    const dateToUse =
      release_date instanceof Date
        ? release_date
        : typeof release_date === "string"
        ? new Date(release_date)
        : release_date?.release_date
        ? new Date(release_date.release_date)
        : null;

    console.log(dateToUse);

    await prisma.movie.upsert({
      where: {
        id: id,
      },
      create: {
        id: id,
        title: movieDetail.movieDetails.title,
        description: movieDetail.movieDetails.overview,
        poster: movieDetail.movieDetails.poster_path || "",
        release_date: dateToUse,
        runtime: movieDetail.movieDetails.runtime,
      },
      update: {
        title: movieDetail.movieDetails.title,
        description: movieDetail.movieDetails.overview,
        poster: movieDetail.movieDetails.poster_path || "",
        release_date: dateToUse,
        runtime: movieDetail.movieDetails.runtime,
      },
    });
  } else if (type === "TVSHOW") {
    const tvDetail = await obtainTVDetails(id.toString());
    await prisma.tVShow.upsert({
      where: {
        id: id,
      },
      create: {
        id: id,
        title: tvDetail?.TvDetails.name,
        description: tvDetail?.TvDetails.overview,
        poster: tvDetail?.TvDetails.poster_path || "",
        first_air_date: new Date(tvDetail?.TvDetails.first_air_date),
      },
      update: {
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
      return NextResponse.json({
        status: 400,
        statusText: "Missing required fields",
      });
    }

    const validRatings = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

    if (!validRatings.includes(rating)) {
      return NextResponse.json({
        status: 400,
        statusText: "Rating is not possible!",
      });
    }

    const field = type === "MOVIE" ? "movieId" : "TVId";

    await createOrUpdateMedia(type, id);

    const checkRating = await prisma.review.findMany({
      where: {
        [field]: id,
        userId: userId,
      },
    });

    if (checkRating.length > 0) {
      try {
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

        return NextResponse.json(updateRating, {
          status: 200,
          statusText: "Merci pour votre avis!",
        });
      } catch (error) {
        console.error(error);
        return NextResponse.json({
          status: 500,
          statusText: "Erreur",
        });
      }
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

    return NextResponse.json(createRating, {
      status: 201,
      statusText: "Merci pour votre avis!",
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      status: 500,
      statusText: "Erreur",
    });
  }
}
