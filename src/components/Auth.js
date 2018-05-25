import React, {Component} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Card, CardSection, InputRow, Header} from './common';
import {changeForm, userLogin, userLogout, autoLogin} from '../actions';

const Auth = (props) => {
    this.props.autoLogin();
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

        <CardSection>
        <TouchableOpacity
            onPress={() => {props.userLogout()}}
          >
            <Text> Logout </Text>
          </TouchableOpacity>
        </CardSection>
      </Card>
    );
};

const mapState = ({auth}) => {
  return {email: auth.email, pass: auth.password, err: auth.err};
};
const mapDispatch = {changeForm, userLogin, userLogout, autoLogin};
export default connect(mapState, mapDispatch)(Auth);
// export default Auth;
