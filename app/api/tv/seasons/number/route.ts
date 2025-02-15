import { obtainSeasonDetails } from "@/utils/tv";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tvId = searchParams.get("tvId");
  const number = searchParams.get("number")

  if (!tvId || !number) {
    return NextResponse.json(
      { message: "Paramètre tvId ou number manquant" },
      { status: 400 }
    );
  }

  try {
    const results = await obtainSeasonDetails(tvId, number);
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
