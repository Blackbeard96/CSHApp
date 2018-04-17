import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import {Card, CardSection} from './common';

const Question = ({question, choices, bulletEnum}) => {
    const {cardStyle, questionTextStyle} = styles;
    if (!bulletEnum) {bulletEnum = ['A', 'B', 'C', 'D']}
    return (
    <View style={cardStyle} >
    <Card>
      <CardSection style={{minHeight: 100}}>
        <Text style={questionTextStyle}>
          {question}
        </Text>
      </CardSection>
      {
        choices.map((choice, idx) =>
          (<Choice
            key={choice}
            bulletPoint={bulletEnum[idx]}
            text={choice}
            onPress = {() => {console.log(choice);}}
          />)
        )
      }
    </Card>
    </View>
    );
};

const styles = {
  cardStyle: {
    flex: 1,
    marginTop: 50,
    width: '100%'
  },
  questionTextStyle: {
    padding: 5,
    fontSize: 20
  },
  choiceStyle: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center'

  },
  choiceBulletStyle: {
    borderRadius: 30,
    borderWidth: 1,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20

  }
};
export default Question;

const Choice = ({bulletPoint, text, onPress}) => {
  const {choiceBulletStyle, choiceStyle} = styles;
  return (
    <CardSection style={{height: 85}}>
      <TouchableHighlight onPress = {onPress} style={{flex: 1}}>
        <View style={choiceStyle}>
        <View style={choiceBulletStyle}>
          <Text>
            {bulletPoint}
          </Text>
        </View>
        <View>
          <Text>
            {text}
          </Text>
        </View>
      </View>
      </TouchableHighlight>
    </CardSection>
  );
};
