import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { endStroke } from "../sharedActions";
import { loadProject } from "../strokes/slice";

const historyIndex = createSlice({
  name: "historyIndex",
  initialState: 0,
  reducers: {
    undo: (state, action: PayloadAction<number>) => {
      return Math.min(state + 1, action.payload);
    },
    redo: state => {
      return Math.max(state - 1, 0);
    },
  },
  extraReducers: builder => {
    builder.addCase(endStroke, () => {
      return 0;
    });

    builder.addCase(loadProject, () => {
      return 0;
    });
  },
});

export const { undo, redo } = historyIndex.actions;
export default historyIndex.reducer;