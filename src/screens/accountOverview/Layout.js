import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import {Container, Content, Text, Card, CardItem, Body, Thumbnail, Left, Button, Icon, Right} from 'native-base';
import styles from "./style";

class Layout extends Component {

  render() {
    const {user} = this.props;
    return (
      <Container>
        <Content>
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
                <Left>
                  <Button transparent>
                    <Icon active name="ios-call" style={styles.iconSize}/>
                  </Button>
                </Left>
                <Body style={{paddingLeft: 45}}>
                <Button transparent>
                  <Icon active name="logo-whatsapp" style={styles.iconSize}/>
                </Button>
                </Body>
                <Right transparent>
                  <Button transparent>
                    <Icon active name="ios-text" style={styles.iconSize}/>
                  </Button>
                </Right>
              </CardItem>

            </Card>

          </ScrollView>
        </Content>
      </Container>
    );
  }
}

export default Layout;