import {LOGIN_ATTEMPT, LOGOUT, SUCCESSFUL_LOGIN, EDIT_FORM, LOGIN_FAIL} from './types';
import firebase from 'firebase';

const login = () => ({type: SUCCESSFUL_LOGIN});
const logout = () => ({type: LOGOUT});
const failedLogin = err => ({type: LOGIN_FAIL, payload: err});
const inputText = change => ({type: EDIT_FORM, payload: change })

export const userLogin = (email, password) => dispatch => {
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(() => {
    dispatch(login());
  })
  .catch(err => {
    console.log(err)
    dispatch(failedLogin(err.message));
    }
  );
};

export const userLogout = () => dispatch => {
  dispatch(logout());
  firebase.auth().signOut();
};


//Login Form
export const changeForm = change => dispatch => {
  dispatch(inputText(change));
};
