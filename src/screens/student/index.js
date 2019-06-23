import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Toast, NavbarTitle} from '../../components';
import {getAllStudents} from "../../actions/studentActions";
import {getUserInfo} from "../../actions/User-Information-Action";
import NavigationService from "../../navigation/Navigation-Service";
import Layout from "./Layout";
import {View, Text, Header, Container, Left, Button, Icon, Body, Title, Right} from "native-base";
import Loading from "../../components/Loading";
import StudentHeader from "./StudentHeader";
class StudentScreen extends Component {

  static navigationOptions = () => {
    return {
      headerTitle: <StudentHeader goBack={() =>  NavigationService.goBack()}/>,
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      criteria: '',
      page: 1,
      items: [],
      isLoading: false,
      refreshing: false,
      noMoreRecords: false
    };
  }

  componentDidMount() {
    console.log('authstring is ', this.props.authString);
    this.props.getAllStudents(1, this.props.authString);
  }

  static goBack = () => {
    console.log('in goback');
    this.props.navigation.goBack();
  };

  onItemSelected = (user) => {
    NavigationService.navigate("Edit", {user: user, onGoBack: () => this.listRefresh()});
  };

  listRefresh = () => this.setState({refreshing: true, page: 1, items: []}, () => this._load());
  listLoadMore = () => {
    if (this.state.noMoreRecords) return;
    this.setState({page: this.state.page + 1}, () => this._load());
  };

  renderFooter = (FooterComponent) => {
    if (!this.state.isLoading) return null;

    return <FooterComponent/>
  };

  renderContent() {
    const { studentList, errorMessage, isRequesting} = this.props;
    const {isLoading, refreshing} = this.state;
    const items = studentList;

    const listProps = {
      items,
      refreshing,
      isLoading,
      //handleRefresh: this.listRefresh,
      //handleLoadMore: this.listLoadMore,
      onItemSelected: this.onItemSelected,
      renderFooter: this.renderFooter
    };
    if (isRequesting) {
      return <Loading/>;
    } else if (errorMessage === '') {
      return <Layout listProps={listProps}/>;
    } else {
      return (
        <View>
          <Text>{errorMessage}</Text>
        </View>
      )
    }
  }

  render() {
    return this.renderContent();
  }
}


function mapStateToProps(state) {
  const {isLoggedIn, authorities, loginError, loginErrorMessage, authString} = state.user;
  const { studentList, errorMessage, isRequesting } = state.student;
  return {isLoggedIn, authorities, loginError, isRequesting, loginErrorMessage, authString, studentList, errorMessage};
}

const mapDispatchToProps = {
  getUserInfo,
  getAllStudents,
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentScreen);
