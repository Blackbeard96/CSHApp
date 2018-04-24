import {LOGIN_ATTEMPT, LOGOUT, SUCCESSFUL_LOGIN} from './types';
import firebase from 'firebase';

const login = user => ({type: SUCCESSFUL_LOGIN, user});
const logout = () => ({type: LOGOUT});
const failedLogin = err => ({type: LOGIN_ATTEMPT, payload: err});

export const userLogin = dispatch => (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(() => (dispatch(login())))
  .catch(err => {
    dispatch(failedLogin(err));
    }
  );
};

export const userLogout = dispatch => () => {
  dispatch(logout());
  firebase.auth().signOut();
}
