import React, {Component} from 'react';
import Question from './QuestionCard';
import {View, Text, Button} from 'react-native';
import {connect} from 'react-redux';
import {enterRoom, exitRoom, submitAnswer} from '../actions';
import {Header, CardSection} from './common';

class Quiz extends Component{
  componentWillMount() {
    this.props.enterRoom();
  }
  componentWillUnmount() {
    this.props.exitRoom();
  }
  render(){
    return (
      <View>
        <CardSection style={{flexDirection: 'column'}}>
            <Text> Comp Sci High Quiz </Text>
            <Text> {this.props.players} / {this.props.idx} of {this.props.questionCount} </Text>
        </CardSection>
        <Question
          // key={quizQuestions[0].question}
          // question = {quizQuestions[0].question}
          // choices = {quizQuestions[0].choices}
          question = {this.props.question}
          choices = {this.props.choices}
          bulletEnum = {['1', '2', '3', '4']}
          onChoose = {(val) => {
            this.props.submitAnswer(val);}}
        />
      </View>
    );
  }
}

const mapState = state => {
  let {question, choices, players, out, idx, questionCount} = state.game;
  return {question, choices, players, out, idx, questionCount};
};

const mapDispatch = {enterRoom, exitRoom, submitAnswer};

export default connect(mapState, mapDispatch)(Quiz);


const quizQuestions = [
  {
    question: 'In the year 1900 in the U.S. what were the most popular first names given to boy and girl babies?',
    choices: [ 'William and Elizabeth', 'Joseph and Catherine', 'John and Mary', 'George and Anne']
  }, {
    question: 'When did the Liberty Bell get its name?',
    choices: ['when it was made, in 1701', 'when it rang on July 4, 1776', 'in the 19th century, when it became a symbol of the abolition of slavery'
  , 'none of the above']
  }, {
    question: "In the Roy Rogers -Dale Evans Museum, you will find Roy and Dales stuffed horses. Roy's horse was named Trigger, which was Dales horse?",
    choices: [ 'Buttermilk', 'Daisy', 'Scout', 'Tulip']
  }, {
    question: 'The Daniel Boon museum at the home where he died can best be described how?',
    choices: [ 'a log cabin in Kentucky', 'a two-story clapboard house in Tennessee', 'a four-story Georgian-style home in Missouri', 'a three story brick house in Arkansas']
  }, {
    question: 'Which of the following items was owned by the fewest U.S. homes in 1990?',
    choices: [ 'home computer', 'compact disk player', 'cordless phone', 'dishwasher']
  }, {
    question: 'Who holds the record for the most victories in a row on the professional golf tour?',
    choices: [ 'Jack Nicklaus', 'Arnold Palmer', 'Byron Nelson', 'Ben Hogan']
  }, {
    question: 'Who is third behind Hank Aaron and Babe Ruth in major league career home runs?',
    choices: [ 'Reggie Jackson', 'Harmon Killebrew', 'Willie Mays', 'Frank Robinson']
  }, {
    question: 'In 1990, in what percentage of U.S. married couples did the wife earn more money than the husband?',
    choices: [ 8, 18, 38, 58]
  }, {
    question: 'During the 1980s for six consecutive years what breed of dog was the most popular in the U.S.?',
    choices: [ 'cocker spaniel', 'German shepherd', 'Labrador retriever', 'poodle']
  }, {
    question: 'In 1985, five percent of U.S. households had telephone answering machines. By 1990 what percentage of homes had answering machines?',
    choices: [ '10 percent', '15 percent', '31 percent', '51 percent']
  }, {
    question: 'The first black American pictured on a U.S. postage stamp was who?',
    choices: [ 'Frederick Douglass', 'Booker T. Washington', 'Louis Armstrong', 'Joe Louis']
  }, {
    question: 'What did the "D" in "D-Day" stand for?',
    choices: [ 'doom', 'day', 'Dwight (Eisenhower)', 'Dunkirk']
  }, {
    question: 'The Brownie Box Camera introduced by Eastman Kodak in 1900 had a retail price of what?',
    choices: [ '$1', '$5', '$10', '$20']
  }, {
    question: 'Which of these characters turned 40 years old in 1990?',
    choices: [ 'Charlie Brown', 'Bugs Bunny', 'Mickey Mouse', 'Fred Flintstone']
  }, {
    question: 'The Philadelphia mint started putting a "P" mint mark on quarters when?',
    choices: [ '1960', '1980', 'never']
  }, {
    question: "Before becoming George Bush's Secretary of Defense, what was Dick Cheney's position?",
    choices: [ 'congressman from Wyoming', 'governor of New Hampshire', 'secretary of defense under Ronald Reagan']
  }, {
    question: ' When Mt. St. Helens erupted on May 18, 1980, how many people were killed?',
    choices: [ 1, 57, 571]
  }, {
    question: 'In J. Edgar Hoover, what did the J stand for?',
    choices: [ 'James', 'John', 'Joseph']
  }, {
    question: 'Florence Nightingale became known as "the Lady With the Lamp" during which war?',
    choices: [ 'American Civil War', 'Crimean War', 'World War I']
  }, {
    question: 'What year was it that the Census Bureau first reported that a majority of new mothers  were remaining in the new job market?',
    choices: [ 1968, 1978, 1988]
  }
];

  // seedQuestions(){
  //   const db = firebase.firestore();
  // quizQuestions.forEach(item => {
  //   db.collection('Questions').add(item)
  // })
  // }
