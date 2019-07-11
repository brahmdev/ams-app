import React, { Component } from 'react';
import { Container, Content } from 'native-base';

import FeesList from "./FeesList";

export default class Layout extends Component {
  render() {
    return (
    <Container>
      <Content noPadding>
        <FeesList listProps={this.props.listProps}/>
      </Content>
    </Container>
    );
  }
}
