import {combineReducers} from 'redux';
import auth from './auth';


// export default combineReducers({
//   auth
// });
export default function getRootReducer(navReducer) {
  return combineReducers({
    nav: navReducer,
    auth
  });
}


export * from './auth';

