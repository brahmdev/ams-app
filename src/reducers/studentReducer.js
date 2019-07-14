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

        feesCollections.sort(function (a, b) {
          // to get a value that is either negative, positive, or zero.
          return b.id - a.id;
        });
      }
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
    case studentActionTypes.API_UPDATE_STUDENT + apiExecutionState.FINISHED:
      state.studentDetails = action.data.user.studentDetailses;
      return {
        ...state,
        isRequesting: false
      };
    case studentActionTypes.API_DELETE_STUDENT + apiExecutionState.FINISHED:
      console.log('student to be removed from state is ', action.data);
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
    default:
      return state;
  }
}
