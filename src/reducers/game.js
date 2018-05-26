import { TRACK_QUESTION, CHOOSE_ANSWER, GET_USER_COUNT, UPDATE_STANDING, ENTER_ROOM, EXIT_ROOM, GET_QUESTION_COUNT, GET_QUESTION_NUMBER} from '../actions/types';

const defaultState = {
  question: '',
  choices: [],
  out: false,
  players: 0,
  questionCount: 0,
  idx: -1
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case TRACK_QUESTION:
      return {question: action.payload.question, choices: action.payload.choices};
    case UPDATE_STANDING:
      return {...state, out: true};
    case GET_USER_COUNT:
      return {...state, players: action.payload};
    case GET_QUESTION_COUNT:
      return {...state, questionCount: action.payload};
    case EXIT_ROOM:
      return defaultState;
    case GET_QUESTION_NUMBER:
      return {...state, idx: action.payload};
    case CHOOSE_ANSWER:
    case ENTER_ROOM:
    default:
      return state;
  }
}
