import { applyMiddleware, createStore } from "redux";
import rootReducer from "../reducers/index";
import createSagaMiddleware from "@redux-saga/core";
import { all } from "@redux-saga/core/effects";
import { actionWatcher } from "../actions/shared";
import { actionWatcher as actionWatcherQA } from "../actions/users";
import { actionWatcher as actionWatcherCreateQuestion } from "../actions/questions";

const sagaMiddleware = createSagaMiddleware();

export const Store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

function* gen() {
  yield all([
    actionWatcher(),
    actionWatcherQA(),
    actionWatcherCreateQuestion(),
  ]);
}
sagaMiddleware.run(gen);
