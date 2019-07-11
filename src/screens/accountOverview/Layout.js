import React, {Component} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {Container, Content, Text, Card, CardItem, Body, Thumbnail, Left, Button, Icon, Right, Fab} from 'native-base';
import styles from "./style";
import AddFeesModal from "../../components/Student/AddFeesModal";

class Layout extends Component {

  constructor(props) {
    super();
    this.state = {
      active: false,
      isModalVisible: false
    };
  };
  toggleModal = () => {
    console.log('toggling')
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    const {user} = this.props;
    return (
      <Container>
        <Content contentContainerStyle={{ flexGrow: 1 }}>
            <ScrollView>
              <Card containerStyle={{backgroundColor: '#45CB85'}}>
                <CardItem>
                  <Left>
                    <Thumbnail large
                               source={{uri: user.avatar !== '' ? user.avatar : 'https://banner2.kisspng.com/20180410/bbw/kisspng-avatar-user-medicine-surgery-patient-avatar-5acc9f7a7cb983.0104600115233596105109.jpg'}}/>
                    <Body>
                    <Text>{`${user.firstname} ${user.lastname}`}</Text>
                    <Text note small>
                      {user.studentDetailses.length > 0 ? `${user.studentDetailses[0].batch.standard.name}/${user.studentDetailses[0].batch.name}` : null}
                    </Text>
                    <Text note small>
                      {user.mobile}
                    </Text>
                    </Body>
                  </Left>
                </CardItem>

                <CardItem>
                  <Left><Text>Total Fees</Text></Left>
                  <Right><Text>5000 INR</Text></Right>
                </CardItem>

                <CardItem>
                  <Left><Text>Fees Due</Text></Left>
                  <Right><Text>2500 INR</Text></Right>
                </CardItem>

                <CardItem footer bordered>
                  <Right>
                    <TouchableOpacity onPress={() => this.toggleModal()}>
                      <View style={styles.addPaymentButton}>
                        <Text style={styles.addFeesPaymentText}>Add Fees Payment</Text>
                      </View>
                    </TouchableOpacity>
                  </Right>
                </CardItem>
              </Card>
              <AddFeesModal isModalVisible={this.state.isModalVisible} toggleModal={() => this.toggleModal()}/>
            </ScrollView>

            <Fab
              active={this.state.active}
              direction="up"
              containerStyle={{}}
              style={{
                backgroundColor: '#5067FF'
              }}
              position="bottomRight"
              onPress={() => this.setState({active: !this.state.active})}>
              <Icon name="share"/>
              <Button style={{backgroundColor: '#34A34F'}}>
                <Icon name="logo-whatsapp"/>
              </Button>
              <Button style={{backgroundColor: '#3B5998'}}>
                <Icon name="logo-facebook"/>
              </Button>
              <Button disabled style={{backgroundColor: '#DD5144'}}>
                <Icon name="mail"/>
              </Button>
            </Fab>

        </Content>
      </Container>
    );
  }
}

export default Layout;