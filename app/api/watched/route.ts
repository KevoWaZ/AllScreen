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
      release_date instanceof Date || typeof release_date === "string"
        ? release_date
        : release_date?.release_date;

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
        release_date: new Date(dateToUse),
      },
      update: {
        title: movieDetail.movieDetails.title,
        description: movieDetail.movieDetails.overview,
        poster: movieDetail.movieDetails.poster_path || "",
        release_date: new Date(dateToUse),
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
    const { type, userId, id } = await req.json();

    if (!type || !userId || !id) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const field = type === "MOVIE" ? "movieId" : "TVId";

    await createOrUpdateMedia(type, id);

    const checkWatched = await prisma.watched.findMany({
      where: {
        [field]: id,
        userId: userId,
      },
    });

    if (checkWatched.length > 0) {
      const deleteWatched = await prisma.watched.delete({
        where: {
          id: checkWatched[0].id,
        },
      });

      return NextResponse.json(deleteWatched, { status: 200 });
    }

    const createWatched = await prisma.watched.create({
      data: {
        type,
        userId,
        [field]: id,
      },
    });

    return NextResponse.json(createWatched, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
