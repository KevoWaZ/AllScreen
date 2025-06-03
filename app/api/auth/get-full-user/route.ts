import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

interface UserResult {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  bio: string | null;
  createdAt: Date;
  updatedAt: Date;
  moviesWatchCount: string;
  TVSHOWWatchCount: string;
  moviesWatchListsCount: string;
  TVSHOWWatchListsCount: string;
  moviesWatchList: [];
  moviesWatched: [];
}

export async function GET() {
  const session = await auth.api.listUserAccounts({
    headers: await headers(),
  });

  if (session) {
    const userId = session[0].accountId;

    const result = await prisma.$queryRaw<UserResult[]>`
      SELECT
        u.*,
        (SELECT COUNT(*) FROM "Watched" w WHERE w."userId" = ${userId} AND w.type = 'MOVIE') as "moviesWatchCount",
        (SELECT COUNT(*) FROM "Watched" w WHERE w."userId" = ${userId} AND w.type = 'TVSHOW') as "TVSHOWWatchCount",
        (SELECT COUNT(*) FROM "Watchlist" wl WHERE wl."userId" = ${userId} AND wl.type = 'MOVIE') as "moviesWatchListsCount",
        (SELECT COUNT(*) FROM "Watchlist" wl WHERE wl."userId" = ${userId} AND wl.type = 'TVSHOW') as "TVSHOWWatchListsCount",
        (SELECT json_agg(wl) FROM (SELECT wl.*, m.poster, m.title, m.description, m.release_date FROM "Watchlist" wl JOIN "Movie" m ON wl."movieId" = m.id WHERE wl."userId" = ${userId} AND wl.type = 'MOVIE' LIMIT 4) as wl) as "moviesWatchList",
        (SELECT json_agg(wl) FROM (SELECT wl.*, m.poster, m.title, m.description, m.release_date FROM "Watched" wl JOIN "Movie" m ON wl."movieId" = m.id WHERE wl."userId" = ${userId} AND wl.type = 'MOVIE' LIMIT 6) as wl) as "moviesWatched"
      FROM "user" u
      WHERE u.id = ${userId}
    `;

    if (result.length > 0) {
      const user = result[0];

      return NextResponse.json({
        user: {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified,
          image: user.image,
          bio: user.bio,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        moviesWatchCount: user.moviesWatchCount.toString(),
        TVSHOWWatchCount: user.TVSHOWWatchCount.toString(),
        moviesWatchListsCount: user.moviesWatchListsCount.toString(),
        TVSHOWWatchListsCount: user.TVSHOWWatchListsCount.toString(),
        moviesWatchlist: user.moviesWatchList,
        moviesWatched: user.moviesWatched,
      });
    } else {
      return NextResponse.json("User not found");
    }
  }

  return NextResponse.json("PAS DE SESSION");
}
