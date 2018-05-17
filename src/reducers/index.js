import {combineReducers} from 'redux';
import auth from './auth';
import questionForm from './questionForm';
import quizForm from './quizForm';
import qList from './qList';
import game from './game';


// export default combineReducers({
//   auth
// });
export default function getRootReducer(navReducer) {
  return combineReducers({
    nav: navReducer,
    auth,
    quizForm,
    qList,
    questionForm,
    game
  });
}


export * from './auth';
export * from './questionForm';
export * from './quizForm';
export * from './qList';
export * from './game';
