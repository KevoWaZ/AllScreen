import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.example.com";

  const staticRoutes = [
    "",
    "/_not-found",
    "/certifications",
    "/movie-certifications",
    "/TV-certifications",
    "/mentions-legales",
    "/search",
    "/search/movie",
    "/search/tv",
    "/person",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly", // Utilisez une valeur autorisée ici
    priority: 0.8,
  }));

  const dynamicRoutes = [
    "/collection/[id]",
    "/company/[companyId]",
    "/company/[companyId]/movie",
    "/company/[companyId]/tv",
    "/country/[country]/movie",
    "/country/[country]/tv",
    "/genre/[genreId]",
    "/genre/[genreId]/movie",
    "/genre/[genreId]/tv",
    "/keyword/[keywordId]",
    "/keyword/[keywordId]/movie",
    "/keyword/[keywordId]/tv",
    "/language/[language]/movie",
    "/language/[language]/tv",
    "/movie/[movieId]",
    "/movie/[movieId]/cast",
    "/network/[networkId]",
    "/person/[id]",
    "/person/[id]/images/profiles",
    "/tv/[tvId]",
    "/tv/[tvId]/cast",
    "/tv/[tvId]/seasons",
    "/tv/[tvId]/seasons/[number]",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    priority: 0.5,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
