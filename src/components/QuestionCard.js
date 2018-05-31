import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import {Card, CardSection} from './common';

const Question = ({question, choices, bulletEnum, onChoose, disabled}) => {
    const {cardStyle, questionTextStyle, questionSectionStyle} = styles;
    if (!bulletEnum) {bulletEnum = ['A', 'B', 'C', 'D']}
    return (
    <View style={cardStyle} >
    <Card>
      <CardSection style={questionSectionStyle}>
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
            disabled = {disabled}
            onPress = {onChoose}
          />)
        )
      }
    </Card>
    </View>
    );
};

const styles = {
  cardStyle: {
    width: '100%'
  },
  questionSectionStyle: {
    minHeight: 40
  },
  questionTextStyle: {
    padding: 2,
    fontSize: 18
  },
  choiceSectionStyle: {
    minHeight: 20
  },
  choiceStyle: {
    // flex: 1,
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

const Choice = ({bulletPoint, text, onPress, disabled}) => {
  const {choiceBulletStyle, choiceStyle, choiceSectionStyle} = styles;
  return (
    <CardSection style={choiceSectionStyle}>
      <TouchableHighlight
        onPress = { () => {onPress(text);}}
        disabled = {disabled}
        style={{flex: 1}}
      >
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
