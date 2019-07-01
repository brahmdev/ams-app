import React, {Component} from 'react';
import {KeyboardView} from "../KeyboardView";
import {Container, Content, Form, Icon, Input, Item, Label, Picker, DatePicker} from "native-base";
import {ScrollView, StyleSheet} from "react-native";

class AddParent extends Component {

  render() {
    const {errors, values, onChange} = this.props;

    return (
      <KeyboardView style={{flex: 1}}>
        <Container noStatusbarPadding>
          <Content>
            <ScrollView>
              <Form>
                <Item floatingLabel>
                  <Label>FirstName</Label>
                  <Input value={values['firstname'] ? values['firstname'] : ''} name="firstname" onChangeText={val => onChange("firstname", val)}/>
                </Item>
                <Item floatingLabel>
                  <Label>LastName</Label>
                  <Input value={values['lastname'] ? values['lastname'] : ''} name="lastname" onChangeText={val => onChange("lastname", val)}/>
                </Item>
                <Item floatingLabel disabled>
                  <Label>UserName</Label>
                  <Input value={values['username'] ? values['username'] : ''} disabled/>
                </Item>
                <Item floatingLabel disabled>
                  <Label>Password</Label>
                  <Input value={values['password'] ? values['password'] : ''} name="password" onChangeText={val => onChange("password", val)}/>
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
                    minimumDate={new Date(1980, 1, 1)}
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
                <Item floatingLabel>
                  <Label>Relation</Label>
                  <Input rowSpan={5} value={values['relation'] ? values['relation'] : ''} bordered name="relation" onChangeText={val => onChange("relation", val)}/>
                </Item>
                <Item floatingLabel>
                  <Label>Occupation</Label>
                  <Input value={values['occupation'] ? values['occupation'] : ''} name="occupation" onChangeText={val => onChange("occupation", val)}/>
                </Item>
                <Item floatingLabel>
                  <Label>Income</Label>
                  <Input value={values['income'] ? values['income'] : ''} name="income" onChangeText={val => onChange("income", val)}/>
                </Item>
                <Item floatingLabel>
                  <Label>Education</Label>
                  <Input value={values['education'] ? values['education'] : ''} name="education" onChangeText={val => onChange("education", val)}/>
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


export default AddParent;