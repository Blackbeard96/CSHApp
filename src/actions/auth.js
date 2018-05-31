import {LOGIN_ATTEMPT, LOGOUT, SUCCESSFUL_LOGIN, EDIT_FORM, LOGIN_FAIL} from './types';
import firebase from 'firebase';
import {AsyncStorage} from 'react-native';

const login = admin => ({type: SUCCESSFUL_LOGIN, payload: admin});
const logout = () => ({type: LOGOUT});
const failedLogin = err => ({type: LOGIN_FAIL, payload: err});
const inputText = change => ({type: EDIT_FORM, payload: change });


const completeLogin = (dispatch, {email, password}) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(userReturn =>
    userReturn.uid
  )
  .then(uId =>
    firebase.firestore().collection('Users').doc(`${uId}`)
    .get()
  )
  .then(info => {
    const isAdmin = info.data().isAdmin || false;
    return dispatch(login(isAdmin));
  })
  .catch(err => {
    console.log("Error completing login", err);
    dispatch(failedLogin(err.message));
    }
  );
};

export const userLogin = (email, password) => dispatch => {
  AsyncStorage.setItem('CSHAPP-Login', JSON.stringify({email, password}), () => {});
  completeLogin(dispatch, {email, password});
};

export const autoLogin = () => dispatch => {
  AsyncStorage.getItem('CSHAPP-Login', (err, result) => {
    if (err) {console.log(err);}
    else if (result) {
      const data = JSON.parse(result);
      completeLogin(dispatch, data);
    }
  });
};

export const isLoggedIn = () => firebase.auth().currentUser.uid || false;


export const userLogout = () => dispatch => {
  dispatch(logout());
  firebase.auth().signOut();
  AsyncStorage.removeItem('CSHAPP-Login');
};


//Login Form
export const changeForm = change => dispatch => {
  dispatch(inputText(change));
};
