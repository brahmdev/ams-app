import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAllStudents} from "../../actions/studentActions";
import {getUserInfo} from "../../actions/User-Information-Action";
import {ScrollView, StyleSheet} from 'react-native';
import {Container, Icon, ScrollableTab, Tab, Tabs, Text, Thumbnail} from "native-base";
import Colors from "../../constants/Colors";
import Loading from "../../components/Loading";
import StudentsTab from "./StudentsTab";
import FeesDetailsTabs from "./FeesDetailsTabs";
import AttendanceTab from "./AttendanceTab";

class HomeScreen extends Component {

  static navigationOptions = ({navigation}) => {
    if (navigation.state.params) {
      let {firstname, lastname, avatar} = navigation.state.params;
      return {
        headerLeft: <Thumbnail small source={{uri: avatar}} style={{marginLeft: 15}}/>,
        headerTitle: <Text style={{fontWeight: "bold", fontSize: 16}}>{`Welcome ${firstname}`} </Text>,
        headerRight: <Icon name="ios-menu" style={{marginRight: 10}}/>
      }
    }
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getAllStudents(1, this.props.authString);
  }

  calculateFeesCollection = (studentList) => {
    let totalFeesCollection = 0;
    let totalFeesDues = 0;
    for (const student of studentList) {
      const studentDetails = student.studentDetailses[0];
      totalFeesDues = totalFeesDues + (studentDetails.totalFees - studentDetails.feesDiscount);
      const feesCollections = studentDetails.feesCollections;
      for (const feesCollection of feesCollections) {
        totalFeesCollection = totalFeesCollection + feesCollection.amount;
      }
    }
    return {
      totalFeesCollection,
      totalFeesDues
    };
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.firstname && nextProps.lastname && nextProps.avatar && !nextProps.navigation.getParam('firstname')) {
      const {firstname, lastname, avatar} = nextProps;
      nextProps.navigation.setParams({firstname, lastname, avatar});
      return true;
    }
    return null;
  }

  renderContent() {
    const {studentList, isRequesting} = this.props;
    const feesInfo = this.calculateFeesCollection(studentList);
    if (isRequesting) {
      return <Loading/>;
    } else {
      return (
        <Container>
          <Tabs tabBarUnderlineStyle={{backgroundColor: Colors.tintColor, height: 2}}
                renderTabBar={() => <ScrollableTab/>}>

            <Tab activeTabStyle={{backgroundColor: Colors.white, border: 0}} tabStyle={{backgroundColor: Colors.white}}
                 activeTextStyle={{color: Colors.pageTitle}} heading="Students">
              <ScrollView>
                <StudentsTab studentList={studentList}/>
              </ScrollView>
            </Tab>

            <Tab activeTabStyle={{backgroundColor: Colors.white, borderWidth: 0}}
                 tabStyle={{backgroundColor: Colors.white}} activeTextStyle={{color: Colors.pageTitle}}
                 heading="Fees Details">
              <FeesDetailsTabs feesInfo={feesInfo}/>
            </Tab>

            <Tab activeTabStyle={{backgroundColor: Colors.white}} tabStyle={{backgroundColor: Colors.white}}
                 activeTextStyle={{color: Colors.pageTitle}} heading="Student Attendance">
              <AttendanceTab/>
            </Tab>

            <Tab activeTabStyle={{backgroundColor: Colors.white, borderWidth: 0}}
                 tabStyle={{backgroundColor: Colors.white}} activeTextStyle={{color: Colors.pageTitle}}
                 heading="Academic Data">
              <Text style={{padding: 10}}>This page is coming soon</Text>
            </Tab>

            <Tab activeTabStyle={{backgroundColor: Colors.white}} tabStyle={{backgroundColor: Colors.white}}
                 activeTextStyle={{color: Colors.pageTitle}} heading="Reports">
              <Text style={{padding: 10}}>This page is coming soon</Text>
            </Tab>

          </Tabs>
        </Container>
      )
    }
  }

  render() {
    return this.renderContent();
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: Colors.noticeText
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(189, 195, 199, 0.6)',
    marginTop: 10,
    marginBottom: 10
  },
  container: {
    padding: 10
  }
});

function mapStateToProps(state) {
  const {isLoggedIn, authorities, loginError, loginErrorMessage, authString, firstname, lastname, avatar} = state.user;
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
    firstname,
    lastname,
    avatar
  };
}

const mapDispatchToProps = {
  getUserInfo,
  getAllStudents,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
