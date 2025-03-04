import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string | Date): string {
  if (!dateString) return "Date inconnue";
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return new Date(dateString).toLocaleDateString("fr-FR", options);
}

export async function responseVerification(response: Response, url: string) {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status} for URL: ${url}`);
  }
}

export function obtainTMDBAPIKey() {
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  if (!API_KEY) {
    throw new Error("NEXT_PUBLIC_TMDB_API_KEY is not defined");
  }
  return API_KEY;
}
