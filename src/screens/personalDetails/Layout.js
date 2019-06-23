import React, {Component} from 'react';
import {ScrollView, StyleSheet} from "react-native";
import {Container, Header, Content, Form, Item, Input, Label, Textarea, Icon, Picker} from 'native-base';
import {KeyboardView} from "../../components/KeyboardView";

class Layout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gender: ""
    };
  }

  componentDidMount() {
    console.log('gender ', this.props.user.gender);
    this.state = {
      gender: this.props.user.gender
    };
  }

  onValueChange(value) {
    this.setState({
      gender: value
    });
  }

  render() {
    console.log('user in personal ', this.props.user);
    const {user: {firstname, lastname, username, mobile, email, gender, address, city, zip, state, country}} = this.props;
    return (
      <KeyboardView style={{flex: 1}}>
        <Container noStatusbarPadding>
          <Content>
            <ScrollView>
              <Form>
                <Item floatingLabel>
                  <Label>FirstName</Label>
                  <Input value={firstname}/>
                </Item>
                <Item floatingLabel>
                  <Label>LastName</Label>
                  <Input value={lastname}/>
                </Item>
                <Item floatingLabel disabled>
                  <Label>UserName</Label>
                  <Input value={username} disabled/>
                </Item>
                <Item floatingLabel>
                  <Label>Mobile</Label>
                  <Input value={mobile}/>
                </Item>
                <Item floatingLabel>
                  <Label>E-mail</Label>
                  <Input value={email}/>
                </Item>
                <Item>
                  <Label>Gender</Label>
                  <Picker
                    inlineLabel
                    mode="dropdown"
                    iosHeader="Gender"
                    style={styles.picker}
                    itemTextStyle={styles.itemStyle}
                    textStyle={{textAlign: 'center'}}
                    iosIcon={<Icon name="arrow-down" />}
                    selectedValue={gender}
                    onValueChange={this.onValueChange.bind(this)}
                  >
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                    <Picker.Item label="Others" value="Others" />
                  </Picker>
                </Item>
                <Item floatingLabel>
                  <Label>Address</Label>
                  <Textarea rowSpan={5} value={address} bordered/>
                </Item>
                <Item floatingLabel>
                  <Label>City</Label>
                  <Input value={city}/>
                </Item>
                <Item floatingLabel>
                  <Label>Zip</Label>
                  <Input value={zip}/>
                </Item>
                <Item floatingLabel disabled>
                  <Label>State</Label>
                  <Input value={state} disabled/>
                </Item>
                <Item floatingLabel disabled>
                  <Label>Country</Label>
                  <Input value={country} disabled/>
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


export default Layout;