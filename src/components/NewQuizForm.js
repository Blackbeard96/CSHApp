import React, {Component} from 'react';
import {Button, ListView, TouchableOpacity, View, Image} from 'react-native';
import { connect } from 'react-redux';
import {InputRow, Card, CardSection, ListItem} from './common';
import {createQuiz, editName, removeQuestion} from '../actions';
import NewQuestionForm from './NewQuestionForm';

class QuizForm extends Component {
  componentWillMount() {
    this.createDataSource(this.props);
  }
  componentWillReceiveProps(nextProps){
    this.createDataSource(nextProps);
  }
  createDataSource({questions}) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(questions);
  }
  renderRow(item,sId, rId) {
    return (
      <ListItem
        style= {{maxHeight: 70}}
        mainTitle = {item.question}
        subTitle = {item.answer}
        leftData = {
          <TouchableOpacity onPress={() => {this.props.removeQuestion(rId)}}>
            <View>
              <Image
                source={require('./imgs/trash.png')}
                style={{width: '95%', height: '95%', resizeMode: 'contain'}}
              />
            </View>
          </TouchableOpacity>
        }
      />
    );
  }
  render () {
    let {editName, createQuiz, qTitle, questions} = this.props;
    return (
      <Card>
        <CardSection>
        <InputRow
          label = "Title"
          onChangeText = {(text) => {editName(text);}}
          placeholder = "Quiz Title"
          value = {qTitle}
        />
        </CardSection>
        <CardSection style={{height: 200}}>
          <ListView
            enableEmptySections
            dataSource = {this.dataSource}
            renderRow = {this.renderRow.bind(this)}
          />
        </CardSection>
        <CardSection style = {{flexDirection: 'column', minHeight: 280}}>
          <NewQuestionForm />
        </CardSection>
        <CardSection>
          <Button
            onPress = {() => createQuiz(qTitle, questions)}
            title = "Create"
          />
        </CardSection>
      </Card>
    );
  }
}


const mapState = state => {
  let {qTitle, questions} = state.quizForm;
  return {qTitle, questions};
};

export default connect(mapState, {createQuiz, editName, removeQuestion})(QuizForm);
