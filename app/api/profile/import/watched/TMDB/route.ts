import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function parseCSV(csv: string): Array<Record<string, string>> {
  const lines = csv.split("\n");
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map((header) => header.trim());
  const result = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const values: string[] = [];
    let currentValue = "";
    let inQuotes = false;
    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        values.push(currentValue.trim());
        currentValue = "";
      } else {
        currentValue += char;
      }
    }
    values.push(currentValue.trim());
    const obj: Record<string, string> = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = values[j] || "";
    }
    result.push(obj);
  }
  return result;
}

export async function POST(req: NextRequest) {
  try {
    const { csv, userId } = await req.json();
    if (!userId) {
      return NextResponse.json({ error: "userId est requis" }, { status: 400 });
    }

    // 1. Récupère tous les films "watched" de l'utilisateur
    const userWatchedMovies = await prisma.watched.findMany({
      where: { userId },
      select: { movieId: true },
    });
    const watchedMovieIds = new Set(userWatchedMovies.map((w) => w.movieId));

    // 2. Parse le CSV
    const moviesToProcess = parseCSV(csv);

    // 3. Identifie les films du CSV non présents dans "watched"
    const notWatched = moviesToProcess.filter((movie) => {
      const movieId = parseInt(movie["TMDb ID"]);
      return !watchedMovieIds.has(movieId);
    });

    // 4. Ajoute les films notWatched à la table watched, en les créant s'ils n'existent pas
    const addedWatched = [];
    const createdMovies = [];

    for (const movie of notWatched) {
      const movieId = parseInt(movie["TMDb ID"]);
      const movieTitle = movie.Name;
      const movieDescription = movie.Description || "";
      const moviePoster = movie.Poster || "";
      const movieReleaseDate = movie["Release Date"]
        ? new Date(movie["Release Date"])
        : null;

      // Vérifie si le film existe, sinon le crée
      const movieExists = await prisma.movie.findUnique({
        where: { id: movieId },
      });

      if (!movieExists) {
        const newMovie = await prisma.movie.create({
          data: {
            id: movieId,
            title: movieTitle,
            description: movieDescription,
            poster: moviePoster,
            release_date: movieReleaseDate,
            updated: false,
          },
        });
        createdMovies.push({
          id: newMovie.id,
          name: newMovie.title,
        });
      }

      // Ajoute le film à la table watched
      const newWatched = await prisma.watched.create({
        data: {
          type: "MOVIE",
          userId,
          movieId,
        },
      });

      addedWatched.push({
        id: movie["TMDb ID"],
        name: movie.Name,
        watchedId: newWatched.id,
      });
    }

    return NextResponse.json({
      message: "Films non 'watched' ajoutés avec succès (créés si nécessaire)",
      addedWatched,
      createdMovies,
      totalAdded: addedWatched.length,
      totalCreated: createdMovies.length,
      totalInCSV: moviesToProcess.length,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
