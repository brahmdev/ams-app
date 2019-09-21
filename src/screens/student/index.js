import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Alert} from 'react-native';
import {deleteStudent, getAllStudents, updateStudentDataInStore} from "../../actions/studentActions";
import {getUserInfo} from "../../actions/User-Information-Action";
import NavigationService from "../../navigation/Navigation-Service";
import Layout from "./Layout";
import {Body, Button, Card, CardItem, Drawer, Icon, Input, Left, Right, Text, View} from "native-base";
import Loading from "../../components/Loading";
import Filter from './Filter';
import Colors from "../../constants/Colors";
import {MaterialIcons} from '@expo/vector-icons';

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
    if (nextProps.navigation.state.params && nextProps.navigation.state.params.standardCode !== '' && nextProps.studentList.length > 0) {
      const newData = nextProps.studentList.filter(item => {
        const itemData = `${item.studentDetailses[0].batch.standard.code.toUpperCase()}`;

        const textData = nextProps.navigation.state.params.standardCode.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });
      nextProps.navigation.setParams({
        standardCode: ''
      });
      return ({searchData: newData, filteredStandardCode: nextProps.navigation.state.params.standardCode});
    } else if (nextProps.studentList.length > 0 && prevState.searchText === '' && prevState.filteredStandardCode === '') {
      return ({searchData: nextProps.studentList});
    }
    return true;
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
          <Left style={{flex: 1, marginRight: 5}}>
            <Button  onPress={() => NavigationService.goBack()} transparent><MaterialIcons name="arrow-back" style={ { fontSize: 24 }}/></Button>
          </Left>
          <Body style={{flex: 5}}>
          <Input placeholder="Search student..."
                 value={this.state.searchText}
                 returnKeyType={'search'}
                 onChangeText={text => this.searchFilterFunction(text)}/>
          </Body>
          <Right style={{flex: 1, marginRight: 5}}>
            <Button  onPress={() => this.setState({searchText: ''})} transparent><MaterialIcons name="close" style={ { fontSize: 24 }}/></Button>
          </Right>
        </CardItem>
      </Card>
    )
  };

  clearFilter = () => {
    this.setState({
      selectedStandard: '',
      filteredStandardCode: '',
      searchData: '',
      searchText: ''
    })
  };

  renderFilter = () => {
    return (
      <View style={styles.filterBox}>
        <Text style={styles.searchCount}>{this.state.searchData.length} Students Found</Text>
        <Button light small onPress={() => this.clearFilter()}>
          <Text>Clear Filter</Text>
        </Button>
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
      return (
        <Layout listProps={listProps} isRequesting={isRequesting} errorMessage={errorMessage}/>
      );
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
    this.setState({filteredStandardCode: standardCode});
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
        content={<Filter closeDrawer={() => this.closeDrawer()} standardList={this.props.standardList}
                         selectedStandard={this.state.filteredStandardCode}
                         onPressItem={this.onStandardSelectedInFilter}/>}>
          <View style={{ flex: 1}}>
            <View style={styles.header}>
              {this.renderHeader()}
              {this.renderFilter()}
            </View>
            {this.renderStudentList()}
          </View>
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
    borderRadius: 10,
    height: 50
  },
  cardItem: {
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

