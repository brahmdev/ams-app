import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, Icon, Card, CardItem,} from 'native-base';
import {Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import Colors from "../../constants/Colors";

class FeesDetailsTabs extends Component {
  render() {
    return (
      <View style={{
        padding: 15,
        flexDirection: 'row',
      }}>
        <Card style={{
          width: "50%",
          borderRadius: 15
        }}>
          <CardItem header style={[styles.cardItem, { backgroundColor: Colors.scienceBlue}]}>
            <View style={styles.cardContent}>
              <Icon name="md-arrow-up" style={{color: Colors.white}}/>
            <Text style={{ color: Colors.white, fontSize: 22}}>₹ {this.props.feesInfo.totalFeesCollection}</Text>
            <Text style={{
              marginTop: 30,
              color: Colors.white
            }}>
              Fees Collection
            </Text>
            </View>
          </CardItem>
        </Card>

        <Card style={{
          width: "50%",
          borderRadius: 15
        }}>
          <CardItem header style={[styles.cardItem, { backgroundColor: Colors.crimsonRed}]}>
            <View style={styles.cardContent}>
              <Icon name="md-arrow-down" style={{color: Colors.white}}/>
              <Text style={{ color: Colors.white, fontSize: 22}}>₹ {this.props.feesInfo.totalFeesDues}</Text>
            <Text style={{
              marginTop: 30,
              color: Colors.white
            }}>
              Fees Dues
            </Text>
            </View>
          </CardItem>

        </Card>
      </View>
    );
  }
}

export default FeesDetailsTabs;

const styles = {
  cardItem: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
  },
  cardContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
}