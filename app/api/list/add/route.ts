import prisma from "@/lib/prisma";
import { obtainMovieDetails } from "@/utils/movie";
import { obtainTVDetails } from "@/utils/tv";
import { NextRequest, NextResponse } from "next/server";

async function createOrUpdateMedia(type: string, id: number) {
  if (type === "MOVIE") {
    const movieDetail = await obtainMovieDetails(id.toString());
    await prisma.movie.upsert({
      where: {
        id: id,
      },
      create: {
        id: id,
        title: movieDetail.movieDetails.title,
        description: movieDetail.movieDetails.overview,
        poster: movieDetail.movieDetails.poster_path || "",
        release_date: new Date(movieDetail.movieDetails.release_date),
      },
      update: {
        title: movieDetail.movieDetails.title,
        description: movieDetail.movieDetails.overview,
        poster: movieDetail.movieDetails.poster_path || "",
        release_date: new Date(movieDetail.movieDetails.release_date),
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
    const { type, userId, id, listId } = await req.json();

    if (!type || !userId || !id || !listId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await createOrUpdateMedia(type, id);

    // Convertir listId en tableau si ce n'est pas déjà le cas
    const listIds = Array.isArray(listId) ? listId : [listId];

    const results = [];

    for (const currentListId of listIds) {
      let checkIsInList;
      if (type === "MOVIE") {
        checkIsInList = await prisma.list.findUnique({
          where: {
            id: currentListId,
            userId: userId,
            movies: {
              some: {
                id: id,
              },
            },
          },
        });
      } else if (type === "TVSHOW") {
        checkIsInList = await prisma.list.findUnique({
          where: {
            id: currentListId,
            userId: userId,
            TVShows: {
              some: {
                id: id,
              },
            },
          },
        });
      }

      if (checkIsInList) {
        const removeFromList = await prisma.list.update({
          where: {
            id: currentListId,
            userId: userId,
          },
          data: {
            [type === "MOVIE" ? "movies" : "TVShows"]: {
              disconnect: { id: id },
            },
          },
        });
        results.push(removeFromList);
      } else {
        const addToList = await prisma.list.update({
          where: {
            id: currentListId,
            userId: userId,
          },
          data: {
            userId: userId,
            [type === "MOVIE" ? "movies" : "TVShows"]: {
              connect: { id: id },
            },
          },
        });
        results.push(addToList);
      }
    }

    return NextResponse.json(results, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
