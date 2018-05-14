import React, {Component} from 'react';
import {View, Text, Button, ListView} from 'react-native';
import {connect} from 'react-redux';
import {fetchQuizzes} from '../actions';
import {Header} from './common';


class Admin extends Component {
  componentWillMount() {
    this.props.fetchQuizzes();
    this.createDataSource(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }
  createDataSource({quiz}) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(quiz);
  }
  renderRow (data) {
  return (
    <View style={{height: 20}}>
      <Text>{data.name}</Text>
    </View>
  )
  }

  render () {
    const { navigate } = this.props.navigation;
    console.log('the 0ros', this.props.quiz);
    return (
      <View>
          <Header label ={'Quiz List'}>
          </Header>
          <ListView
            enableEmptySections
            dataSource={this.dataSource}
            renderRow = {this.renderRow}
          />
          <Button
className = "menuBox" title = {'Create Quiz'} onPress={() =>
          navigate('CreateQuiz')
        } />
      </View>
    );
  }
}

const mapState = state => {
return ({quiz: state.qList});
};


export default connect(mapState, {fetchQuizzes})(Admin);
