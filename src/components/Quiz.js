import React, {Component} from 'react';
import Question from './Question';
import {View, Text, Button} from 'react-native';

class Quiz extends Component{
  render(){
    return (
      <View style={{flex: 1}}>
          <Question
            key={quizQuestions[0].question}
            question = {quizQuestions[0].question}
            choices = {quizQuestions[0].choices}
          />
      </View>
    );
  }
}

export default Quiz;


