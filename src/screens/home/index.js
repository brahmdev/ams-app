import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavbarTitle} from '../../components';
import {getAllStudents} from "../../actions/studentActions";
import {getUserInfo} from "../../actions/User-Information-Action";
import { View, Text } from "native-base";
import HomeHeader from "./HomeHeader";
class HomeScreen extends Component {

  static navigationOptions = () => {
    return {
      headerLeft: null,
      headerTitle: <HomeHeader/>,
      headerRight: null
    }
  }

  constructor(props) {
    super(props);
    this.state = {};
  }


  renderContent() {
      return (
        <View>
          <Text>Dashboard coming soon</Text>
        </View>
      )
  }

  render() {
    return this.renderContent();
  }
}


function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {
  getUserInfo,
  getAllStudents,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
