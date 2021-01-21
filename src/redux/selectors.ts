import { RootState } from "./types";

export const selectStrokes = (state: RootState) => state.strokes;
export const selectCurrentStroke = (state: RootState) => state.currentStroke;
export const selectHistoryIndex = (state: RootState) => state.historyIndex;
export const selectModalName = (state: RootState) => state.modals.modalName;
export const selectProjectsList = (state: RootState) => state.projectsList;