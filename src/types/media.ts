export type Media = {
  id: number;
  backdrop_path: string;
  original_title: string;
  overview: string;
  poster_path: string;
  title?: string;
  vote_average: number;
  name?: string;
  first_air_date?: string;
  release_date?: string;
  video?: boolean;
};

export type SearchParams = {
  query: string;
  page: number;
};
