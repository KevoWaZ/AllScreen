import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
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
  toprated: MovieSummary[];
  ratings: RatingCount[];
  user: UserInfo;
}

interface QueryResult {
  moviesWatchCount: number;
  moviesWatchListsCount: number;
  TVSHOWWatchCount: number;
  TVSHOWWatchListsCount: number;
  moviesWatchlist: MovieSummary[];
  topRated: MovieSummary[];
  ratings: RatingCount[];
  user: UserInfo;
}

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const matchUsername = params.get("matchUsername");
  const username = params.get("username");

  if (matchUsername === "true") {
    const session = await auth.api.listUserAccounts({
      headers: await headers(),
    });

    if (session) {
      const userId = session[0].accountId;

      const results = (await prisma.$queryRaw`
  WITH counts AS (
    SELECT
      (SELECT CAST(COUNT(*) AS INTEGER) FROM "Watched" WHERE "userId" = ${userId} AND "type" = 'MOVIE') AS moviesWatchCount,
      (SELECT CAST(COUNT(*) AS INTEGER) FROM "Watchlist" WHERE "userId" = ${userId} AND "type" = 'MOVIE') AS moviesWatchListsCount,
      (SELECT CAST(COUNT(*) AS INTEGER) FROM "Watched" WHERE "userId" = ${userId} AND "type" = 'TVSHOW') AS TVSHOWWatchCount,
      (SELECT CAST(COUNT(*) AS INTEGER) FROM "Watchlist" WHERE "userId" = ${userId} AND "type" = 'TVSHOW') AS TVSHOWWatchListsCount
  ),
  watchlists AS (
    SELECT m.id, m.title, m.poster
    FROM "Watchlist" wl
    JOIN "Movie" m ON wl."movieId" = m.id
    WHERE wl."userId" = ${userId} AND wl."type" = 'MOVIE'
    ORDER BY m.release_date DESC
    LIMIT 4
  ),
  topRated AS (
    SELECT m.id, m.title, m.poster, m.description, m.release_date
    FROM "Review" w
    JOIN "Movie" m ON w."movieId" = m.id
    WHERE w."userId" = ${userId} AND w."type" = 'MOVIE'
    ORDER BY w.rating DESC, m.release_date DESC
    LIMIT 6
  ),
  ratings AS (
    SELECT
      r.rating,
      COUNT(r."movieId") AS count
    FROM "Review" r
    WHERE r."movieId" IS NOT NULL AND r."type" = 'MOVIE' AND r."userId" = ${userId}
    GROUP BY r.rating
    ORDER BY r.rating ASC
  ),
  user_info AS (
    SELECT
      u.id, u.name, u.image, u.bio
    FROM "user" u
    WHERE u.id = ${userId}
  )
  SELECT
    c.*,
    (SELECT json_agg(m) FROM watchlists m) AS moviesWatchlist,
    (SELECT json_agg(m) FROM topRated m) AS topRated,
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
        topRated: results[0].toprated,
        ratings: results[0].ratings,
        user: results[0].user,
      };

      return NextResponse.json(result);
    }
  } else if (matchUsername === "false") {
    try {
      if (!username) {
        return NextResponse.json("pas d'username");
      }
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
  topRated AS (
    SELECT m.id, m.title, m.poster, m.description, m.release_date
    FROM "Review" w
    JOIN "Movie" m ON w."movieId" = m.id
    WHERE w."userId" = ${userId} AND w."type" = 'MOVIE'
    ORDER BY w.rating DESC, m.release_date DESC
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
    (SELECT json_agg(m) FROM topRated m) AS topRated,
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
        topRated: results[0].toprated,
        ratings: results[0].ratings,
        user: results[0].user,
      };

      return NextResponse.json(result);
    } catch (error) {
      NextResponse.json(error);
    }
  }

  return NextResponse.json("PAS DE SESSION");
}
