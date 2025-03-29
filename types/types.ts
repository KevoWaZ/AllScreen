export type Movie = {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  popularity: number;
  vote_average: number;
  vote_count: number | string;
  runtime: string;
  original_language: string;
  homepage: string;
  spoken_languages: {
    iso_639_1: string;
    name: string;
    english_name: string;
  }[];
  production_companies: {
    id: string;
    logo_path: string;
    name: string;
  }[];
  genres: {
    id: string;
    name: string;
  }[];
  budget: number;
  revenue: number;
  tagline?: string;
  status: string;
  adult: boolean;
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  images: {
    aspect_ratio: number;
    height: number;
    iso_639_1: string;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: string;
  }[];
};

export type TVShow = {
  id: number;
  name: string;
  original_name: string;
  first_air_date: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string;
  popularity: number;
  tagline?: string;
  status: string;
  adult: boolean;
  media_type: string;
  seasons: Season[];
  genres: {
    id: string;
    name: string;
  }[];
  networks: {
    id: string;
    name: string;
    logo_path: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  spoken_languages: {
    iso_639_1: string;
    name: string;
    english_name: string;
  }[];
  production_companies: {
    id: string;
    name: string;
    logo_path: string;
  }[];
  homepage: string;
  vote_average: number;
  vote_count: number;
  last_air_date: string;
  original_language: string;
  number_of_seasons: number;
  number_of_episodes: number;
};

export type Season = {
  id: string;
  season_number: number;
  episode_count: number;
  name: string;
  poster_path: string;
  episodes: [];
  air_date: string;
  vote_average: number;
  overview: string;
};

export type Episode = {
  id: string;
  still_path: string | null;
  name: string;
  episode_number: number;
  air_date: string;
  overview: string | null;
  vote_average: number;
};

export type Person = {
  id: number;
  name: string;
  title: string;
  poster_path: string;
  known_for_department: string;
  known_for: { id: number; media_type: string; title: string; name: string }[];
  department: string;
  profile_path: string | null;
  cast_id: string;
  character: string;
  credit_id: string;
  job: string; // Si un membre a un job unique
  jobs: { job: string }[]; // Tableau d'objets avec un job
  roles: {
    character: string;
    episode_count: string;
    credit_id: string;
  }[];
  birthday: string;
  place_of_birth: string;
  deathday: string;
  biography: string;
  original_name: string;
};

export type Collection = {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  parts: Movie[];
};

export type Company = {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
  headquarters: string;
  homepage: string;
};

export type Keyword = {
  id: number;
  name: string;
};

export type SearchResultsType = {
  movies: Movie[];
  tvShows: TVShow[];
  people: Person[];
  collections: Collection[];
  companies: Company[];
  keywords: Keyword[];
};

export type NetworkType = {
  headquarters: string;
  homepage: string;
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type country = {
  iso_3166_1: string;
  english_name: string;
  native_name: string;
};

export type language = {
  iso_3166_1: string;
  iso_639_1: string;
  english_name: string;
  name: string;
};

export type genre = {
  id: number;
  name: string;
};

export type images = {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
};

export type Provider = {
  link: string;
  buy: {
    logo_path: string;
    provider_id: number;
    provider_name: string;
    display_priority: number;
  }[];
  flatrate: {
    logo_path: string;
    provider_id: number;
    provider_name: string;
    display_priority: number;
  }[];
  rent?: {
    logo_path: string;
    provider_id: number;
    provider_name: string;
    display_priority: number;
  }[];
  ads?: {
    logo_path: string;
    provider_id: number;
    provider_name: string;
    display_priority: number;
  }[];
};

export type sort = {
  name: string;
  value: string;
};

export type TrendingMovies = {
  dayTrendingMovies: Movie[];
  weekTrendingMovies: Movie[];
};

export type TrendingTv = {
  dayTrendingTv: TVShow[];
  weekTrendingTv: TVShow[];
};

export type TopTypes = {
  topMovies: Movie[];
  topTv: TVShow[];
};

export type UpcomingTypes = {
  today: Movie[];
  week: Movie[];
  month: Movie[];
  year: Movie[];
  alltime: Movie[];
};

export type Certification = {
  certification: string;
  meaning: string;
  order: number;
};

export type CertificationListProps = {
  certifications: {
    [country: string]: Certification[];
  };
};
