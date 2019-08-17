import React, { Component } from 'react';
import {View, Button, Icon, Text} from 'native-base';

export default class Filter extends Component {
  render() {
    console.log('in the filter render');
    return (
      <View style={{backgroundColor:'red', zIndex: 1000}}>
        <Text>Drawer</Text>
        <Button iconLeft light onPress={() => this.props.toggleDrawer()}>
          <Icon name='arrow-back' />
          <Text>Back</Text>
        </Button>
        <Button iconRight light>
          <Text>Next</Text>
          <Icon name='arrow-forward' />
        </Button>
      </View>
    );
  }
}
