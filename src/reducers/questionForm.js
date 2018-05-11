import {EDIT_CHOICE, EDIT_QUESTION, PICK_ANSWER, ADD_QUESTION} from '../actions/types';

defaultState = {
  question: '',
  choices: [],
  answer: 0
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case EDIT_CHOICE:
    console.log("performing action", action.type)
      let choices = state.choices;
      choices[action.index] = action.text
      return {...state,choices};
    case EDIT_QUESTION:
    console.log("performing action", action.type)
      return {...state, question: action.payload};
    case PICK_ANSWER:
    console.log("performing action", action.type)
      return {...state, answer:action.payload};
    default:
      return state;
  }
}
