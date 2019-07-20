import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAllStudents} from "../../actions/studentActions";
import {getUserInfo} from "../../actions/User-Information-Action";
import NavigationService from "../../navigation/Navigation-Service";
import Layout from "./Layout";
import {View, Text} from "native-base";
import Loading from "../../components/Loading";
import FeesDetailsHeader from "./FeesDetailsHeader";

class FeesDetailsScreen extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: <FeesDetailsHeader goBack={() =>  NavigationService.goBack()}/>,
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

  static goBack = () => {
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
    const { screenProps: { user }, studentDetailses, errorMessage, isRequesting} = this.props;
    const {isLoading, refreshing} = this.state;
    const items = user.studentDetailses[0].feesCollections;

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
  const { studentList, studentDetailses, errorMessage, isRequesting } = state.userData;
  return {isLoggedIn, authorities, loginError, isRequesting, loginErrorMessage, authString, studentList, errorMessage};
}

const mapDispatchToProps = {
  getUserInfo,
  getAllStudents,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeesDetailsScreen);
