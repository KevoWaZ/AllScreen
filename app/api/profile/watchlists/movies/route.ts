import { Prisma } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

type Facets = {
  genres: Array<{ id: number; name: string; count: number }>;
  companies: Array<{ id: number; name: string; count: number }>;
  actors: Array<{ id: number; name: string; count: number }>;
  directors: Array<{ id: number; name: string; count: number }>;
  producers: Array<{ id: number; name: string; count: number }>;
  execProducers: Array<{ id: number; name: string; count: number }>;
  writers: Array<{ id: number; name: string; count: number }>;
  composers: Array<{ id: number; name: string; count: number }>;
  cinematographers: Array<{ id: number; name: string; count: number }>;
  decades: Array<{ value: string; label: string; count: number }>;
  years: Array<{ value: string; label: string; count: number }>;
};

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const username = params.get("username");
  const page = Number.parseInt(params.get("page") || "1");
  const includeFacets = params.get("includeFacets") !== "false";

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

    const [totalFilteredCount, facets] = await Promise.all([
      prisma.movie.count({ where: whereClause }),
      includeFacets
        ? calculateFacetsSQL(username, whereClause)
        : Promise.resolve(null),
    ]);

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
        description: false,
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

async function calculateFacetsSQL(
  username: string,
  whereClause: any
): Promise<Facets> {
  const conditions = buildSQLConditions(whereClause);

  // Execute all facet queries in parallel for maximum performance
  const [
    genresFacets,
    companiesFacets,
    actorsFacets,
    directorsFacets,
    producersFacets,
    execProducersFacets,
    writersFacets,
    composersFacets,
    cinematographersFacets,
    datesFacets,
  ] = await Promise.all([
    // Genres
    prisma.$queryRaw<Array<{ id: number; name: string; count: number }>>(
      Prisma.sql`SELECT g.id, g.name, COUNT(DISTINCT m.id)::int as count
      FROM "Movie" m
      INNER JOIN "Watchlist" w ON m.id = w."movieId"
      INNER JOIN "user" u ON w."userId" = u.id
      INNER JOIN "_MovieToGenre" mg ON m.id = mg."A"
      INNER JOIN "MovieGenre" g ON mg."B" = g.id
      WHERE u.name = ${username} AND w.type = 'MOVIE' ${Prisma.raw(conditions)}
      GROUP BY g.id, g.name
      ORDER BY g.name ASC`
    ),

    // Production Companies
    prisma.$queryRaw<Array<{ id: number; name: string; count: number }>>(
      Prisma.sql`SELECT pc.id, pc.name, COUNT(DISTINCT m.id)::int as count
      FROM "Movie" m
      INNER JOIN "Watchlist" w ON m.id = w."movieId"
      INNER JOIN "user" u ON w."userId" = u.id
      INNER JOIN "_MovieToProductionCompany" mpc ON m.id = mpc."A"
      INNER JOIN "ProductionCompany" pc ON mpc."B" = pc.id
      WHERE u.name = ${username} AND w.type = 'MOVIE' ${Prisma.raw(conditions)}
      GROUP BY pc.id, pc.name
      ORDER BY pc.name ASC`
    ),

    prisma.$queryRaw<
      Array<{ id: number; name: string; count: number; popularity: number }>
    >(
      Prisma.sql`SELECT p.id, p.name, COUNT(DISTINCT m.id)::int as count, p.popularity
    FROM "Movie" m
    INNER JOIN "Watchlist" w ON m.id = w."movieId"
    INNER JOIN "user" u ON w."userId" = u.id
    INNER JOIN "_MovieActors" ma ON m.id = ma."A"
    INNER JOIN "Person" p ON ma."B" = p.id
    WHERE u.name = ${username} AND w.type = 'MOVIE' ${Prisma.raw(conditions)}
    GROUP BY p.id, p.name, p.popularity
    ORDER BY p.popularity DESC
    LIMIT 800`
    ),
    prisma.$queryRaw<
      Array<{ id: number; name: string; count: number; popularity: number }>
    >(
      Prisma.sql`SELECT p.id, p.name, COUNT(DISTINCT m.id)::int as count, p.popularity
    FROM "Movie" m
    INNER JOIN "Watchlist" w ON m.id = w."movieId"
    INNER JOIN "user" u ON w."userId" = u.id
    INNER JOIN "_MovieDirectors" md ON m.id = md."A"
    INNER JOIN "Person" p ON md."B" = p.id
    WHERE u.name = ${username} AND w.type = 'MOVIE' ${Prisma.raw(conditions)}
    GROUP BY p.id, p.name, p.popularity
    ORDER BY p.popularity DESC
    LIMIT 400`
    ),
    prisma.$queryRaw<
      Array<{ id: number; name: string; count: number; popularity: number }>
    >(
      Prisma.sql`SELECT p.id, p.name, COUNT(DISTINCT m.id)::int as count, p.popularity
    FROM "Movie" m
    INNER JOIN "Watchlist" w ON m.id = w."movieId"
    INNER JOIN "user" u ON w."userId" = u.id
    INNER JOIN "_MovieProducers" mp ON m.id = mp."A"
    INNER JOIN "Person" p ON mp."B" = p.id
    WHERE u.name = ${username} AND w.type = 'MOVIE' ${Prisma.raw(conditions)}
    GROUP BY p.id, p.name, p.popularity
    ORDER BY p.popularity DESC
    LIMIT 400`
    ),
    prisma.$queryRaw<
      Array<{ id: number; name: string; count: number; popularity: number }>
    >(
      Prisma.sql`SELECT p.id, p.name, COUNT(DISTINCT m.id)::int as count, p.popularity
    FROM "Movie" m
    INNER JOIN "Watchlist" w ON m.id = w."movieId"
    INNER JOIN "user" u ON w."userId" = u.id
    INNER JOIN "_MovieExecutiveProducers" mep ON m.id = mep."A"
    INNER JOIN "Person" p ON mep."B" = p.id
    WHERE u.name = ${username} AND w.type = 'MOVIE' ${Prisma.raw(conditions)}
    GROUP BY p.id, p.name, p.popularity
    ORDER BY p.popularity DESC
    LIMIT 400`
    ),
    prisma.$queryRaw<
      Array<{ id: number; name: string; count: number; popularity: number }>
    >(
      Prisma.sql`SELECT p.id, p.name, COUNT(DISTINCT m.id)::int as count, p.popularity
    FROM "Movie" m
    INNER JOIN "Watchlist" w ON m.id = w."movieId"
    INNER JOIN "user" u ON w."userId" = u.id
    INNER JOIN "_MovieWriters" mw ON m.id = mw."A"
    INNER JOIN "Person" p ON mw."B" = p.id
    WHERE u.name = ${username} AND w.type = 'MOVIE' ${Prisma.raw(conditions)}
    GROUP BY p.id, p.name, p.popularity
    ORDER BY p.popularity DESC
    LIMIT 400`
    ),
    prisma.$queryRaw<
      Array<{ id: number; name: string; count: number; popularity: number }>
    >(
      Prisma.sql`SELECT p.id, p.name, COUNT(DISTINCT m.id)::int as count, p.popularity
    FROM "Movie" m
    INNER JOIN "Watchlist" w ON m.id = w."movieId"
    INNER JOIN "user" u ON w."userId" = u.id
    INNER JOIN "_MovieComposers" mc ON m.id = mc."A"
    INNER JOIN "Person" p ON mc."B" = p.id
    WHERE u.name = ${username} AND w.type = 'MOVIE' ${Prisma.raw(conditions)}
    GROUP BY p.id, p.name, p.popularity
    ORDER BY p.popularity DESC
    LIMIT 400`
    ),
    prisma.$queryRaw<
      Array<{ id: number; name: string; count: number; popularity: number }>
    >(
      Prisma.sql`SELECT p.id, p.name, COUNT(DISTINCT m.id)::int as count, p.popularity
    FROM "Movie" m
    INNER JOIN "Watchlist" w ON m.id = w."movieId"
    INNER JOIN "user" u ON w."userId" = u.id
    INNER JOIN "_MovieCinematographers" mci ON m.id = mci."A"
    INNER JOIN "Person" p ON mci."B" = p.id
    WHERE u.name = ${username} AND w.type = 'MOVIE' ${Prisma.raw(conditions)}
    GROUP BY p.id, p.name, p.popularity
    ORDER BY p.popularity DESC
    LIMIT 400`
    ),
    // Decades and Years
    prisma.$queryRaw<Array<{ year: number; count: number }>>(
      Prisma.sql`SELECT EXTRACT(YEAR FROM m.release_date)::int as year, COUNT(*)::int as count
      FROM "Movie" m
      INNER JOIN "Watchlist" w ON m.id = w."movieId"
      INNER JOIN "user" u ON w."userId" = u.id
      WHERE u.name = ${username} 
        AND w.type = 'MOVIE' 
        AND m.release_date IS NOT NULL
      GROUP BY EXTRACT(YEAR FROM m.release_date)
      ORDER BY year DESC`
    ),
  ]);

  const decadesMap = new Map<
    string,
    { value: string; label: string; count: number }
  >();
  const yearsMap = new Map<
    string,
    { value: string; label: string; count: number }
  >();

  datesFacets.forEach((item) => {
    const year = item.year;
    const count = item.count;
    const yearStr = year.toString();

    // Add to years
    const existing = yearsMap.get(yearStr);
    if (existing) {
      existing.count += count;
    } else {
      yearsMap.set(yearStr, { value: yearStr, label: yearStr, count });
    }

    // Add to decades
    const decade = Math.floor(year / 10) * 10;
    const decadeStr = `${decade}s`;
    const decadeValue = decade.toString();

    const existingDecade = decadesMap.get(decadeValue);
    if (existingDecade) {
      existingDecade.count += count;
    } else {
      decadesMap.set(decadeValue, {
        value: decadeValue,
        label: decadeStr,
        count,
      });
    }
  });

  return {
    genres: genresFacets,
    companies: companiesFacets,
    actors: actorsFacets,
    directors: directorsFacets,
    producers: producersFacets,
    execProducers: execProducersFacets,
    writers: writersFacets,
    composers: composersFacets,
    cinematographers: cinematographersFacets,
    decades: Array.from(decadesMap.values()).sort(
      (a, b) => Number.parseInt(b.value) - Number.parseInt(a.value)
    ),
    years: Array.from(yearsMap.values()).sort(
      (a, b) => Number.parseInt(b.value) - Number.parseInt(a.value)
    ),
  };
}

