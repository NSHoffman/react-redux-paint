import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project, RootState } from "../types";

const initialState: RootState["projectsList"] = {
  error: null,
  pending: false,
  projects: [],
};

const projectsList = createSlice({
  name: "projectsList",
  initialState,
  reducers: {
    getProjectsListSuccess: (state, action: PayloadAction<Project[]>) => {
      state.error = null;
      state.pending = false;
      state.projects = action.payload;
    },
    getProjectsListFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.pending = false;
      state.projects = [];
    },
  },
});

export const { getProjectsListSuccess, getProjectsListFailed } = projectsList.actions;
export default projectsList.reducer;