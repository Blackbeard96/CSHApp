import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
} from 'react-native';

import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import firebase from 'firebase';
import {firebaseData} from '../secrets';

import {pushNotifications} from './services';
import HomePage from './App'
pushNotifications.configure();
pushNotifications.register();


export default class App extends Component {
  componentWillMount() {
    firebase.initializeApp(firebaseData);
  }
  render () {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
        <Provider store={store}>
          <HomePage />
        </Provider>
    )
  }
}
