import React from 'react';
import {View, Button} from 'react-native';
import {connect} from 'react-redux';
import QuizPage from './QuizPage';
import {nextQuestion} from '../actions';

const QuizControl = (props) => {
    return (
    <View style={{flexDirection: 'column', flex: 1}}>
      <View style={{flex: 2}}>
      <QuizPage />
      </View>
      <View style={{flex: 1}}>
        props.lastQuestion ?
        <Button
          onPress = {() => {props.nextQuestion();}}
          disabled = {props.lastQuestion}
          title = "Next Question"
        />
      </View>
    </View>
    );
};

const mapState = ({game}) => ({lastQuestion: game.lastQuestion});
const mapDispatch = {nextQuestion};

export default connect(mapState, mapDispatch)(QuizControl);
