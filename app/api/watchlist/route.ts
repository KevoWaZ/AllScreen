import prisma from "@/lib/prisma";
import { obtainMovieDetails } from "@/utils/movie";
import { obtainTVDetails } from "@/utils/tv";
import { NextRequest, NextResponse } from "next/server";

interface ReleaseDate {
  type: number;
  release_date: string;
}

interface IsoRelease {
  iso_3166_1: string;
  release_dates: ReleaseDate[];
}

async function createOrUpdateMedia(type: string, id: number) {
  if (type === "MOVIE") {
    const movieDetail = await obtainMovieDetails(id.toString());
    const frRelease = movieDetail.movieDetails.release_dates.results.find(
      (iso: IsoRelease) => iso.iso_3166_1 === "FR"
    );

    let release_date: ReleaseDate | string | Date | undefined;
    if (frRelease) {
      const type3Dates = frRelease.release_dates
        .filter((date: ReleaseDate) => date.type === 3)
        .sort(
          (a: ReleaseDate, b: ReleaseDate) =>
            new Date(a.release_date).getTime() -
            new Date(b.release_date).getTime()
        );
      release_date =
        type3Dates[0] ||
        frRelease.release_dates.find((t: ReleaseDate) => t.type === 4) ||
        frRelease.release_dates[0];
    } else {
      release_date = movieDetail.movieDetails.release_date;
    }

    const dateToUse: string | Date | undefined =
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
        release_date: dateToUse,
      },
      update: {
        title: movieDetail.movieDetails.title,
        description: movieDetail.movieDetails.overview,
        poster: movieDetail.movieDetails.poster_path || "",
        release_date: dateToUse,
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
