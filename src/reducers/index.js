import {combineReducers} from 'redux';
import auth from './auth';
import questionForm from './questionForm';
import quizForm from './quizForm';


// export default combineReducers({
//   auth
// });
export default function getRootReducer(navReducer) {
  return combineReducers({
    nav: navReducer,
    auth,
    questionForm,
    quizForm
  });
}


export * from './auth';

