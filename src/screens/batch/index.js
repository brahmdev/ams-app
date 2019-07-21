import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, List, ListItem, Body, Right, Container, Content} from 'native-base';
import Colors from "../../constants/Colors";
import {getAllBatches} from "../../actions/batchActions";

const BatchItem = ({item}) => {
  if (item.code !== '') {
    return (
      <ListItem avatar>
        <TouchableOpacity style={styles.touchable}>
          <Body>
          <Text>{item.code}</Text>
          <Text note>{item.name}</Text>
          <Text note>Standard: {item.standard.name}</Text>
          </Body>
          <Right>
            <Text note>{item.standard.language.name}</Text>
            <Text note>Capacity: {item.capacity}</Text>

          </Right>
        </TouchableOpacity>
      </ListItem>
    );
  } else {
    return null;
  }
};

class BatchScreen extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Manage Batch/Division',
      headerStyle: {
        backgroundColor: Colors.mauvePink,
      },
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }
  };

  componentDidMount() {
    this.props.getAllBatches(1, this.props.authString);
  }

  renderBatch = (batchList) => {
    let batchItem = [];
    batchList.length > 0 ? batchList.forEach(item => batchItem.push(<BatchItem key={item.id}
                                                                                           item={item}/>)) : null;
    return batchItem;
  };

  render() {
    const {batchList} = this.props;
    return (
      <Container>
        <Content>
          <List>
            {this.renderBatch(batchList)}
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
});

function mapStateToProps(state) {
  const {isLoggedIn, authorities, loginError, loginErrorMessage, authString} = state.user;
  const {batchList, errorMessage, isRequesting} = state.batch;
  return {isLoggedIn, authorities, loginError, isRequesting, loginErrorMessage, authString, batchList, errorMessage};
}

const mapDispatchToProps = {
  getAllBatches
};

export default connect(mapStateToProps, mapDispatchToProps)(BatchScreen);
