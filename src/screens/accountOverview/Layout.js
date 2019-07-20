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
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    const {user} = this.props;
    const totalFees = user.studentDetailses[0].totalFees;
    const feesDiscount = user.studentDetailses[0].feesDiscount;
    const netFees = totalFees - feesDiscount;
    const paidFees = user.studentDetailses[0].paidFees;
    const feesDues = netFees- paidFees;
    return (
      <Container>
        <Content contentContainerStyle={{ flexGrow: 1 }}>
            <ScrollView>
              <Card>
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
                  <Right><Text style={styles.totalFees}>+ {totalFees} INR</Text></Right>
                </CardItem>

                <CardItem bordered>
                  <Left><Text>Fees Discount</Text></Left>
                  <Right><Text>{feesDiscount} INR</Text></Right>
                </CardItem>

                <CardItem bordered>
                  <Left><Text>Net Fees</Text></Left>
                  <Right><Text>{netFees} INR</Text></Right>
                </CardItem>

                <CardItem>
                  <Left><Text>Paid Fees</Text></Left>
                  <Right><Text style={styles.totalFees}>+ {paidFees} INR</Text></Right>
                </CardItem>

                <CardItem>
                  <Left><Text>Fees Due</Text></Left>
                  <Right><Text style={styles.remainingFees}>- {feesDues} INR</Text></Right>
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
              <AddFeesModal isModalVisible={this.state.isModalVisible} toggleModal={() => this.toggleModal()} onAddFess={this.props.onAddFess} feesDues={feesDues}/>
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