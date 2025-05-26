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
  } else if (type === "TVSHOW") {
    const tvDetail = await obtainTVDetails(id.toString());
    await prisma.tVShow.create({
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
    const { type, userId, id } = await req.json();

    if (!type || !userId || !id) {
      return NextResponse.json(
        { message: "Missing required fields" },
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
