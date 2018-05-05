import React, { Component } from 'react';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import firebase from 'firebase';
require('firebase/firestore');
import {firebaseData, firebasePrivateKey} from '../secrets';

import {pushNotifications} from './services';
import HomePage from './App';
import Tester from './components/Tester'
pushNotifications.configure();
pushNotifications.register();


const Apper = () => {
  firebase.initializeApp(firebaseData);
  const db = firebase.firestore();
  const settings = {timestampsInSnapshots: true};
  db.settings(settings);
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
  return (
    <Provider store={store} db ={db}>
      {/* <HomePage /> */}
      <Tester />
    </Provider>
  );
};

export default Apper;
