import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Alert, ScrollView, RefreshControl } from 'react-native';
import {getAllStudents, deleteStudent} from "../../actions/studentActions";
import {getUserInfo} from "../../actions/User-Information-Action";
import NavigationService from "../../navigation/Navigation-Service";
import Layout from "./Layout";
import {View, Text} from "native-base";
import Loading from "../../components/Loading";
import StudentHeader from "./StudentHeader";
class StudentScreen extends Component {

  static navigationOptions = ({navigation}) => {
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
    this.props.getAllStudents(1, this.props.authString);
  }

  static goBack = () => {
    this.props.navigation.goBack();
  };

  onItemSelected = (user) => {
    NavigationService.navigate("Edit", {user: user, onGoBack: () => this.listRefresh()});
  };

  listRefresh = () => {
    this.props.getAllStudents(1, this.props.authString);
  };

  listLoadMore = () => {
    if (this.state.noMoreRecords) return;
    this.setState({page: this.state.page + 1}, () => this._load());
  };

  renderFooter = (FooterComponent) => {
    if (!this.state.isLoading) return null;

    return <FooterComponent/>
  };

  onStudentDelete = (studentId, firstname) => {
    console.log('student to be deleted is ', studentId);
    Alert.alert(
      'Confirm Delete',
      'Are you sure want to delete ' + firstname + '?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Delete of ' + firstname + ' cancelled'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.props.deleteStudent(studentId, this.props.authString)},
      ],
      {cancelable: false},
    );
  };

  renderContent() {
    const { studentList, errorMessage, isRequesting} = this.props;
    const {isLoading, refreshing} = this.state;
    const items = studentList;

    const listProps = {
      items,
      refreshing,
      isLoading,
      handleRefresh: this.listRefresh,
      handleLoadMore: this.listLoadMore,
      onItemSelected: this.onItemSelected,
      renderFooter: this.renderFooter,
      onDelete: this.onStudentDelete
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
  deleteStudent
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentScreen);