function buildSQLConditions(whereClause: any): string {
  const sqlParts: string[] = [];

  if (whereClause.AND && Array.isArray(whereClause.AND)) {
    whereClause.AND.forEach((condition: any) => {
      // Genre filters
      if (condition.genres?.some?.id) {
        const genreId = condition.genres.some.id;
        sqlParts.push(
          `AND EXISTS (SELECT 1 FROM "_MovieToGenre" mg2 WHERE mg2."A" = m.id AND mg2."B" = ${genreId})`
        );
      }

      // Company filters
      if (condition.productionCompanies?.some?.id) {
        const companyId = condition.productionCompanies.some.id;
        sqlParts.push(
          `AND EXISTS (SELECT 1 FROM "_MovieToProductionCompany" mpc2 WHERE mpc2."A" = m.id AND mpc2."B" = ${companyId})`
        );
      }

      // Actor filters
      if (condition.actors?.some?.id) {
        const actorId = condition.actors.some.id;
        sqlParts.push(
          `AND EXISTS (SELECT 1 FROM "_MovieActors" ma2 WHERE ma2."A" = m.id AND ma2."B" = ${actorId})`
        );
      }

      // Director filters
      if (condition.directors?.some?.id) {
        const directorId = condition.directors.some.id;
        sqlParts.push(
          `AND EXISTS (SELECT 1 FROM "_MovieDirectors" md2 WHERE md2."A" = m.id AND md2."B" = ${directorId})`
        );
      }

      // Producer filters
      if (condition.producers?.some?.id) {
        const producerId = condition.producers.some.id;
        sqlParts.push(
          `AND EXISTS (SELECT 1 FROM "_MovieProducers" mp2 WHERE mp2."A" = m.id AND mp2."B" = ${producerId})`
        );
      }

      // Executive Producer filters
      if (condition.execProducers?.some?.id) {
        const execProducerId = condition.execProducers.some.id;
        sqlParts.push(
          `AND EXISTS (SELECT 1 FROM "_MovieExecutiveProducers" mep2 WHERE mep2."A" = m.id AND mep2."B" = ${execProducerId})`
        );
      }

      // Writer filters
      if (condition.writers?.some?.id) {
        const writerId = condition.writers.some.id;
        sqlParts.push(
          `AND EXISTS (SELECT 1 FROM "_MovieWriters" mw2 WHERE mw2."A" = m.id AND mw2."B" = ${writerId})`
        );
      }

      // Composer filters
      if (condition.composers?.some?.id) {
        const composerId = condition.composers.some.id;
        sqlParts.push(
          `AND EXISTS (SELECT 1 FROM "_MovieComposers" mc2 WHERE mc2."A" = m.id AND mc2."B" = ${composerId})`
        );
      }

      // Cinematographer filters
      if (condition.cinematographers?.some?.id) {
        const cinematographerId = condition.cinematographers.some.id;
        sqlParts.push(
          `AND EXISTS (SELECT 1 FROM "_MovieCinematographers" mci2 WHERE mci2."A" = m.id AND mci2."B" = ${cinematographerId})`
        );
      }

      // Date range filters
      if (condition.release_date) {
        if (condition.release_date.gte) {
          const gteDate = condition.release_date.gte.toISOString();
          sqlParts.push(`AND m.release_date >= '${gteDate}'::timestamp`);
        }
        if (condition.release_date.lte) {
          const lteDate = condition.release_date.lte.toISOString();
          sqlParts.push(`AND m.release_date <= '${lteDate}'::timestamp`);
        }
      }
    });
  }

  return sqlParts.length > 0 ? sqlParts.join(" ") : "";
}
