import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {connect} from 'react-redux';
import QuizPage from './QuizPage';
import {nextQuestion} from '../actions';

class QuizControl extends Component {
  render() {
    return (
    <View style={{flexDirection: 'column'}}>
      <View>
      <QuizPage />
      </View>
      <View style={{backgroundColor: 'red'}}>
        <Button
          onPress = {() => {this.props.nextQuestion()}}
          title = 'Next Question'
        />
      </View>
    </View>
    );
  }

}

const mapState = () => ({});
const mapDispatch = {nextQuestion};

export default connect(mapState, mapDispatch)(QuizControl);
