import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const value = params.get("value");
  const type = params.get("type");
  if (!value || !type) return NextResponse.json("Pas de value");

  try {
    if (type === "movie") {
      const data = await prisma.movie.findMany({
        where: {
          title: {
            contains: value,
            mode: "insensitive",
          },
        },
      });

      return NextResponse.json(data);
    } else {
      const data = await prisma.tVShow.findMany({
        where: {
          title: {
            contains: value,
            mode: "insensitive",
          },
        },
      });

      return NextResponse.json(data);
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}
