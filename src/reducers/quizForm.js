import {SAVE_QUIZ, TITLE_QUIZ, ADD_QUESTION, REMOVE_QUESTION, CLEAR_QUIZ_FORM} from '../actions/types';
const defaultState = {
  qTitle: '',
  questions: []
};


export default function (state = defaultState, action) {
  switch (action.type) {
    case TITLE_QUIZ:
      return {...state, qTitle:action.payload};
    case ADD_QUESTION:
      let questions = state.questions.slice();
      questions.push(action.payload);
      return {...state, questions};
    case REMOVE_QUESTION:
      let newQuestions = state.questions.filter((el,idx )=> idx != action.payload);
      return {...state, questions: newQuestions};
    case CLEAR_QUIZ_FORM:
    case SAVE_QUIZ:
      return defaultState;
    default:
      return state;
  }
}
