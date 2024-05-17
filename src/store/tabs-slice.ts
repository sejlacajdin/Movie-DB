import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Tabs } from "../types/tabs";

export type TabsSliceState = {
  activeTab: Tabs;
  loading: boolean;
};

const initialState: TabsSliceState = {
  activeTab: "tv-shows",
  loading: false,
};

export const activeTabsSlice = createSlice({
  name: "tabs",
  initialState: initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<Tabs>) {
      state.activeTab = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const activeTabsActions = activeTabsSlice.actions;
