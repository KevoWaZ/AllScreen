import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Items {
  type: "MOVIE" | "TVSHOW";
  id: number;
}

export async function POST(req: NextRequest) {
  const { items, name, description, userId } = await req.json();

  if (!items || !name || !description || !userId) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  const movies: Items[] = [];
  const tvshows: Items[] = [];

  // Parcourir le tableau items et répartir les éléments
  items.forEach((item: Items) => {
    if (item.type === "MOVIE") {
      movies.push(item);
    } else if (item.type === "TVSHOW") {
      tvshows.push(item);
    }
  });

  const createList = await prisma.list.create({
    data: {
      description: description,
      name: name,
      userId: userId,
    },
  });

  tvshows.forEach(async (item) => {
    const addTvShowToList = await prisma.list.update({
      where: {
        id: createList.id,
      },
      data: {
        TVShows: {
          connect: {
            id: item.id,
          },
        },
      },
    });
    console.log(addTvShowToList);
  });
  movies.forEach(async (item) => {
    const addMovieToList = await prisma.list.update({
      where: {
        id: createList.id,
      },
      data: {
        movies: {
          connect: {
            id: item.id,
          },
        },
      },
    });
    console.log(addMovieToList);
  });

  return NextResponse.json({ movies, tvshows });
}
