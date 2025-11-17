import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Person {
  id: number;
  name: string;
  movie_count: number;
  profile_path: string;
}

interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string;
  movie_count: number;
}

interface Result {
  topActors: Person[];
  topDirectors: Person[];
  topProducers: Person[];
  topExecProducers: Person[];
  topWriters: Person[];
  topComposers: Person[];
  topCinematographers: Person[];
  topCompanies: ProductionCompany[];
}

interface Response {
  result: Result;
}

interface YearsAndDecades {
  result: {
    finalResultByYear: {
      year: number;
      count: number;
      sumRatings: number;
      averageRatings: number;
    }[];
    finalResultByDecade: {
      decade: number;
      count: number;
      sumRatings: number;
      averageRatings: number;
      topFilms: {
        id: number;
        title: string;
        rating: number;
        year: number;
        poster: string;
      }[];
    }[];
  };
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
      const { finalResultByYear, finalResultByDecade } =
        await getYearAndDecades(userId);
      const topCrews = await obtainTopCrews(userId);
      const topWatchlists = await obtainTopWatchlists(userId);
      return NextResponse.json({
        finalResultByYear,
        finalResultByDecade,
        topCrews,
        topWatchlists,
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
      const topCrews = await obtainTopCrews(obtainUserId.id);
      const { finalResultByYear, finalResultByDecade } =
        await getYearAndDecades(obtainUserId.id);
      const topWatchlists = await obtainTopWatchlists(obtainUserId.id);

      return NextResponse.json({
        finalResultByYear,
        finalResultByDecade,
        topCrews,
        topWatchlists,
      });
    }
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

async function getYearAndDecades(userId: string) {
  const result: YearsAndDecades[] = await prisma.$queryRaw`
  WITH user_reviews AS (
    SELECT
      r.rating,
      m.id AS movie_id,
      m.title,
      EXTRACT(YEAR FROM m.release_date) AS year,
      FLOOR(EXTRACT(YEAR FROM m.release_date) / 10) * 10 AS decade,
      m.poster
    FROM
      "Review" r
    JOIN
      "Movie" m ON r."movieId" = m.id
    WHERE
      r."userId" = ${userId}
      AND m.release_date IS NOT NULL
  ),
  yearly_stats AS (
    SELECT
      year,
      COUNT(*) AS count,
      SUM(rating) AS sum_ratings,
      AVG(rating) AS average_rating
    FROM
      user_reviews
    GROUP BY
      year
  ),
  decade_stats AS (
    SELECT
      decade,
      COUNT(*) AS count,
      SUM(rating) AS sum_ratings,
      AVG(rating) AS average_rating
    FROM
      user_reviews
    GROUP BY
      decade
  ),
  ranked_films AS (
    SELECT
      decade,
      movie_id,
      title,
      rating,
      year,
      poster,
      ROW_NUMBER() OVER (PARTITION BY decade ORDER BY rating DESC) AS rank
    FROM
      user_reviews
  ),
  top_films_per_decade AS (
    SELECT
      decade,
      json_agg(
        json_build_object(
          'id', movie_id,
          'title', title,
          'rating', rating,
          'year', year,
          'poster', COALESCE(poster, '')
        )
        ORDER BY rating DESC
      ) FILTER (WHERE rank <= 20) AS top_films
    FROM
      ranked_films
    GROUP BY
      decade
  )
  SELECT
    json_build_object(
      'finalResultByYear',
      (
        SELECT json_agg(
          json_build_object(
            'year', year,
            'count', count,
            'sumRatings', sum_ratings,
            'averageRating', average_rating
          )
          ORDER BY year
        )
        FROM yearly_stats
      ),
      'finalResultByDecade',
      (
        SELECT json_agg(
          json_build_object(
            'decade', ds.decade,
            'count', ds.count,
            'sumRatings', ds.sum_ratings,
            'averageRating', ds.average_rating,
            'topFilms', COALESCE(tf.top_films, '[]'::json)
          )
          ORDER BY ds.decade
        )
        FROM decade_stats ds
        LEFT JOIN top_films_per_decade tf ON ds.decade = tf.decade
      )
    ) AS result;
`;
  return result[0].result;
}

export async function obtainTopCrews(userId: string) {
  const topCrews: Response[] = await prisma.$queryRaw`
  WITH
  filtered_movies AS (
    SELECT m.id
    FROM "Review" r
    JOIN "Movie" m ON r."movieId" = m.id
    WHERE r."userId" = ${userId}
  ),
  actor_counts AS (
    SELECT
      p.id,
      p.name,
      CAST(COUNT(DISTINCT ma."A") AS INTEGER) as count,
      p.profile_path
    FROM "Person" p
    JOIN "_MovieActors" ma ON p.id = ma."B"
    JOIN filtered_movies fm ON ma."A" = fm.id
    GROUP BY p.id, p.name
    ORDER BY count DESC
    LIMIT 10
  ),
  director_counts AS (
    SELECT
      p.id,
      p.name,
      CAST(COUNT(DISTINCT md."A") AS INTEGER) as count,
      p.profile_path
    FROM "Person" p
    JOIN "_MovieDirectors" md ON p.id = md."B"
    JOIN filtered_movies fm ON md."A" = fm.id
    GROUP BY p.id, p.name
    ORDER BY count DESC
    LIMIT 10
  ),
  producer_counts AS (
    SELECT
      p.id,
      p.name,
      CAST(COUNT(DISTINCT mp."A") AS INTEGER) as count,
      p.profile_path
    FROM "Person" p
    JOIN "_MovieProducers" mp ON p.id = mp."B"
    JOIN filtered_movies fm ON mp."A" = fm.id
    GROUP BY p.id, p.name
    ORDER BY count DESC
    LIMIT 10
  ),
  exec_producer_counts AS (
    SELECT
      p.id,
      p.name,
      CAST(COUNT(DISTINCT mep."A") AS INTEGER) as count,
      p.profile_path
    FROM "Person" p
    JOIN "_MovieExecutiveProducers" mep ON p.id = mep."B"
    JOIN filtered_movies fm ON mep."A" = fm.id
    GROUP BY p.id, p.name
    ORDER BY count DESC
    LIMIT 10
  ),
  writer_counts AS (
    SELECT
      p.id,
      p.name,
      CAST(COUNT(DISTINCT mw."A") AS INTEGER) as count,
      p.profile_path
    FROM "Person" p
    JOIN "_MovieWriters" mw ON p.id = mw."B"
    JOIN filtered_movies fm ON mw."A" = fm.id
    GROUP BY p.id, p.name
    ORDER BY count DESC
    LIMIT 10
  ),
  composer_counts AS (
    SELECT
      p.id,
      p.name,
      CAST(COUNT(DISTINCT mc."A") AS INTEGER) as count,
      p.profile_path
    FROM "Person" p
    JOIN "_MovieComposers" mc ON p.id = mc."B"
    JOIN filtered_movies fm ON mc."A" = fm.id
    GROUP BY p.id, p.name
    ORDER BY count DESC
    LIMIT 10
  ),
  cinematographer_counts AS (
    SELECT
      p.id,
      p.name,
      CAST(COUNT(DISTINCT mcin."A") AS INTEGER) as count,
      p.profile_path
    FROM "Person" p
    JOIN "_MovieCinematographers" mcin ON p.id = mcin."B"
    JOIN filtered_movies fm ON mcin."A" = fm.id
    GROUP BY p.id, p.name
    ORDER BY count DESC
    LIMIT 10
  ),
  companies_counts AS (
    SELECT
      pc.id,
      pc.name,
      pc.logo_path,
      CAST(COUNT(DISTINCT mcom."A") AS INTEGER) as count
    FROM "ProductionCompany" pc
    JOIN "_MovieToProductionCompany" mcom ON pc.id = mcom."B"
    JOIN filtered_movies fm ON mcom."A" = fm.id
    GROUP BY pc.id, pc.name, pc.logo_path
    ORDER BY count DESC
    LIMIT 10
  )
  SELECT
    json_build_object(
      'topActors', (
        SELECT json_agg(
          json_build_object(
            'id', id,
            'name', name,
            'count', count,
            'profile_path', profile_path
          )
        )
        FROM actor_counts
      ),
      'topDirectors', (
        SELECT json_agg(
          json_build_object(
            'id', id,
            'name', name,
            'count', count,
            'profile_path', profile_path
          )
        )
        FROM director_counts
      ),
      'topProducers', (
        SELECT json_agg(
          json_build_object(
            'id', id,
            'name', name,
            'count', count,
            'profile_path', profile_path
          )
        )
        FROM producer_counts
      ),
      'topExecProducers', (
        SELECT json_agg(
          json_build_object(
            'id', id,
            'name', name,
            'count', count,
            'profile_path', profile_path
          )
        )
        FROM exec_producer_counts
      ),
      'topWriters', (
        SELECT json_agg(
          json_build_object(
            'id', id,
            'name', name,
            'count', count,
            'profile_path', profile_path
          )
        )
        FROM writer_counts
      ),
      'topComposers', (
        SELECT json_agg(
          json_build_object(
            'id', id,
            'name', name,
            'count', count,
            'profile_path', profile_path
          )
        )
        FROM composer_counts
      ),
      'topCinematographers', (
        SELECT json_agg(
          json_build_object(
            'id', id,
            'name', name,
            'count', count,
            'profile_path', profile_path
          )
        )
        FROM cinematographer_counts
      ),
      'topCompanies', (
        SELECT json_agg(
          json_build_object(
            'id', id,
            'name', name,
            'logo_path', logo_path,
            'count', count
          )
        )
        FROM companies_counts
      )
    ) AS result;
`;

  return {
    topDirectors: topCrews[0].result.topDirectors,
    topProducers: topCrews[0].result.topProducers,
    topExecProducers: topCrews[0].result.topExecProducers,
    topWriters: topCrews[0].result.topWriters,
    topComposers: topCrews[0].result.topComposers,
    topCinematographers: topCrews[0].result.topCinematographers,
    topActors: topCrews[0].result.topActors,
    topCompanies: topCrews[0].result.topCompanies,
  };
}

export async function obtainTopWatchlists(userId: string) {
  const topCrews: Response[] = await prisma.$queryRaw`
  WITH
  filtered_movies AS (
    SELECT m.id
    FROM "Watchlist" r
    JOIN "Movie" m ON r."movieId" = m.id
    WHERE r."userId" = ${userId}
  ),
  actor_counts AS (
    SELECT
      p.id,
      p.name,
      CAST(COUNT(DISTINCT ma."A") AS INTEGER) as count,
      p.profile_path
    FROM "Person" p
    JOIN "_MovieActors" ma ON p.id = ma."B"
    JOIN filtered_movies fm ON ma."A" = fm.id
    GROUP BY p.id, p.name
    ORDER BY count DESC
    LIMIT 10
  ),
  director_counts AS (
    SELECT
      p.id,
      p.name,
      CAST(COUNT(DISTINCT md."A") AS INTEGER) as count,
      p.profile_path
    FROM "Person" p
    JOIN "_MovieDirectors" md ON p.id = md."B"
    JOIN filtered_movies fm ON md."A" = fm.id
    GROUP BY p.id, p.name
    ORDER BY count DESC
    LIMIT 10
  ),
  producer_counts AS (
    SELECT
      p.id,
      p.name,
      CAST(COUNT(DISTINCT mp."A") AS INTEGER) as count,
      p.profile_path
    FROM "Person" p
    JOIN "_MovieProducers" mp ON p.id = mp."B"
    JOIN filtered_movies fm ON mp."A" = fm.id
    GROUP BY p.id, p.name
    ORDER BY count DESC
    LIMIT 10
  ),
  exec_producer_counts AS (
    SELECT
      p.id,
      p.name,
      CAST(COUNT(DISTINCT mep."A") AS INTEGER) as count,
      p.profile_path
    FROM "Person" p
    JOIN "_MovieExecutiveProducers" mep ON p.id = mep."B"
    JOIN filtered_movies fm ON mep."A" = fm.id
    GROUP BY p.id, p.name
    ORDER BY count DESC
    LIMIT 10
  ),
  writer_counts AS (
    SELECT
      p.id,
      p.name,
      CAST(COUNT(DISTINCT mw."A") AS INTEGER) as count,
      p.profile_path
    FROM "Person" p
    JOIN "_MovieWriters" mw ON p.id = mw."B"
    JOIN filtered_movies fm ON mw."A" = fm.id
    GROUP BY p.id, p.name
    ORDER BY count DESC
    LIMIT 10
  ),
  composer_counts AS (
    SELECT
      p.id,
      p.name,
      CAST(COUNT(DISTINCT mc."A") AS INTEGER) as count,
      p.profile_path
    FROM "Person" p
    JOIN "_MovieComposers" mc ON p.id = mc."B"
    JOIN filtered_movies fm ON mc."A" = fm.id
    GROUP BY p.id, p.name
    ORDER BY count DESC
    LIMIT 10
  ),
  cinematographer_counts AS (
    SELECT
      p.id,
      p.name,
      CAST(COUNT(DISTINCT mcin."A") AS INTEGER) as count,
      p.profile_path
    FROM "Person" p
    JOIN "_MovieCinematographers" mcin ON p.id = mcin."B"
    JOIN filtered_movies fm ON mcin."A" = fm.id
    GROUP BY p.id, p.name
    ORDER BY count DESC
    LIMIT 10
  ),
  companies_counts AS (
    SELECT
      pc.id,
      pc.name,
      pc.logo_path,
      CAST(COUNT(DISTINCT mcom."A") AS INTEGER) as count
    FROM "ProductionCompany" pc
    JOIN "_MovieToProductionCompany" mcom ON pc.id = mcom."B"
    JOIN filtered_movies fm ON mcom."A" = fm.id
    GROUP BY pc.id, pc.name, pc.logo_path
    ORDER BY count DESC
    LIMIT 10
  )
  SELECT
    json_build_object(
      'topActors', (
        SELECT json_agg(
          json_build_object(
            'id', id,
            'name', name,
            'count', count,
            'profile_path', profile_path
          )
        )
        FROM actor_counts
      ),
      'topDirectors', (
        SELECT json_agg(
          json_build_object(
            'id', id,
            'name', name,
            'count', count,
            'profile_path', profile_path
          )
        )
        FROM director_counts
      ),
      'topProducers', (
        SELECT json_agg(
          json_build_object(
            'id', id,
            'name', name,
            'count', count,
            'profile_path', profile_path
          )
        )
        FROM producer_counts
      ),
      'topExecProducers', (
        SELECT json_agg(
          json_build_object(
            'id', id,
            'name', name,
            'count', count,
            'profile_path', profile_path
          )
        )
        FROM exec_producer_counts
      ),
      'topWriters', (
        SELECT json_agg(
          json_build_object(
            'id', id,
            'name', name,
            'count', count,
            'profile_path', profile_path
          )
        )
        FROM writer_counts
      ),
      'topComposers', (
        SELECT json_agg(
          json_build_object(
            'id', id,
            'name', name,
            'count', count,
            'profile_path', profile_path
          )
        )
        FROM composer_counts
      ),
      'topCinematographers', (
        SELECT json_agg(
          json_build_object(
            'id', id,
            'name', name,
            'count', count,
            'profile_path', profile_path
          )
        )
        FROM cinematographer_counts
      ),
      'topCompanies', (
        SELECT json_agg(
          json_build_object(
            'id', id,
            'name', name,
            'logo_path', logo_path,
            'count', count
          )
        )
        FROM companies_counts
      )
    ) AS result;
`;

  return {
    topDirectors: topCrews[0].result.topDirectors,
    topProducers: topCrews[0].result.topProducers,
    topExecProducers: topCrews[0].result.topExecProducers,
    topWriters: topCrews[0].result.topWriters,
    topComposers: topCrews[0].result.topComposers,
    topCinematographers: topCrews[0].result.topCinematographers,
    topActors: topCrews[0].result.topActors,
    topCompanies: topCrews[0].result.topCompanies,
  };
}
