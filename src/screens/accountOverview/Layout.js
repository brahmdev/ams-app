import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import {Container, Content, Text, Card, CardItem, Body, Thumbnail, Left} from 'native-base';
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
            </Card>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

export default Layout;