import prisma from "@/lib/prisma";
import { searchAll } from "@/utils/searchUtils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params = searchParams.get("params");
  const isLogged = searchParams.get("isLogged");
  const userId = searchParams.get("userId");
  if (!params) {
    return NextResponse.json(
      { message: "Paramètre params manquant" },
      { status: 400 }
    );
  }

  try {
    const result = await searchAll(params);

    if (isLogged === "false") {
      return NextResponse.json(result);
    }

    if (!userId) {
      return NextResponse.json("invalid userId");
    }

    const moviesId = result.movies.map((movie) => movie.id);

    const tvshowsId = result.tvShows.map((tv) => tv.id);

    const matchWatchedMovies = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        watched: {
          where: {
            type: "MOVIE",
            movieId: {
              in: moviesId,
            },
          },
        },
      },
    });

    const matchWatchListMovies = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        watchlists: {
          where: {
            type: "MOVIE",
            movieId: {
              in: moviesId,
            },
          },
        },
      },
    });

    const matchWatchedTVShows = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        watched: {
          where: {
            type: "TVSHOW",
            TVId: {
              in: tvshowsId,
            },
          },
        },
      },
    });

    console.log(matchWatchedTVShows);

    const matchWatchListTVShows = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        watchlists: {
          where: {
            type: "TVSHOW",
            TVId: {
              in: tvshowsId,
            },
          },
        },
      },
    });

    const results = {
      ...result,
      movies: result.movies.map((movie) => ({
        ...movie,
        watchlist:
          matchWatchListMovies?.watchlists.some(
            (watchListMovie) => watchListMovie.movieId === movie.id
          ) || false,
        watched:
          matchWatchedMovies?.watched?.some(
            (watchedMovie) => watchedMovie.movieId === movie.id
          ) || false,
      })),
      tvShows: result.tvShows.map((tvshow) => ({
        ...tvshow,
        watchlist:
          matchWatchListTVShows?.watchlists.some(
            (watchListTVShow) => watchListTVShow.TVId === tvshow.id
          ) || false,
        watched:
          matchWatchedTVShows?.watched.some(
            (watchedTVShow) => watchedTVShow.TVId === tvshow.id
          ) || false,
      })),
    };

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
