import { studentActionTypes, apiExecutionState} from '../actions/actionTypes';

const initialState = {
  id: '',
  rollNo: '',
  username: '',
  firstname: '',
  lastname: '',
  email: '',
  mobile: '',
  phone: '',
  password: '',
  resetPasswordCode: '',
  dob: '',
  bloodGroup: '',
  photo: '',
  address: '',
  city: '',
  state: '',
  country: '',
  enabled: '',
  gender: '',
  language: '',
  created: '',
  updated: '',
  paidFees: '',
  studentList: [],
  parentDetails: '',
  studentDetailses: '',
  standardLookUp: {},
  batchLookUp: {},
  errorMessage: '',
  isRequesting: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case studentActionTypes.API_GET_ALL_STANDARD_LOOKUP_FOR_STUDENT_ADMISSION + apiExecutionState.FINISHED:
      const standardLookUp = JSON.parse(action.response);
      return {
        ...state,
        standardLookUp
      };
    case studentActionTypes.API_GET_BATCH_FOR_STUDENT_ADMISSION + apiExecutionState.FINISHED:
      const batchLookUp = JSON.parse(action.response);
      return {
        ...state,
        batchLookUp
      };
    case studentActionTypes.API_GET_STANDARD + apiExecutionState.FINISHED:
      const standard = JSON.parse(action.response);
      return {
        ...state,
        standardLookUp
      };
    case studentActionTypes.API_GET_ALL_STUDENTS + apiExecutionState.STARTED:
    case studentActionTypes.API_UPDATE_STUDENT + apiExecutionState.STARTED:
    case studentActionTypes.API_DELETE_STUDENT + apiExecutionState.STARTED:
      return {
        ...state,
        isRequesting: true
      };
    case studentActionTypes.API_GET_ALL_STUDENTS + apiExecutionState.FINISHED:
      let studentList = JSON.parse(action.response);
      for(const student of studentList) {
        let feesCollections = student.studentDetailses[0].feesCollections;
        let paidFees = 0;
        for(const feesCollection of feesCollections) {
          paidFees = paidFees + feesCollection.amount;
        }
        student.studentDetailses[0].paidFees = paidFees;
        feesCollections.sort(function (a, b) {
          // to get a value that is either negative, positive, or zero.
          return b.id - a.id;
        });
      }
      //console.log('studentList ', studentList);
      return {
        ...state,
        studentList,
        errorMessage: '',
        isRequesting: false
      };
    case studentActionTypes.API_GET_PARENT + apiExecutionState.FINISHED:
      const parentDetails = JSON.parse(action.response);
      return {
        ...state,
        parentDetails
      };
    case studentActionTypes.API_UPDATE_STUDENT + apiExecutionState.FINISHED:
      const updatedResponse = JSON.parse(action.response);
      state.studentDetailses = updatedResponse.studentDetailses;
      studentList = state.studentList;
      for (let index = 0; index < studentList.length; index++) {
        if (updatedResponse.id === studentList[index].id) {
          studentList[index] = updatedResponse;
          studentList[index].studentDetailses[0].paidFees = action.data.user.studentDetailses[0].paidFees;
        }
      }
      return {
        ...state,
        studentList,
        isRequesting: false
      };
    case studentActionTypes.API_DELETE_STUDENT + apiExecutionState.FINISHED:
      studentList = state.studentList;
      for (let index = 0; index < studentList.length; index++) {
        if (action.data === studentList[index].id) {
          studentList.splice(index, 1);
        }
      }
      return {
        ...state,
        studentList,
        isRequesting: false
      };
    case studentActionTypes.STORE_UPDATE_SELECTED_USER:
      let user = action.data;
      state = Object.assign(state, user);
      return {
        ...state,
        errorMessage: '',
        isRequesting: false
      };
    case studentActionTypes.STORE_UPDATE_FEES_COLLECTION:
      const feesCollection = action.data;
      state.studentDetailses[0].feesCollections.unshift(feesCollection);
      studentList = state.studentList;
      for (let index = 0; index < studentList.length; index++) {
        if (state.id === studentList[index].id) {
          studentList[index].studentDetailses[0].feesCollections.unshift(feesCollection);
        }
      }
      return {
        ...state,
        errorMessage: '',
        isRequesting: false
      };
    case studentActionTypes.API_GET_ALL_STANDARD_LOOKUP_FOR_STUDENT_ADMISSION + apiExecutionState.ERROR:
    case studentActionTypes.API_GET_BATCH_FOR_STUDENT_ADMISSION + apiExecutionState.ERROR:
    case studentActionTypes.API_GET_STANDARD + apiExecutionState.ERROR:
    case studentActionTypes.API_UPDATE_STUDENT + apiExecutionState.ERROR:
    case studentActionTypes.API_DELETE_STUDENT + apiExecutionState.ERROR:
    case studentActionTypes.STORE_UPDATE_SELECTED_USER:
    case studentActionTypes.STORE_UPDATE_FEES_COLLECTION:
    case studentActionTypes.API_GET_ALL_STUDENTS + apiExecutionState.ERROR:
      return {
        ...state,
        errorMessage: 'Something went wrong. Please contact Administrator',
        isRequesting: false
      };
    default:
      return state;
  }
}
