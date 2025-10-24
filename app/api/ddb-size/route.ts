import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const result = await prisma.$queryRaw`
  SELECT pg_size_pretty(pg_database_size(current_database())) as size;
`;
    console.log(result);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}
