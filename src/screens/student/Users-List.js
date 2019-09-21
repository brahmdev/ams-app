import React, {Component} from 'react';
import {RefreshControl, StyleSheet, TouchableOpacity} from "react-native";
import {Body, Button, Content, Left, List, ListItem, Right, Text, Thumbnail} from 'native-base';
import {MaterialCommunityIcons} from '@expo/vector-icons';

const UserItem = ({item, onPressItem, onDeleteItem}) => {
  if (item.username !== '') {
    return (
        <ListItem avatar onPress={() => onPressItem(item)}>
          <Left>
            <Thumbnail source={{uri: item.avatar ? item.avatar : 'https://banner2.kisspng.com/20180410/bbw/kisspng-avatar-user-medicine-surgery-patient-avatar-5acc9f7a7cb983.0104600115233596105109.jpg'}}/>
          </Left>
          <Body style={{marginTop: 8}}>
          <Text small>
            {`${item.firstname} ${item.lastname}`}
          </Text>
          <Text note small>
            {`${item.studentDetailses[0].batch.standard.name}/${item.studentDetailses[0].batch.name}`}
          </Text>
          </Body>
          <Right>
            <TouchableOpacity>
              <Button transparent style={{height: 10, marginTop: 10}}
                      onPress={() => onDeleteItem(item.id, item.firstname)}>
                <MaterialCommunityIcons name="trash-can-outline" style={{color: '#1272e6', fontSize: 24, marginRight: 10}}/>
              </Button>
            </TouchableOpacity>
          </Right>
        </ListItem>

    );
  } else {
    return null;
  }
};

class UsersList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.props.listProps.handleRefresh();
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isRequesting && nextProps.isRequesting !== prevState.isRequesting) {
      return ({refreshing: nextProps.isRequesting})
    }
    return null;
  };

  renderUsers = (listProps, errorMessage) => {
    let userItems = [];
    listProps.items ? listProps.items.forEach(item => userItems.push(<UserItem key={item.username} item={item}
                                                                               onPressItem={listProps.onItemSelected}
                                                                               onDeleteItem={listProps.onDelete}/>)) : null;
    if (userItems.length === 0 && errorMessage !== '') {
      userItems.push(errorMessage);
    }
    return userItems;
  };

  render() {
    return (
      <Content style={{ flex: 1 }} refreshControl={
        <RefreshControl refreshing={this.state.refreshing}
                        onRefresh={() => this._onRefresh()}
        />
      }>
        <List>
          {this.renderUsers(this.props.listProps, this.props.errorMessage)}
        </List>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    flexDirection: 'row',
  },
});
export default UsersList;
