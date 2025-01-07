export type Movie = {
    id: number;
    title: string;
    release_date: string;
    overview: string;
    poster_path: string | null;
    popularity: number;
    vote_average: number,
    vote_count: number | string,
    runtime: string,
    original_language: string,
    budget: string | number,
    revenue: string | number,
  };
  
  export type TVShow = {
    id: number;
    name: string;
    first_air_date: string;
    overview: string;
    poster_path: string | null;
    popularity: number;
  };

  export type Episode = {
    id: string,
    still_path: string | null,
    name: string,
    episode_number: number,
    air_date: string,
    overview: string | null,
    vote_average: string | number
  }
  
  export type Person = {
    id: number;
    name: string;
    known_for_department: string;
    department: string,
    profile_path: string | null;
    cast_id: string,
    character: string,
    credit_id: string,
    job: string
  };
  
  export type Collection = {
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null
    parts: Movie[];
  };
  
  export type Company = {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
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
  
  