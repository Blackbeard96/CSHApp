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
            onPress = {() => {this.props.createQuiz(this.state.name, [
              // {question: 'You stole the cookie from the cookie jar?',
              // choices: ['who me', 'not me', "couldn't be"]},
              {id: 'Kd6sH18mTlpt8c6zBd56'},
              {id: 'dzL5Hi7EAYqRjqSDgSS7'}
            //   {question: 'Que',
            // choices: ['Tu', 'Yo', 'Ellos', 'Nosotros']}
            ])}}
            title = 'Create'
          />
        </CardSection>
      </Card>
    );
  };
};

export default connect(null, {createQuiz})(QuizForm);
