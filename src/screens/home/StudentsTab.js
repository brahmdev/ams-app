import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, Icon, Card, CardItem, Body} from 'native-base';
import {Dimensions, ScrollView, TouchableOpacity, Image} from 'react-native';
import {PieChart} from 'react-native-chart-kit'
import {getDashBoardData} from "../../actions/dashBoardActions";
import {STANDARD_COLOR} from "../../utils";
import NavigationService from "../../navigation/Navigation-Service";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

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

  studentListEmpty = (pieDataList) => {
    let noStudentPresent = true;
    for (let pieData of pieDataList) {
      if (pieData.studentCount) {
        noStudentPresent = false;
      }
    }
    return noStudentPresent;
  };

  renderChart = () => {
    return (
      <View style={{paddingRight: 20}}>
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
  };

  renderStudentCount = () => {
    return (
      <View style={{padding: 10}}>
        <Card>
          <CardItem header style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text>{this.props.studentList.length}</Text>
          </CardItem>
          <CardItem>
            <Body style={{
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Text>
              Total Students
            </Text>
            </Body>
          </CardItem>
        </Card>
      </View>
    )
  };

  renderStandardList = () => {
    const {standardList} = this.props;
    let items = [];
    let count = 1;
    for (let standard of standardList) {
      if (count < 5) {
        items.push(
          <TouchableOpacity key={standard.id} style={{
            margin: 6,
            width: 70,
            height: 70,
            borderRadius: 70 / 2,
            backgroundColor: STANDARD_COLOR.get(count),
            justifyContent: 'center',
            alignItems: 'center',
          }} onPress={() => NavigationService.navigate("StudentScreen", {standardCode: standard.code,})}>
            <Text style={styles.highlightText}>{standard.name}</Text>
          </TouchableOpacity>
        )
      }
      count++;
    }
    return items;
  };

  renderHighLights = () => {
    return (
      <View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10
        }}>
          <Text
            style={{fontSize: 18, color: '#303030', fontWeight: '500'}}
            numberOfLines={1}
          >Your highlights</Text>
          <Text style={{color: '#4cb0e1'}} onPress={() => NavigationService.navigate("StudentScreen")}>More</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          {this.renderStandardList()}
        </View>
      </View>
    )
  };

  renderData = () => {
    if (this.studentListEmpty(this.props.pieData)) {
      return (
        <View>
          <Image
            style={{
              width: '100%',
              height: undefined,
              aspectRatio: 1,
            }}
            source={{uri: 'https://cdn.dribbble.com/users/1554526/screenshots/3399669/no_results_found.png'}}
          />
        </View>
      );
    } else {
      return (
        <View>
          {this.renderChart()}
          {this.renderStudentCount()}
          {this.renderHighLights()}
        </View>
      )
    }
  };

  render() {
    return (
      <View>
        {this.renderData()}
      </View>
    );
  }
}

function mapStateToProps(state) {
  const {isLoggedIn, authorities, loginError, loginErrorMessage, authString} = state.user;
  const {pieData, standardList, errorMessage, isRequesting} = state.dashboard;
  return {
    isLoggedIn,
    authorities,
    loginError,
    isRequesting,
    loginErrorMessage,
    authString,
    pieData,
    standardList,
    errorMessage
  };
}

const mapDispatchToProps = {
  getDashBoardData
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentsTab);

const styles = {
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(189, 195, 199, 0.6)',
    marginTop: 10,
    marginBottom: 10
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(189, 195, 199, 0.6)',
  },
  highlight: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  CircleShapeView: {
    margin: 6,
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    backgroundColor: '#e7d4f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlightText: {
    color: 'white'
  },
};