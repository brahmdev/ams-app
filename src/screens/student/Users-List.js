import React, {Component} from 'react';
import {StyleSheet, ScrollView, TouchableOpacity, RefreshControl} from "react-native";
import {Container, View, Left, Body, Content, Right, List, ListItem, Text, Thumbnail, Icon, Button} from 'native-base';

const UserItem = ({item, onPressItem, onDeleteItem}) => {
  if (item.username !== '') {
    return (
        <ListItem avatar>
          <TouchableOpacity style={styles.touchable}  onPress={() => onPressItem(item)}>
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
                <Icon name="ios-trash" style={{color: '#FF3860'}}/>
              </Button>
            </TouchableOpacity>
          </Right>
          </TouchableOpacity>
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

  renderUsers = (listProps) => {
    let userItems = [];
    listProps.items ? listProps.items.forEach(item => userItems.push(<UserItem key={item.username} item={item}
                                                                               onPressItem={listProps.onItemSelected}
                                                                               onDeleteItem={listProps.onDelete}/>)) : null;
    return userItems;
  };

  render() {
    return (
      <Content refreshControl={
        <RefreshControl refreshing={this.state.refreshing}
                        onRefresh={() => this._onRefresh()}
        />
      }>
        <List>
          {this.renderUsers(this.props.listProps)}
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
