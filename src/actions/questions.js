import { saveQuestion } from "../utils/api";
import { addQuestionToUser } from "../actions/users";
import { put, takeLatest } from "redux-saga/effects";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_ANSWER_TO_QUESTION = "ADD_ANSWER_TO_QUESTION";
export const ADD_QUESTION = "ADD_QUESTION";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function addAnswerToQuestion(authUser, qid, answer) {
  return {
    type: ADD_ANSWER_TO_QUESTION,
    authUser,
    qid,
    answer,
  };
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

async function callApi(optionOneText) {
  let data = await saveQuestion(optionOneText);

  return data;
}

function* handleSaveQuestion({ optionOneText, optionTwoText, author }) {
  let question = yield callApi({
    optionOneText: optionOneText,
    optionTwoText: optionTwoText,
    author: author,
  });
  yield put(addQuestion(question));
  yield put(addQuestionToUser(question));
}

export function* actionWatcher() {
  yield takeLatest("handleSaveQuestion", handleSaveQuestion);
}
