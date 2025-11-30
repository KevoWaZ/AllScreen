// /api/profile/get/no-logged

import prisma from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

interface MovieSummary {
  id: number;
  title: string;
  poster: string;
  description?: string;
  release_date?: string;
}

interface RatingCount {
  rating: number;
  _count: {
    rating: number;
  };
}

interface UserInfo {
  id: string;
  name: string;
  image?: string;
  bio?: string;
}

interface RawQueryResult {
  movieswatchcount: number;
  movieswatchlistscount: number;
  tvshowwatchcount: number;
  tvshowwatchlistscount: number;
  movieswatchlist: MovieSummary[];
  movieswatched: MovieSummary[];
  ratings: RatingCount[];
  user: UserInfo;
}

interface QueryResult {
  moviesWatchCount: number;
  moviesWatchListsCount: number;
  TVSHOWWatchCount: number;
  TVSHOWWatchListsCount: number;
  moviesWatchlist: MovieSummary[];
  moviesWatched: MovieSummary[];
  ratings: RatingCount[];
  user: UserInfo;
}

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const username = params.get("username");

  if (!username) {
    return NextResponse.json({ error: "NO USERNAME" }, { status: 400 });
  }

  try {
    const userId = await prisma.user.findUnique({
      where: {
        name: username,
      },
      select: {
        id: true,
      },
    });

    if (!userId) {
      return NextResponse.json(
        { user: null, message: "User not found!" },
        { status: 404 }
      );
    }

    const results = (await prisma.$queryRaw`

  WITH counts AS (
    SELECT
      (SELECT CAST(COUNT(*) AS INTEGER) FROM "Watched" WHERE "userId" = ${userId.id} AND "type" = 'MOVIE') AS moviesWatchCount,
      (SELECT CAST(COUNT(*) AS INTEGER) FROM "Watchlist" WHERE "userId" = ${userId.id} AND "type" = 'MOVIE') AS moviesWatchListsCount,
      (SELECT CAST(COUNT(*) AS INTEGER) FROM "Watched" WHERE "userId" = ${userId.id} AND "type" = 'TVSHOW') AS TVSHOWWatchCount,
      (SELECT CAST(COUNT(*) AS INTEGER) FROM "Watchlist" WHERE "userId" = ${userId.id} AND "type" = 'TVSHOW') AS TVSHOWWatchListsCount
  ),
  watchlists AS (
    SELECT m.id, m.title, m.poster
    FROM "Watchlist" wl
    JOIN "Movie" m ON wl."movieId" = m.id
    WHERE wl."userId" = ${userId.id} AND wl."type" = 'MOVIE'
    ORDER BY m.release_date DESC
    LIMIT 4
  ),
  watched AS (
    SELECT m.id, m.title, m.poster, m.description, m.release_date
    FROM "Watched" w
    JOIN "Movie" m ON w."movieId" = m.id
    WHERE w."userId" = ${userId.id} AND w."type" = 'MOVIE'
    ORDER BY m.release_date ASC
    LIMIT 6
  ),
  ratings AS (
    SELECT
      r.rating,
      COUNT(r."movieId") AS count
    FROM "Review" r
    WHERE r."movieId" IS NOT NULL AND r."type" = 'MOVIE' AND r."userId" = ${userId.id}
    GROUP BY r.rating
    ORDER BY r.rating ASC
  ),
  user_info AS (
    SELECT
      u.id, u.name, u.image, u.bio
    FROM "user" u
    WHERE u.id = ${userId.id}
  )
  SELECT
    c.*,
    (SELECT json_agg(m) FROM watchlists m) AS moviesWatchlist,
    (SELECT json_agg(m) FROM watched m) AS moviesWatched,
    (SELECT json_agg(
      json_build_object(
        'rating', r.rating,
        '_count', json_build_object('rating', r.count)
      )
    ) FROM ratings r) AS ratings,
    (SELECT json_build_object(
      'id', u.id,
      'name', u.name,
      'image', u.image,
      'bio', u.bio
    ) FROM user_info u) AS user
  FROM counts c
`) as RawQueryResult[];

    const result: QueryResult = {
      moviesWatchCount: results[0].movieswatchcount,
      moviesWatchListsCount: results[0].movieswatchlistscount,
      TVSHOWWatchCount: results[0].tvshowwatchcount,
      TVSHOWWatchListsCount: results[0].tvshowwatchlistscount,
      moviesWatchlist: results[0].movieswatchlist,
      moviesWatched: results[0].movieswatched,
      ratings: results[0].ratings,
      user: results[0].user,
    };

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
