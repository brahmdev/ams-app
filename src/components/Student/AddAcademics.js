import React, {Component} from 'react';
import {KeyboardView} from "../KeyboardView";
import {Container, Content, Form, Icon, Input, Item, Label, Picker, DatePicker} from "native-base";
import {ScrollView, StyleSheet} from "react-native";

class AddAcademics extends Component {

  handleChange = (name, value) => {
    //console.log('name is ', name)
    if (name === "standard") {
      this.props.onStandardChange(value);
    } else if (name === 'hasPaidFees') {
      this.setState({hasPaidFees: !this.state.hasPaidFees}, () => {
        this.props.onChange({name: 'hasPaidFees', value: this.state.hasPaidFees})
      })
    }
    //console.log('name: ', name, ' value : ', value);
    this.props.onChange(name, value);
  };

  createStandardMenuItem = () => {
    let standardMenuItem = [];
    const standardLookUp = this.props.standardLookUp;
    for (let key of Object.keys(standardLookUp)) {
      standardMenuItem.push(<Picker.Item key={`standard_${key}`} label={standardLookUp[key]} value={key}></Picker.Item>);
    }
    return standardMenuItem;
  };

  createBatchMenuItem = () => {
    let batchMenuItem = [];
    const batchLookUp = this.props.batchLookUp;
    //console.log('batchLookup ', batchLookUp);
    for (let key of Object.keys(batchLookUp)) {
      batchMenuItem.push(<Picker.Item key={`batch_${key}`} label={batchLookUp[key]} value={key}></Picker.Item>);
    }
    return batchMenuItem;
  };

  render() {
    const {errors, values, onChange} = this.props;

    return (
      <KeyboardView style={{flex: 1}}>
        <Container noStatusbarPadding>
          <Content>
            <ScrollView>
              <Form>
                <Item floatingLabel>
                  <Label>Roll No.</Label>
                  <Input value={values['rollNo'] ? values['rollNo'] : ''} name="rollNo" onChangeText={val => onChange("rollNo", val)}/>
                </Item>
                <Item style={{marginTop: 30}}>
                  <Label>Admission Date</Label>
                  <DatePicker
                    defaultDate={new Date()}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    textStyle={{ color: "green" }}
                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                    value={values['admissionDate']}
                    name="admissionDate"
                    disabled={true}
                  />
                </Item>
                <Item style={{marginTop: 30}}>
                  <Label>Standard</Label>
                  <Picker
                    inlineLabel
                    mode="dropdown"
                    iosHeader="Standard"
                    style={styles.picker}
                    itemTextStyle={styles.itemStyle}
                    textStyle={{textAlign: 'center'}}
                    iosIcon={<Icon name="arrow-down" />}
                    selectedValue={values['standard'] ? values['standard'] : ''}
                    onValueChange={val => this.handleChange("standard", val)}
                  >
                    {this.createStandardMenuItem()}

                  </Picker>
                </Item>

                <Item style={{marginTop: 30}}>
                  <Label>Batch</Label>
                  <Picker
                    inlineLabel
                    mode="dropdown"
                    iosHeader="Batch"
                    style={styles.picker}
                    itemTextStyle={styles.itemStyle}
                    textStyle={{textAlign: 'center'}}
                    iosIcon={<Icon name="arrow-down" />}
                    selectedValue={values['batch'] ? values['batch'] : ''}
                    onValueChange={val => this.handleChange("batch", val)}
                  >
                    {this.createBatchMenuItem()}

                  </Picker>
                </Item>
                <Item floatingLabel>
                  <Label>Total Fees</Label>
                  <Input value={values['totalFees'] ? values['totalFees'] : ''} name="totalFees" onChangeText={val => onChange("totalFees", val)}/>
                </Item>
                <Item floatingLabel>
                  <Label>Total Discount</Label>
                  <Input value={values['feesDiscount'] ? values['feesDiscount'] : ''} name="feesDiscount" onChangeText={val => onChange("feesDiscount", val)}/>
                </Item>
              </Form>
            </ScrollView>
          </Content>
        </Container>
      </KeyboardView>
    );
  }
}

const styles = StyleSheet.create({
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
});


export default AddAcademics;