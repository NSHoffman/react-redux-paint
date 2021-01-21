import { createAction } from "@reduxjs/toolkit";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { ReduxPaintAPI } from "../../api";
import { Project } from "../types";
import { getProjectsListFailed, getProjectsListSuccess } from "./slice";


// ASYNC ACTIONS
export const asyncLoadProjects = createAction("projectsList/saga-loadProjectsList");

// SAGAS

const loadProjectsSaga = function* () {
  yield takeLatest(
    "projectsList/saga-loadProjectsList",
    function* () {
      try {
        const projectsList: Project[] = yield call(ReduxPaintAPI.load);
        yield put(getProjectsListSuccess(projectsList));
      }
      catch (e) {
        yield put(getProjectsListFailed(e.toString()));
      }
    }
  );
}

export const projectsSaga = function* () {
  yield all([
    loadProjectsSaga(),
  ]);
};