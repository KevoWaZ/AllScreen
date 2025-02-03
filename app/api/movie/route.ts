import { obtainMovieDetails } from "@/utils/movie";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
  const data = await request.json();
  const { movieId } = data;

  const results = await obtainMovieDetails(movieId);

  return NextResponse.json(results);
}
