import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const ListItem = ({leftData, mainTitle, subTite, rightData}) => (
  <View style = {styles.container}>
    <View style={styles.leftData}>
      {leftData}
    </View>
    <View style={styles.mainData}>
      <Text style={styles.titleTex}>{mainTitle}</Text>
      <Text style={styles.subTitleText}>{subTite}</Text>
    </View>
    <View style={styles.mainData}>
      {rightData}
    </View>
  </View>
);

export {ListItem};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  leftData: {
    flex: 1
  },
  mainData:{
    flex: 2
  },
  rightData:{
    flex: 1
  },
  titleTex: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subTitleText: {

  }
});
