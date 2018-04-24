import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Card, CardSection, InputRow, Header} from './common';
import {userLogin} from '../actions';

const LoginForm = () => {
  return (
    <Card>
      <Header label = 'Comp Sci High Login' />
      <CardSection>
        <InputRow
          label = 'Email'
          onChangeText = {() => {}}
          // value = 'email'
          placeholder = 'name@compscihigh.edu'
        />
      </CardSection>
      <CardSection>
        <InputRow
          label = 'Password'
          onChangeText = {() => {}}
          // value = 'Password'
          placeholder = '********'
          secureTextEntry
        />
      </CardSection>
      <CardSection>
        <TouchableOpacity
          onPress={() => {}}
        >
          <Text> Login </Text>
        </TouchableOpacity>
      </CardSection>
    </Card>
  );
};

const mapState = state => {
  return (null);
};
const mapDispatch = {};
export default LoginForm;
// connect(mapState, mapDispatch)(LoginForm);
