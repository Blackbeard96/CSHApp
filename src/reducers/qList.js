import {GET_QUESTIONS, GET_QUIZZES} from '../actions/types';

defaultState = {};

export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_QUESTIONS:
    case GET_QUIZZES:
      return action.payload;
    default:
      return defaultState;
  }
}
