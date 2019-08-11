import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Text, List, ListItem, Body, Right, Container, Content} from 'native-base';
import Colors from "../../constants/Colors";
import {getAllStandards} from "../../actions/standardActions";

const StandardItem = ({item}) => {
  if (item.code !== '') {
    return (
      <ListItem avatar>
        <TouchableOpacity style={styles.touchable}>
          <Body>
          <Text>{item.code}</Text>
          <Text note>{item.name}</Text>
          </Body>
          <Right>
            <Text note>{item.language.name}</Text>
          </Right>
        </TouchableOpacity>
      </ListItem>
    );
  } else {
    return null;
  }
};

class StandardScreen extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Manage Standard/Class',
      headerStyle: {
        backgroundColor: Colors.mauvePink,
      },
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }
  };

  componentDidMount() {
    this.props.getAllStandards(1, this.props.authString);
  }

  renderStandard = (standardList) => {
    let standardItem = [];
    standardList.length > 0 ? standardList.forEach(item => standardItem.push(<StandardItem key={item.id}
                                                                                           item={item}/>)) : null;
    return standardItem;
  };

  render() {
    const {standardList} = this.props;
    return (
      <Container>
        <Content>
          <List>
            {this.renderStandard(standardList)}
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    flexDirection: 'row',
  },
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 10,
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    //backgroundColor:'black'
  },
});

function mapStateToProps(state) {
  const {isLoggedIn, authorities, loginError, loginErrorMessage, authString} = state.user;
  const {standardList, errorMessage, isRequesting} = state.standard;
  return {isLoggedIn, authorities, loginError, isRequesting, loginErrorMessage, authString, standardList, errorMessage};
}

const mapDispatchToProps = {
  getAllStandards
};

export default connect(mapStateToProps, mapDispatchToProps)(StandardScreen);
