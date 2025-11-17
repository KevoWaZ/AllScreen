import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Person {
  id: number;
  name: string;
  count: number;
  profile_path: string;
}

interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string;
  count: number;
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

export async function GET(request: Request) {
  const userId = "kM1EeQFhbt2XFFkQxyZJOTwXVOFPpK07";

  try {
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
      'topExecproducers', (
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

    const popularActors = await prisma.$queryRaw`
      SELECT p.id, p.name, p.profile_path, p.popularity
      FROM "Person" p
      WHERE 'Acting' = ANY(job)
      ORDER BY popularity DESC
      LIMIT 10
    `;
    return NextResponse.json({ topCrews: topCrews[0] });
  } catch (error) {
    console.error("Error fetching top directors:", error);
    return NextResponse.json(
      { error: "Failed to fetch top directors" },
      { status: 500 }
    );
  }
}

// const watched = await prisma.$queryRaw`
//   WITH actor_counts AS (
//     SELECT
//       p.id,
//       p.name,
//       CAST(COUNT(*) AS INTEGER) as count
//     FROM "Person" p
//     JOIN "_MovieActors" ma ON p.id = ma."B"
//     JOIN (
//       SELECT m.id
//       FROM "Review" r
//       JOIN "Movie" m ON r."movieId" = m.id
//       WHERE r."userId" = ${userId}
//     ) as filtered_movies ON ma."A" = filtered_movies.id
//     GROUP BY p.id, p.name
//   )
//   SELECT id, name, count
//   FROM actor_counts
//   ORDER BY count DESC
//   LIMIT 10
//   `;

// const watched = await prisma.$queryRaw`
//   SELECT r.rating,
//   json_build_object(
//     'id', m.id,
//     'title', m.title,
//     'poster', m.poster,
//     'release_date', m.release_date,
//     'actors', (
//       SELECT json_agg(
//         json_build_object(
//           'id', p.id,
//           'name', p.name
//         )
//       )
//       FROM "Person" p
//       JOIN "_MovieActors" ma ON p.id = ma."B"
//       WHERE ma."A" = m.id
//     )
//     ) as movie
//   FROM "Review" r
//   JOIN "Movie" m ON r."movieId" = m.id
//   WHERE r."userId" = ${userId} AND r.rating = 4.5
//   ORDER BY m.release_date ASC
//   LIMIT 10
//   `;
