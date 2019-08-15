import React, {Component} from 'react';
import {connect} from 'react-redux';
import { View } from 'native-base';
import { Dimensions } from 'react-native';
import {PieChart} from 'react-native-chart-kit'
import {getDashBoardData} from "../../actions/dashBoardActions";
import {STANDARD_COLOR} from "../../utils";
import Colors from "../../constants/Colors";

const screenWidth = Dimensions.get('window').width;
const pieData = [
  {
    name: 'Seoul',
    studentCount: 0,
    color: 'rgba(131, 167, 234, 1)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Toronto',
    studentCount: 0,
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    color: 'red',
    name: 'Beijing',
    studentCount: 1,
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'New York',
    studentCount: 0,
    color: '#ffffff',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Moscow',
    studentCount: 0,
    color: 'rgb(0, 0, 255)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
];


class StudentsTab extends Component {

  constructor(props) {
    super();
    this.state = {
      pieData: []
    }
  }

  componentDidMount() {
    this.props.getDashBoardData(1, this.props.authString);
  }

  renderChart = () => {
    console.log('piedata ', this.props.pieData);
    if (this.props.pieData.length === 0) {
      return null;
    } else {
      return (
        <View style={{ paddingRight: 20 }}>
          <PieChart
            data={this.props.pieData}
            width={screenWidth} // from react-native
            height={220}
            yAxisLabel={'$'}
            chartConfig={{
              backgroundColor: '#1cc910',
              backgroundGradientFrom: '#eff3ff',
              backgroundGradientTo: '#efefef',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            accessor="studentCount"
            backgroundColor="transparent"
            paddingLeft="15"
            paddingRight="20"
            absolute
          />
        </View>
      )
    }
  };

  render() {
    return this.renderChart();
  }
}

function mapStateToProps(state) {
  const {isLoggedIn, authorities, loginError, loginErrorMessage, authString} = state.user;
  const {pieData, errorMessage, isRequesting} = state.dashboard;
  return {isLoggedIn, authorities, loginError, isRequesting, loginErrorMessage, authString, pieData, errorMessage};
}

const mapDispatchToProps = {
  getDashBoardData
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentsTab);
