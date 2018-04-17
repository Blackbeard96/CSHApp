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
  TouchableHighlight,
  View,
  Button,
  Image,
  TextInput,
} from 'react-native';

export default class MainPage extends React.Component {


  constructor(props){
    super(props);
    this.state = {

      number: "",
      expM: "",
      expY: "",
      CVC: "",
    }

  }

 

  static navigationOptions = {
    title: "Welcome",
    // header: null, to Take out the header
  };

  link(comp) {
    this.props.navigation.navigate(comp);
    // this.props.navigation.goBack(); To go back
  }

render() {
    const { navigate } = this.props.navigation;
    return (
       <View style = {styles.container}>
          

          <Text>I Hope This Works</Text>

      </View>
    );
  }
}  



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',

  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  }
});
