import React, {Component} from 'react';
import {View, Text, Button, Input} from 'react-native';
import { connect } from 'react-redux';
import {InputRow, Card, CardSection} from './common';
import {createQuiz} from '../actions';

class QuizForm extends Component {
  constructor () {
    super();
    this.state = {
      name: ''
    };
  }
  render() {
    return(
      <Card>
        <CardSection>
        <InputRow
          label = 'Name'
          onChangeText = {(name) => {this.setState({name});}}
          placeholder = '*'
          value = {this.state.name}
        />
        </CardSection>
        <CardSection>
          <Button
            onPress = {() => {this.props.createQuiz()}}
            title = 'Create'
          />
        </CardSection>
      </Card>
    );
  };
};

export default connect(null, {createQuiz})(QuizForm);
