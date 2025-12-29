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

    // 4. Prépare les données pour les films à créer
    const moviesToCreate = notWatched.map((movie) => ({
      id: parseInt(movie["TMDb ID"]),
      tmdb_id: parseInt(movie["TMDb ID"]),
      imdb_id: movie["IMDb ID"],
      title: movie.Name,
      description: movie.Description || "",
      poster: movie.Poster || "",
      release_date: movie["Release Date"]
        ? new Date(movie["Release Date"])
        : null,
      updated: false,
    }));

    // 5. Prépare les données pour les entrées "watched" à créer
    const watchedToCreate = notWatched.map((movie) => ({
      type: "MOVIE",
      userId,
      movieId: parseInt(movie["TMDb ID"]),
    }));

    // 6. Crée les films en une seule opération
    const createdMovies = await prisma.movie.createMany({
      data: moviesToCreate,
      skipDuplicates: true,
    });

    // 7. Crée les entrées "watched" en une seule opération
    const addedWatched = await prisma.watched.createMany({
      data: watchedToCreate.map((item) => ({
        type: item.type === "MOVIE" ? "MOVIE" : "TVSHOW", // Conversion explicite vers les valeurs de l'enum
        userId: item.userId,
        movieId: item.movieId,
      })),
    });

    return NextResponse.json({
      message: "Films non 'watched' ajoutés avec succès (créés si nécessaire)",
      totalAdded: addedWatched.count,
      totalCreated: createdMovies.count,
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
