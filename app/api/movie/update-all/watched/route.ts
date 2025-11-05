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
    runtime: number;
    release_date: string;
    release_dates: {
      results: IsoRelease[];
    };
    genres: {
      id: number;
      name: string;
    }[];
    production_companies: {
      id: number;
      name: string;
      logo_path: string;
    }[];
    production_countries: {
      iso_3166_1: string;
      name: string;
    }[];
    credits: {
      crew: {
        id: number;
        name: string;
        profile_path: string;
        job: string;
      }[];
      cast: {
        id: number;
        name: string;
        profile_path: string;
        job: string;
        popularity: number;
      }[];
    };
  };
}

interface person {
  id: number;
  name: string;
  profile_path: string;
  job: string;
}

interface country {
  iso_3166_1: string;
  name: string;
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
    const obtainMovies = await prisma.movie.findMany({
      where: {
        updated: false,
        watched: {
          some: {},
        },
      },
      include: {
        watched: true,
      },
    });
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

        const actors = result.movieDetails.credits.cast
          .sort((a, b) => b.popularity - a.popularity)
          .map(({ id, name, profile_path }: person) => ({
            id,
            name,
            profile_path,
            job: "Acting",
          }));

        for (const actor of actors) {
          await createOrUpdatePersonWithJob(
            actor.id,
            actor.name,
            actor.profile_path,
            actor.job
          );
        }

        const directors = result.movieDetails.credits.crew
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

        const producers = result.movieDetails.credits.crew
          .filter(
            (person: person) => person.job.toLocaleLowerCase() === "producer"
          )
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

        const execProducers = result.movieDetails.credits.crew
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

        const writers = result.movieDetails.credits.crew
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

        const composers = result.movieDetails.credits.crew
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

        const cinematographers = result.movieDetails.credits.crew
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
            updated: true,
            title: result.movieDetails.title,
            description: result.movieDetails.overview,
            poster: result.movieDetails.poster_path || "",
            release_date: dateToUse,
            runtime: result.movieDetails.runtime,
            genres: {
              connectOrCreate:
                result.movieDetails.genres?.map((genre) => ({
                  where: { id: genre.id },
                  create: { id: genre.id, name: genre.name },
                })) || [],
            },
            productionCompanies: {
              connectOrCreate:
                result.movieDetails.production_companies?.map((company) => ({
                  where: { id: company.id },
                  create: {
                    id: company.id,
                    name: company.name,
                    logo_path: company.logo_path || "",
                  },
                })) || [],
            },
            productionCountries: {
              connectOrCreate:
                result.movieDetails.production_countries?.map(
                  (country: country) => ({
                    where: { id: country.iso_3166_1 },
                    create: { id: country.iso_3166_1, name: country.name },
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
            actors: {
              connectOrCreate: actors.map((actor: person) => ({
                where: { id: actor.id },
                create: {
                  id: actor.id,
                  name: actor.name,
                  profile_path: actor.profile_path || "",
                },
              })),
            },
          },
          update: {
            title: result.movieDetails.title,
            updated: true,
            description: result.movieDetails.overview,
            poster: result.movieDetails.poster_path || "",
            release_date: dateToUse,
            runtime: result.movieDetails.runtime,
            genres: {
              connectOrCreate:
                result.movieDetails.genres?.map((genre) => ({
                  where: { id: genre.id },
                  create: { id: genre.id, name: genre.name },
                })) || [],
            },
            productionCompanies: {
              connectOrCreate:
                result.movieDetails.production_companies?.map((company) => ({
                  where: { id: company.id },
                  create: {
                    id: company.id,
                    name: company.name,
                    logo_path: company.logo_path || "",
                  },
                })) || [],
            },
            productionCountries: {
              connectOrCreate:
                result.movieDetails.production_countries?.map(
                  (country: country) => ({
                    where: { id: country.iso_3166_1 },
                    create: { id: country.iso_3166_1, name: country.name },
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
            actors: {
              connectOrCreate: actors.map((actor: person) => ({
                where: { id: actor.id },
                create: {
                  id: actor.id,
                  name: actor.name,
                  profile_path: actor.profile_path || "",
                },
              })),
            },
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
