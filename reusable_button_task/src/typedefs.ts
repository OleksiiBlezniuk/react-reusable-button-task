export enum MovieType {
  Movie = "movie",
  Series = "series",
  Episode = "episode",
}

export interface RawMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: MovieType
  Poster: string;
}

export interface Movie { // ???
  title: string;
  year: string;
  imdbID: string;
  type: MovieType
  poster: string;
}

export enum Mode {
  Search = "search",
  Favourites = "favourites",
}

export interface ApiResponse {
  Search?: RawMovie[];
  totalResults?: string;
  Error?: string;
  Response: 'False' | 'True';
}
