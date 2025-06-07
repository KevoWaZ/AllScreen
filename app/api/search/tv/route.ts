import prisma from "@/lib/prisma";
import { TVShow } from "@/types/types";
import { searchTvs } from "@/utils/searchUtils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  console.log(searchParams.toString());

  // Extraire les paramètres de l'URL
  const genres = searchParams.get("with_genres");
  const country = searchParams.get("with_origin_country");
  const language = searchParams.get("with_original_language");
  const page = searchParams.get("page");
  const sort_by = searchParams.get("sort_by");
  const first_air_date_year = searchParams.get("first_air_date_year");

  // Log des paramètres pour le débogage
  console.log("Genres:", genres);
  console.log("Country:", country);
  console.log("Language:", language);
  console.log("Page:", page);
  console.log("Sort By:", sort_by);
  console.log("First Air Date Year:", first_air_date_year);

  // Construire la chaîne de requête
  const queryParams = new URLSearchParams();
  const isLogged = searchParams.get("isLogged");
  const userId = searchParams.get("userId");
  if (genres) queryParams.append("with_genres", genres);
  if (country) queryParams.append("with_origin_country", country);
  if (language) queryParams.append("with_original_language", language);
  if (page) queryParams.append("page", page);
  if (sort_by) queryParams.append("sort_by", sort_by);
  if (first_air_date_year)
    queryParams.append("first_air_date_year", first_air_date_year);

  const queryString = queryParams.toString();
  console.log("Query String:", queryString);

  try {
    // Passer la chaîne de requête à la fonction searchTvs
    const result = await searchTvs(queryString, page as string);
    if (isLogged === "false") {
      return NextResponse.json(result);
    }

    if (!userId) {
      return NextResponse.json("invalid userId");
    }

    const tvId = result.results.map((tv: TVShow) => tv.id);

    const matchWatchedTV = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        watched: {
          where: {
            type: "TVSHOW",
            TVId: {
              in: tvId,
            },
          },
        },
      },
    });

    const matchWatchListTV = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        watchlists: {
          where: {
            type: "TVSHOW",
            TVId: {
              in: tvId,
            },
          },
        },
      },
    });

    const results = {
      ...result,
      results: result.results.map((tv: TVShow) => ({
        ...tv,
        watchlist:
          matchWatchListTV?.watchlists.some(
            (watchListTV) => watchListTV.TVId === tv.id
          ) || false,
        watched:
          matchWatchedTV?.watched?.some(
            (watchedTV) => watchedTV.TVId === tv.id
          ) || false,
      })),
    };

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
