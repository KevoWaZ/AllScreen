import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const username = params.get("username");
  const listId = params.get("listId");

  if (!username || !listId) {
    return NextResponse.json("NO USERNAME OR LISTID");
  }

  try {
    const list = await prisma.list.findUnique({
      where: {
        id: listId,
        user: {
          name: username,
        },
      },
      select: {
        name: true,
        description: true,
        movies: {
          orderBy: {
            release_date: "asc",
          },
        },
        TVShows: {
          orderBy: {
            first_air_date: "asc",
          },
        },
      },
    });

    return NextResponse.json(list);
  } catch (error) {
    return NextResponse.json(error);
  }
}
