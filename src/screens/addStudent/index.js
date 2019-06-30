import React, {Component} from 'react';
import {KeyboardView} from "../../components/KeyboardView";
import { View, Text } from 'native-base';
import NavigationService from "../../navigation/Navigation-Service";
import AddStudentHeader from "./AddStudentHeader";
import Stepper from 'react-native-js-stepper'
import { StyleSheet } from 'react-native'
import { ProgressSteps, ProgressStep } from '../../components/ProgressSteps';
import AddStudent from "../../components/Student/AddStudent";

class AddStudentScreen extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: <AddStudentHeader goBack={() => NavigationService.goBack()}/>,
    };
  };

  /*state = {
    isValid: false,
    errors: false
  };*/

  constructor(props) {
    super(props);
    this.state = {
      studentPersonalDetailsErrors: [],
      parentDetailsErrors: [],
      studentAcademicDetailsErrors: []
    }
  }

  studentPersonalDetailsRequiredFields = [
    'firstname',
    'lastname',
    'username',
    'password',
    'mobile',
    'gender',
    'dob',
    'email',
    'address',
    'city',
    'zip',
  ];

  studentPersonalDetailsFieldsValue =  {
    dob: new Date(),
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India'
  };

  componentDidMount() {

  };

  defaultScrollViewProps = {
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: {
      flex: 1,
      justifyContent: 'center'
    }
  };

  onNextStep = () => {
    console.log('called next step');
  };

  onPaymentStepComplete = () => {
    alert('Payment step completed!');
    //this.setState({errors: true, isValid: false})
  };

  onPrevStep = () => {
    console.log('called previous step');
  };

  onSubmitSteps = () => {
    console.log('called on submit step.');
  };

  onChangeStudentPersonalDetailsFormField = (data) => {
    const {name, value} = data;
    const {studentPersonalDetailsErrors} = this.state;
    this.studentPersonalDetailsFieldsValue[name] = value;
    if ((value && value.length > 0) || (name === 'dob' && this.isValidDate(value))) {
      studentPersonalDetailsErrors[name] = false;
      this.setState({studentPersonalDetailsErrors, isStudentPersonalDetailsFormValid: false});
    }
    if (this.studentPersonalDetailsFieldsValue.username && this.studentPersonalDetailsFieldsValue.username.trim().length > 0) {
      return;
    } else if (this.studentPersonalDetailsFieldsValue.firstname && this.studentPersonalDetailsFieldsValue.lastname && this.studentPersonalDetailsFieldsValue.firstname.trim().length > 0 && this.studentPersonalDetailsFieldsValue.lastname.trim().length > 0) {
      const studentPersonalDetailsFieldsValue = this.studentPersonalDetailsFieldsValue;
      studentPersonalDetailsFieldsValue.username = this.makeUserName(this.studentPersonalDetailsFieldsValue.firstname, this.studentPersonalDetailsFieldsValue.lastname, 6);
      studentPersonalDetailsErrors.username = false;
      this.setState({studentPersonalDetailsErrors});
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ProgressSteps>
          <ProgressStep
            label="Personal"
            onNext={this.onPaymentStepComplete}
            onPrevious={this.onPrevStep}
            errors={this.state.errors}
            scrollViewProps={this.defaultScrollViewProps}
          >
              <AddStudent onChange={this.onChangeStudentPersonalDetailsFormField}
                          errors={this.state.studentPersonalDetailsErrors}
                          values={this.studentPersonalDetailsFieldsValue}/>
          </ProgressStep>
          <ProgressStep
            label="Parent"
            onNext={this.onNextStep}
            onPrevious={this.onPrevStep}
            errors={this.state.errors}
            scrollViewProps={this.defaultScrollViewProps}
          >
            <View style={{ alignItems: 'center' }}>
              <Text>Shipping address step content</Text>
            </View>
          </ProgressStep>
          <ProgressStep
            label="Academic"
            onNext={this.onNextStep}
            onPrevious={this.onPrevStep}
            errors={this.state.errors}
            scrollViewProps={this.defaultScrollViewProps}
          >
            <View style={{ alignItems: 'center' }}>
              <Text>Billing address step content</Text>
            </View>
          </ProgressStep>
          <ProgressStep
            label="Agreement"
            onPrevious={this.onPrevStep}
            onSubmit={this.onSubmitSteps}
            errors={this.state.errors}
            scrollViewProps={this.defaultScrollViewProps}
          >
            <View style={{ alignItems: 'center' }}>
              <Text>Confirm order step content</Text>
            </View>
          </ProgressStep>
        </ProgressSteps>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  activeDot: {
    backgroundColor: 'grey'
  },
  inactiveDot: {
    backgroundColor: '#ededed'
  },
  activeStep: {
    backgroundColor: 'grey'
  },
  inactiveStep: {
    backgroundColor: '#ededed'
  },
  activeStepTitle: {
    fontWeight: 'bold'
  },
  inactiveStepTitle: {
    fontWeight: 'normal'
  },
  activeStepNumber: {
    color: 'white'
  },
  inactiveStepNumber: {
    color: 'black'
  }
});

export default AddStudentScreen;