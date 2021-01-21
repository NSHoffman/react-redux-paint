import { Point, RootState } from "../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { endStroke } from "../sharedActions";

const initialState: RootState["currentStroke"] = {
  points: [],
  color: "#000",
  thickness: 5,
};

const currentStroke = createSlice({
  name: "currentStroke",
  initialState,
  reducers: {
    beginStroke: (state, action: PayloadAction<Point>) => {
      state.points = [action.payload];
    },
    updateStroke: (state, action: PayloadAction<Point>) => {
      state.points.push(action.payload);
    },
    setStrokeColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
    setStrokeThickness: (state, action: PayloadAction<number>) => {
      state.thickness = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(endStroke, state => {
      state.points = [];
    });
  },
});

export const { beginStroke, updateStroke, setStrokeColor, setStrokeThickness } = currentStroke.actions;
export default currentStroke.reducer;