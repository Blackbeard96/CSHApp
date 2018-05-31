import { TRACK_QUESTION, CHOOSE_ANSWER, GET_USER_COUNT, UPDATE_STANDING, ENTER_ROOM, EXIT_ROOM, GET_QUESTION_COUNT, GET_QUESTION_NUMBER, LAST_QUESTION, GET_RESULTS, VIEW_STATS, HIDE_RESULTS} from '../actions/types';

const defaultState = {
  question: '',
  choices: [],
  out: false,
  answer: '',
  players: 0,
  questionCount: 0,
  idx: -1,
  lastQuestion: false,
  showResults: false,
  results: {},
  answered: false
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case TRACK_QUESTION:
      return {...state, question: action.payload.question, choices: action.payload.choices, showResults: false, answered: false};
    case GET_RESULTS:
      return {...state, results: action.payload};
    case VIEW_STATS:
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
    case HIDE_RESULTS:
      return {...state, showResults:false}
    case CHOOSE_ANSWER:
      return {...state, answered:true}
    case ENTER_ROOM:
    default:
      return state;
  }
}
