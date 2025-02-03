import { obtainMovieDetails } from "@/utils/movie";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const movieId = searchParams.get("movieId");

  if (!movieId) {
    return NextResponse.json(
      { message: "Paramètre movieId manquant" },
      { status: 400 }
    );
  }

  try {
    const results = await obtainMovieDetails(movieId);
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: 500 }
    );
  }
}
