import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {getResults} from '../actions';
import {CardSection} from './common';


const ResultPage = (props) => {
  props.getResults();
  return (
    <View>
      <CardSection>
        <Text>{props.question}</Text>
      </CardSection>
      {
        Object.keys(props.results).map(el => {
          return (
          <CardSection key={el}>
            <Text> {el} : {props.results[el]} </Text>
          </CardSection>
          );
        })
      }
    </View>
  )
};

const mapState = ({game}) => {
  const {results, question} = game;
  return {results, question};
};
const mapDispatch = {getResults};

export default connect(mapState, mapDispatch)(ResultPage);
