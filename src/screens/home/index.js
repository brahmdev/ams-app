import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavbarTitle} from '../../components';
import {getAllStudents} from "../../actions/studentActions";
import {getUserInfo} from "../../actions/User-Information-Action";
import {ScrollView, StyleSheet} from 'react-native';
import {Container, View, Text, Grid, Row, Col, Card, CardItem, Body, Right, Left, Icon, Button} from "native-base";
import HomeHeader from "./HomeHeader";
import Colors from "../../constants/Colors";
import Content from "../../components/Content";

class HomeScreen extends Component {

  static navigationOptions = () => {
    return {
      headerLeft: null,
      headerTitle: <HomeHeader/>,
      headerRight: null
    }
  };

  constructor(props) {
    super(props);
    this.state = {};
  }


  renderContent() {
    return (
      <ScrollView>
        <Grid>
          <Row>
            <Col>
              <Card>
                <CardItem style={{backgroundColor: Colors.webOrange}}>
                  <Body>
                  <Text style={{fontSize: 20}}>Student Count</Text>
                  <Icon name='ios-school'/>
                  </Body>
                  <Right>
                    <Text style={{fontSize: 20}}>11</Text>
                  </Right>
                </CardItem>
              </Card>
            </Col>
          </Row>
          <Row>
            <Content style={{backgroundColor: Colors.anaklawaBlue, marginLeft: 3, marginRight: 3, padding: 5}}>
              <Text style={{fontSize: 20}}>Fees Module</Text>
              <Card>
                <CardItem style={{backgroundColor: Colors.caribbeanGreen}}>
                  <Body>
                  <Text style={{color: Colors.noticeText}}>Collection</Text>
                  <Icon style={{color: Colors.noticeText}} name='ios-cash'/>
                  </Body>
                  <Right>
                    <Text style={{color: Colors.noticeText}}>25,000 INR</Text>
                  </Right>
                </CardItem>
              </Card>
              <Card>
                <CardItem style={{backgroundColor: Colors.bitterSweetRed}}>
                  <Body>
                  <Text style={{color: Colors.noticeText}}>Dues</Text>
                  <Icon name='ios-sad' style={{color: Colors.noticeText}}/>
                  </Body>
                  <Right>
                    <Text style={{color: Colors.noticeText}}>70,500 INR</Text>
                  </Right>
                </CardItem>
              </Card>
            </Content>
          </Row>
          <View style={styles.line}/>
          <Content style={styles.container}>
            <Text style={{fontSize: 20}}>Academic Management</Text>
            <Row>
              <Col>
                <Card>
                  <CardItem style={{backgroundColor: Colors.mauvePink}}>
                    <Body>
                    <Text>
                      Class/Standard
                    </Text>
                    </Body>
                  </CardItem>
                </Card>
              </Col>
              <Col>
                <Card>
                  <CardItem style={{backgroundColor: Colors.mauvePink}}>
                    <Body>
                    <Text>
                      Batch/Division
                    </Text>
                    </Body>
                  </CardItem>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col>
                <Card>
                  <CardItem style={{backgroundColor: Colors.mauvePink}}>
                    <Body>
                    <Text>
                      Subjects
                    </Text>
                    </Body>
                  </CardItem>
                </Card>
              </Col>
              <Col>
                <Card>
                  <CardItem style={{backgroundColor: Colors.mauvePink}}>
                    <Body>
                    <Text>
                      Chapters
                    </Text>
                    </Body>
                  </CardItem>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col>
                <Card>
                  <CardItem style={{backgroundColor: Colors.mauvePink}}>
                    <Body>
                    <Text>
                      Attendance
                    </Text>
                    </Body>
                  </CardItem>
                </Card>
              </Col>
              <Col>
                <Card>
                  <CardItem style={{backgroundColor: Colors.mauvePink}}>
                    <Body>
                    <Text>
                      Reports
                    </Text>
                    </Body>
                  </CardItem>
                </Card>
              </Col>
            </Row>

          </Content>
        </Grid>
      </ScrollView>
    )
  }

  render() {
    return this.renderContent();
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: Colors.noticeText
  },
  picker: {
    width: 50
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(189, 195, 199, 0.6)',
    marginTop: 10,
    marginBottom: 10
  },
  container: {
    padding: 10
  }
});

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {
  getUserInfo,
  getAllStudents,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
