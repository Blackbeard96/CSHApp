import React from 'react';
import {Button, Text, View, Switch, TextInput} from 'react-native';
import { connect } from 'react-redux';
import {InputRow} from './common';
import {createQuiz, putChoice, putQuestion, putAnswer, submitQuestion} from '../actions';

const NewQuestionForm = (props) => {
  return (
    <View>
        <Text> New Question </Text>
        <TextInput
            style = {{minHeight: 40}}
            label = "Question"
            onChangeText = {text => {props.putQuestion(text)}}
            placeholder = "Question"
            value = {props.question}
          />
      {
        ['A', 'B', 'C', 'D'].map((op, idx ) => {
          return (
            <View
              style = {{flexDirection: 'row'}}
              key = {`${op}`}
              >
            <Switch
              onValueChange = {(val) => {
                val && props.putAnswer(idx);
              }}
              value = {props.answer == idx}
            />
            <InputRow
              label = {`${op}`}
              onChangeText = {(text) => {props.putChoice(idx, text);}}
              placeholder = {`Choice ${op}`}
              value = {props.choices[idx]}
            />
            </View>
          );
        })
      }
      <Button
        onPress={() => props.submitQuestion()}
        title = "Save"
      />
    </View>
  );
};

const mapState = ({questionForm}) => {
  let {question, choices, answer} = questionForm;
  return {question, choices, answer};
};

export default connect(mapState, {createQuiz, putChoice, putQuestion, putAnswer, submitQuestion})(NewQuestionForm);
