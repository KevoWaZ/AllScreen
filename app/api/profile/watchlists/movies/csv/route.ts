import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

// Définir les interfaces pour les données
interface Review {
  rating: number;
}

interface Movie {
  id: string;
  title: string;
  release_date: Date | string | null;
  reviews: Review[];
}

interface WatchedItem {
  movie: Movie;
  type: string;
}

interface UserWatchedMovies {
  watchlists: WatchedItem[];
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return new Response(JSON.stringify({ error: "No user ID provided" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const movies = (await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        watchlists: {
          where: {
            type: "MOVIE",
          },
          orderBy: {
            movie: {
              release_date: "asc",
            },
          },
          select: {
            movie: {
              select: {
                release_date: true,
                title: true,
                id: true,
                reviews: {
                  select: {
                    rating: true,
                  },
                },
              },
            },
          },
        },
      },
    })) as UserWatchedMovies | null;

    if (!movies || !movies.watchlists || movies.watchlists.length === 0) {
      return new Response(JSON.stringify({ error: "No movies found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Convertir JSON en CSV
    const csv = convertToCSV(movies.watchlists);

    // Envoyer le CSV en réponse
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=filmsWatchlist.csv",
      },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

function convertToCSV(data: WatchedItem[]): string {
  const headers = ["title", "release_date", "tmdbID"];
  let csv = headers.join(",") + "\n";

  data.forEach((item) => {
    const movie = item.movie;
    const row = headers.map((header) => {
      let value: string = "";

      if (header === "title") {
        value = movie.title || "";
      } else if (header === "release_date") {
        if (movie.release_date instanceof Date) {
          value = movie.release_date.toISOString();
        } else if (movie.release_date) {
          const date = new Date(movie.release_date as string);
          if (!isNaN(date.getTime())) {
            value = date.toISOString();
          } else {
            value = movie.release_date as string;
          }
        }
      } else if (header === "tmdbID") {
        value = movie.id || "";
      }

      // S'assurer que value est une chaîne de caractères
      value = String(value);

      // Échapper les valeurs si nécessaire
      if (value.includes(",") || value.includes('"') || value.includes("\n")) {
        value = `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    });
    csv += row.join(",") + "\n";
  });

  return csv;
}
