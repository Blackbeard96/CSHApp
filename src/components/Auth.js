import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {Card, CardSection, InputRow, Header} from './common';
import {changeForm, userLogin, userLogout} from '../actions';

const Auth = (props) => {
    return (
      <View>
        <Header label = "Comp Sci High Login" />
       {
         props.loggedIn ?
         <Card>
          <CardSection>
          <TouchableOpacity
              onPress={() => {props.userLogout()}}
            >
              <Text> Logout </Text>
            </TouchableOpacity>
          </CardSection>
        </Card>
       :

        <Card>
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
      }
      </View>
    );
};

const mapState = ({auth}) => {
  return {email: auth.email, pass: auth.password, err: auth.err, loggedIn: auth.loggedIn};
};
const mapDispatch = {changeForm, userLogin, userLogout};
export default connect(mapState, mapDispatch)(Auth);
// export default Auth;
