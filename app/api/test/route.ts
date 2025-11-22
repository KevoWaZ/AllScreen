import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const userId = "kM1EeQFhbt2XFFkQxyZJOTwXVOFPpK07";

  try {
    return NextResponse.json(userId);
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
