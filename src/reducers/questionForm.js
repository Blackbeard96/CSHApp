import {EDIT_CHOICE, EDIT_QUESTION, PICK_ANSWER, ADD_QUESTION, CLEAR_QUESTION_FORM} from '../actions/types';

defaultState = {
  question: '',
  choices: [],
  answer: 0
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case EDIT_CHOICE:
      let choices = state.choices;
      choices[action.index] = action.text
      return {...state,choices};
    case EDIT_QUESTION:
      return {...state, question: action.payload};
    case PICK_ANSWER:
      return {...state, answer:action.payload};
    case CLEAR_QUESTION_FORM:
    default:
      return defaultState;
  }
}
