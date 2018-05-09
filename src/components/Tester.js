import React, {Component} from 'react';
import {View, Text, TouchableOpacity}from 'react-native';
import {InputRow} from './common';
// import database from '../services/firestoreDb';

class Tester extends Component {
  constructor() {
    super();
    this.state = {
      text: ''
    }
  }
  dosomething () {
    const database = this.props.db;
    const ref = database.collection('quiz');
    ref.add({
      name: 'this name',
      last: 'this Last'
    })
    .then( some => {
      console.log('success', some);
    })
    .catch(err => {
      console.log(err)
    })
  }
  render() {
    return(
      <View style = {{flex: 1}}>
        <InputRow
          label = 'None'
          onChangeText = {inp => {
            this.setState({text: inp})
          }}
          value = {this.state.text}
          placeholder = 'None'
        />
        <TouchableOpacity
            onPress={() => {this.dosomething()}
        }>
            <Text> Enter </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Tester;
