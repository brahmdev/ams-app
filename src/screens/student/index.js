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
      showFilter: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.studentList.length > 0 && prevState.searchText === '') {
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

  toggleDrawer = () => {
    console.log('toggle drawer called');
    this.setState({showFilter: !this.state.showFilter});
  };

  onStudentDelete = (studentId, firstname) => {
    console.log('userData to be deleted is ', studentId);
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
    console.log('new data is  ', newData[0].firstname);
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
        <Icon style={{color: Colors.tintColor}} name="md-options" onPress={() => this.toggleDrawer()}/>
      </View>
    );
  };

  renderStudentList = () => {
    console.log('in list ', this.state.searchData[0].firstname);
    const {studentList, errorMessage, isRequesting} = this.props;
    if (isRequesting) {
      return <Loading/>;
    } else if (this.state.searchData.length > 5) {
      console.log('searchData length ', this.state.searchData.length);
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
        <View style={{height: 300, marginRight: 20}}>
          <Text>No Student exist.</Text>
        </View>
      )
    }
  };

  renderContent() {
    const {isRequesting} = this.props;
    console.log('Drawer.defaultProps.styles.mainOverlay ', Drawer.defaultProps.styles.mainOverlay);
    return (
      <Container style={styles.container}>
        <Content>
          <View style={styles.header}>
            {this.renderHeader()}
            {this.renderFilter()}
          </View>
          <Drawer
            styles={{mainOverlay: 0}}
            side="right"
            open={this.state.showFilter}
            ref={(ref) => {
              this.filterDrawer = ref;
            }}
            content={<Filter toggleDrawer={()  => this.toggleDrawer()}/>}
          >
          </Drawer>
          {this.renderStudentList()}
        </Content>
      </Container>
    )
  }

  render() {
    return this.renderContent();
  }
}


function mapStateToProps(state) {
  const {isLoggedIn, authorities, loginError, loginErrorMessage, authString, avatar} = state.user;
  const {studentList, errorMessage, isRequesting} = state.userData;
  return {
    isLoggedIn,
    authorities,
    loginError,
    isRequesting,
    loginErrorMessage,
    authString,
    studentList,
    errorMessage,
    avatar
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

