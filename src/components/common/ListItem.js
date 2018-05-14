import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {CardSection} from './CardSection';

const ListItem = ({leftData, mainTitle, subTite, rightData, style}) => (
  <CardSection style = {[styles.container, style]}>
    <View style={styles.leftData}>
      {leftData}
    </View>
    <View style={styles.mainData}>
      <Text style={styles.titleTex}>{mainTitle}</Text>
      <Text style={styles.subTitleText}>{subTite}</Text>
    </View>
    <View style={styles.rightData}>
      {rightData}
    </View>
  </CardSection>
);

export {ListItem};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  leftData: {
    flex: 1,
    padding: 2
  },
  mainData: {
    flex: 4
  },
  rightData: {
    flex: 1
  },
  titleTex: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subTitleText: {

  }
});
