import React, {Component} from 'react';
import {connect} from 'react-redux';
import NavigationService from '../../navigation/Navigation-Service';
import {update} from "../../actions/User-Account-Address-Update-Action";
import Layout from "./Layout";
import PersonalDetailHeader from "./PersonalDetailHeader";

class PersonalDetailScreen extends Component {

  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      headerTitle: <PersonalDetailHeader goBack={() => NavigationService.goBack()}/>,
    };
  }

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
      city: '',
      zip: '',
      state: '',
      country: '',
      studentDetailses: []
    };
  }

  async componentDidMount() {
    this.props.navigation.setParams({edit: this.edit});
    let {user} = this.props.screenProps;
    await this.setState({ ...user });
  }

  handleTextChange = (sender, inputValue, index) => {
    let newState = Object.assign({}, {...this.state});
    newState.data[index][sender] = inputValue;
    this.setState(newState);
  };

  edit = () => {
    let {id, data} = this.state;
    this.props.update({id, data})
      .then((result) => Toast.showSuccess(result))
      .catch(error => Toast.showError(error.message || error));
  };

  render() {
    console.log('this.state ', this.state);
    return (
      <Layout
        onChangeText={this.handleTextChange}
        user={this.state}
      />
    );
  }
}

export default connect(null, {update})(PersonalDetailScreen);
