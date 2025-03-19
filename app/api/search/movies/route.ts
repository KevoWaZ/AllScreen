import { searchMovies } from "@/utils/searchUtils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  console.log(searchParams.toString());

  // Extraire les paramètres de l'URL
  const genres = searchParams.get("with_genres");
  const country = searchParams.get("with_origin_country");
  const language = searchParams.get("with_original_language");
  const page = searchParams.get("page");
  const sortBy = searchParams.get("sort_by");

  // Log des paramètres pour le débogage
  console.log("Genres:", genres);
  console.log("Country:", country);
  console.log("Language:", language);
  console.log("Page:", page);
  console.log("Sort By:", sortBy);

  // Construire la chaîne de requête
  const queryParams = new URLSearchParams();
  if (genres) queryParams.append("with_genres", genres);
  if (country) queryParams.append("with_origin_country", country);
  if (language) queryParams.append("with_original_language", language);
  if (page) queryParams.append("page", page);
  if (sortBy) queryParams.append("sort_by", sortBy);

  const queryString = queryParams.toString();
  console.log("Query String:", queryString);

  try {
    // Passer la chaîne de requête à la fonction searchMovies
    const results = await searchMovies(queryString, page as string);
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
