import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import MediaService from "../api/MediaService";
import { RootState } from "../store";
import { mediaActions } from "../store/media-slice";
import { activeTabsActions } from "../store/tabs-slice";

export const useSearchMedia = () => {
  const dispatch = useDispatch();
  const { media } = useSelector((state: RootState) => state.mediaShows);
  const { search } = useSelector((state: RootState) => state.search);

  const getSearchedMovies = useCallback(
    async (page: number) => {
      dispatch(activeTabsActions.setLoading(true));

      const response = await MediaService.GetSearchedMovies({
        query: search,
        page,
      });
      const results =
        page === 1 ? response.results : [...media, ...response.results];

      const meta = (({ results, ...prop }) => prop)(response);

      dispatch(mediaActions.setMedia(results));
      dispatch(mediaActions.setMeta(meta));
      dispatch(activeTabsActions.setLoading(false));
    },
    [media, search]
  );

  const getSearchedShows = useCallback(
    async (page: number) => {
      dispatch(activeTabsActions.setLoading(true));

      const response = await MediaService.GetSearchedShows({
        query: search,
        page,
      });
      const results =
        page === 1 ? response.results : [...media, ...response.results];
      const meta = (({ results, ...prop }) => prop)(response);

      dispatch(mediaActions.setMedia(results));
      dispatch(mediaActions.setMeta(meta));
      dispatch(activeTabsActions.setLoading(false));
    },
    [media, search]
  );

  return {
    getSearchedMovies,
    getSearchedShows,
  };
};
