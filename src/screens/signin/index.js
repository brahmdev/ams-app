import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login, clearErrorMessage} from '../../actions/userActions';
import {Loading} from '../../components';
import {Header} from 'react-navigation';
import {Image, ImageBackground, Platform, StatusBar} from "react-native";
import Layout from "./Layout";
import {
  Container,
  Content,
  Text,
  Item,
  Input,
  Button,
  Icon,
  View,
  Left,
  Right,
  Toast,
  Label
} from "native-base";
import styles from "./style";
import {KeyboardView} from '../../components/KeyboardView';


const bg = require("../../../assets/images/bg.png");
const logo = require("../../../assets/images/logo.png");

const required = value => (value ? undefined : "Required");
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minLength8 = minLength(8);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;

class SignInScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: {},
      isRequesting: false
    };
  }

  textInput = '';

  static getDerivedStateFromProps(props, state) {
    if (props.loginErrorMessage !== '') {
      Toast.show({
        text: props.loginErrorMessage,
        duration: 2500,
        position: "bottom",
        type: 'danger',
        buttonText: 'Dismiss',
        textStyle: {textAlign: "center"}
      });
    }
    if (!props.isRequesting) {
      props.clearErrorMessage();
    }
    if (props.isLoggedIn) {
      props.navigation.navigate('App');
    }
    return true;
  }

  handleTextChange = (sender, inputValue) => {
    let newState = Object.assign({}, {...this.state});
    newState[sender] = inputValue;
    this.setState(newState);
  };

  setUsernameRef = ref => this.usernameRef = ref;
  setPasswordRef = ref => this.passwordRef = ref;

  isDataValid = ({username, password}) => {
    let dataValid = true;
    if (username === '' || password === '') {
      dataValid = false;
    }
    return dataValid
  };

  login() {
    let {username, password} = this.state;
    let {navigation, login, isLoggedIn} = this.props;
    if (!this.isDataValid(this.state)) {
      this.setState({isRequesting: false}, () => {
        return;
      });
      Toast.show({
        text: "Enter Valid Username & password!",
        duration: 2500,
        position: "bottom",
        type: 'danger',
        buttonText: 'Dismiss',
        textStyle: {textAlign: "center"}
      });
    } else {
      login(username, password);
    }
  }

  render() {
    const {isRequesting} = this.props;

    return (
      <KeyboardView style={{flex: 1}}>
        <Container>
          <StatusBar barStyle="light-content"/>
          <ImageBackground source={bg} style={styles.background}>
            <Content contentContainerStyle={{flex: 1}}>
              <View style={styles.container}>
                <Image source={logo} style={styles.logo}/>
              </View>
              <View style={styles.container}>
                <View style={styles.form}>
                  <Item floatingLabel style={styles.item}>
                    <Label style={styles.label}>Username</Label>
                    <Input onChangeText={input => this.handleTextChange('username', input)}
                           style={styles.inputDivider}/>
                  </Item>
                  <Item floatingLabel>
                    <Label style={styles.label}>Password</Label>
                    <Input secureTextEntry ref={this.setPasswordRef()}
                           onChangeText={input => this.handleTextChange('password', input)}
                           style={styles.inputDivider}/>
                  </Item>
                  <Button
                    rounded
                    primary
                    block
                    large
                    style={styles.loginBtn}
                    onPress={this.login.bind(this)}
                  >
                    <Text
                      style={
                        Platform.OS === "android"
                          ? {fontSize: 16, textAlign: "center", top: -5}
                          : {fontSize: 16, fontWeight: "900"}
                      }
                    >
                      Login
                    </Text>
                  </Button>

                </View>
              </View>
            </Content>
            {isRequesting ? <Loading/> : null}
          </ImageBackground>
        </Container>
      </KeyboardView>
    );
  }
}

SignInScreen.navigationOptions = () => ({
  header: null,
});


function mapStateToProps(state) {
  const {isLoggedIn, authorities, loginError, isRequesting, loginErrorMessage} = state.user;
  return {isLoggedIn, authorities, loginError, isRequesting, loginErrorMessage};
}

const mapDispatchToProps = {
  login,
  clearErrorMessage
};


export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);
