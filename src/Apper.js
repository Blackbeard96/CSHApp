import React, { Component } from 'react';
import {Provider, connect} from 'react-redux';
import firebase from 'firebase';
require('firebase/firestore');
import {firebaseData} from '../secrets';

import {pushNotifications} from './services';
import { createStackNavigator, addNavigationHelpers } from 'react-navigation';
import { YellowBox, View} from 'react-native';
import Routes from './Routes';
import getStore from './store';
import {autoLogin} from './actions';
import {Spinner} from './components/common';

pushNotifications.configure();
pushNotifications.register();

const AppNavigator = createStackNavigator(Routes, {
  navigationOptions: {
    // title: ({ state }) => {
    //     if (state.params) {
    //         return `${state.params.title}`;
    //     }
    // }
}
});

const navReducer = (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || state;
};

class TheAppWithNavigationState extends Component {
  render () {
    this.props.autoLogin();
    return (
      <AppNavigator
        // navigation = {addNavigationHelpers({
        //   dispatch: this.props.dispatch,
        //   state: this.props.nav
        // })}
      />
    );
  }
}
let AppWithNavigationState =  connect(state => ({nav: state.nav}), {autoLogin})(TheAppWithNavigationState);


const store = getStore(navReducer);

function App() {
  firebase.initializeApp(firebaseData);
  const db = firebase.firestore();
  const settings = {timestampsInSnapshots: true};
  db.settings(settings);
  YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
  return (
    <Provider store={store}>
      <AppWithNavigationState />
    </Provider>
  );
}

export default App;
