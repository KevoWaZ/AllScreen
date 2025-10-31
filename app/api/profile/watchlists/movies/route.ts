import prisma from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const username = params.get("username");
  const page = Number.parseInt(params.get("page") || "1");

  const genresParam = params.get("genres");
  const companiesParam = params.get("companies");
  const actorsParam = params.get("actors");
  const directorsParam = params.get("directors");
  const producersParam = params.get("producers");
  const execProducersParam = params.get("execProducers");
  const writersParam = params.get("writers");
  const composersParam = params.get("composers");
  const cinematographersParam = params.get("cinematographers");
  const decadeParam = params.get("decade");
  const yearParam = params.get("year");
  const sortParam = params.get("sort");

  if (!username) {
    return NextResponse.json("NO USERNAME");
  }

  try {
    const whereClause: any = {
      watchlists: {
        some: {
          user: {
            name: username,
          },
          type: "MOVIE",
        },
      },
    };

    const andConditions: any[] = [];

    // Genres filter (AND logic)
    if (genresParam) {
      const genreIds = genresParam.split(",").map(Number);
      genreIds.forEach((genreId) => {
        andConditions.push({
          genres: {
            some: {
              id: genreId,
            },
          },
        });
      });
    }

    // Companies filter (AND logic)
    if (companiesParam) {
      const companyIds = companiesParam.split(",").map(Number);
      companyIds.forEach((companyId) => {
        andConditions.push({
          productionCompanies: {
            some: {
              id: companyId,
            },
          },
        });
      });
    }

    // Actors filter (AND logic)
    if (actorsParam) {
      const actorIds = actorsParam.split(",").map(Number);
      actorIds.forEach((actorId) => {
        andConditions.push({
          actors: {
            some: {
              id: actorId,
            },
          },
        });
      });
    }

    // Directors filter (AND logic)
    if (directorsParam) {
      const directorIds = directorsParam.split(",").map(Number);
      directorIds.forEach((directorId) => {
        andConditions.push({
          directors: {
            some: {
              id: directorId,
            },
          },
        });
      });
    }

    // Producers filter (AND logic)
    if (producersParam) {
      const producerIds = producersParam.split(",").map(Number);
      producerIds.forEach((producerId) => {
        andConditions.push({
          producers: {
            some: {
              id: producerId,
            },
          },
        });
      });
    }

    // Executive Producers filter (AND logic)
    if (execProducersParam) {
      const execProducerIds = execProducersParam.split(",").map(Number);
      execProducerIds.forEach((execProducerId) => {
        andConditions.push({
          execProducers: {
            some: {
              id: execProducerId,
            },
          },
        });
      });
    }

    // Writers filter (AND logic)
    if (writersParam) {
      const writerIds = writersParam.split(",").map(Number);
      writerIds.forEach((writerId) => {
        andConditions.push({
          writers: {
            some: {
              id: writerId,
            },
          },
        });
      });
    }

    // Composers filter (AND logic)
    if (composersParam) {
      const composerIds = composersParam.split(",").map(Number);
      composerIds.forEach((composerId) => {
        andConditions.push({
          composers: {
            some: {
              id: composerId,
            },
          },
        });
      });
    }

    // Cinematographers filter (AND logic)
    if (cinematographersParam) {
      const cinematographerIds = cinematographersParam.split(",").map(Number);
      cinematographerIds.forEach((cinematographerId) => {
        andConditions.push({
          cinematographers: {
            some: {
              id: cinematographerId,
            },
          },
        });
      });
    }

    // Decade filter
    if (decadeParam) {
      const decade = Number.parseInt(decadeParam);
      const startYear = decade;
      const endYear = decade + 9;
      andConditions.push({
        release_date: {
          gte: new Date(`${startYear}-01-01`),
          lte: new Date(`${endYear}-12-31`),
        },
      });
    }

    // Year filter
    if (yearParam) {
      const year = Number.parseInt(yearParam);
      andConditions.push({
        release_date: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      });
    }

    if (andConditions.length > 0) {
      whereClause.AND = andConditions;
    }

    const totalFilteredCount = await prisma.movie.count({
      where: whereClause,
    });

    const batchSize = 200;
    const totalBatches = Math.ceil(totalFilteredCount / batchSize);

    const genresMap = new Map<
      number,
      { id: number; name: string; count: number }
    >();
    const companiesMap = new Map<
      number,
      { id: number; name: string; count: number }
    >();
    const actorsMap = new Map<
      number,
      { id: number; name: string; count: number }
    >();
    const directorsMap = new Map<
      number,
      { id: number; name: string; count: number }
    >();
    const producersMap = new Map<
      number,
      { id: number; name: string; count: number }
    >();
    const execProducersMap = new Map<
      number,
      { id: number; name: string; count: number }
    >();
    const writersMap = new Map<
      number,
      { id: number; name: string; count: number }
    >();
    const composersMap = new Map<
      number,
      { id: number; name: string; count: number }
    >();
    const cinematographersMap = new Map<
      number,
      { id: number; name: string; count: number }
    >();
    const decadesMap = new Map<
      string,
      { value: string; label: string; count: number }
    >();
    const yearsMap = new Map<
      string,
      { value: string; label: string; count: number }
    >();

    // Load movies in batches and aggregate facets
    for (let i = 0; i < totalBatches; i++) {
      const batchMovies = await prisma.movie.findMany({
        where: whereClause,
        skip: i * batchSize,
        take: batchSize,
        select: {
          id: true,
          release_date: true,
          genres: { select: { id: true, name: true } },
          productionCompanies: { select: { id: true, name: true } },
          actors: { select: { id: true, name: true } },
          directors: { select: { id: true, name: true } },
          producers: { select: { id: true, name: true } },
          execProducers: { select: { id: true, name: true } },
          writers: { select: { id: true, name: true } },
          composers: { select: { id: true, name: true } },
          cinematographers: { select: { id: true, name: true } },
        },
      });

      // Aggregate facets from this batch
      batchMovies.forEach((movie) => {
        // Genres
        movie.genres.forEach((genre) => {
          const existing = genresMap.get(genre.id);
          if (existing) {
            existing.count++;
          } else {
            genresMap.set(genre.id, { ...genre, count: 1 });
          }
        });

        // Companies
        movie.productionCompanies.forEach((company) => {
          const existing = companiesMap.get(company.id);
          if (existing) {
            existing.count++;
          } else {
            companiesMap.set(company.id, { ...company, count: 1 });
          }
        });

        // Actors
        movie.actors.forEach((actor) => {
          const existing = actorsMap.get(actor.id);
          if (existing) {
            existing.count++;
          } else {
            actorsMap.set(actor.id, { ...actor, count: 1 });
          }
        });

        // Directors
        movie.directors.forEach((director) => {
          const existing = directorsMap.get(director.id);
          if (existing) {
            existing.count++;
          } else {
            directorsMap.set(director.id, { ...director, count: 1 });
          }
        });

        // Producers
        movie.producers.forEach((producer) => {
          const existing = producersMap.get(producer.id);
          if (existing) {
            existing.count++;
          } else {
            producersMap.set(producer.id, { ...producer, count: 1 });
          }
        });

        // Executive Producers
        movie.execProducers.forEach((execProducer) => {
          const existing = execProducersMap.get(execProducer.id);
          if (existing) {
            existing.count++;
          } else {
            execProducersMap.set(execProducer.id, {
              ...execProducer,
              count: 1,
            });
          }
        });

        // Writers
        movie.writers.forEach((writer) => {
          const existing = writersMap.get(writer.id);
          if (existing) {
            existing.count++;
          } else {
            writersMap.set(writer.id, { ...writer, count: 1 });
          }
        });

        // Composers
        movie.composers.forEach((composer) => {
          const existing = composersMap.get(composer.id);
          if (existing) {
            existing.count++;
          } else {
            composersMap.set(composer.id, { ...composer, count: 1 });
          }
        });

        // Cinematographers
        movie.cinematographers.forEach((cinematographer) => {
          const existing = cinematographersMap.get(cinematographer.id);
          if (existing) {
            existing.count++;
          } else {
            cinematographersMap.set(cinematographer.id, {
              ...cinematographer,
              count: 1,
            });
          }
        });

        // Decades and Years
        const year = movie.release_date
          ? new Date(movie.release_date).getFullYear()
          : 0;
        if (!isNaN(year)) {
          const yearStr = year.toString();
          const decade = Math.floor(year / 10) * 10;
          const decadeStr = `${decade}s`;

          const existingYear = yearsMap.get(yearStr);
          if (existingYear) {
            existingYear.count++;
          } else {
            yearsMap.set(yearStr, { value: yearStr, label: yearStr, count: 1 });
          }

          const existingDecade = decadesMap.get(decadeStr);
          if (existingDecade) {
            existingDecade.count++;
          } else {
            decadesMap.set(decadeStr, {
              value: decade.toString(),
              label: decadeStr,
              count: 1,
            });
          }
        }
      });
    }

    // Convert maps to sorted arrays
    const facets = {
      genres: Array.from(genresMap.values()).sort((a, b) =>
        a.name.localeCompare(b.name)
      ),
      companies: Array.from(companiesMap.values()).sort((a, b) =>
        a.name.localeCompare(b.name)
      ),
      actors: Array.from(actorsMap.values()).sort((a, b) =>
        a.name.localeCompare(b.name)
      ),
      directors: Array.from(directorsMap.values()).sort((a, b) =>
        a.name.localeCompare(b.name)
      ),
      producers: Array.from(producersMap.values()).sort((a, b) =>
        a.name.localeCompare(b.name)
      ),
      execProducers: Array.from(execProducersMap.values()).sort((a, b) =>
        a.name.localeCompare(b.name)
      ),
      writers: Array.from(writersMap.values()).sort((a, b) =>
        a.name.localeCompare(b.name)
      ),
      composers: Array.from(composersMap.values()).sort((a, b) =>
        a.name.localeCompare(b.name)
      ),
      cinematographers: Array.from(cinematographersMap.values()).sort((a, b) =>
        a.name.localeCompare(b.name)
      ),
      decades: Array.from(decadesMap.values()).sort(
        (a, b) => Number.parseInt(b.value) - Number.parseInt(a.value)
      ),
      years: Array.from(yearsMap.values()).sort(
        (a, b) => Number.parseInt(b.value) - Number.parseInt(a.value)
      ),
    };

    let orderBy: any = [{ release_date: "desc" }, { id: "asc" }];
    if (sortParam === "runtime-desc") {
      orderBy = [{ runtime: "desc" }, { id: "asc" }];
    } else if (sortParam === "runtime-asc") {
      orderBy = [{ runtime: "asc" }, { id: "asc" }];
    }

    const take = 20;
    const skip = (page - 1) * take;

    const movies = await prisma.movie.findMany({
      where: whereClause,
      select: {
        id: true,
        title: true,
        poster: true,
        release_date: true,
        runtime: true,
        description: true,
        genres: true,
        productionCompanies: true,
        directors: true,
        producers: true,
        execProducers: true,
        writers: true,
        composers: true,
        cinematographers: true,
        actors: true,
      },
      orderBy,
      take,
      skip,
    });

    const totalPages = Math.ceil(totalFilteredCount / take);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json({
      watchlists: movies,
      pagination: {
        currentPage: page,
        totalPages,
        hasNextPage,
        hasPrevPage,
        totalMovies: totalFilteredCount,
      },
      facets,
    });
  } catch (error) {
    console.error("[v0] Error in watchlists API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
