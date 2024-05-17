import { Media } from "../types/media";
import { SearchParams } from "../types/media";
import { ResponseMeta } from "../types/response";

import ApiService from "./ApiService";

interface MediaResponse extends ResponseMeta {
  results: Media[];
}

const MediaService = {
  GetTopRatedMovies: async (): Promise<MediaResponse> => {
    return ApiService.Get("movie/top_rated");
  },
  GetTopRatedShows: async (): Promise<MediaResponse> => {
    return ApiService.Get("tv/top_rated");
  },
  GetSearchedMovies: async (params: SearchParams): Promise<MediaResponse> => {
    return ApiService.Get("search/movie", { ...params });
  },
  GetSearchedShows: async (params: SearchParams): Promise<MediaResponse> => {
    return ApiService.Get("search/tv", { ...params });
  },
};

export default MediaService;
