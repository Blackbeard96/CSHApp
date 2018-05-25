import React, {Component} from 'react';
import {View, Text, Button, ListView, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import {fetchQuizzes, deleteQuiz, openRoom, fetchQuiz, clearForms, beginQuiz} from '../actions';
import {Header, ListItem, LogoBackgroundView, PopUp} from './common';


class Admin extends Component {
  constructor() {
    super();
    this.state = {
      visiblePopUp: false
    };
  }
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
    const { navigate } = this.props.navigation;
    return (
      <ListItem
        mainData = {
          <TouchableOpacity onPress={() => {navigate('QuizForm', {id: data.id});}}>
            <View>
              <Text>
                {data.name}
              </Text>
            </View>
          </TouchableOpacity>
        }
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
          <TouchableOpacity
            style={{flex: 1}}
            onPress = {() => {
              this.props.openRoom(data.id);
              this.showPopUp(data.id, data.name, data.questions);
            }}
            >
            <LogoBackgroundView>
              <Text> Start </Text>
            </LogoBackgroundView>
          </TouchableOpacity>
        }
      />
    );
  }
  showPopUp(id, questionTitle, questions) {
    this.props.fetchQuiz(id);
    this.setState({visiblePopUp: true});
  }
  closePopUp(canceled) {
    const { navigate } = this.props.navigation;

    this.setState({visiblePopUp: false});
    this.props.clearForms();
    if (!canceled) {
      this.props.beginQuiz();
      navigate('QuizControl');
    }
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
          navigate('QuizForm')
        } />
        <PopUp
          visible = {this.state.visiblePopUp}
          acceptText = {'Start Quiz'}
          onAccept = {() => this.closePopUp(false)}
          onCancel = {() => this.closePopUp(true)}
          >
            <Text> {this.props.selectedTitle} </Text>
          <ListView
            enableEmptySections
            dataSource = {
              new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
              }).cloneWithRows(this.props.selectedQuestions)
            }
            renderRow = {data => <Text>{data.question}</Text>}
          />
        </PopUp>
      </View>
    );
  }
}

const mapState = state => ({quiz: state.qList,
  selectedTitle: state.quizForm.qTitle,
  selectedQuestions: state.quizForm.questions
});

const mapDispatch = {fetchQuizzes, deleteQuiz, openRoom, fetchQuiz, clearForms, beginQuiz};


export default connect(mapState, mapDispatch)(Admin);
