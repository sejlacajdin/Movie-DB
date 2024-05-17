import { useCallback } from "react";
import { useDispatch } from "react-redux";

import MediaService from "../api/MediaService";
import { mediaActions } from "../store/media-slice";
import { activeTabsActions } from "../store/tabs-slice";

export const useMedia = () => {
  const dispatch = useDispatch();

  const getTopRatedMovies = useCallback(async () => {
    dispatch(activeTabsActions.setLoading(true));

    const response = await MediaService.GetTopRatedMovies();

    dispatch(mediaActions.setMedia(response.results.slice(0, 10)));
    dispatch(activeTabsActions.setLoading(false));
  }, []);

  const getTopRatedShows = useCallback(async () => {
    dispatch(activeTabsActions.setLoading(true));

    const response = await MediaService.GetTopRatedShows();
    dispatch(mediaActions.setMedia(response.results.slice(0, 10)));

    dispatch(activeTabsActions.setLoading(false));
  }, []);

  return {
    getTopRatedMovies,
    getTopRatedShows,
  };
};
