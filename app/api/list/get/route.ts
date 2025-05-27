import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    console.log(params.get("userId"));
    const userId = params.get("userId");

    if (!userId) {
      return NextResponse.json({ message: "No userId!" }, { status: 404 });
    }

    const userLists = await prisma.list.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        _count: {
          select: {
            movies: true,
            TVShows: true,
          },
        },
      },
    });

    return NextResponse.json(userLists);
  } catch (error) {
    return NextResponse.json(error);
  }
}
