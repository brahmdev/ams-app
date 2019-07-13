import React, {Component} from 'react';
import { Platform, Dimensions } from "react-native";
import { Header, Left, Body, Button, Icon, Title, View} from 'native-base';

const screen = Dimensions.get("window");

export default class FeesDetailsHeader extends Component {
  render() {
    return (
      <View style={{width: screen.width}} >

        <Header searchBar>
          <Left>
            <Button transparent onPress={() => this.props.goBack()}>
              <Icon name='arrow-back'/>
            </Button>
          </Left>
          <Body>
          <Title>Fees Details</Title>
          </Body>
        </Header>
      </View>
    );
  }
}