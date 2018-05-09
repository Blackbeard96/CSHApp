import React, {Component} from 'react';
import {View, Text, Button, Input} from 'react-native';
import { connect } from 'react-redux';
import {InputRow, Card, CardSection} from './common';
class CreateQuiz extends Component {
  constructor () {
    super ();
  };
  render() {
    return(
      <Card>
        <CardSection>
        <InputRow
          label = 'Name'
          onChangeText = {() => {}}
          placeholder = '*'
        />
        </CardSection>
      </Card>
    );
  };
};

export default connect(null, null)(CreateQuiz);
