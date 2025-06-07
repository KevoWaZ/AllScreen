import prisma from "@/lib/prisma";
import { Movie } from "@/types/types";
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
  const year = searchParams.get("primary_release_year");

  // Log des paramètres pour le débogage
  console.log("Genres:", genres);
  console.log("Country:", country);
  console.log("Language:", language);
  console.log("Page:", page);
  console.log("Sort By:", sortBy);
  console.log("Year:", year);

  // Construire la chaîne de requête
  const queryParams = new URLSearchParams();
  const isLogged = searchParams.get("isLogged");
  const userId = searchParams.get("userId");
  if (genres) queryParams.append("with_genres", genres);
  if (country) queryParams.append("with_origin_country", country);
  if (language) queryParams.append("with_original_language", language);
  if (page) queryParams.append("page", page);
  if (sortBy) queryParams.append("sort_by", sortBy);
  if (year) queryParams.append("primary_release_year", year);

  const queryString = queryParams.toString();
  console.log("Query String:", queryString);

  try {
    // Passer la chaîne de requête à la fonction searchMovies
    const result = await searchMovies(queryString, page as string);

    if (isLogged === "false") {
      return NextResponse.json(result);
    }

    if (!userId) {
      return NextResponse.json("invalid userId");
    }

    const moviesId = result.results.map((movie: Movie) => movie.id);

    const matchWatchedMovies = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        watched: {
          where: {
            type: "MOVIE",
            movieId: {
              in: moviesId,
            },
          },
        },
      },
    });

    const matchWatchListMovies = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        watchlists: {
          where: {
            type: "MOVIE",
            movieId: {
              in: moviesId,
            },
          },
        },
      },
    });

    const results = {
      ...result,
      results: result.results.map((movie: Movie) => ({
        ...movie,
        watchlist:
          matchWatchListMovies?.watchlists.some(
            (watchListMovie) => watchListMovie.movieId === movie.id
          ) || false,
        watched:
          matchWatchedMovies?.watched?.some(
            (watchedMovie) => watchedMovie.movieId === movie.id
          ) || false,
      })),
    };

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
