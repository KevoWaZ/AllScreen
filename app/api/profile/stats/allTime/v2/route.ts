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
  topRatedActors: Person[];
  topRatedDirectors: Person[];
  topRatedProducers: Person[];
  topRatedExecProducers: Person[];
  topRatedWriters: Person[];
  topRatedComposers: Person[];
  topRatedCinematographers: Person[];
  topRatedCompanies: ProductionCompany[];
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
      const topGenres = await obtainTopGenres(userId);
      const topWatchlists = await obtainTopWatchlists(userId);
      return NextResponse.json({
        finalResultByYear,
        finalResultByDecade,
        topCrews,
        topWatchlists,
        topGenres,
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
      const topGenres = await obtainTopGenres(obtainUserId.id);
      const { finalResultByYear, finalResultByDecade } =
        await getYearAndDecades(obtainUserId.id);
      const topWatchlists = await obtainTopWatchlists(obtainUserId.id);

      return NextResponse.json({
        finalResultByYear,
        finalResultByDecade,
        topCrews,
        topWatchlists,
        topGenres,
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
    -- Top par nombre de films
    actor_counts AS (
      SELECT
        p.id,
        p.name,
        CAST(COUNT(DISTINCT ma."A") AS INTEGER) as count,
        p.profile_path
      FROM "Person" p
      JOIN "_MovieActors" ma ON p.id = ma."B"
      JOIN filtered_movies fm ON ma."A" = fm.id
      GROUP BY p.id, p.name, p.profile_path
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
      GROUP BY p.id, p.name, p.profile_path
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
      GROUP BY p.id, p.name, p.profile_path
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
      GROUP BY p.id, p.name, p.profile_path
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
      GROUP BY p.id, p.name, p.profile_path
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
      GROUP BY p.id, p.name, p.profile_path
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
      GROUP BY p.id, p.name, p.profile_path
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
    ),
    -- Top par moyenne de note
    avg_actor_ratings AS (
      SELECT
        p.id,
        p.name,
        p.profile_path,
        AVG(r.rating) as avg_rating,
        CAST(COUNT(DISTINCT ma."A") AS INTEGER) as count
      FROM "Person" p
      JOIN "_MovieActors" ma ON p.id = ma."B"
      JOIN filtered_movies fm ON ma."A" = fm.id
      JOIN "Review" r ON fm.id = r."movieId" AND r."userId" = ${userId}
      GROUP BY p.id, p.name, p.profile_path
      HAVING COUNT(DISTINCT ma."A") >= 3
      ORDER BY avg_rating DESC, count DESC
      LIMIT 10
    ),
    avg_director_ratings AS (
      SELECT
        p.id,
        p.name,
        p.profile_path,
        AVG(r.rating) as avg_rating,
        CAST(COUNT(DISTINCT md."A") AS INTEGER) as count
      FROM "Person" p
      JOIN "_MovieDirectors" md ON p.id = md."B"
      JOIN filtered_movies fm ON md."A" = fm.id
      JOIN "Review" r ON fm.id = r."movieId" AND r."userId" = ${userId}
      GROUP BY p.id, p.name, p.profile_path
      HAVING COUNT(DISTINCT md."A") >= 3
      ORDER BY avg_rating DESC, count DESC
      LIMIT 10
    ),
    avg_producer_ratings AS (
      SELECT
        p.id,
        p.name,
        p.profile_path,
        AVG(r.rating) as avg_rating,
        CAST(COUNT(DISTINCT mp."A") AS INTEGER) as count
      FROM "Person" p
      JOIN "_MovieProducers" mp ON p.id = mp."B"
      JOIN filtered_movies fm ON mp."A" = fm.id
      JOIN "Review" r ON fm.id = r."movieId" AND r."userId" = ${userId}
      GROUP BY p.id, p.name, p.profile_path
      HAVING COUNT(DISTINCT mp."A") >= 3
      ORDER BY avg_rating DESC, count DESC
      LIMIT 10
    ),
    avg_exec_producer_ratings AS (
      SELECT
        p.id,
        p.name,
        p.profile_path,
        AVG(r.rating) as avg_rating,
        CAST(COUNT(DISTINCT mep."A") AS INTEGER) as count
      FROM "Person" p
      JOIN "_MovieExecutiveProducers" mep ON p.id = mep."B"
      JOIN filtered_movies fm ON mep."A" = fm.id
      JOIN "Review" r ON fm.id = r."movieId" AND r."userId" = ${userId}
      GROUP BY p.id, p.name, p.profile_path
      HAVING COUNT(DISTINCT mep."A") >= 3
      ORDER BY avg_rating DESC, count DESC
      LIMIT 10
    ),
    avg_writer_ratings AS (
      SELECT
        p.id,
        p.name,
        p.profile_path,
        AVG(r.rating) as avg_rating,
        CAST(COUNT(DISTINCT mw."A") AS INTEGER) as count
      FROM "Person" p
      JOIN "_MovieWriters" mw ON p.id = mw."B"
      JOIN filtered_movies fm ON mw."A" = fm.id
      JOIN "Review" r ON fm.id = r."movieId" AND r."userId" = ${userId}
      GROUP BY p.id, p.name, p.profile_path
      HAVING COUNT(DISTINCT mw."A") >= 3
      ORDER BY avg_rating DESC, count DESC
      LIMIT 10
    ),
    avg_composer_ratings AS (
      SELECT
        p.id,
        p.name,
        p.profile_path,
        AVG(r.rating) as avg_rating,
        CAST(COUNT(DISTINCT mc."A") AS INTEGER) as count
      FROM "Person" p
      JOIN "_MovieComposers" mc ON p.id = mc."B"
      JOIN filtered_movies fm ON mc."A" = fm.id
      JOIN "Review" r ON fm.id = r."movieId" AND r."userId" = ${userId}
      GROUP BY p.id, p.name, p.profile_path
      HAVING COUNT(DISTINCT mc."A") >= 3
      ORDER BY avg_rating DESC, count DESC
      LIMIT 10
    ),
    avg_cinematographer_ratings AS (
      SELECT
        p.id,
        p.name,
        p.profile_path,
        AVG(r.rating) as avg_rating,
        CAST(COUNT(DISTINCT mcin."A") AS INTEGER) as count
      FROM "Person" p
      JOIN "_MovieCinematographers" mcin ON p.id = mcin."B"
      JOIN filtered_movies fm ON mcin."A" = fm.id
      JOIN "Review" r ON fm.id = r."movieId" AND r."userId" = ${userId}
      GROUP BY p.id, p.name, p.profile_path
      HAVING COUNT(DISTINCT mcin."A") >= 3
      ORDER BY avg_rating DESC, count DESC
      LIMIT 10
    ),
    avg_companies_ratings AS (
      SELECT
        pc.id,
        pc.name,
        pc.logo_path,
        AVG(r.rating) as avg_rating,
        CAST(COUNT(DISTINCT mcom."A") AS INTEGER) as count
      FROM "ProductionCompany" pc
      JOIN "_MovieToProductionCompany" mcom ON pc.id = mcom."B"
      JOIN filtered_movies fm ON mcom."A" = fm.id
      JOIN "Review" r ON fm.id = r."movieId" AND r."userId" = ${userId}
      GROUP BY pc.id, pc.name, pc.logo_path
      HAVING COUNT(DISTINCT mcom."A") >= 3
      ORDER BY avg_rating DESC, count DESC
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
        ),
        'topRatedActors', (
          SELECT json_agg(
            json_build_object(
              'id', id,
              'name', name,
              'avg_rating', avg_rating,
              'count', count,
              'profile_path', profile_path
            )
          )
          FROM avg_actor_ratings
        ),
        'topRatedDirectors', (
          SELECT json_agg(
            json_build_object(
              'id', id,
              'name', name,
              'avg_rating', avg_rating,
              'count', count,
              'profile_path', profile_path
            )
          )
          FROM avg_director_ratings
        ),
        'topRatedProducers', (
          SELECT json_agg(
            json_build_object(
              'id', id,
              'name', name,
              'avg_rating', avg_rating,
              'count', count,
              'profile_path', profile_path
            )
          )
          FROM avg_producer_ratings
        ),
        'topRatedExecProducers', (
          SELECT json_agg(
            json_build_object(
              'id', id,
              'name', name,
              'avg_rating', avg_rating,
              'count', count,
              'profile_path', profile_path
            )
          )
          FROM avg_exec_producer_ratings
        ),
        'topRatedWriters', (
          SELECT json_agg(
            json_build_object(
              'id', id,
              'name', name,
              'avg_rating', avg_rating,
              'count', count,
              'profile_path', profile_path
            )
          )
          FROM avg_writer_ratings
        ),
        'topRatedComposers', (
          SELECT json_agg(
            json_build_object(
              'id', id,
              'name', name,
              'avg_rating', avg_rating,
              'count', count,
              'profile_path', profile_path
            )
          )
          FROM avg_composer_ratings
        ),
        'topRatedCinematographers', (
          SELECT json_agg(
            json_build_object(
              'id', id,
              'name', name,
              'avg_rating', avg_rating,
              'count', count,
              'profile_path', profile_path
            )
          )
          FROM avg_cinematographer_ratings
        ),
        'topRatedCompanies', (
          SELECT json_agg(
            json_build_object(
              'id', id,
              'name', name,
              'avg_rating', avg_rating,
              'count', count,
              'logo_path', logo_path
            )
          )
          FROM avg_companies_ratings
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
    topRatedActors: topCrews[0].result.topRatedActors,
    topRatedDirectors: topCrews[0].result.topRatedDirectors,
    topRatedProducers: topCrews[0].result.topRatedProducers,
    topRatedExecProducers: topCrews[0].result.topRatedExecProducers,
    topRatedWriters: topCrews[0].result.topRatedWriters,
    topRatedComposers: topCrews[0].result.topRatedComposers,
    topRatedCinematographers: topCrews[0].result.topRatedCinematographers,
    topRatedCompanies: topCrews[0].result.topRatedCompanies,
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
    GROUP BY p.id, p.name, p.profile_path
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

export async function obtainTopGenres(userId: string) {
  const topGenres: any = await prisma.$queryRaw`
    WITH
    filtered_movies AS (
      SELECT m.id
      FROM "Review" r
      JOIN "Movie" m ON r."movieId" = m.id
      WHERE r."userId" = ${userId}
    ),
    genre_counts AS (
      SELECT
        g.id,
        g.name,
        CAST(COUNT(DISTINCT mg."A") AS INTEGER) as count
      FROM "MovieGenre" g
      JOIN "_MovieToGenre" mg ON g.id = mg."B"
      JOIN filtered_movies fm ON mg."A" = fm.id
      GROUP BY g.id, g.name
      ORDER BY count DESC
    ),
    avg_genre_ratings AS (
      SELECT
        g.id,
        g.name,
        AVG(r.rating) as avg_rating,
        CAST(COUNT(DISTINCT mg."A") AS INTEGER) as count
      FROM "MovieGenre" g
      JOIN "_MovieToGenre" mg ON g.id = mg."B"
      JOIN filtered_movies fm ON mg."A" = fm.id
      JOIN "Review" r ON fm.id = r."movieId" AND r."userId" = ${userId}
      GROUP BY g.id, g.name
      HAVING COUNT(DISTINCT mg."A") >= 1 
      ORDER BY avg_rating DESC, count DESC 
    )
    SELECT
      json_build_object(
        'topGenres', (
          SELECT json_agg(
            json_build_object(
              'id', id,
              'name', name,
              'count', count
            )
          )
          FROM genre_counts
        ),
        'topRatedGenres', (
          SELECT json_agg(
            json_build_object(
              'id', id,
              'name', name,
              'avg_rating', avg_rating,
              'count', count
            )
          )
          FROM avg_genre_ratings
        )
      ) AS result;
  `;

  return {
    topGenres: topGenres[0].result.topGenres,
    topRatedGenres: topGenres[0].result.topRatedGenres,
  };
}
