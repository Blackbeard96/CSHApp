import React from 'react';
import {Text, View, Modal, Button} from 'react-native';
import {CardSection} from './CardSection';

const PopUp = ({children, visible, acceptText, onAccept, onCancel}) => {
  const {textStyle, containterStyle, cardSectionStyle, choiceStyle} = styles;
  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={() => {}}
      transparent
    >
    <View style={containterStyle}>
      <CardSection style={cardSectionStyle}>
          {children}
      </CardSection>
      <CardSection style={choiceStyle}>
        <Button
          title = {acceptText}
          onPress={onAccept}
          />
        <Button
          title = "Cancel"
          onPress = {onCancel}
          />
      </CardSection>
    </View>
    </Modal>
  );
};

const styles = {
  cardSectionStyle: {
    justifyContent: 'center',
    flexDirection: 'column'
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
  containterStyle: {
    backgroundColor: 'rgba(0,0,0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  },
  choiceStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
};

export {PopUp};
