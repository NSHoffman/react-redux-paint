import { createAction } from "@reduxjs/toolkit";
import { takeLatest, call, select, all, put } from "redux-saga/effects";
import { selectStrokes } from "../selectors";
import { ReduxPaintAPI } from "../../api/";
import { saveProject, loadProject } from "./slice";

// ASYNC ACTIONS
type saveData = { name: string, thumbnail: string };
type loadData = string;

export const asyncSaveProject = createAction<saveData>("strokes/saga-saveProject");
export const asyncLoadProject = createAction<loadData>("strokes/saga-loadProject");

// SAGAS

const saveProjectSaga = function* () {
  yield takeLatest(
    "strokes/saga-saveProject", 
    function* ({ payload: { name, thumbnail }}: ReturnType<typeof asyncSaveProject>) {
      try {
        const strokes = yield select(selectStrokes);
        const response = yield call(ReduxPaintAPI.save, name, strokes, thumbnail);
  
        console.log(response);
        yield put(saveProject());
      }
      catch (err) {
        console.log(err.message);
      }
    },
  );
};

const loadProjectSaga = function* () {
  yield takeLatest(
    "strokes/saga-loadProject",
    function* ({ payload }: ReturnType<typeof asyncLoadProject>) {
      try {
        const {project: { strokes }} = yield call(ReduxPaintAPI.loadOne, payload);
        yield put(loadProject(strokes));
      }

      catch (e) {
        console.error(e.toString());
        yield put(loadProject([]));
      }
    },
  );
}

export const strokesSaga = function* () {
  yield all([
    saveProjectSaga(),
    loadProjectSaga(),   
  ]);
};