import { searchMoviesSearch } from "@/utils/searchUtils";
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

async function searchMovieWithRetry(
  movieName: string,
  retries = 3,
  delay = 60000
) {
  try {
    const movie = await searchMoviesSearch(
      `query=${encodeURIComponent(movieName)}`,
      "1"
    );
    return movie.results[0];
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      error.message.includes("429") &&
      retries > 0
    ) {
      console.error(
        `Rate limit atteint pour "${movieName}", attente de ${
          delay / 1000
        } secondes...`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
      return searchMovieWithRetry(
        movieName,
        retries - 1,
        Math.min(delay * 1.5, 300000)
      );
    }
    console.error(
      `Échec définitif pour "${movieName}":`,
      error instanceof Error ? error.message : error
    );
    return null;
  }
}

async function toggleWatched(userId: string, movieId: number) {
  const field = "movieId";
  const checkWatched = await prisma.watched.findMany({
    where: {
      [field]: movieId,
      userId: userId,
    },
  });
  if (checkWatched.length > 0) {
    const deleteWatched = await prisma.watched.delete({
      where: {
        id: checkWatched[0].id,
      },
    });
    return { action: "removed", data: deleteWatched };
  } else {
    const createWatched = await prisma.watched.create({
      data: {
        type: "MOVIE",
        userId,
        [field]: movieId,
      },
    });
    return { action: "added", data: createWatched };
  }
}

export async function POST(req: NextRequest) {
  try {
    const { csv, userId } = await req.json();
    if (!userId) {
      return NextResponse.json({ error: "userId est requis" }, { status: 400 });
    }

    const moviesToProcess = parseCSV(csv);
    const batchSize = 5;
    const delayBetweenBatches = 2000;
    const results = [];
    const notFound = [];
    const savedMovies = [];
    const watchedUpdates = [];

    for (let i = 0; i < moviesToProcess.length; i += batchSize) {
      const batch = moviesToProcess.slice(i, i + batchSize);
      const batchPromises = batch.map((movie) =>
        searchMovieWithRetry(movie.Name)
      );
      const batchResults = await Promise.all(batchPromises);

      const batchResultsWithNames = batchResults.map((result, index) => ({
        name: batch[index].Name,
        year: batch[index].Year,
        data: result,
      }));

      const found = batchResultsWithNames.filter((item) => item.data !== null);
      const batchNotFound = batchResultsWithNames.filter(
        (item) => item.data === null
      );

      // Sauvegarder chaque film trouvé en base et marquer comme "watched"
      for (const { data, name, year } of found) {
        try {
          const movieData = {
            id: data.id,
            title: data.title,
            description: data.overview || "",
            poster: data.poster_path || "",
            release_date: data.release_date
              ? new Date(data.release_date)
              : new Date(year),
          };

          const savedMovie = await prisma.movie.upsert({
            where: { id: movieData.id },
            create: movieData,
            update: movieData,
          });

          // Marquer comme "watched" pour l'utilisateur
          const watchedUpdate = await toggleWatched(userId, data.id);
          watchedUpdates.push({
            movieId: data.id,
            movieTitle: data.title,
            action: watchedUpdate.action,
          });

          savedMovies.push(savedMovie);
          results.push({ name, year, data });
        } catch (error) {
          console.error(`Erreur lors de la sauvegarde de ${name}:`, error);
        }
      }

      notFound.push(...batchNotFound.map((item) => item.name));

      if (i + batchSize < moviesToProcess.length) {
        await new Promise((resolve) =>
          setTimeout(resolve, delayBetweenBatches)
        );
      }
    }

    return NextResponse.json({
      message: "Recherche, sauvegarde et mise à jour 'watched' terminées",
      moviesToProcess,
      total: moviesToProcess.length,
      found: results.length,
      notFound,
      savedMovies: savedMovies.length,
      watchedUpdates,
      results,
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
