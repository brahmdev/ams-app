import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {View, Button, Icon, Text, List, ListItem} from 'native-base';
import Colors from "../../constants/Colors";
import {getStatusBarHeight} from "../../utils/statusBarHeight";

export default class Filter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
      backgroundColor: ''
    }
  }
  renderStandardList = (standardList, selectedStandard, onPressItem) => {
    let items = [];
    for (const standard of standardList) {
      let isSelected = false;
      let backgroundColor = '';
      if (standard.code === selectedStandard) {
        isSelected = true;
        backgroundColor = Colors.anaklawaBlue;
      } else {
        backgroundColor = '';
        isSelected = false;
      }
      items.push(
        <ListItem selected={isSelected} onPress={() => onPressItem(standard.code)} key={standard.id}>
          <View>
            <Text>{standard.name}</Text>
            <Text note>{standard.code}</Text>
          </View>
        </ListItem>
      )
    }
    return items;
  };

  render() {
    const { standardList, selectedStandard, onPressItem } = this.props;
    return (
      <View style={styles.containerMain}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Icon name='ios-arrow-back' onPress={() => this.props.closeDrawer()}/>
            <Text style={styles.headerTitle}>Refine</Text>
          </View>
          <ScrollView>
            <List style={styles.standardList}>
              {this.renderStandardList(standardList, selectedStandard, onPressItem)}
            </List>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = {
  containerMain: {
    flex: 1,
    paddingTop: getStatusBarHeight(),
    backgroundColor: '#00000000'
  },
  header: {
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.tabIconDefault
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: Colors.warningText,
    paddingLeft: 20
  },
  content: {
    height: '100%',
    backgroundColor: Colors.whitesmoke
  },
  standardList: {
    paddingBottom: 60,
    height: '80%'
  },
  bottomView: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
    padding: 10,
  }
};
