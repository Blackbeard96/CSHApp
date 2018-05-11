import {SAVE_QUIZ, TITLE_QUIZ, ADD_QUESTION, REMOVE_QUESTION} from '../actions/types';
const defaultState = {
  qTitle: '',
  questions: []
};


export default function (state = defaultState, action) {
  switch (action.type) {
    case TITLE_QUIZ:
    console.log("performing action", action.type)
      return {...state, qTitle:action.payload};
    case ADD_QUESTION:
    console.log("performing action", action.type)
      let {questions}= state;
      questions.push(action.payload);
      return {...state, questions};
    // case REMOVE_QUESTION:
    //   let {questions}= state;
    //   question.filter((el,idx )=> idx != action.payload);
    //   return {...state, questions};
    case SAVE_QUIZ:
    console.log("performing action", action.type)
    default:
      return state;
  }
}
