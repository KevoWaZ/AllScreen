import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const ratings = await prisma.review.groupBy({
      by: ["rating"],
      where: {
        userId: "7z26utrsNxlugSiIfYgbOYRfIOzbx710",
      },
      _count: {
        rating: true,
      },
      orderBy: {
        rating: "asc",
      },
    });

    return NextResponse.json(ratings);
  } catch (error) {
    return NextResponse.json(error);
  }
}

// 7z26utrsNxlugSiIfYgbOYRfIOzbx710
