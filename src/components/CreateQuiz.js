import React, {Component} from 'react';
import {Button, ListView} from 'react-native';
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
    return (
      <Card>
        <CardSection>
        <InputRow
          label = "Name"
          onChangeText = {(name) => {this.setState({name});}}
          placeholder = "*"
          value = {this.state.name}
        />
        </CardSection>
        <CardSection>
          {/* <ListView
            // dataSource={this.state.dataSource}
            // renderRow={({question}) => <Text>Question</Text>}
          /> */}
        </CardSection>
        <CardSection>
          <Button
            onPress = {() => {this.props.createQuiz(this.state.name, [
              {question: 'Quien?',
              choices: [ 'Tu', 'Yo', 'Ellos', 'Nosotros' ]},
              {
                question: 'Whose calling me from an unknown number?',
                choices: ['nah answer no unknown number', 'nah pick it up if its a private call', 'gangster nah answer no private call', 'all of the above']

              },
              {id: '3o0kxQcD5dlVbnJrAvcp'}
            ]);}}
            title = "Create"
          />
        </CardSection>
      </Card>
    );
  }
};

export default connect(null, {createQuiz})(QuizForm);
