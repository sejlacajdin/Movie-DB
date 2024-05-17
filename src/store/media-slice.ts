import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Media } from "../types/media";
import { ResponseMeta } from "../types/response";

type SelectedMedia = Media & {
  videoId: string | null;
};

export type MediaSliceState = {
  media: Media[];
  meta: ResponseMeta;
  selectedMedia: SelectedMedia;
};

const initialState: MediaSliceState = {
  media: [],
  meta: {
    page: 1,
    total_pages: 1,
    total_results: 1,
  },
  selectedMedia: {
    id: 0,
    backdrop_path: "",
    original_title: "",
    overview: "",
    poster_path: "",
    vote_average: 0,
    videoId: "",
  },
};

export const mediaSlice = createSlice({
  name: "media",
  initialState: initialState,
  reducers: {
    setMedia(state, action: PayloadAction<Media[]>) {
      state.media = action.payload;
    },
    setMeta(state, action: PayloadAction<ResponseMeta>) {
      state.meta = action.payload;
    },
    setSelectedMedia(state, action: PayloadAction<SelectedMedia>) {
      state.selectedMedia = action.payload;
    },
  },
});

export const mediaActions = mediaSlice.actions;
