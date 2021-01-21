import { 
  configureStore, 
  getDefaultMiddleware, 
  combineReducers
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
 
// SUB-REDUCERS

import historyIndex from "./historyIndex/slice";
import currentStroke from "./currentStroke/slice";
import strokes from "./strokes/slice";
import modals from "./modals/slice";
import projectsList from "./projectsList/slice";

// SAGAS

import { projectsSaga } from "./projectsList/sagas";
import { strokesSaga } from "./strokes/sagas";

// MIDDLEWARE SETUP

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), logger, sagaMiddleware];

// STORE CONFIGURATION

export const store = configureStore({
  reducer: combineReducers({
    historyIndex, 
    currentStroke, 
    strokes, 
    modals,
    projectsList,
  }),
  middleware,
});

sagaMiddleware.run(function* () {
  yield all([
    strokesSaga(),
    projectsSaga(),
  ]);
});

