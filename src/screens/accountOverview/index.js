import React, {Component} from 'react';
import {connect} from 'react-redux';
import NavigationService from '../../navigation/Navigation-Service';
import {NavbarTitle, HeaderBackButton, Toast, HeaderButton} from '../../components';
import {update} from "../../actions/User-Account-Update-Action";
import {isEmailValid, isPhoneValid, isPasswordStrong, isPasswordMedium} from '../../helpers/General-Helpers';
import Layout from "./Layout";
import AccountHeader from "./AccountHeader";

class AccountOverviewScreen extends Component {

  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      headerTitle: <AccountHeader goBack={() => NavigationService.goBack()}/>,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      username: '',
      password: '',
      email: '',
      name: '',
      phone: '',
      gender: 'Male',
      avatar: '',
      token: '',
      mobile: '',
      studentDetailses: []
    };
  }

  async componentDidMount() {
    //this.props.navigation.setParams({ edit: this._edit });
    let { user } = this.props.screenProps;
    await this.setState({ ...user });
  }

  handleTextChange = (sender, inputValue) => {
    let newState = Object.assign({}, {...this.state});
    newState[sender] = inputValue;
    this.setState(newState);
  }

  _isDataValid = ({username, password, email, name, phone}) => {
    let numberOfErrors = 0;
    this.nameRef.setError((!name) ? 'Name is required' : '', errorState => errorState ? numberOfErrors++ : 0);
    this.usernameRef.setError((!username) ? 'User name is required' : '', errorState => errorState ? numberOfErrors++ : 0);
    this.passwordRef.setError((!password) ? 'Password is required' : '', errorState => errorState ? numberOfErrors++ : 0);
    this.emailRef.setError((!email) ? 'Email is required' : '', errorState => errorState ? numberOfErrors++ : 0);
    if (phone)
      this.phoneRef.setError(!isPhoneValid(phone) ? 'Phone is invalid' : '', errorState => errorState ? numberOfErrors++ : 0);
    if (email)
      this.emailRef.setError(!isEmailValid(email) ? 'Email is invalid' : '', errorState => errorState ? numberOfErrors++ : 0);
    if (password) {
      let passwordIsValid = isPasswordStrong(password) || isPasswordMedium(password);
      this.passwordRef.setError((!passwordIsValid) ? 'Password is invalid' : '', errorState => errorState ? numberOfErrors++ : 0);
    }

    return numberOfErrors == 0;
  };

  _setUsernameRef = ref => this.usernameRef = ref;
  _setPasswordRef = ref => this.passwordRef = ref;
  _setEmailRef = ref => this.emailRef = ref;
  _setNameRef = ref => this.nameRef = ref;
  _setPhoneRef = ref => this.phoneRef = ref;

  _edit = () => {
    let {id, ...user} = this.state;
    let {onGoBack} = this.props.screenProps;
    if (!this._isDataValid(this.state)) return;

    this.props.update({id, user})
      .then((result) => {
        onGoBack();
        this.props.navigation.goBack();
        Toast.showSuccess(result);
      })
      .catch(error => {
        Toast.showError(error.message || error);
      });
  };

  render() {
    const {isRequesting, screenProps: { user }} = this.props;
    return (
      <Layout
        user={this.state}
        deleteAccount={this._deleteAccount}
        isSigning={isRequesting}
        onChangeText={this.handleTextChange}
        setUsernameRef={this._setUsernameRef}
        setNameRef={this._setNameRef}
        setPhoneRef={this._setPhoneRef}
        setPasswordRef={this._setPasswordRef}
        setEmailRef={this._setEmailRef}
      />
    );
  }
}

const mapStateToProps = ({account}) => ({
  isRequesting: account.isRequesting,
  selectedUser: account.selectedUser
})

export default connect(mapStateToProps, {update})(AccountOverviewScreen);
