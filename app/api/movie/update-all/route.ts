import prisma from "@/lib/prisma";
import { obtainMovieDetails } from "@/utils/movie";
import { NextResponse } from "next/server";

interface ReleaseDate {
  type: number;
  release_date: string;
}

interface IsoRelease {
  iso_3166_1: string;
  release_dates: ReleaseDate[];
}

interface MovieDetailsResponse {
  movieDetails: {
    id: string;
    title: string;
    overview: string;
    poster_path: string | null;
    release_date: string;
    release_dates: {
      results: IsoRelease[];
    };
  };
}

async function fetchMovieDetailsWithRetry(
  movieId: string,
  retries = 3,
  delay = 60000
): Promise<MovieDetailsResponse> {
  try {
    return await obtainMovieDetails(movieId);
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      error.message.includes("429") &&
      retries > 0
    ) {
      console.error(
        `Rate limit atteint pour ${movieId}, attente de ${
          delay / 1000
        } secondes...`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchMovieDetailsWithRetry(movieId, retries - 1, delay);
    }
    throw error;
  }
}

export async function GET() {
  try {
    const batchSize = 10;
    const delayBetweenBatches = 2000;
    const obtainMovies = await prisma.movie.findMany();
    const updatedMovies: Array<{
      id: string;
      title: string;
      release_date: Date;
    }> = [];

    for (let i = 0; i < obtainMovies.length; i += batchSize) {
      const batch = obtainMovies.slice(i, i + batchSize);
      const batchResults: (MovieDetailsResponse | null)[] = [];

      for (const movieItem of batch) {
        try {
          const result = await fetchMovieDetailsWithRetry(String(movieItem.id));
          batchResults.push(result);
        } catch (error) {
          console.error(
            `Échec définitif pour le film ${movieItem.id}:`,
            error instanceof Error ? error.message : error
          );
          batchResults.push(null);
        }
      }

      for (const result of batchResults) {
        if (!result) continue;

        const frRelease = result.movieDetails.release_dates.results.find(
          (iso: IsoRelease) => iso.iso_3166_1 === "FR"
        );
        let release_date: string | undefined;

        if (frRelease) {
          const type3Dates = frRelease.release_dates
            .filter((date: ReleaseDate) => date.type === 3)
            .sort(
              (a, b) =>
                new Date(a.release_date).getTime() -
                new Date(b.release_date).getTime()
            );
          release_date =
            type3Dates[0]?.release_date ||
            frRelease.release_dates.find((t: ReleaseDate) => t.type === 4)
              ?.release_date ||
            frRelease.release_dates[0]?.release_date;
        } else {
          release_date = result.movieDetails.release_date;
        }

        const dateToUse = release_date ? new Date(release_date) : new Date();

        await prisma.movie.upsert({
          where: { id: Number(result.movieDetails.id) },
          create: {
            id: Number(result.movieDetails.id),
            title: result.movieDetails.title,
            description: result.movieDetails.overview,
            poster: result.movieDetails.poster_path || "",
            release_date: dateToUse,
          },
          update: {
            title: result.movieDetails.title,
            description: result.movieDetails.overview,
            poster: result.movieDetails.poster_path || "",
            release_date: dateToUse,
          },
        });

        updatedMovies.push({
          id: result.movieDetails.id,
          title: result.movieDetails.title,
          release_date: dateToUse,
        });
      }

      if (i + batchSize < obtainMovies.length) {
        await new Promise((resolve) =>
          setTimeout(resolve, delayBetweenBatches)
        );
      }
    }

    return NextResponse.json({ updatedMovies });
  } catch (error: unknown) {
    console.error(
      "Erreur globale:",
      error instanceof Error ? error.message : error
    );
    return NextResponse.json({ error: "ERROR" });
  }
}
