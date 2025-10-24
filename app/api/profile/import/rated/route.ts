import { searchMoviesSearch } from "@/utils/searchUtils";
import { obtainMovieDetails } from "@/utils/movie";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface ReleaseDate {
  type: number;
  release_date: string;
}
interface IsoRelease {
  iso_3166_1: string;
  release_dates: ReleaseDate[];
}

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

async function createOrUpdateMovie(id: number) {
  const movieDetail = await obtainMovieDetails(id.toString());
  const frRelease = movieDetail.movieDetails.release_dates.results.find(
    (iso: IsoRelease) => iso.iso_3166_1 === "FR"
  );
  const releaseDate = frRelease
    ? frRelease.release_dates.find((t: ReleaseDate) => t.type === 3) ||
      frRelease.release_dates.find((t: ReleaseDate) => t.type === 4) ||
      frRelease.release_dates[0]
    : movieDetail.movieDetails.release_date;
  const dateToUse =
    releaseDate?.release_date || movieDetail.movieDetails.release_date;

  await prisma.movie.upsert({
    where: { id },
    create: {
      id,
      title: movieDetail.movieDetails.title,
      description: movieDetail.movieDetails.overview,
      poster: movieDetail.movieDetails.poster_path || "",
      release_date: dateToUse ? new Date(dateToUse) : null,
    },
    update: {
      title: movieDetail.movieDetails.title,
      description: movieDetail.movieDetails.overview,
      poster: movieDetail.movieDetails.poster_path || "",
      release_date: dateToUse ? new Date(dateToUse) : null,
    },
  });
}

async function addToWatched(userId: string, movieId: number) {
  const checkWatched = await prisma.watched.findMany({
    where: {
      movieId,
      userId,
    },
  });
  if (checkWatched.length === 0) {
    await prisma.watched.create({
      data: {
        type: "MOVIE",
        userId,
        movieId,
      },
    });
    return { action: "added" };
  }
  return { action: "already_exists" };
}

export async function POST(req: NextRequest) {
  try {
    const { csv, userId } = await req.json();
    if (!userId) {
      return NextResponse.json({ error: "userId est requis" }, { status: 400 });
    }

    const ratingsToProcess = parseCSV(csv);
    const batchSize = 5;
    const delayBetweenBatches = 2000;
    const results = [];
    const notFound = [];
    const ratingUpdates = [];
    const watchedUpdates = [];
    const validRatings = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

    for (let i = 0; i < ratingsToProcess.length; i += batchSize) {
      const batch = ratingsToProcess.slice(i, i + batchSize);
      const batchPromises = batch.map((rating) =>
        searchMovieWithRetry(rating.Name)
      );
      const batchResults = await Promise.all(batchPromises);

      const batchResultsWithNames = batchResults.map((result, index) => ({
        name: batch[index].Name,
        year: batch[index].Year,
        rating: parseFloat(batch[index].Rating),
        comment: batch[index].Comment || "",
        date: batch[index].Date || new Date().toISOString(),
        data: result,
      }));

      const found = batchResultsWithNames.filter((item) => item.data !== null);
      const batchNotFound = batchResultsWithNames.filter(
        (item) => item.data === null
      );

      for (const { data, name, rating, comment, date } of found) {
        try {
          if (!validRatings.includes(rating)) {
            console.error(`Note invalide pour "${name}": ${rating}`);
            continue;
          }

          await createOrUpdateMovie(data.id);

          // Gestion du rating
          const checkRating = await prisma.review.findMany({
            where: {
              movieId: data.id,
              userId,
            },
          });

          let ratingUpdate;
          if (checkRating.length > 0) {
            ratingUpdate = await prisma.review.update({
              where: { id: checkRating[0].id },
              data: {
                rating,
                comment,
                updatedAt: new Date(),
              },
            });
            ratingUpdates.push({
              movieId: data.id,
              movieTitle: data.title,
              rating: ratingUpdate.rating,
              action: "updated",
            });
          } else {
            ratingUpdate = await prisma.review.create({
              data: {
                rating,
                comment,
                type: "MOVIE",
                userId,
                movieId: data.id,
              },
            });
            ratingUpdates.push({
              movieId: data.id,
              movieTitle: data.title,
              rating: ratingUpdate.rating,
              action: "added",
            });
          }

          // Ajout au watched
          const watchedUpdate = await addToWatched(userId, data.id);
          watchedUpdates.push({
            movieId: data.id,
            movieTitle: data.title,
            action: watchedUpdate.action,
          });

          results.push({ name, rating, comment, date, data });
        } catch (error) {
          console.error(`Erreur pour "${name}":`, error);
        }
      }

      notFound.push(...batchNotFound.map((item) => item.name));

      if (i + batchSize < ratingsToProcess.length) {
        await new Promise((resolve) =>
          setTimeout(resolve, delayBetweenBatches)
        );
      }
    }

    return NextResponse.json({
      message: "Import des ratings et ajout aux watched terminé",
      total: ratingsToProcess.length,
      found: results.length,
      notFound,
      ratingUpdates,
      watchedUpdates,
      results,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Erreur interne" }, { status: 500 });
  }
}
