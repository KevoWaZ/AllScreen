import { obtainTVDetails } from "@/utils/tv";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tvId = searchParams.get("tvId");

  if (!tvId) {
    return NextResponse.json(
      { message: "Paramètre tvId manquant" },
      { status: 400 }
    );
  }

  try {
    const results = await obtainTVDetails(tvId);
    const data = {
      name: results?.TvDetails.name,
      seasons: results?.TvDetails.seasons,
    };
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
