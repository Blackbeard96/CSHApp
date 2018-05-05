import firebase from 'firebase';
import React, {Component} from 'react';
import { createStackNavigator, addNavigationHelpers } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import { firebaseData } from '../secrets';
import HomePage from './App';
import Routes from './Routes';
// import reducers from './reducers';
import { pushNotifications } from './services';
import getStore from './store';


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

connect(state => ({nav: state.nav}));
class AppWithNavigationState extends Component {
  render () {
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

const store = getStore(navReducer);

function App() {
  firebase.initializeApp(firebaseData);

  return (
    <Provider store={store}>
      <AppWithNavigationState />
      {/* <HomePage /> */}
    </Provider>
  );
}

export default App;
