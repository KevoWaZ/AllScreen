import { obtainEpisodeCasts } from "@/utils/tv";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tvId = searchParams.get("tvId");
  const number = searchParams.get("number");
  const episode = searchParams.get("episode");

  if (!tvId || !number || !episode) {
    return NextResponse.json(
      { message: "Paramètre tvId ou number manquant" },
      { status: 400 }
    );
  }

  try {
    const results = await obtainEpisodeCasts(tvId, number, episode);
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
