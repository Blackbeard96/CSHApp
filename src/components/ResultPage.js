import React, {Component} from 'react-component';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

const ResultPage = (props) => {
  return (
    <View>
      The Result
    </View>
  )
};

const mapState = () => { return {}};
const mapDispatch = {};

export default connect(mapState, mapDispatch)(ResultPage);
