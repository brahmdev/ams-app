import React, {Component} from 'react';
import {
  Body,
  Card,
  CardItem,
  Content,
  Icon, Input,
  Item,
  Label,
  Picker,
  Right,
  Text,
  View
} from "native-base";
import Modal from "react-native-modal";
import {Dimensions, TouchableOpacity} from "react-native";
import styles from "../../screens/accountOverview/style";

const screen = Dimensions.get("window");

class AddFeesModal extends Component {

  constructor(props) {
    super();
    this.state = {
      feesTitle: '',
      amount: '',
      payeeName: '',
      receiptNumber: '',
      nextPaymentDate: '',
      paymentMode: 'Cash',
      remainingFees: '',
      netFees: ''
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.netFees && nextProps.netFees !== prevState.netFees) {
      return ({ netFees: nextProps.netFees })
    }
    return null;
  }

  onValueChange(value) {
    this.setState({
      paymentMode: value
    });
  };

  onChange = (key, value) => {
    this.setState({[key]: value});
    if (key === 'amount') {
      this.setState({
        remainingFees: (this.state.netFees - value)
      })
    }
  };

  onFeesAdd = () => {
    const feesCollection = Object.assign({}, {...this.state});
    feesCollection.paymentDate = new Date();
    this.props.onAddFess(feesCollection);
    this.props.toggleModal();
  };

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
            <Input name="feesTitle" onChangeText={val => this.onChange("feesTitle", val)}/>
          </Item>
          <Item floatingLabel>
            <Label>Amount</Label>
            <Input name="amount" keyboardType="numeric" onChangeText={val => this.onChange("amount", val)}/>
          </Item>
          <Item floatingLabel>
            <Label>Payee Name</Label>
            <Input name="payeeName" onChangeText={val => this.onChange("payeeName", val)}/>
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
              iosIcon={<Icon name="arrow-down"
              onValueChange={this.onValueChange.bind(this)}/>
              }
            >
              <Picker.Item label="Cash" value="Cash" />
              <Picker.Item label="Online" value="Online" />
              <Picker.Item label="Cheque" value="Cheque" />
            </Picker>
          </Item>
          {['Online', 'Cheque'].includes(this.state.paymentMode) ?
            <Item floatingLabel>
              <Label>Receipt Number</Label>
              <Input name="receiptNumber" onChangeText={val => this.onChange("receiptNumber", val)}/>
            </Item>
          : null}
          </Body>
        </CardItem>
        <CardItem>
          <Right style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
            <TouchableOpacity onPress={() => this.onFeesAdd()}>
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