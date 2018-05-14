import React, {Component} from 'react';
import {View, Text, Button, ListView, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import {fetchQuizzes, deleteQuiz} from '../actions';
import {Header, ListItem, LogoBackgroundView} from './common';


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
      <ListItem
        mainTitle = {data.name}
        leftData = {
          <TouchableOpacity onPress={() => this.props.deleteQuiz(data.id)}>
            <View>
              <Image
                source={require('./imgs/trash.png')}
                style={{width: '95%', height: '95%', resizeMode: 'contain'}}
              />
            </View>
          </TouchableOpacity>
        }
        rightData = {
          <TouchableOpacity style={{flex: 1}} onPress = {() => {console.log('Starting Quiz');}} >
            <LogoBackgroundView>
              <Text> Start </Text>
            </LogoBackgroundView>
          </TouchableOpacity>
        }
      />
    );
  }

  render () {
    const { navigate } = this.props.navigation;
    return (
      <View>
          <Header label ={'Quiz List'} />
          <ListView
            enableEmptySections
            dataSource={this.dataSource}
            renderRow = {this.renderRow.bind(this)}
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


export default connect(mapState, {fetchQuizzes, deleteQuiz})(Admin);
