import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    console.log(params.get("userId"));
    const userId = params.get("userId");
    const id = params.get("id");
    const type = params.get("type");

    if (!userId || !id || !type) {
      return NextResponse.json({ message: "No userId!" }, { status: 404 });
    }
    const field = type === "MOVIE" ? "movies" : "TVShows";

    console.log(field);

    let userLists = await prisma.list.findMany({
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

    const inLists = await prisma.list.findMany({
      where: {
        [field]: {
          some: {
            id: Number(id),
          },
        },
      },
    });

    const inListsIds = inLists.map((list) => list.id);

    userLists = userLists.map((userList) => ({
      ...userList,
      inList: inListsIds.includes(userList.id),
    }));

    return NextResponse.json(userLists);
  } catch (error) {
    return NextResponse.json(error);
  }
}
