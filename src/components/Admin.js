import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';

class Admin extends Component {
  constructor () {
    super();
  }
  render () {
    const { navigate } = this.props.navigation;
    return (
      <View>
          <Text>
            This is the Admin page
          </Text>
          <Button className = "menuBox" title = {"Create Quiz"} onPress={() =>
          navigate('CreateQuiz')
        }/>
      </View>
    );
  }
};


export default Admin;
