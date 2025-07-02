import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const username = params.get("username");

  if (!username) {
    return NextResponse.json("NO USERNAME");
  }

  try {
    const lists = await prisma.user.findUnique({
      where: {
        name: username,
      },
      select: {
        lists: true,
      },
    });

    return NextResponse.json(lists);
  } catch (error) {
    return NextResponse.json(error);
  }
}
