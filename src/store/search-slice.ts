import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type SearchSliceState = {
  active: boolean;
  search: string;
};

const initialState: SearchSliceState = {
  active: false,
  search: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    toggleSearch(state, action: PayloadAction<boolean>) {
      state.active = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
});

export const searchActions = searchSlice.actions;
