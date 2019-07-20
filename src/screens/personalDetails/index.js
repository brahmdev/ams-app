import React, {Component} from 'react';
import {connect} from 'react-redux';
import NavigationService from '../../navigation/Navigation-Service';
import {update} from "../../actions/User-Account-Address-Update-Action";
import { saveOrUpdateUser } from '../../actions/studentActions';
import Layout from "./Layout";
import PersonalDetailHeader from "./PersonalDetailHeader";
import {Toast} from "native-base";

class PersonalDetailScreen extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: <PersonalDetailHeader goBack={() => NavigationService.goBack()} onSave={() =>  navigation.getParam('onSave')()}/>,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      username: '',
      password: '',
      email: '',
      firstname: '',
      lastname: '',
      phone: '',
      gender: '',
      dob: '',
      avatar: '',
      token: '',
      mobile: '',
      address: '',
      city: '',
      zip: '',
      state: '',
      country: '',
      studentDetailses: []
    };
  }

  async componentDidMount() {
    let {user} = this.props.screenProps;
    await this.setState({ ...user });
    this.props.navigation.setParams({
      onSave: this.onSave.bind(this),
    });
  }

  onChange = async (key, value) => {
    await this.setState({[key]: value});
  };

  edit = () => {
    let {id, data} = this.state;
    this.props.update({id, data})
      .then((result) => Toast.showSuccess(result))
      .catch(error => Toast.showError(error.message || error));
  };

  onSave = () => {
    //this.state contains the actual user object including every parent child data
    this.props.saveOrUpdateUser(this.state, this.props.authString);
    Toast.show({
      text: "Personal details saved successfully!",
      duration: 2500,
      position: "bottom",
      type: 'success',
      buttonText: 'Dismiss',
      textStyle: {textAlign: "center"}
    });
    NavigationService.goBack()
  };

  render() {
    return (
      <Layout
        onChange={this.onChange}
        user={this.state}
      />
    );
  }
}

function mapStateToProps(state) {
  const {isLoggedIn, authorities, loginError, loginErrorMessage, authString} = state.user;
  const { studentList, errorMessage, isRequesting } = state.userData;
  return {isLoggedIn, authorities, loginError, isRequesting, loginErrorMessage, authString, studentList, errorMessage};
}

export default connect(mapStateToProps, {update, saveOrUpdateUser})(PersonalDetailScreen);
