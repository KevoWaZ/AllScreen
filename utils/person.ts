const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!API_KEY) {
  throw new Error("NEXT_PUBLIC_TMDB_API_KEY is not defined");
}

export async function obtainPersonLayout(person_id: string) {
  const url = `https://api.themoviedb.org/3/person/${person_id}?language=fr-FR`;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: "application/json",
      },
    });
    const personDetails = await response.json();

    return personDetails
  } catch (error) {
    console.error(error)
  }
}

export async function obtainPersonDetails(person_id: string) {
  const url = `https://api.themoviedb.org/3/person/${person_id}?language=fr-FR`;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: "application/json",
      },
    });
    const personDetails = await response.json();
    const { cast, crew } = await obtainPersonCredits(person_id);
    return {
      personDetails,
      cast,
      crew,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function obtainPersonCredits(person_id: string) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${person_id}/combined_credits?language=fr-FR`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
          accept: "application/json",
        },
      }
    );
    const personCredits = await response.json();
    return personCredits;
  } catch (error) {
    console.error(error);
    return { cast: [], crew: [] };
  }
}
