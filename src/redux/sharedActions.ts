import { createAction } from "@reduxjs/toolkit";
import { Stroke } from "./types";

export const endStroke = createAction<{
  stroke: Stroke,
  limit: number,
}>("endStroke");