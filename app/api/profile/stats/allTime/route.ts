import { ShowType } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type ReviewWithMovie = {
  id: string;
  type: ShowType;
  userId: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  comment: string | null;
  movieId: number | null;
  TVId: number | null;
  movie: {
    id: number;
    title: string;
    poster: string | null;
    release_date: Date | null;
    description: string | null;
  } | null;
};

interface PersonCount {
  id: number;
  name: string;
  profile_path: string | null;
  count: number;
}

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const username = params.get("username");
  const userId = params.get("userId");
  const isLogged = params.get("isLogged") === "true";
  const matchUser = params.get("matchUser") === "true";

  try {
    if (isLogged && matchUser) {
      if (!userId) {
        return NextResponse.json("NO USERID", { status: 400 });
      }
      const userReviews = await prisma.review.findMany({
        where: { userId },
        include: { movie: true },
      });
      const { finalResultByYear, finalResultByDecade } = await handleResult(
        userReviews
      );
      const topCrews = await obtainTopCrews(userId);
      return NextResponse.json({
        finalResultByYear,
        finalResultByDecade,
        topCrews,
      });
    } else {
      if (!username) {
        return NextResponse.json("No Username", { status: 400 });
      }
      const obtainUserId = await prisma.user.findUnique({
        where: { name: username },
        select: { id: true },
      });
      if (!obtainUserId?.id) {
        return NextResponse.json("User not found", { status: 404 });
      }
      const userReviews = await prisma.review.findMany({
        where: { userId: obtainUserId.id },
        include: { movie: true },
      });
      const topCrews = await obtainTopCrews(obtainUserId.id);
      const { finalResultByYear, finalResultByDecade } = await handleResult(
        userReviews
      );
      return NextResponse.json({
        finalResultByYear,
        finalResultByDecade,
        topCrews,
      });
    }
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

async function handleResult(userReviews: ReviewWithMovie[]) {
  const reviewsWithMovie = userReviews.filter(
    (review): review is ReviewWithMovie => review.movie !== null
  );

  const getDecade = (year: number) => Math.floor(year / 10) * 10;

  const resultByYear = {} as Record<
    number,
    { count: number; sumRatings: number; averageRating: number }
  >;

  const resultByDecade = {} as Record<
    number,
    {
      count: number;
      sumRatings: number;
      averageRating: number;
      films: Array<{
        id: number;
        title: string;
        rating: number;
        year: number;
        poster: string;
      }>;
    }
  >;

  reviewsWithMovie.forEach((review) => {
    if (!review.movie?.release_date) {
      return;
    }

    const year = review.movie.release_date.getFullYear();
    const decade = getDecade(year);

    if (!resultByYear[year]) {
      resultByYear[year] = { count: 0, sumRatings: 0, averageRating: 0 };
    }
    resultByYear[year].count += 1;
    resultByYear[year].sumRatings += review.rating;
    resultByYear[year].averageRating =
      resultByYear[year].sumRatings / resultByYear[year].count;

    if (!resultByDecade[decade]) {
      resultByDecade[decade] = {
        count: 0,
        sumRatings: 0,
        averageRating: 0,
        films: [],
      };
    }
    resultByDecade[decade].count += 1;
    resultByDecade[decade].sumRatings += review.rating;
    resultByDecade[decade].averageRating =
      resultByDecade[decade].sumRatings / resultByDecade[decade].count;

    resultByDecade[decade].films.push({
      id: review.movie.id,
      title: review.movie.title,
      rating: review.rating,
      year: year,
      poster: review.movie.poster || "",
    });
  });

  Object.keys(resultByDecade).forEach((decade) => {
    resultByDecade[parseInt(decade)].films.sort((a, b) => b.rating - a.rating);
    resultByDecade[parseInt(decade)].films = resultByDecade[
      parseInt(decade)
    ].films.slice(0, 20);
  });

  const finalResultByYear = Object.entries(resultByYear).map(
    ([year, data]) => ({
      year: parseInt(year),
      ...data,
    })
  );

  const finalResultByDecade = Object.entries(resultByDecade).map(
    ([decade, data]) => ({
      decade: parseInt(decade),
      count: data.count,
      sumRatings: data.sumRatings,
      averageRating: data.averageRating,
      topFilms: data.films,
    })
  );

  return {
    finalResultByYear: finalResultByYear.sort((a, b) => a.year - b.year),
    finalResultByDecade: finalResultByDecade.sort(
      (a, b) => a.decade - b.decade
    ),
  };
}

export async function obtainTopCrews(userId: string) {
  const reviews = await prisma.review.findMany({
    where: {
      userId: userId,
    },
    include: {
      movie: {
        include: {
          directors: {
            select: {
              id: true,
              name: true,
              profile_path: true,
            },
          },
          producers: {
            select: {
              id: true,
              name: true,
              profile_path: true,
            },
          },
          execProducers: {
            select: {
              id: true,
              name: true,
              profile_path: true,
            },
          },
          writers: {
            select: {
              id: true,
              name: true,
              profile_path: true,
            },
          },
          composers: {
            select: {
              id: true,
              name: true,
              profile_path: true,
            },
          },
          cinematographers: {
            select: {
              id: true,
              name: true,
              profile_path: true,
            },
          },
          actors: {
            select: {
              id: true,
              name: true,
              profile_path: true,
            },
          },
        },
      },
    },
  });

  const directorCounts: Record<string, PersonCount> = {};
  const producerCounts: Record<string, PersonCount> = {};
  const execProducerCounts: Record<string, PersonCount> = {};
  const writerCounts: Record<string, PersonCount> = {};
  const composerCounts: Record<string, PersonCount> = {};
  const cinematographerCounts: Record<string, PersonCount> = {};
  const actorsCounts: Record<string, PersonCount> = {};

  reviews.forEach((review) => {
    if (review.movie) {
      // Directeurs
      review.movie.directors.forEach((director) => {
        if (director.id in directorCounts) {
          directorCounts[director.id].count++;
        } else {
          directorCounts[director.id] = {
            id: director.id,
            name: director.name,
            profile_path: director.profile_path,
            count: 1,
          };
        }
      });

      // Producteurs
      review.movie.producers.forEach((producer) => {
        if (producer.id in producerCounts) {
          producerCounts[producer.id].count++;
        } else {
          producerCounts[producer.id] = {
            id: producer.id,
            name: producer.name,
            profile_path: producer.profile_path,
            count: 1,
          };
        }
      });

      // Producteurs exécutifs
      review.movie.execProducers.forEach((execProducer) => {
        if (execProducer.id in execProducerCounts) {
          execProducerCounts[execProducer.id].count++;
        } else {
          execProducerCounts[execProducer.id] = {
            id: execProducer.id,
            name: execProducer.name,
            profile_path: execProducer.profile_path,
            count: 1,
          };
        }
      });

      // Scénaristes
      review.movie.writers.forEach((writer) => {
        if (writer.id in writerCounts) {
          writerCounts[writer.id].count++;
        } else {
          writerCounts[writer.id] = {
            id: writer.id,
            name: writer.name,
            profile_path: writer.profile_path,
            count: 1,
          };
        }
      });

      // Compositeurs
      review.movie.composers.forEach((composer) => {
        if (composer.id in composerCounts) {
          composerCounts[composer.id].count++;
        } else {
          composerCounts[composer.id] = {
            id: composer.id,
            name: composer.name,
            profile_path: composer.profile_path,
            count: 1,
          };
        }
      });

      // Directeurs de la photographie
      review.movie.cinematographers.forEach((cinematographer) => {
        if (cinematographer.id in cinematographerCounts) {
          cinematographerCounts[cinematographer.id].count++;
        } else {
          cinematographerCounts[cinematographer.id] = {
            id: cinematographer.id,
            name: cinematographer.name,
            profile_path: cinematographer.profile_path,
            count: 1,
          };
        }
      });

      // Acteurs
      review.movie.actors.forEach((actor) => {
        if (actor.id in actorsCounts) {
          actorsCounts[actor.id].count++;
        } else {
          actorsCounts[actor.id] = {
            id: actor.id,
            name: actor.name,
            profile_path: actor.profile_path,
            count: 1,
          };
        }
      });
    }
  });

  // Convertir les objets en tableaux et trier par ordre décroissant de count
  const directorCountsArray = Object.values(directorCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  const producerCountsArray = Object.values(producerCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  const execProducerCountsArray = Object.values(execProducerCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  const writerCountsArray = Object.values(writerCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  const composerCountsArray = Object.values(composerCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  const cinematographerCountsArray = Object.values(cinematographerCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  const actorCountsArray = Object.values(actorsCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return {
    topDirectors: directorCountsArray,
    topProducers: producerCountsArray,
    topExecProducers: execProducerCountsArray,
    topWriters: writerCountsArray,
    topComposers: composerCountsArray,
    topCinematographers: cinematographerCountsArray,
    topActors: actorCountsArray,
  };
}
