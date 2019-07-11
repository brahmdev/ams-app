import React, {Component} from 'react';
import { Dimensions, TouchableOpacity } from "react-native";
import {
  Content,
  Text,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  View,
  Card,
  CardItem,
  Label,
  Picker,
  Item,
  Form,
  Input
} from 'native-base';
import Modal from "react-native-modal";

const screen = Dimensions.get("window");

export default class FeesDetailsHeader extends Component {

  state = {
    isModalVisible: false
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  renderFeesPaymentForm () {
    return (
      <Card>
        <CardItem header bordered>
          <Text>Fee Payment</Text>
        </CardItem>
        <CardItem bordered>
          <Body>
            <Item floatingLabel>
              <Label>Fees Title</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Amount</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Payee Name</Label>
              <Input />
            </Item>
            <Item>
              <Label>Payment mode</Label>
              <Picker
                inlineLabel
                mode="dropdown"
                iosHeader="Payment mode"
                style={styles.picker}
                itemTextStyle={styles.itemStyle}
                textStyle={{textAlign: 'center'}}
                iosIcon={<Icon name="arrow-down" />}
              >
                <Picker.Item label="Cash" value="Cash" />
                <Picker.Item label="Online" value="Online" />
                <Picker.Item label="Cheque" value="Cheque" />
              </Picker>
            </Item>
          </Body>
        </CardItem>
        <CardItem>
          <Right style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
            <TouchableOpacity onPress={() => this.toggleModal()}>
              <View style={styles.button}>
                <Text style={styles.actionButtonSave}>Save</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.toggleModal()}>
              <View style={styles.button}>
                <Text style={styles.actionButtonClose}>Close</Text>
              </View>
            </TouchableOpacity>
          </Right>
        </CardItem>
      </Card>
    )
  };

  render() {
    return (
      <View style={{width: screen.width, flex: 1}} >

        <Header searchBar>
          <Left>
            <Button transparent onPress={() => this.props.goBack()}>
              <Icon name='arrow-back'/>
            </Button>
          </Left>
          <Body>
          <Title>Fees Details</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.toggleModal}>
              <Icon name='add'/>
            </Button>
          </Right>
        </Header>

        <Content>
        <Modal
          isVisible={this.state.isModalVisible}
          backdropColor="#B4B3DB"
          backdropOpacity={0.8}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}
          onBackdropPress={() => this.toggleModal()}>
          <View style={{ flex: 1,  justifyContent: 'center' }}>
            {this.renderFeesPaymentForm()}
          </View>
        </Modal>
        </Content>
      </View>
    );
  }
}


const styles = {
  button: {
    padding: 8,
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  itemStyle: {
    fontSize: 15,
    height: 75,
    color: 'black',
    textAlign: 'right',
    fontWeight: 'bold'
  },
  picker: {
    width: 50
  },
  actionButtonSave: {
    color: '#3b5998',
  },
  actionButtonClose: {
    color: '#FF3860',
  }
};
