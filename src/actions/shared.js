import { getInitialData } from "../utils/api";
import { receiveQuestions } from "../actions/questions";
import { receiveUsers } from "../actions/users";
import { put, takeLatest } from "redux-saga/effects";

async function data() {
  let value = await getInitialData();
  return value;
}
function* handleLoad() {
  let newValue = yield data();
  yield put(receiveQuestions(newValue.questions));
  yield put(receiveUsers(newValue.users));
}

export function* actionWatcher() {
  yield takeLatest("HANDLEINITIALLOAD", handleLoad);
}
