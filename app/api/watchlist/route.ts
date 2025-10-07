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
    const release_date = ((frRelease) => {
      if (!frRelease) return movieDetail.movieDetails.release_date;

      const releaseDates = frRelease.release_dates || [];
      return (
        releaseDates.find((t: type) => t.type === 3) ||
        releaseDates.find((t: type) => t.type === 4) ||
        releaseDates[0] ||
        movieDetail.movieDetails.release_date
      );
    })(
      movieDetail.movieDetails.release_dates.results.find(
        (iso: iso) => iso.iso_3166_1 === "FR"
      )
    );

    await prisma.movie.upsert({
      where: {
        id: id,
      },
      create: {
        id: id,
        title: movieDetail.movieDetails.title,
        description: movieDetail.movieDetails.overview,
        poster: movieDetail.movieDetails.poster_path || "",
        release_date: new Date(release_date.release_date),
      },
      update: {
        title: movieDetail.movieDetails.title,
        description: movieDetail.movieDetails.overview,
        poster: movieDetail.movieDetails.poster_path || "",
        release_date: new Date(release_date.release_date),
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

    const checkWatchlist = await prisma.watchlist.findMany({
      where: {
        [field]: id,
        userId: userId,
      },
    });

    if (checkWatchlist.length > 0) {
      const deleteWatchlist = await prisma.watchlist.delete({
        where: {
          id: checkWatchlist[0].id,
        },
      });

      return NextResponse.json(deleteWatchlist, { status: 200 });
    }

    const createWatchlist = await prisma.watchlist.create({
      data: {
        type,
        userId,
        [field]: id,
      },
    });

    return NextResponse.json(createWatchlist, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
