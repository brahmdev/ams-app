import React, {Component} from 'react';
import { Dimensions } from "react-native";
import {Header, Left, Body, Right, Button, Icon, Title, View} from 'native-base';

const screen = Dimensions.get("window");

export default class HomeHeader extends Component {
  render() {
    return (
      <View style={{width: screen.width}} >

      <Header searchBar>
          <Body>
          <Title>Home</Title>
          </Body>
        </Header>
      </View>
    );
  }
}