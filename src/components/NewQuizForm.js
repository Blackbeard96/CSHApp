import React, {Component} from 'react';
import {Button, ListView} from 'react-native';
import { connect } from 'react-redux';
import {InputRow, Card, CardSection} from './common';
import {createQuiz, editName, addQuestion} from '../actions';
import NewQuestionForm from './NewQuestionForm';

const QuizForm = (props) => {
  return (
    <Card>
      <CardSection>
      <InputRow
        label = "Title"
        onChangeText = {(text) => {props.editName(text);}}
        placeholder = "Quiz Title"
        value = {props.qTitle}
      />
      </CardSection>
      <CardSection style = {{flexDirection: 'column', minHeight: 280}}>
        <NewQuestionForm />
      </CardSection>
      <CardSection>
        <Button
          onPress = {() => props.createQuiz(props.qTitle, props.questions)}
          title = "Create"
        />
      </CardSection>
    </Card>
  );
};


const mapState = state => {
  let {qTitle, questions} = state.quizForm;
  return {qTitle,questions};
};

export default connect(mapState, {createQuiz, editName})(QuizForm);
