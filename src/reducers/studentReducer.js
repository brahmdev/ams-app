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
  studentList: [],
  parentDetails: '',
  studentDetails: '',
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
      console.log('in started studetn get all');
      return {
        ...state,
        isRequesting: true
      };
    case studentActionTypes.API_GET_ALL_STUDENTS + apiExecutionState.FINISHED:
      const studentList = JSON.parse(action.response);
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
    case studentActionTypes.API_GET_ALL_STUDENTS + apiExecutionState.ERROR:
      return {
        ...state,
        errorMessage: 'You are not allowed to access this resource',
        isRequesting: false
      };
    default:
      return state;
  }
}
