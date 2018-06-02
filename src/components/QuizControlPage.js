import React from 'react';
import {View, Button} from 'react-native';
import {connect} from 'react-redux';
import QuizPage from './QuizPage';
import {nextQuestion, getWinners} from '../actions';

const QuizControl = (props) => {
    return (
    <View style={{flexDirection: 'column', flex: 1}}>
      <View style={{flex: 2}}>
      <QuizPage />
      </View>
      <View style={{flex: 1}}>
        <Button
          onPress = {props.lastQuestion ? () => {props.getWinners();} : () => {props.nextQuestion();}}
          // disabled = {props.lastQuestion}
          title = {props.lastQuestion ? 'See Winners' : 'Next Question'}
        />
      </View>
    </View>
    );
};

const mapState = ({game}) => ({lastQuestion: game.lastQuestion});
const mapDispatch = {nextQuestion, getWinners};

export default connect(mapState, mapDispatch)(QuizControl);
