import { obtainTVDetails } from "@/utils/tv";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();
  const { tvId } = data;

  const results = await obtainTVDetails(tvId);

  return NextResponse.json(results);
}
