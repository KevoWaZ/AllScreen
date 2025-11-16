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

export async function GET() {
  const userId = "kM1EeQFhbt2XFFkQxyZJOTwXVOFPpK07";

  try {
    const result = await prisma.$queryRaw`
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

    return NextResponse.json(result);
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
