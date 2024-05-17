import { useCallback } from "react";
import { useSelector } from "react-redux";

import VideoService from "../api/VideoService";
import { RootState } from "../store";
import { Video } from "../types/video";

export const useVideo = () => {
  const { selectedMedia } = useSelector((state: RootState) => state.mediaShows);

  const getMovieVideo = useCallback(
    async (movieId: number) => {
      const { results } = await VideoService.GetMovieVideo(movieId);

      const videoId = results.find(
        (result: Video) => result.type === "Trailer"
      )?.key;

      return videoId;
    },
    [selectedMedia]
  );

  const getShowVideo = useCallback(
    async (showId: number) => {
      const { results } = await VideoService.GetShowVideo(showId);

      const videoId = results.find(
        (result: Video) => result.type === "Trailer"
      )?.key;

      return videoId;
    },
    [selectedMedia]
  );

  return {
    getMovieVideo,
    getShowVideo,
  };
};
