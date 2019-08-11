import React, {Component} from 'react';
import {connect} from 'react-redux';
import { View, Text } from 'native-base';
import NavigationService from "../../navigation/Navigation-Service";
import AddStudentHeader from "./AddStudentHeader";
import { StyleSheet } from 'react-native'
import { ProgressSteps, ProgressStep } from '../../components/ProgressSteps';
import AddStudent from "../../components/Student/AddStudent";
import AddParent from "../../components/Student/AddParent";
import {
  getAllStandardLookUpForStudent,
  getAllBatchOfStandardLookUp,
  saveOrUpdateUser,
  uploadImage,
  uploadBase64Image
} from "../../actions/studentActions";
import { getStandard } from "../../actions/standardActions";
import AddAcademics from "../../components/Student/AddAcademics";
import SignaturePhoto from "../../components/Student/SignaturePhoto";
import Avatar from "../../components/Student/Avatar";
import {SERVER_BASE_PATH} from "../../utils";

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
    studentAcademicDetailsErrors: [],
    batchLookupList: {},
    firstBatchAfterStandardChange: null
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

  parentDetailsRequiredFields = [
    'firstname',
    'lastname',
    'username',
    'password',
    'mobile',
    'gender',
    'email'
  ];

  studentAcademicDetailsRequiredFields = [
    'rollNo',
    'admissionDate',
    'standard',
    'batch',
    'totalFees'
  ];

  studentUser = '';
  parentUser = '';
  branch =  {
    "id": 1
  };

  studentPersonalDetailsFieldsValue = {};
  parentDetailsFieldsValue = {};
  studentAcademicDetailsFieldsValue = {};
  avatar = '';
  sign = '';

  componentDidMount() {
    this.resetAndInitializeWizardValues();
    const branchId = 1;
    this.props.getAllStandardLookUpForStudent(branchId, this.props.user.authString);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (Object.keys(nextProps.userData.batchLookUp).length > 0 && prevState.firstBatchAfterStandardChange === null) {
      return ({ firstBatchAfterStandardChange: Object.keys(nextProps.userData.batchLookUp)[0].id, batchLookUpList: nextProps.userData.batchLookUp })
    } else {
      return ({ batchLookUpList: nextProps.userData.batchLookUp })
    }
    return true;
  }

  resetAndInitializeWizardValues = ()  => {
    this.studentPersonalDetailsFieldsValue = {};
    this.parentDetailsFieldsValue = {};
    this.studentAcademicDetailsFieldsValue = {};

    this.studentPersonalDetailsFieldsValue =  {
      password: "student123",
      dob: new Date(),
      gender: "Male",
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      //mobile: '1234567890',
      //address: 'testAddress'
    };
    this.parentDetailsFieldsValue =  {
      password: "parent123",
      gender: "Male",
      //mobile: '1234567890',
      //relation: 'Father'
    };
    this.studentAcademicDetailsFieldsValue = {
      admissionDate: new Date(),
      hasPaidFees: false
    };
    this.setState({
      errors: false,
      studentPersonalDetailsErrors: [],
      parentDetailsErrors: [],
      studentAcademicDetailsErrors: []
    });

  };

  onNextStep = () => {
    console.log('called next step');
  };

  onPersonalDetailComplete = () => {
    console.log('studentPersonalDetailsFieldsValue ', this.studentPersonalDetailsFieldsValue);
    const { firstname, lastname, address, username} = this.studentUser;
    if (firstname === undefined || lastname === undefined || address === undefined || username === undefined) {
      this.setState({
        errors: true
      });
      this.showErrorOnPersonalDetailField(firstname, lastname, address, username);
    } else {
      this.setState({
        errors: false
      });
    }
    this.studentUser = this.studentPersonalDetailsFieldsValue;
    this.studentUser.branch = this.branch;
    const authoritiesesStudent = {
      username: this.studentUser.username,
      authority: 'ROLE_STUDENT'
    };
    this.studentUser.created = new Date();
    this.studentUser.authoritieses = [authoritiesesStudent];
  };

  showErrorOnPersonalDetailField = (firstname, lastname, address, username) => {
    let errorFields = [];
    console.log(address, ' : ', username);
    if (firstname === undefined) {
      errorFields.push("firstname");
    }
    if (lastname === undefined) {
      errorFields.push("lastname");
    }
    if (address === undefined) {
      errorFields.push("address");
    }
    if (username === undefined) {
      errorFields.push("username");
    }
    this.setState({
      studentPersonalDetailsErrors: errorFields
    })

  };

  onParentDetailComplete = () => {
    const { firstname, lastname, username, mobile, relation} = this.parentDetailsFieldsValue;
    if (firstname === undefined || lastname === undefined || username === undefined || mobile === undefined || relation === undefined) {
      this.setState({
        errors: true
      });
      this.showErrorOnParentDetailField(firstname, lastname, username, mobile, relation);
    } else {
      this.setState({
        errors: false
      });
    }
    this.parentUser = this.parentDetailsFieldsValue;
    this.parentUser.branch = this.branch;
    this.parentUser.address = this.studentUser.address;
    this.parentUser.city = this.studentUser.city;
    this.parentUser.state = this.studentUser.state;
    this.parentUser.zip = this.studentUser.zip;
    this.parentUser.country = this.studentUser.country;
    this.parentUser.created = new Date();

    let parentDetails = {};
    parentDetails.relation = this.parentDetailsFieldsValue.relation;
    parentDetails.occupation = this.parentDetailsFieldsValue.occupation;
    parentDetails.education = this.parentDetailsFieldsValue.education;
    parentDetails.income = this.parentDetailsFieldsValue.income;
    this.parentUser.parentDetailses = [parentDetails];

    const authoritiesesParent = {
      username: this.parentUser.username,
      authority: 'ROLE_PARENT'
    };
    this.parentUser.authoritieses = [authoritiesesParent];
  };

  showErrorOnParentDetailField = (firstname, lastname, username, mobile, relation) => {
    let errorFields = [];
    if (firstname === undefined) {
      errorFields.push("firstname");
    }
    if (lastname === undefined) {
      errorFields.push("lastname");
    }
    if (mobile === undefined) {
      errorFields.push("mobile");
    }
    if (username === undefined) {
      errorFields.push("username");
    }
    if (relation === undefined) {
      errorFields.push("relation");
    }
    this.setState({
      parentDetailsErrors: errorFields
    })
  };

  onAcademicDetailComplete = () => {
    const { standard, batch, totalFees, rollNo } = this.studentAcademicDetailsFieldsValue;
    this.showErrorOnAcademicDetailField(rollNo, standard, batch, totalFees);

    if (standard === undefined || standard === "-1" || batch === undefined || batch === "-1" || totalFees === undefined || rollNo === undefined) {
      this.setState({
        errors: true
      });
    } else {
      this.setState({
        errors: false
      });
    }
    if (this.studentAcademicDetailsFieldsValue.hasPaidFees === true) {
      this.studentAcademicDetailsFieldsValue.hasPaidFees = "Y";
    } else {
      this.studentAcademicDetailsFieldsValue.hasPaidFees = "N";
    }
    let selectedBatchId = this.studentAcademicDetailsFieldsValue.batch;
    if (selectedBatchId === undefined) {
      selectedBatchId = this.state.firstBatchAfterStandardChange;
    }
    delete this.studentAcademicDetailsFieldsValue['batch'];
    const batchToBeAssign = {
      "id": selectedBatchId
    };
    this.studentAcademicDetailsFieldsValue.batch = batchToBeAssign;
    this.studentAcademicDetailsFieldsValue.parentsUsername = this.parentDetailsFieldsValue.username;

    this.studentUser.studentDetailses = [this.studentAcademicDetailsFieldsValue];
  };

  showErrorOnAcademicDetailField = (rollNo, standard, batch, totalFees) => {
    let errorFields = [];
    if (rollNo === undefined) {
      errorFields.push("rollNo");
    }
    if (standard === undefined) {
      errorFields.push("standard");
    }
    if (batch === undefined) {
      errorFields.push("batch");
    }
    if (totalFees === undefined) {
      errorFields.push("totalFees");
    }
    this.setState({
      studentAcademicDetailsErrors: errorFields
    })

  };

  onPrevStep = () => {
    console.log('called previous step');
  };

  onSubmitSteps = () => {
    this.studentUser.avatar = 'https://devarena-ams.s3.amazonaws.com/test/avatar/' + this.studentUser.username +'.png';
    this.studentUser.signature = 'https://devarena-ams.s3.amazonaws.com/test/signature/' + this.studentUser.username +'.png';

    this.props.createUser(this.studentUser, this.props.user.authString);
    this.props.createUser(this.parentUser, this.props.user.authString);

    console.log('student data is ', this.studentUser);
    let formData = new FormData();
    formData.append('file', {
      uri : this.avatar,
      type: 'image/jpg',
      name: this.studentUser.username
    });
    this.props.uploadImage(formData, this.props.user.authString);

    this.props.uploadBase64Image(this.sign, this.studentUser.username, this.props.user.authString);

    this.resetAndInitializeWizardValues();
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
    const { firstname, lastname, address, username } = this.studentPersonalDetailsFieldsValue;
    this.studentPersonalDetailsFieldsValue[name] = value;
    if ((value && value.length > 0) || (name === 'dob' && this.isValidDate(value))) {
      studentPersonalDetailsErrors[name] = false;
      this.setState({studentPersonalDetailsErrors, isStudentPersonalDetailsFormValid: false});
    }
    if ((name === "firstname" || name ===  "lastname") && value.trim().length === 0) {
      this.studentPersonalDetailsFieldsValue.username = '';
    } else if (firstname && lastname && firstname.trim().length > 0 && lastname.trim().length > 0) {
      const studentPersonalDetailsFieldsValue = this.studentPersonalDetailsFieldsValue;
      studentPersonalDetailsFieldsValue.username = this.makeUserName(this.studentPersonalDetailsFieldsValue.firstname, this.studentPersonalDetailsFieldsValue.lastname, 6);
      studentPersonalDetailsErrors.username = false;
    }
    this.showErrorOnPersonalDetailField(firstname, lastname, address, username)

  };

  onChangeParentDetailsFormField = (name, value) => {
    const {parentDetailsErrors} = this.state;
    const {firstname, lastname, username, mobile, relation} = this.parentDetailsFieldsValue;
    this.parentDetailsFieldsValue[name] = value;
    if (value && value.length > 0) {
      parentDetailsErrors[name] = false;
      this.setState({parentDetailsErrors, isParentDetailsFormInValid: false});
    }
    if (this.parentDetailsFieldsValue.username && this.parentDetailsFieldsValue.username.trim().length > 0) {
      this.showErrorOnParentDetailField(firstname, lastname, username, mobile, relation);
      return;
    } else if (this.parentDetailsFieldsValue.firstname && this.parentDetailsFieldsValue.lastname && this.parentDetailsFieldsValue.firstname.trim().length > 0 && this.parentDetailsFieldsValue.lastname.trim().length > 0) {
      const parentDetailsRequiredFields = this.parentDetailsFieldsValue;
      parentDetailsRequiredFields.username = this.makeUserName(this.parentDetailsFieldsValue.firstname, this.parentDetailsFieldsValue.lastname, 6);
      parentDetailsErrors.username = false;
    }
    this.showErrorOnParentDetailField(firstname, lastname, username, mobile, relation);
  };


  handleStandardChange(standardId) {
    this.props.getAllBatchOfStandardLookUp(standardId, this.props.user.authString);
    this.props.getStandard(standardId, this.props.user.authString);
  };

  onChangeStudentAcademicDetailsFormField = (name, value) => {
    const {studentAcademicDetailsErrors} = this.state;
    const { rollNo, standard, batch, totalFees } = this.studentAcademicDetailsFieldsValue;

    this.studentAcademicDetailsFieldsValue[name] = value;
    if (value && value.length > 0) {
      studentAcademicDetailsErrors[name] = false;
      this.setState({studentAcademicDetailsErrors, isParentDetailsFormInValid: false});
    }
    this.showErrorOnAcademicDetailField(rollNo, standard, batch, totalFees);
  };

  onAvatarChange = (avatar)  => {
    console.log('this.avatar is ', avatar);
    this.avatar = avatar;
  };

  onSignChange = (sign) => {
    this.sign = sign;
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
            onNext={this.onAcademicDetailComplete}
            onPrevious={this.onPrevStep}
            errors={this.state.errors}
            scrollViewProps={this.defaultScrollViewProps}
          >
            <AddAcademics onChange={this.onChangeStudentAcademicDetailsFormField}
                                        errors={this.state.studentAcademicDetailsErrors}
                                        values={this.studentAcademicDetailsFieldsValue}
                                        standardLookUp={this.props.userData.standardLookUp}
                                        onStandardChange={(standardId) => this.handleStandardChange(standardId)}
                                        batchLookUp={this.state.batchLookUpList}/>
          </ProgressStep>

          <ProgressStep
            label="Photo"
            onPrevious={this.onPrevStep}
            onNext={this.onNextStep}
            errors={this.state.errors}
            scrollViewProps={this.defaultScrollViewProps}
          >
            <Avatar onAvatarChange={this.onAvatarChange}/>
          </ProgressStep>

          <ProgressStep
            label="Sign"
            onPrevious={this.onPrevStep}
            onSubmit={this.onSubmitSteps}
            errors={this.state.errors}
            scrollViewProps={this.defaultScrollViewProps}
          >
              <SignaturePhoto onSignChange={this.onSignChange}/>
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
  const {subject, standard, userData, user} = state;
  return {standard, subject, userData, user};
}

const mapDispatchToProps = {
  getStandard,
  getAllStandardLookUpForStudent,
  getAllBatchOfStandardLookUp,
  createUser: saveOrUpdateUser,
  uploadImage,
  uploadBase64Image
};

export default connect(mapStateToProps, mapDispatchToProps)(AddStudentScreen);
