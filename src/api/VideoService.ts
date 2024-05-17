import { ResponseMeta } from "../types/response";
import { Video } from "../types/video";

import ApiService from "./ApiService";

interface VideoResponse extends ResponseMeta {
  results: Video[];
}

const VideoService = {
  GetMovieVideo: async (id: number): Promise<VideoResponse> => {
    return ApiService.Get(`movie/${id}/videos`);
  },
  GetShowVideo: async (id: number): Promise<VideoResponse> => {
    return ApiService.Get(`tv/${id}/videos`);
  },
};

export default VideoService;
