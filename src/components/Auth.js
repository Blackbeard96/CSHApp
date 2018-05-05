import React, {Component} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Card, CardSection, InputRow, Header} from './common';
import {changeForm, userLogin} from '../actions';

const Auth = (props) => {
    return (
      <Card>
        <Header label = "Comp Sci High Login" />
        <CardSection>
          <InputRow
            label = "Email"
            onChangeText = {(text) => {props.changeForm({email: text});}}
            value = {props.email}
            placeholder = "name@compscihigh.edu"
          />
        </CardSection>
        <CardSection>
          <InputRow
            label = "Password"
            onChangeText = {(text) => {props.changeForm({password: text});}}
            value = {props.pass}
            placeholder = "********"
            secureTextEntry
          />
        </CardSection>
        <CardSection>
          <TouchableOpacity
            onPress={() => {props.userLogin(props.email, props.pass)}}
          >
            <Text> Login </Text>
          </TouchableOpacity>
        </CardSection>
        <CardSection>
        <Text>{props.err}</Text>
        </CardSection>
      </Card>
    );
};

const mapState = ({auth}) => {
  return {email: auth.email, pass: auth.password, err: auth.err};
};
const mapDispatch = {changeForm, userLogin};
export default connect(mapState, mapDispatch)(Auth);
// export default Auth;
