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

    // 1. Récupère toutes les reviews existantes de l'utilisateur
    const userReviews = await prisma.review.findMany({
      where: { userId },
      select: { movieId: true },
    });
    const reviewedMovieIds = new Set(userReviews.map((r) => r.movieId));

    // 2. Parse le CSV
    const reviewsToProcess = parseCSV(csv);

    // 3. Filtre les reviews déjà existantes
    const newReviews = reviewsToProcess.filter((review) => {
      const movieId = parseInt(review["TMDb ID"]);
      return !reviewedMovieIds.has(movieId);
    });

    // 4. Traite chaque nouvelle review
    const addedReviews = [];
    const createdMovies = [];

    for (const review of newReviews) {
      const movieId = parseInt(review["TMDb ID"]);
      const movieTitle = review.Name;
      const rating = parseFloat(review["Your Rating"]);
      const comment = review.Comment || "";

      // Vérifie si le film existe, sinon le crée
      let movieExists = await prisma.movie.findUnique({
        where: { id: movieId },
      });
      if (!movieExists) {
        const newMovie = await prisma.movie.create({
          data: {
            id: movieId,
            title: movieTitle,
            description: review.Description || "",
            poster: review.Poster || "",
            release_date: review["Release Date"]
              ? new Date(review["Release Date"])
              : null,
          },
        });
        createdMovies.push({
          id: newMovie.id,
          name: newMovie.title,
        });
      }

      // Ajoute la review pour l'utilisateur
      const newReview = await prisma.review.create({
        data: {
          rating: rating / 2,
          comment,
          userId,
          movieId,
          type: "MOVIE",
        },
      });

      addedReviews.push({
        id: review["TMDb ID"],
        name: review.Name,
        reviewId: newReview.id,
        rating: newReview.rating,
      });
    }

    return NextResponse.json({
      message:
        "Nouvelles reviews ajoutées avec succès (films créés si nécessaire)",
      addedReviews,
      createdMovies,
      totalAdded: addedReviews.length,
      totalCreated: createdMovies.length,
      totalInCSV: reviewsToProcess.length,
      totalSkipped: reviewsToProcess.length - newReviews.length,
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
