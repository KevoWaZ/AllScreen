import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const username = params.get("username");

  if (!username) {
    return NextResponse.json("NO USERNAME");
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        name: username,
      },
      select: {
        watchlists: {
          where: {
            type: "TVSHOW",
          },
          select: {
            TVShow: true,
          },
          orderBy: {
            TVShow: {
              first_air_date: "desc",
            },
          },
        },
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(error);
  }
}
