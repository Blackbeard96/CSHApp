import React, {Component} from 'react';
import {Button, ListView} from 'react-native';
import { connect } from 'react-redux';
import {InputRow, Card, CardSection} from './common';
import {createQuiz} from '../actions';
import NewQuestionForm from './NewQuestionForm';

const QuizForm = () => {
  return (
    <Card>
      <CardSection>
      <InputRow
        label = "Title"
        onChangeText = {(name) => {}}
        placeholder = "*"
        value = {''}
      />
      </CardSection>
      <CardSection>
        {/* <ListView
          // dataSource={this.state.dataSource}
          // renderRow={({question}) => <Text>Question</Text>}
        /> */}
      </CardSection>
      <CardSection style = {{flexDirection: 'column', minHeight: 280}}>
        <NewQuestionForm />
      </CardSection>
      <CardSection>
        <Button
          onPress = {() => {}}
          title = "Create"
        />
      </CardSection>
    </Card>
  );
};


const mapState = () => {
  return {};
};

export default connect(mapState, {createQuiz})(QuizForm);
