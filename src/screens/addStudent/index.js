import React, {Component} from 'react';
import {connect} from 'react-redux';
import { View, Text } from 'native-base';
import NavigationService from "../../navigation/Navigation-Service";
import AddStudentHeader from "./AddStudentHeader";
import Stepper from 'react-native-js-stepper'
import { StyleSheet } from 'react-native'
import { ProgressSteps, ProgressStep } from '../../components/ProgressSteps';
import AddStudent from "../../components/Student/AddStudent";
import AddParent from "../../components/Student/AddParent";
import { getAllStandardLookUpForStudent, getAllBatchOfStandardLookUp, saveOrUpdateUser } from "../../actions/studentActions";
import { getStandard } from "../../actions/standardActions";
import AddAcademics from "../../components/Student/AddAcademics";

class AddStudentScreen extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: <AddStudentHeader goBack={() => NavigationService.goBack()}/>,
    };
  };

  state = {
    isValid: false,
    errors: false,
    studentPersonalDetailsErrors: [],
    parentDetailsErrors: [],
    studentAcademicDetailsErrors: []
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

  parentDetailsRequiredFields = [
    'firstname',
    'lastname',
    'username',
    'password',
    'mobile',
    'gender',
    'email'
  ];

  parentDetailsFieldsValue =  {};

  studentAcademicDetailsRequiredFields = [
    'rollNo',
    'admissionDate',
    'standard',
    'batch'
  ];

  studentAcademicDetailsFieldsValue = {
    admissionDate: new Date(),
    hasPaidFees: false
  };

  componentDidMount() {
    const branchId = 1;
    this.props.getAllStandardLookUpForStudent(branchId, this.props.user.authString);
  }


  onNextStep = () => {
    console.log('called next step');
  };

  onPersonalDetailComplete = () => {
    console.log('studentPersonalDetailsFieldsValue ', this.studentPersonalDetailsFieldsValue);
    //this.setState({errors: true, isValid: false})
  };

  onParentDetailComplete = () => {
    console.log('parentDetailsFieldsValue ', this.parentDetailsFieldsValue);
  };

  onPrevStep = () => {
    console.log('called previous step');
  };

  onSubmitSteps = () => {
    console.log('called on submit step.');
  };

  makeUserName = (firstname, lastname, length) => {
    var name = firstname + lastname;
    var username = '';
    var characters = name;
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      username += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return username;
  };

  isValidDate(d) {
    return d instanceof Date && !isNaN(d);
  };

  onChangeStudentPersonalDetailsFormField = (name, value) => {
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

  onChangeParentDetailsFormField = (name, value) => {
    const {parentDetailsErrors} = this.state;
    this.parentDetailsFieldsValue[name] = value;
    if (value && value.length > 0) {
      parentDetailsErrors[name] = false;
      this.setState({parentDetailsErrors, isParentDetailsFormInValid: false});
    }
    if (this.parentDetailsFieldsValue.username && this.parentDetailsFieldsValue.username.trim().length > 0) {
      return;
    } else if (this.parentDetailsFieldsValue.firstname && this.parentDetailsFieldsValue.lastname && this.parentDetailsFieldsValue.firstname.trim().length > 0 && this.parentDetailsFieldsValue.lastname.trim().length > 0) {
      const parentDetailsRequiredFields = this.parentDetailsFieldsValue;
      parentDetailsRequiredFields.username = this.makeUserName(this.parentDetailsFieldsValue.firstname, this.parentDetailsFieldsValue.lastname, 6);
      parentDetailsErrors.username = false;
      this.setState({parentDetailsErrors});
    }
  };

  handleStandardChange(standardId) {
    this.props.getAllBatchOfStandardLookUp(standardId, this.props.user.authString);
    this.props.getStandard(standardId, this.props.user.authString);
  };

  onChangeStudentAcademicDetailsFormField = (data) => {
    const {name, value} = data;
    const {studentAcademicDetailsErrors} = this.state;
    this.studentAcademicDetailsFieldsValue[name] = value;
    if (value && value.length > 0) {
      studentAcademicDetailsErrors[name] = false;
      this.setState({studentAcademicDetailsErrors, isParentDetailsFormInValid: false});
    }
  };


  render() {
    return (
      <View style={{ flex: 1 }}>
        <ProgressSteps>
          <ProgressStep
            label="Personal"
            onNext={this.onPersonalDetailComplete}
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
            onNext={this.onParentDetailComplete}
            onPrevious={this.onPrevStep}
            errors={this.state.errors}
            scrollViewProps={this.defaultScrollViewProps}
          >
            <AddParent onChange={this.onChangeParentDetailsFormField}
                        errors={this.state.parentDetailsErrors}
                        values={this.parentDetailsFieldsValue}/>
          </ProgressStep>
          <ProgressStep
            label="Academic"
            onNext={this.onNextStep}
            onPrevious={this.onPrevStep}
            errors={this.state.errors}
            scrollViewProps={this.defaultScrollViewProps}
          >
            <AddAcademics onChange={this.onChangeStudentAcademicDetailsFormField}
                                        errors={this.state.studentAcademicDetailsErrors}
                                        values={this.studentAcademicDetailsFieldsValue}
                                        standardLookUp={this.props.student.standardLookUp}
                                        onStandardChange={(standardId) => this.handleStandardChange(standardId)}
                                        batchLookUp={this.props.student.batchLookUp}/>
          </ProgressStep>
          <ProgressStep
            label="Agreement"
            onPrevious={this.onPrevStep}
            onSubmit={this.onSubmitSteps}
            errors={this.state.errors}
            scrollViewProps={this.defaultScrollViewProps}
          >
              <Text>Confirm order step content</Text>
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

function mapStateToProps(state) {
  const {subject, standard, student, user} = state;
  return {standard, subject, student, user};
}

const mapDispatchToProps = {
  getStandard,
  getAllStandardLookUpForStudent,
  getAllBatchOfStandardLookUp,
  createUser: saveOrUpdateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(AddStudentScreen);
