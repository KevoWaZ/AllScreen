import prisma from "@/lib/prisma";
import { obtainMovieDetails } from "@/utils/movie";
import { obtainTVDetails } from "@/utils/tv";
import { NextRequest, NextResponse } from "next/server";

interface type {
  type: number;
}

interface iso {
  iso_3166_1: string;
}

interface genre {
  id: number;
  name: string;
}

interface company {
  id: number;
  name: string;
}

interface person {
  id: number;
  name: string;
  profile_path: string;
  job: string;
}

async function createOrUpdatePersonWithJob(
  id: number,
  name: string,
  profile_path: string,
  newJob: string
) {
  const existingPerson = await prisma.person.findUnique({
    where: { id: id },
  });

  let jobs: string[] = [];
  if (existingPerson) {
    jobs = [...new Set([...existingPerson.job, newJob])];
    await prisma.person.update({
      where: { id: id },
      data: {
        name: name,
        profile_path: profile_path || "",
        job: jobs,
      },
    });
  } else {
    jobs = [newJob];
    await prisma.person.create({
      data: {
        id: id,
        name: name,
        profile_path: profile_path || "",
        job: jobs,
      },
    });
  }
}

async function createOrUpdateMedia(type: string, id: number) {
  if (type === "MOVIE") {
    const movieDetail = await obtainMovieDetails(id.toString());

    const directors = movieDetail.movieDetails.credits.crew
      .filter((person: person) => person.job.toLowerCase() === "director")
      .map(({ id, name, profile_path, job }: person) => ({
        id,
        name,
        profile_path,
        job,
      }));

    for (const director of directors) {
      await createOrUpdatePersonWithJob(
        director.id,
        director.name,
        director.profile_path,
        director.job
      );
    }

    const producers = movieDetail.movieDetails.credits.crew
      .filter((person: person) => person.job.toLocaleLowerCase() === "producer")
      .map(({ id, name, profile_path, job }: person) => ({
        id,
        name,
        profile_path,
        job,
      }));

    for (const producer of producers) {
      await createOrUpdatePersonWithJob(
        producer.id,
        producer.name,
        producer.profile_path,
        producer.job
      );
    }

    const execProducers = movieDetail.movieDetails.credits.crew
      .filter(
        (person: person) =>
          person.job.toLocaleLowerCase() === "executive producer"
      )
      .map(({ id, name, profile_path, job }: person) => ({
        id,
        name,
        profile_path,
        job,
      }));

    for (const execProducer of execProducers) {
      await createOrUpdatePersonWithJob(
        execProducer.id,
        execProducer.name,
        execProducer.profile_path,
        execProducer.job
      );
    }

    const writers = movieDetail.movieDetails.credits.crew
      .filter(
        (person: person) => person.job.toLocaleLowerCase() === "screenplay"
      )
      .map(({ id, name, profile_path, job }: person) => ({
        id,
        name,
        profile_path,
        job,
      }));

    for (const writer of writers) {
      await createOrUpdatePersonWithJob(
        writer.id,
        writer.name,
        writer.profile_path,
        writer.job
      );
    }

    const composers = movieDetail.movieDetails.credits.crew
      .filter(
        (person: person) =>
          person.job.toLocaleLowerCase() === "original music composer"
      )
      .map(({ id, name, profile_path, job }: person) => ({
        id,
        name,
        profile_path,
        job,
      }));

    for (const composer of composers) {
      await createOrUpdatePersonWithJob(
        composer.id,
        composer.name,
        composer.profile_path,
        composer.job
      );
    }

    const cinematographers = movieDetail.movieDetails.credits.crew
      .filter(
        (person: person) =>
          person.job.toLocaleLowerCase() === "director of photography"
      )
      .map(({ id, name, profile_path, job }: person) => ({
        id,
        name,
        profile_path,
        job,
      }));

    for (const cinematographer of cinematographers) {
      await createOrUpdatePersonWithJob(
        cinematographer.id,
        cinematographer.name,
        cinematographer.profile_path,
        cinematographer.job
      );
    }

    const frRelease = movieDetail.movieDetails.release_dates.results.find(
      (iso: iso) => iso.iso_3166_1 === "FR"
    );
    const release_date = frRelease
      ? frRelease.release_dates.find((t: type) => t.type === 3) ||
        frRelease.release_dates.find((t: type) => t.type === 4) ||
        frRelease.release_dates[0]
      : movieDetail.movieDetails.release_date;

    const dateToUse =
      release_date instanceof Date || typeof release_date === "string"
        ? release_date
        : release_date?.release_date;

    console.log(dateToUse);

    await prisma.movie.upsert({
      where: {
        id: id,
      },
      create: {
        id: id,
        title: movieDetail.movieDetails.title,
        description: movieDetail.movieDetails.overview,
        poster: movieDetail.movieDetails.poster_path || "",
        release_date: new Date(dateToUse),
        runtime: movieDetail.movieDetails.runtime,
        genres: {
          connectOrCreate:
            movieDetail.movieDetails.genres?.map((genre: genre) => ({
              where: { id: genre.id },
              create: { id: genre.id, name: genre.name },
            })) || [],
        },
        productionCompanies: {
          connectOrCreate:
            movieDetail.movieDetails.production_companies?.map(
              (company: company) => ({
                where: { id: company.id },
                create: { id: company.id, name: company.name },
              })
            ) || [],
        },
        directors: {
          connectOrCreate:
            directors.map((director: person) => ({
              where: { id: director.id },
              create: {
                id: director.id,
                name: director.name,
                profile_path: director.profile_path || "",
              },
            })) || [],
        },
        producers: {
          connectOrCreate:
            producers.map((producer: person) => ({
              where: { id: producer.id },
              create: {
                id: producer.id,
                name: producer.name,
                profile_path: producer.profile_path || "",
              },
            })) || [],
        },
        execProducers: {
          connectOrCreate:
            execProducers.map((execProducer: person) => ({
              where: { id: execProducer.id },
              create: {
                id: execProducer.id,
                name: execProducer.name,
                profile_path: execProducer.profile_path || "",
              },
            })) || [],
        },
        writers: {
          connectOrCreate:
            writers.map((writer: person) => ({
              where: { id: writer.id },
              create: {
                id: writer.id,
                name: writer.name,
                profile_path: writer.profile_path || "",
              },
            })) || [],
        },
        composers: {
          connectOrCreate:
            composers.map((composer: person) => ({
              where: { id: composer.id },
              create: {
                id: composer.id,
                name: composer.name,
                profile_path: composer.profile_path || "",
              },
            })) || [],
        },
        cinematographers: {
          connectOrCreate:
            cinematographers.map((cinematographer: person) => ({
              where: { id: cinematographer.id },
              create: {
                id: cinematographer.id,
                name: cinematographer.name,
                profile_path: cinematographer.profile_path || "",
              },
            })) || [],
        },
      },
      update: {
        title: movieDetail.movieDetails.title,
        description: movieDetail.movieDetails.overview,
        poster: movieDetail.movieDetails.poster_path || "",
        release_date: new Date(dateToUse),
        runtime: movieDetail.movieDetails.runtime,
        genres: {
          connectOrCreate:
            movieDetail.movieDetails.genres?.map((genre: genre) => ({
              where: { id: genre.id },
              create: { id: genre.id, name: genre.name },
            })) || [],
        },
        productionCompanies: {
          connectOrCreate:
            movieDetail.movieDetails.production_companies?.map(
              (company: company) => ({
                where: { id: company.id },
                create: { id: company.id, name: company.name },
              })
            ) || [],
        },
        directors: {
          connectOrCreate:
            directors.map((director: person) => ({
              where: { id: director.id },
              create: {
                id: director.id,
                name: director.name,
                profile_path: director.profile_path || "",
              },
            })) || [],
        },
        producers: {
          connectOrCreate:
            producers.map((producer: person) => ({
              where: { id: producer.id },
              create: {
                id: producer.id,
                name: producer.name,
                profile_path: producer.profile_path || "",
              },
            })) || [],
        },
        execProducers: {
          connectOrCreate:
            execProducers.map((execProducer: person) => ({
              where: { id: execProducer.id },
              create: {
                id: execProducer.id,
                name: execProducer.name,
                profile_path: execProducer.profile_path || "",
              },
            })) || [],
        },
        writers: {
          connectOrCreate:
            writers.map((writer: person) => ({
              where: { id: writer.id },
              create: {
                id: writer.id,
                name: writer.name,
                profile_path: writer.profile_path || "",
              },
            })) || [],
        },
        composers: {
          connectOrCreate:
            composers.map((composer: person) => ({
              where: { id: composer.id },
              create: {
                id: composer.id,
                name: composer.name,
                profile_path: composer.profile_path || "",
              },
            })) || [],
        },
        cinematographers: {
          connectOrCreate:
            cinematographers.map((cinematographer: person) => ({
              where: { id: cinematographer.id },
              create: {
                id: cinematographer.id,
                name: cinematographer.name,
                profile_path: cinematographer.profile_path || "",
              },
            })) || [],
        },
      },
    });
  } else if (type === "TVSHOW") {
    const tvDetail = await obtainTVDetails(id.toString());
    await prisma.tVShow.upsert({
      where: {
        id: id,
      },
      create: {
        id: id,
        title: tvDetail?.TvDetails.name,
        description: tvDetail?.TvDetails.overview,
        poster: tvDetail?.TvDetails.poster_path || "",
        first_air_date: new Date(tvDetail?.TvDetails.first_air_date),
      },
      update: {
        title: tvDetail?.TvDetails.name,
        description: tvDetail?.TvDetails.overview,
        poster: tvDetail?.TvDetails.poster_path || "",
        first_air_date: new Date(tvDetail?.TvDetails.first_air_date),
      },
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { rating, comment, type, userId, id } = await req.json();

    if (!rating || !comment || !type || !userId || !id) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const validRatings = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

    if (!validRatings.includes(rating)) {
      return NextResponse.json(
        { message: "Rating is not possible!" },
        { status: 400 }
      );
    }

    const field = type === "MOVIE" ? "movieId" : "TVId";

    await createOrUpdateMedia(type, id);

    const checkRating = await prisma.review.findMany({
      where: {
        [field]: id,
        userId: userId,
      },
    });

    if (checkRating.length > 0) {
      const updateRating = await prisma.review.update({
        where: {
          id: checkRating[0].id,
        },
        data: {
          rating,
          comment,
          updatedAt: new Date(),
        },
      });

      return NextResponse.json(updateRating, { status: 200 });
    }

    const createRating = await prisma.review.create({
      data: {
        rating,
        comment,
        type,
        userId,
        [field]: id,
      },
    });

    return NextResponse.json(createRating, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
