import { addAnswerToQuestion } from "../actions/questions";
import { put, takeLatest } from "redux-saga/effects";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_ANSWER_TO_USER = "ADD_ANSWER_TO_USER";
export const ADD_QUESTION_TO_USER = "ADD_QUESTION_TO_USER";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

function addAnswerToUser(authUser, qid, answer) {
  return {
    type: ADD_ANSWER_TO_USER,
    authUser,
    qid,
    answer,
  };
}

function* handleSaveQuestionAnswer({ authUser, qid, answer }) {
  yield put(addAnswerToUser(authUser, qid, answer));
  yield put(addAnswerToQuestion(authUser, qid, answer));
}

export function addQuestionToUser({ id, author }) {
  return {
    type: ADD_QUESTION_TO_USER,
    id,
    author,
  };
}

export function* actionWatcher() {
  yield takeLatest("handleSaveQuestionAnswer", handleSaveQuestionAnswer);
}
