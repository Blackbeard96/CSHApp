/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Button,
  TextInput,
} from 'react-native';

import {connect} from 'react-redux';
import {autoLogin} from './actions';
import {pushNotifications} from './services';


pushNotifications.configure();
pushNotifications.register();


type Props = {};
class App extends Component<Props> {
  render() {
    const { navigate } = this.props.navigation;
    this.props.autoLogin();
    return (
      <View style={styles.container}>
        <Image
          source={require('./components/imgs/CSHLogo.png')}
          style={styles.bkg}
        />

        <View style={styles.menuBar}>

          <Button className = "menuBox" title = {"ProfileImage"} onPress={() =>
          navigate('Login')
        } style={styles.profile}/>


          <Button className = "menuBox" title = {"GameImage"} onPress={() =>
          navigate('Quiz')
        } style={styles.game}/>

          <Button className = "menuBox" title = {"InfoImage"} onPress={()=>{}} style={styles.info}/>

          <Button className = "menuBox" title = {"AdminPage"} onPress={() =>
          navigate('Admin')
        } style={styles.game}/>

       </View>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#FFFFFF',
    // width: '100%',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },

  bkg:{
    // flex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%',
    opacity: 0.2,
    resizeMode: 'contain'

  },

  menuBar:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'grey',

    borderRadius: 1,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  }

});

export default connect(null, {autoLogin})(App);
