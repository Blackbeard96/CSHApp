import {combineReducers} from 'redux';
import auth from './auth';
import questionForm from './questionForm';


// export default combineReducers({
//   auth
// });
export default function getRootReducer(navReducer) {
  return combineReducers({
    nav: navReducer,
    auth,
    questionForm
  });
}


export * from './auth';

