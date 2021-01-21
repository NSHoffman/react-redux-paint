import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Stroke } from "../types";
import { endStroke } from "../sharedActions";

const initialState: Stroke[] = [];

// REDUCER

const strokes = createSlice({
  name: "strokes",
  initialState,
  reducers: {
    saveProject: state => state,
    loadProject: (state, action: PayloadAction<Stroke[]>) => action.payload,
  },
  extraReducers: builder => {
    builder.addCase(endStroke, (state, action) => {
      const { limit, stroke } = action.payload;
      limit === 0 
        ? state.push(stroke)
        : state.splice(-limit, limit, stroke);
    });
  },
});

export const { saveProject, loadProject } = strokes.actions;
export default strokes.reducer;

