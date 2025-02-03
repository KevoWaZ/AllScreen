import { obtainGenreResults } from "@/utils/genre";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const genreId = searchParams.get("genreId");
  const type = searchParams.get("type");
  const page = searchParams.get("page");

  if (!genreId || !type || !page) {
    return NextResponse.json(
      { message: "Paramètre type manquant" },
      { status: 400 }
    );
  }

  try {
    const results = await obtainGenreResults(genreId, type, Number(page));
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
