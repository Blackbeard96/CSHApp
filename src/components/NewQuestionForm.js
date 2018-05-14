import React from 'react';
import {Button, Text, View, Switch, TextInput} from 'react-native';
import { connect } from 'react-redux';
import {InputRow} from './common';
import {putChoice, putQuestion, putAnswer, addQuestion} from '../actions';

const NewQuestionForm = (props) => {
  console.log(props)
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
      {/* {
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
      } */}
      <Button
        onPress={() => {
          const {choices, question, answer} = props;
          props.addQuestion({question, choices: choices.slice(), answer: choices[answer]});
      }}
        title = "Save"
      />
    </View>
  );
};

const mapState = (state) => {
  let {question, choices, answer} = state.questionForm;
  console.log("qf", state)
  return {question, choices, answer};
};

export default connect(mapState, {putChoice, putQuestion, putAnswer, addQuestion})(NewQuestionForm);
