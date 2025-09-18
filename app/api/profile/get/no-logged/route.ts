// /api/profile/get/no-logged
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const username = params.get("username");

  if (!username) {
    return NextResponse.json({ error: "NO USERNAME" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        name: username,
      },
      select: {
        id: true,
        name: true,
        image: true,
        bio: true,
        watched: {
          select: {
            type: true,
          },
        },
        watchlists: {
          select: {
            type: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { user: null, message: "User not found!" },
        { status: 404 }
      );
    }

    const watchedMoviesCount = user.watched.filter(
      (w) => w.type === "MOVIE"
    ).length;
    const watchedTVShowsCount = user.watched.filter(
      (w) => w.type === "TVSHOW"
    ).length;
    const watchlistMoviesCount = user.watchlists.filter(
      (w) => w.type === "MOVIE"
    ).length;
    const watchlistTVShowsCount = user.watchlists.filter(
      (w) => w.type === "TVSHOW"
    ).length;

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
          orderBy: {
            movie: {
              release_date: "asc",
            },
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
          orderBy: {
            movie: {
              release_date: "asc",
            },
          },
        },
      },
    });

    const ratings = await prisma.review.groupBy({
      by: ["rating"],
      where: {
        userId: user.id,
      },
      _count: {
        rating: true,
      },
      orderBy: {
        rating: "asc",
      },
    });

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        image: user.image,
        bio: user.bio,
      },
      moviesWatchCount: String(watchedMoviesCount),
      TVSHOWWatchCount: String(watchedTVShowsCount),
      moviesWatchListsCount: String(watchlistMoviesCount),
      TVSHOWWatchListsCount: String(watchlistTVShowsCount),
      moviesWatchlist: moviesWatchlistAndWatched?.watchlists?.map(
        (item) => item.movie
      ),
      moviesWatched: moviesWatchlistAndWatched?.watched?.map(
        (item) => item.movie
      ),
      ratings,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
