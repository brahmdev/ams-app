import React from 'react';
import {StyleSheet, TouchableOpacity} from "react-native";
import {Container, Left, Body, Content, Right, List, ListItem, Text, Thumbnail, Icon} from 'native-base';

const UserItem = ({item, onPressItem}) => {
  if (item.username !== '') {
    return (
      <TouchableOpacity style={styles.touchable} >
        <ListItem avatar onPress={() => onPressItem(item)}>
          <Left>
            <Thumbnail small
                       source={{uri: item.avatar ? item.avatar : 'https://banner2.kisspng.com/20180410/bbw/kisspng-avatar-user-medicine-surgery-patient-avatar-5acc9f7a7cb983.0104600115233596105109.jpg'}}/>
          </Left>
          <Body>
          <Text small>
            {`${item.firstname} ${item.lastname}`}
          </Text>
          <Text note small>
            {`${item.studentDetailses[0].batch.standard.name}/${item.studentDetailses[0].batch.name}`}
          </Text>
          </Body>
          <Right>
            <Icon name="ios-arrow-forward"/>
          </Right>
        </ListItem>
      </TouchableOpacity>

    );
  } else {
    return null;
  }
};

const renderUsers = (listProps) => {
  let userItems = [];
  listProps.items.forEach(item => userItems.push(<UserItem key={item.username} item={item}
                                                           onPressItem={listProps.onItemSelected}/>));
  return userItems;
};

const UsersList = ({listProps}) => {
  return (
    <Container>
      <Content>
        <List>
          {renderUsers(listProps)}
        </List>
      </Content>
    </Container>
  );
};


const styles = StyleSheet.create({});

export default UsersList;
