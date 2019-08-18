import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Alert, ScrollView, RefreshControl} from 'react-native';
import {getAllStudents, deleteStudent, updateStudentDataInStore} from "../../actions/studentActions";
import {getUserInfo} from "../../actions/User-Information-Action";
import NavigationService from "../../navigation/Navigation-Service";
import Layout from "./Layout";
import {
  View,
  Text,
  Thumbnail,
  Icon,
  Container,
  Content,
  Card,
  CardItem,
  Left,
  Body,
  Right,
  Input,
  Picker,
  Drawer
} from "native-base";
import Loading from "../../components/Loading";
import Filter from './Filter';
import Colors from "../../constants/Colors";

//Drawer.defaultProps.styles.mainOverlay.elevation = 0;

class StudentScreen extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      header: null
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      criteria: '',
      page: 1,
      isLoading: false,
      refreshing: false,
      noMoreRecords: false,
      searchMode: false,
      searchData: [],
      searchText: '',
      selected: "-1",
      showFilter: false,
      selectedStandard: '',
      filteredStandardCode: ''
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.studentList.length > 0 && prevState.searchText === '' && prevState.filteredStandardCode === '') {
      return ({searchData: nextProps.studentList});
    }
    return null;
  };

  static goBack = () => {
    this.props.navigation.goBack();
  };

  onItemSelected = (user) => {
    this.props.updateStudentDataInStore(user);
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

  searchFilterFunction = async (text) => {
    this.setState({
      searchText: text
    });
    const newData = this.props.studentList.filter(item => {
      const itemData = `${item.firstname.toUpperCase()} ${item.lastname.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({searchData: newData});
  };

  renderHeader = () => {
    return (
      <Card style={styles.searchBox}>
        <CardItem style={styles.cardItem}>
          <Left style={{flex: 0, marginRight: 5}}>
            <Icon name="ios-arrow-back" onPress={() => NavigationService.goBack()}/>
          </Left>
          <Body style={{flex: 4}}>
          <Input placeholder="Search student"
                 value={this.state.searchText}
                 returnKeyType={'search'}
                 onChangeText={text => this.searchFilterFunction(text)}/>
          </Body>
          <Right style={{flex: 0, marginLeft: 5}}>
            <Icon name="ios-microphone" style={{color: 'black'}} onPress={() => alert('feature coming soon')}/>
          </Right>
        </CardItem>
      </Card>
    )
  };

  renderFilter = () => {
    return (
      <View style={styles.filterBox}>
        <Text style={styles.searchCount}>{this.state.searchData.length} Students Found</Text>
        <Icon style={{color: Colors.tintColor}} name="md-options" onPress={() => this.openDrawer()}/>
      </View>
    );
  };

  renderStudentList = () => {
    const {studentList, errorMessage, isRequesting} = this.props;
    if (isRequesting) {
      return <Loading/>;
    } else if (this.state.searchData.length > 0) {
      const {isLoading, refreshing, searchData} = this.state;
      const items = searchData;
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
      return <Layout listProps={listProps} isRequesting={isRequesting} errorMessage={errorMessage}/>
    } else {
      return (
        <View style={{height: 300, marginLeft: 20}}>
          <Text>No Student exist.</Text>
        </View>
      )
    }
  };

  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };

  onStandardSelectedInFilter = (standardCode) => {
    this.setState({ filteredStandardCode: standardCode });
    const newData = this.props.studentList.filter(item => {
      const itemData = `${item.studentDetailses[0].batch.standard.code.toUpperCase()}`;

      const textData = standardCode.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({searchData: newData});

  };

  renderContent() {
    const {isRequesting} = this.props;
    return (
      <Drawer
        side="right"
        ref={(ref) => {
          this.drawer = ref;
        }}
        content={<Filter closeDrawer={() => this.closeDrawer()} standardList={this.props.standardList} selectedStandard={this.state.filteredStandardCode} onPressItem={this.onStandardSelectedInFilter}/>}>
        <Container style={styles.container}>
          <Content>
            <View style={styles.header}>
              {this.renderHeader()}
              {this.renderFilter()}
            </View>
            {this.renderStudentList()}
          </Content>
        </Container>
      </Drawer>
    )
  }

  render() {
    return this.renderContent();
  }
}


function mapStateToProps(state) {
  const {isLoggedIn, authorities, loginError, loginErrorMessage, authString, avatar} = state.user;
  const {studentList, errorMessage, isRequesting} = state.userData;
  const {standardList} = state.dashboard;
  return {
    isLoggedIn,
    authorities,
    loginError,
    isRequesting,
    loginErrorMessage,
    authString,
    studentList,
    errorMessage,
    avatar,
    standardList
  };
}

const mapDispatchToProps = {
  getUserInfo,
  getAllStudents,
  deleteStudent,
  updateStudentDataInStore
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentScreen);


const styles = {
  header: {
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
  },
  searchBox: {
    borderRadius: 10
  },
  cardItem: {
    flex: 4,
    height: 50,
    borderRadius: 10
  },
  filterBox: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchCount: {
    fontWeight: '500',
    fontSize: 18
  }
};

