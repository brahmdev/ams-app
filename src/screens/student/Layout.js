import React, {Component} from 'react';
import {Container, Content} from "native-base";
import UsersList from "./Users-List";

class Layout extends Component {

  render() {
    const {listProps, isRequesting} = this.props;
    return (
      <UsersList listProps={listProps} isRequesting={isRequesting}/>
    );
  }
}

export default Layout;
