import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, List, ListItem, Body, Right, Container, Content} from 'native-base';
import Colors from "../../constants/Colors";
import {getAllChapters} from "../../actions/chapterActions";

const ChapterItem = ({item}) => {
  if (item.code !== '') {
    return (
      <ListItem avatar>
        <TouchableOpacity style={styles.touchable}>
          <Body>
          <Text>{item.code}</Text>
          <Text note>{item.name}</Text>
          <Text note>Subject: {item.subject.name}</Text>
          <Text note>Standard: {item.subject.standard.name}</Text>
          </Body>
          <Right>
            <Text note>{item.subject.standard.language.name}</Text>
          </Right>
        </TouchableOpacity>
      </ListItem>
    );
  } else {
    return null;
  }
};

class ChapterScreen extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Manage Chapters',
      headerStyle: {
        backgroundColor: Colors.mauvePink,
      },
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }
  };

  componentDidMount() {
    this.props.getAllChapters(1, this.props.authString);
  }

  renderChapter = (chapterList) => {
    let chapterItem = [];
    chapterList.length > 0 ? chapterList.forEach(item => chapterItem.push(<ChapterItem key={item.id}
                                                                                       item={item}/>)) : null;
    return chapterItem;
  };

  render() {
    const {chapterList} = this.props;
    return (
      <Container>
        <Content>
          <List>
            {this.renderChapter(chapterList)}
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
  const {chapterList, errorMessage, isRequesting} = state.chapter;
  return {isLoggedIn, authorities, loginError, isRequesting, loginErrorMessage, authString, chapterList, errorMessage};
}

const mapDispatchToProps = {
  getAllChapters
};

export default connect(mapStateToProps, mapDispatchToProps)(ChapterScreen);
