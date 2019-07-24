import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, List, ListItem, Body, Right, Container, Content} from 'native-base';
import Colors from "../../constants/Colors";
import {getAllSubjects} from "../../actions/subjectActions";

const SubjectItem = ({item}) => {
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
          </Right>
        </TouchableOpacity>
      </ListItem>
    );
  } else {
    return null;
  }
};

class SubjectScreen extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Manage Subjects',
      headerStyle: {
        backgroundColor: Colors.mauvePink,
      },
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }
  };

  componentDidMount() {
    this.props.getAllSubjects(1, this.props.authString);
  }

  renderSubject = (subjectList) => {
    let subjectItem = [];
    subjectList.length > 0 ? subjectList.forEach(item => subjectItem.push(<SubjectItem key={item.id}
                                                                                           item={item}/>)) : null;
    return subjectItem;
  };

  render() {
    const {subjectList} = this.props;
    return (
      <Container>
        <Content>
          <List>
            {this.renderSubject(subjectList)}
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
  const {subjectList, errorMessage, isRequesting} = state.subject;
  return {isLoggedIn, authorities, loginError, isRequesting, loginErrorMessage, authString, subjectList, errorMessage};
}

const mapDispatchToProps = {
  getAllSubjects
};

export default connect(mapStateToProps, mapDispatchToProps)(SubjectScreen);
