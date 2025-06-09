import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const username = params.get("username");
  if (!username) {
    return NextResponse.json("NO USERNAME");
  }
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        name: username,
      },
      select: {
        id: true,
        name: true,
        image: true,
        bio: true,
      },
    });

    if (!getUser) {
      return NextResponse.json(
        { user: null, message: "User not found!" },
        { status: 404 }
      );
    }

    const watchedMoviesCount = await prisma.user.findUnique({
      where: {
        name: username,
      },
      select: {
        _count: {
          select: {
            watched: {
              where: {
                type: "MOVIE",
              },
            },
          },
        },
      },
    });
    const watchedTVShowsCount = await prisma.user.findUnique({
      where: {
        name: username,
      },
      select: {
        _count: {
          select: {
            watched: {
              where: {
                type: "TVSHOW",
              },
            },
          },
        },
      },
    });

    const watcheListMoviesCount = await prisma.user.findUnique({
      where: {
        name: username,
      },
      select: {
        _count: {
          select: {
            watchlists: {
              where: {
                type: "MOVIE",
              },
            },
          },
        },
      },
    });
    const watcheListTVShowsCount = await prisma.user.findUnique({
      where: {
        name: username,
      },
      select: {
        _count: {
          select: {
            watchlists: {
              where: {
                type: "TVSHOW",
              },
            },
          },
        },
      },
    });

    const moviesWatchlistAndWatched = await prisma.user.findUnique({
      where: {
        name: username,
      },
      select: {
        watched: {
          take: 6,
          where: {
            type: "MOVIE",
          },
          select: {
            movie: true,
          },
        },
        watchlists: {
          take: 4,
          where: {
            type: "MOVIE",
          },
          select: {
            movie: true,
          },
        },
      },
    });

    return NextResponse.json({
      user: getUser,
      moviesWatchCount: String(watchedMoviesCount?._count.watched),
      TVSHOWWatchCount: String(watchedTVShowsCount?._count.watched),
      moviesWatchListsCount: String(watcheListMoviesCount?._count.watchlists),
      TVSHOWWatchListsCount: String(watcheListTVShowsCount?._count.watchlists),
      moviesWatchlist: moviesWatchlistAndWatched?.watchlists?.map(
        (item) => item.movie
      ),
      moviesWatched: moviesWatchlistAndWatched?.watched?.map(
        (item) => item.movie
      ),
    });
  } catch (error) {
    NextResponse.json(error);
  }
}
