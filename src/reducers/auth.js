import {EDIT_FORM, LOGIN_ATTEMPT, LOGOUT,SUCCESSFUL_LOGIN, LOGIN_FAIL} from '../actions/types';
const defaultState = {
  email: '',
  password: '',
  loading: false,
  err: '',
  loggedIn: false
};


export default function (state = defaultState, action) {
  switch (action.type) {
    case EDIT_FORM:
      return {...state, ...action.payload, err: ''}
    case LOGIN_FAIL:
      return {...state, err:action.payload, loading: false}
    case LOGOUT:
      return {...defaultState, loggedIn: false};
    case SUCCESSFUL_LOGIN:
      return {...defaultState, loggedIn: true};
    case LOGIN_ATTEMPT:
      return {...state, loading: true};
    default:
      return defaultState;
  }
}
