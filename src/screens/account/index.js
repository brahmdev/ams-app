import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Header, Toast} from '../../components';
import {signout} from "../../actions/User-Account-Signout-Action";
import Layout from "./Layout";
import {clearErrorMessage, logout} from "../../actions/userActions";

class AccountScreen extends Component {

  static navigationOptions = ({navigation}) => {
    return Header({
      navigation,
      title: `Sign out account`
    });
  };

  signOutAccount = () => {
    this.props.logout();
  };

  render() {
    let {isLoggedIn, navigation, userName} = this.props;

    if (!isLoggedIn) {
      navigation.navigate('Auth');
    }
    return (
      <Layout userName={userName} signOutAccount={this.signOutAccount}/>
    );
  }
};

function mapStateToProps(state) {
  const {isLoggedIn, authorities, loginError, isRequesting, userName, loginErrorMessage} = state.user;
  return {isLoggedIn, authorities, loginError, isRequesting, userName, loginErrorMessage};
}

const mapDispatchToProps = {
  logout,
  clearErrorMessage
};


export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);
