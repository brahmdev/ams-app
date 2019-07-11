import React, {Component} from 'react';
import {
  Body,
  Button,
  Card,
  CardItem,
  Content,
  Header,
  Icon, Input,
  Item,
  Label,
  Left, Picker,
  Right,
  Text,
  Title,
  View
} from "native-base";
import Modal from "react-native-modal";
import {Dimensions, TouchableOpacity} from "react-native";
import styles from "../../screens/accountOverview/style";

const screen = Dimensions.get("window");

class AddFeesModal extends Component {

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
            <TouchableOpacity onPress={() => this.props.toggleModal()}>
              <View style={styles.actionButton}>
                <Text style={styles.actionButtonSave}>Save</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.toggleModal()}>
              <View style={styles.actionButton}>
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
        <Content>
          <Modal
            isVisible={this.props.isModalVisible}
            backdropColor="#B4B3DB"
            backdropOpacity={0.8}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={600}
            animationOutTiming={600}
            backdropTransitionInTiming={600}
            backdropTransitionOutTiming={600}
            onBackdropPress={() => this.props.toggleModal()}>
            <View style={{ flex: 1,  justifyContent: 'center' }}>
              {this.renderFeesPaymentForm()}
            </View>
          </Modal>
        </Content>
      </View>
    )
  }
}

export default AddFeesModal;