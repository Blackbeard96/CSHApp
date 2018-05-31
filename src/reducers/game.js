import { TRACK_QUESTION, CHOOSE_ANSWER, GET_USER_COUNT, UPDATE_STANDING, ENTER_ROOM, EXIT_ROOM, GET_QUESTION_COUNT, GET_QUESTION_NUMBER, LAST_QUESTION, GET_RESULTS, TIME_UP} from '../actions/types';

const defaultState = {
  question: '',
  choices: [],
  out: false,
  players: 0,
  questionCount: 0,
  idx: -1,
  lastQuestion: false,
  showResults: false,
  results: {}
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case TRACK_QUESTION:
      return {...state, question: action.payload.question, choices: action.payload.choices, showResults: false};
    case GET_RESULTS:
      return {...state, results: action.payload};
    case TIME_UP:
      return {...state, showResults: action.payload};
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
    case LAST_QUESTION:
      return {...state, lastQuestion: true};
    case CHOOSE_ANSWER:
    case ENTER_ROOM:
    default:
      return state;
  }
}
