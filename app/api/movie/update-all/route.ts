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
    tmdb_id: string;
    imdb_id: string;
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

function escapeSql(str: string): string {
  return str ? str.replace(/'/g, "''") : "";
}

export async function GET() {
  try {
    const batchSize = 10;
    const delayBetweenBatches = 2000;

    const moviesToUpdate = await prisma.movie.findMany({
      skip: 1,
      where: { updated: false },
      select: { id: true },
      orderBy: {
        release_date: "desc",
      },
    });

    const updatedMovies: Array<{
      id: string;
      title: string;
      release_date: Date;
    }> = [];

    for (let i = 0; i < moviesToUpdate.length; i += batchSize) {
      const batch = moviesToUpdate.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map((movie) =>
          fetchMovieDetailsWithRetry(String(movie.id)).catch((error) => {
            console.error(
              `Échec pour le film ${movie.id}:`,
              error instanceof Error ? error.message : error
            );
            return null;
          })
        )
      );

      // 2. Collecter toutes les entités uniques
      const allPeople = new Map<
        number,
        {
          id: number;
          name: string;
          profile_path: string;
          jobs: Set<string>;
        }
      >();

      const allGenres = new Map<number, { id: number; name: string }>();
      const allCompanies = new Map<
        number,
        { id: number; name: string; logo_path: string }
      >();
      const allCountries = new Map<string, { ISO: string; name: string }>();

      // 3. Préparer les données pour chaque film
      const filmUpdates = batchResults
        .map((result) => {
          if (!result) return null;

          const movieId = Number(result.movieDetails.id);
          const tmdb_id = Number(result.movieDetails.id);
          const imdb_id = result.movieDetails.imdb_id;

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

          const addPerson = (
            person: { id: number; name: string; profile_path: string },
            job: string
          ) => {
            if (!allPeople.has(person.id)) {
              allPeople.set(person.id, {
                id: person.id,
                name: person.name,
                profile_path: person.profile_path || "",
                jobs: new Set(),
              });
            }
            allPeople.get(person.id)?.jobs.add(job);
          };

          const actors = result.movieDetails.credits.cast
            .sort((a, b) => b.popularity - a.popularity)
            .map((actor) => {
              addPerson(actor, "Acting");
              return actor.id;
            });

          const directors = result.movieDetails.credits.crew
            .filter((p) => p.job.toLowerCase() === "director")
            .map((director) => {
              addPerson(director, director.job);
              return director.id;
            });

          const producers = result.movieDetails.credits.crew
            .filter((p) => p.job.toLowerCase() === "producer")
            .map((producer) => {
              addPerson(producer, producer.job);
              return producer.id;
            });

          const execProducers = result.movieDetails.credits.crew
            .filter((p) => p.job.toLowerCase() === "executive producer")
            .map((execProducer) => {
              addPerson(execProducer, execProducer.job);
              return execProducer.id;
            });

          const writers = result.movieDetails.credits.crew
            .filter((p) => p.job.toLowerCase() === "screenplay")
            .map((writer) => {
              addPerson(writer, writer.job);
              return writer.id;
            });

          const composers = result.movieDetails.credits.crew
            .filter((p) => p.job.toLowerCase() === "original music composer")
            .map((composer) => {
              addPerson(composer, composer.job);
              return composer.id;
            });

          const cinematographers = result.movieDetails.credits.crew
            .filter((p) => p.job.toLowerCase() === "director of photography")
            .map((cinematographer) => {
              addPerson(cinematographer, cinematographer.job);
              return cinematographer.id;
            });

          const genres =
            result.movieDetails.genres?.map((genre) => {
              allGenres.set(genre.id, { id: genre.id, name: genre.name });
              return genre.id;
            }) || [];

          const companies =
            result.movieDetails.production_companies?.map((company) => {
              allCompanies.set(company.id, {
                id: company.id,
                name: company.name,
                logo_path: company.logo_path || "",
              });
              return company.id;
            }) || [];

          const countries =
            result.movieDetails.production_countries?.map((country) => {
              allCountries.set(country.iso_3166_1, {
                ISO: country.iso_3166_1,
                name: country.name,
              });
              return country.iso_3166_1;
            }) || [];

          return {
            movieId,
            tmdb_id,
            imdb_id,
            title: result.movieDetails.title,
            description: result.movieDetails.overview,
            poster: result.movieDetails.poster_path || "",
            release_date: dateToUse,
            runtime: result.movieDetails.runtime,
            actors,
            directors,
            producers,
            execProducers,
            writers,
            composers,
            cinematographers,
            genres,
            companies,
            countries,
          };
        })
        .filter(Boolean);

      // 4. Exécuter toutes les requêtes en une transaction
      await prisma.$transaction([
        prisma.$executeRawUnsafe(`
          WITH person_data AS (
            SELECT * FROM (VALUES
              ${Array.from(allPeople.values())
                .map(
                  (p) =>
                    `(${p.id}, '${escapeSql(p.name)}', '${p.profile_path}', ` +
                    `'${Array.from(p.jobs)
                      .map((j) => escapeSql(j))
                      .join(",")}')`
                )
                .join(",")}
            ) AS t(id, name, profile_path, job)
          )
          INSERT INTO "Person" (id, name, profile_path, job)
          SELECT id, name, profile_path, string_to_array(job, ',')::text[]
          FROM person_data
          ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name,
            profile_path = EXCLUDED.profile_path,
            job = (
              SELECT array_agg(DISTINCT elem)
              FROM unnest(EXCLUDED.job || COALESCE("Person".job, '{}')) elem
            )
        `),

        prisma.$executeRawUnsafe(`
          INSERT INTO "MovieGenre" (id, name)
          SELECT * FROM (VALUES
            ${Array.from(allGenres.values())
              .map((g) => `(${g.id}, '${escapeSql(g.name)}')`)
              .join(",")}
          ) AS t(id, name)
          ON CONFLICT (id) DO NOTHING
        `),

        prisma.$executeRawUnsafe(`
          INSERT INTO "ProductionCompany" (id, name, logo_path)
          SELECT * FROM (VALUES
            ${Array.from(allCompanies.values())
              .map((c) => `(${c.id}, '${escapeSql(c.name)}', '${c.logo_path}')`)
              .join(",")}
          ) AS t(id, name, logo_path)
          ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name,
            logo_path = EXCLUDED.logo_path
        `),

        prisma.$executeRawUnsafe(`
          INSERT INTO "ProductionCountry" ("ISO", name)
          SELECT * FROM (VALUES
            ${Array.from(allCountries.values())
              .map((c) => `('${c.ISO}', '${escapeSql(c.name)}')`)
              .join(",")}
          ) AS t("ISO", name)
          WHERE NOT EXISTS (
            SELECT 1 FROM "ProductionCountry" WHERE "ISO" = t."ISO"
          )
        `),
        ...filmUpdates.flatMap((m) => {
          if (!m) return []; // Vérification de null

          return [
            prisma.$executeRawUnsafe(`
              UPDATE "Movie"
              SET
                title = '${escapeSql(m.title)}',
                description = '${escapeSql(m.description)}',
                poster = '${m.poster}',
                release_date = '${m.release_date.toISOString()}'::timestamp,
                runtime = ${m.runtime},
                updated = true
              WHERE id = ${m.movieId}
            `),

            // Supprimer les anciennes relations
            prisma.$executeRawUnsafe(
              `DELETE FROM "_MovieActors" WHERE "A" = ${m.movieId}`
            ),
            prisma.$executeRawUnsafe(
              `DELETE FROM "_MovieDirectors" WHERE "A" = ${m.movieId}`
            ),
            prisma.$executeRawUnsafe(
              `DELETE FROM "_MovieProducers" WHERE "A" = ${m.movieId}`
            ),
            prisma.$executeRawUnsafe(
              `DELETE FROM "_MovieExecutiveProducers" WHERE "A" = ${m.movieId}`
            ),
            prisma.$executeRawUnsafe(
              `DELETE FROM "_MovieWriters" WHERE "A" = ${m.movieId}`
            ),
            prisma.$executeRawUnsafe(
              `DELETE FROM "_MovieComposers" WHERE "A" = ${m.movieId}`
            ),
            prisma.$executeRawUnsafe(
              `DELETE FROM "_MovieCinematographers" WHERE "A" = ${m.movieId}`
            ),
            prisma.$executeRawUnsafe(
              `DELETE FROM "_MovieToGenre" WHERE "A" = ${m.movieId}`
            ),
            prisma.$executeRawUnsafe(
              `DELETE FROM "_MovieToProductionCompany" WHERE "A" = ${m.movieId}`
            ),
            prisma.$executeRawUnsafe(
              `DELETE FROM "_MovieToProductionCountry" WHERE "A" = ${m.movieId}`
            ),

            // Ajouter les nouvelles relations
            prisma.$executeRawUnsafe(`
              INSERT INTO "_MovieActors" ("A", "B")
              SELECT ${m.movieId}, unnest(ARRAY[${m.actors.join(",")}]::int[])
              ON CONFLICT DO NOTHING
            `),
            prisma.$executeRawUnsafe(`
              INSERT INTO "_MovieDirectors" ("A", "B")
              SELECT ${m.movieId}, unnest(ARRAY[${m.directors.join(
              ","
            )}]::int[])
              ON CONFLICT DO NOTHING
            `),
            prisma.$executeRawUnsafe(`
              INSERT INTO "_MovieProducers" ("A", "B")
              SELECT ${m.movieId}, unnest(ARRAY[${m.producers.join(
              ","
            )}]::int[])
              ON CONFLICT DO NOTHING
            `),
            prisma.$executeRawUnsafe(`
              INSERT INTO "_MovieExecutiveProducers" ("A", "B")
              SELECT ${m.movieId}, unnest(ARRAY[${m.execProducers.join(
              ","
            )}]::int[])
              ON CONFLICT DO NOTHING
            `),
            prisma.$executeRawUnsafe(`
              INSERT INTO "_MovieWriters" ("A", "B")
              SELECT ${m.movieId}, unnest(ARRAY[${m.writers.join(",")}]::int[])
              ON CONFLICT DO NOTHING
            `),
            prisma.$executeRawUnsafe(`
              INSERT INTO "_MovieComposers" ("A", "B")
              SELECT ${m.movieId}, unnest(ARRAY[${m.composers.join(
              ","
            )}]::int[])
              ON CONFLICT DO NOTHING
            `),
            prisma.$executeRawUnsafe(`
              INSERT INTO "_MovieCinematographers" ("A", "B")
              SELECT ${m.movieId}, unnest(ARRAY[${m.cinematographers.join(
              ","
            )}]::int[])
              ON CONFLICT DO NOTHING
            `),
            prisma.$executeRawUnsafe(`
              INSERT INTO "_MovieToGenre" ("A", "B")
              SELECT ${m.movieId}, unnest(ARRAY[${m.genres.join(",")}]::int[])
              ON CONFLICT DO NOTHING
            `),
            prisma.$executeRawUnsafe(`
              INSERT INTO "_MovieToProductionCompany" ("A", "B")
              SELECT ${m.movieId}, unnest(ARRAY[${m.companies.join(
              ","
            )}]::int[])
              ON CONFLICT DO NOTHING
            `),
            prisma.$executeRawUnsafe(`
              INSERT INTO "_MovieToProductionCountry" ("A", "B")
              SELECT
                ${m.movieId},
                pc.id
              FROM
                "ProductionCountry" pc
              WHERE
                pc."ISO" IN (${m.countries.map((c) => `'${c}'`).join(",")})
              ON CONFLICT DO NOTHING
            `),
          ];
        }),
      ]);

      filmUpdates.forEach((m) => {
        if (m) {
          updatedMovies.push({
            id: m.movieId.toString(),
            title: m.title,
            release_date: m.release_date,
          });
        }
      });

      if (i + batchSize < moviesToUpdate.length) {
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
