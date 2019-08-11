import React, {Component} from 'react';
import {KeyboardView} from "../KeyboardView";
import {Container, Content, Form, Icon, Input, Item, Label, Picker, DatePicker} from "native-base";
import {ScrollView, StyleSheet} from "react-native";

class AddStudent extends Component {

  render() {
    const {errors, values, onChange} = this.props;

    return (
      <KeyboardView style={{flex: 1}}>
        <Container noStatusbarPadding>
          <Content>
            <ScrollView>
              <Form>
                <Item floatingLabel error={errors.includes("firstname")}>
                  <Label>FirstName</Label>
                  <Input value={values['firstname'] ? values['firstname'] : ''} name="firstname" onChangeText={val => onChange("firstname", val)}/>
                </Item>
                <Item floatingLabel error={errors.includes("lastname")}>
                  <Label>LastName</Label>
                  <Input value={values['lastname'] ? values['lastname'] : ''} name="lastname" onChangeText={val => onChange("lastname", val)}/>
                </Item>
                <Item floatingLabel disabled error={errors.includes("firstname")}>
                  <Label>UserName</Label>
                  <Input value={values['username'] ? values['username'] : ''} disabled/>
                </Item>
                <Item floatingLabel disabled>
                  <Label>Password</Label>
                  <Input value={values['password'] ? values['password'] : ''} name="password" disabled/>
                </Item>
                <Item floatingLabel>
                  <Label>Mobile</Label>
                  <Input value={values['mobile'] ? values['mobile'] : ''} keyboardType="numeric" name="mobile" onChangeText={val => onChange("mobile", val)}/>
                </Item>
                <Item floatingLabel>
                  <Label>E-mail</Label>
                  <Input value={values['email'] ? values['email'] : ''} name="email" onChangeText={val => onChange("email", val)}/>
                </Item>
                <Item style={{marginTop: 30}}>
                  <Label>Date of birth</Label>
                  <DatePicker
                    defaultDate={new Date()}
                    maximumDate={new Date()}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText="Select date"
                    textStyle={{ color: "green" }}
                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                    onDateChange={val => onChange("dob", val)}
                    disabled={false}
                  />
                </Item>
                <Item style={{marginTop: 30}}>
                  <Label>Gender</Label>
                  <Picker
                    inlineLabel
                    mode="dropdown"
                    iosHeader="Gender"
                    style={styles.picker}
                    itemTextStyle={styles.itemStyle}
                    textStyle={{textAlign: 'center'}}
                    iosIcon={<Icon name="arrow-down" />}
                    selectedValue={values['gender'] ? values['gender'] : ''}
                    onValueChange={val => onChange("gender", val)}
                  >
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                    <Picker.Item label="Others" value="Others" />
                  </Picker>
                </Item>
                <Item floatingLabel error={errors.includes("address")}>
                  <Label>Address</Label>
                  <Input rowSpan={5} value={values['address'] ? values['address'] : ''} bordered name="address" onChangeText={val => onChange("address", val)}/>
                </Item>
                <Item disabled floatingLabel>
                  <Label>City</Label>
                  <Input value={values['city'] ? values['city'] : ''} disabled/>
                </Item>
                <Item floatingLabel>
                  <Label>Zip</Label>
                  <Input value={values['zip'] ? values['zip'] : ''} name="zip" onChangeText={val => onChange("zip", val)}/>
                </Item>
                <Item floatingLabel disabled>
                  <Label>State</Label>
                  <Input value={values['state'] ? values['state'] : ''} disabled/>
                </Item>
                <Item floatingLabel disabled>
                  <Label>Country</Label>
                  <Input value={values['country'] ? values['country'] : ''} disabled/>
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


export default AddStudent;