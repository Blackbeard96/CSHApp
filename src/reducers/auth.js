import {EDIT_FORM, LOGIN_ATTEMPT, LOGOUT,SUCCESSFUL_LOGIN, LOGIN_FAIL} from '../actions/types';
const defaultState = {
  email: '',
  password: '',
  loading: 'false',
  err: ''
};


export default function (state = defaultState, action) {
  switch (action.type) {
    case EDIT_FORM:
      return {...state, ...action.payload, err: ''}
    case LOGIN_FAIL:
      return {...state, err:action.payload}
    case LOGOUT:
    case SUCCESSFUL_LOGIN:
    default:
      return state;
  }
}
