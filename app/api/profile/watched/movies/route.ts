import prisma from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const username = params.get("username");
  const cursor = params.get("cursor");
  const direction = params.get("direction") || "next";

  const genresParam = params.get("genres");
  const companiesParam = params.get("companies");
  const actorsParam = params.get("actors");
  const directorsParam = params.get("directors");
  const producersParam = params.get("producers");
  const execProducersParam = params.get("execProducers");
  const writersParam = params.get("writers");
  const composersParam = params.get("composers");
  const cinematographersParam = params.get("cinematographers");
  const ratingParam = params.get("rating");
  const decadeParam = params.get("decade");
  const yearParam = params.get("year");
  const sortParam = params.get("sort");

  if (!username) {
    return NextResponse.json("NO USERNAME");
  }

  try {
    const pageSize = 20;
    const batchSize = 200;

    const whereClause: any = {
      watched: {
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

    // Add decade filter
    if (decadeParam) {
      const decade = Number.parseInt(decadeParam);
      const startYear = new Date(`${decade}-01-01`);
      const endYear = new Date(`${decade + 9}-12-31`);
      whereClause.release_date = {
        gte: startYear,
        lte: endYear,
      };
    }

    // Add year filter (overrides decade if both present)
    if (yearParam) {
      const year = Number.parseInt(yearParam);
      const startYear = new Date(`${year}-01-01`);
      const endYear = new Date(`${year}-12-31`);
      whereClause.release_date = {
        gte: startYear,
        lte: endYear,
      };
    }

    if (andConditions.length > 0) {
      whereClause.AND = andConditions;
    }

    let orderBy: any = { release_date: "desc" };
    if (sortParam === "runtime-desc") {
      orderBy = { runtime: "desc" };
    } else if (sortParam === "runtime-asc") {
      orderBy = { runtime: "asc" };
    }

    const totalMoviesCount = await prisma.movie.count({
      where: whereClause,
    });

    const numberOfBatches = Math.ceil(totalMoviesCount / batchSize);

    const genresMap = new Map();
    const companiesMap = new Map();
    const actorsMap = new Map();
    const directorsMap = new Map();
    const producersMap = new Map();
    const execProducersMap = new Map();
    const writersMap = new Map();
    const composersMap = new Map();
    const cinematographersMap = new Map();
    const decadesSet = new Set<string>();
    const yearsSet = new Set<string>();

    const user = await prisma.user.findUnique({
      where: {
        name: username,
      },
      select: {
        reviews: true,
      },
    });

    if (!user) {
      return NextResponse.json("NO USER");
    }

    let allMoviesWithRatings: any[] = [];

    for (let i = 0; i < numberOfBatches; i++) {
      const batchMovies = await prisma.movie.findMany({
        where: whereClause,
        select: {
          id: true,
          title: true,
          poster: true,
          release_date: true,
          runtime: true,
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
        skip: i * batchSize,
        take: batchSize,
      });

      // Add ratings to batch movies
      const batchWithRatings = batchMovies.map((movie) => {
        const review = user.reviews.find(
          (reviewItem) => reviewItem.movieId === movie.id
        );
        return {
          ...movie,
          vote_count: review?.rating || 0,
        };
      });

      allMoviesWithRatings = [...allMoviesWithRatings, ...batchWithRatings];

      batchMovies.forEach((movie) => {
        movie.genres.forEach((genre) => genresMap.set(genre.id, genre));
        movie.productionCompanies.forEach((company) =>
          companiesMap.set(company.id, company)
        );
        movie.actors.forEach((actor) => actorsMap.set(actor.id, actor));
        movie.directors.forEach((director) =>
          directorsMap.set(director.id, director)
        );
        movie.producers.forEach((producer) =>
          producersMap.set(producer.id, producer)
        );
        movie.execProducers.forEach((execProducer) =>
          execProducersMap.set(execProducer.id, execProducer)
        );
        movie.writers.forEach((writer) => writersMap.set(writer.id, writer));
        movie.composers.forEach((composer) =>
          composersMap.set(composer.id, composer)
        );
        movie.cinematographers.forEach((cinematographer) =>
          cinematographersMap.set(cinematographer.id, cinematographer)
        );

        if (movie.release_date) {
          const year = new Date(movie.release_date).getFullYear();
          if (!isNaN(year)) {
            yearsSet.add(year.toString());
            const decade = Math.floor(year / 10) * 10;
            decadesSet.add(`${decade}s`);
          }
        }
      });
    }

    let finalFilteredMovies = allMoviesWithRatings;
    if (ratingParam) {
      const selectedRating = Number.parseFloat(ratingParam);
      finalFilteredMovies = allMoviesWithRatings.filter((movie) => {
        const roundedRating = Math.round(movie.vote_count * 2) / 2;
        return roundedRating === selectedRating;
      });
    }

    const facets = {
      genres: Array.from(genresMap.values()),
      companies: Array.from(companiesMap.values()),
      actors: Array.from(actorsMap.values()),
      directors: Array.from(directorsMap.values()),
      producers: Array.from(producersMap.values()),
      execProducers: Array.from(execProducersMap.values()),
      writers: Array.from(writersMap.values()),
      composers: Array.from(composersMap.values()),
      cinematographers: Array.from(cinematographersMap.values()),
      decades: Array.from(decadesSet).sort(
        (a, b) => Number.parseInt(b) - Number.parseInt(a)
      ),
      years: Array.from(yearsSet).sort(
        (a, b) => Number.parseInt(b) - Number.parseInt(a)
      ),
    };

    const totalMovies = finalFilteredMovies.length;
    const totalPages = Math.ceil(totalMovies / pageSize);

    // Find cursor index
    let startIndex = 0;
    if (cursor) {
      const cursorId = Number.parseInt(cursor);
      const cursorIndex = finalFilteredMovies.findIndex(
        (m) => m.id === cursorId
      );
      if (cursorIndex !== -1) {
        startIndex =
          direction === "prev"
            ? Math.max(0, cursorIndex - pageSize)
            : cursorIndex + 1;
      }
    }

    const paginatedMovies = finalFilteredMovies.slice(
      startIndex,
      startIndex + pageSize
    );
    const hasMore = startIndex + pageSize < totalMovies;
    const hasPrev = startIndex > 0;

    const nextCursor =
      hasMore && paginatedMovies.length > 0
        ? paginatedMovies[paginatedMovies.length - 1].id.toString()
        : null;
    const prevCursor =
      hasPrev && paginatedMovies.length > 0
        ? paginatedMovies[0].id.toString()
        : null;

    return NextResponse.json({
      watched: paginatedMovies.map((movie) => ({
        movie,
      })),
      nextCursor,
      prevCursor,
      hasMore,
      facets,
      totalMovies,
      totalPages,
    });
  } catch (error) {
    console.error("Error in watched movies API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
