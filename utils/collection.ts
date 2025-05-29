import { obtainTMDBAPIKey, responseVerification } from "@/lib/utils";

const API_KEY = obtainTMDBAPIKey();

const options = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    accept: "application/json",
  },
};

export async function getCollection(id: string) {
  try {
    const url = `https://api.themoviedb.org/3/collection/${id}?language=fr-FR`;
    const response = await fetch(url, options);
    await responseVerification(response, url);
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
