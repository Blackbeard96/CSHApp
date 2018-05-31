import {EDIT_CHOICE, EDIT_QUESTION, IDENTIFY_ANSWER, ADD_QUESTION, CLEAR_QUESTION_FORM} from '../actions/types';

const defaultState = {
  question: '',
  choices: [],
  answer: ''
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case EDIT_CHOICE:
      let choices = state.choices.slice();
      choices[action.index] = action.text
      return {...state,choices};
    case EDIT_QUESTION:
      return {...state, question: action.payload};
    case IDENTIFY_ANSWER:
      return {...state, answer:action.payload};
    case CLEAR_QUESTION_FORM:
      return defaultState;
    default:
      return state;
  }
}
