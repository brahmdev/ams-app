import React from 'react';
import {StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import {Container, Left, Body, Content, Right, List, ListItem, Text, Thumbnail, Icon} from 'native-base';

const FeesITem = ({item, onPressItem}) => {
  if (item.amount !== '') {
    return (
      <TouchableOpacity style={styles.touchable}>
        <ListItem avatar onPress={() => onPressItem(item)}>
          <Body>
          <Text small>
            {`${item.feesTitle}`}
          </Text>
          <Text note small>
            {`${item.paymentDate}`}
          </Text>
          </Body>
          <Right>
            <Text small style={styles.paidFees}>
              {`+ ${item.amount} INR`}
            </Text>
            <Text note small style={styles.remainingFees}>
              {`- ${item.remainingFees} INR`}
            </Text>
          </Right>
        </ListItem>
      </TouchableOpacity>

    );
  } else {
    return null;
  }
};

const renderFeesList = (listProps) => {
  let feesItems = [];
  listProps.items ? listProps.items.forEach(item => feesItems.push(<FeesITem key={`${item.id}-${item.amount}`}
                                                                             item={item}
                                                                             onPressItem={listProps.onItemSelected}/>)) : null;
  return feesItems;
};

const FeesList = ({listProps}) => {
  return (
    <ScrollView>
      <List>
        {renderFeesList(listProps)}
      </List>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  paidFees: {
    color: '#66cc00'
  },
  remainingFees: {
    color: '#ff3333'
  }
});

export default FeesList;
