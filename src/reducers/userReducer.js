import {
  isUserLoggedIn,
  setLoggeddIn,
  getAdmin,
  setAdmin,
  setInstituteId,
  setBranchId
} from '../utils/userInfo';
import {userActionTypes, apiExecutionState} from '../actions/actionTypes';
import {AsyncStorage} from 'react-native';
import base64 from "base-64";

const initialState = {
  userName: '',
  firstname: '',
  lastname: '',
  avatar: '',
  admin: '',
  isRequesting: false,
  isLoggedIn: false,
  loginError: false,
  loginErrorMessage: '',
  institute: '',
  branch: '',
  authorities: [],
  authString: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case userActionTypes.API_USER_LOGIN + apiExecutionState.STARTED:
      return {
        ...state,
        isRequesting: false
      };
    case userActionTypes.API_USER_LOGIN + apiExecutionState.FINISHED:
      const user = JSON.parse(action.response);

      const instituteId = user.branch.institute.id;
      //setInstituteId(instituteId);

      const branchId = user.branch.id;
      //setBranchId(branchId);
      const { payload } = action;

      //async () => await AsyncStorage.setItem('authString', base64.encode(payload.username + ':' + payload.password));
      const auth = base64.encode(payload.username + ':' + payload.password);
      //setLoggeddIn();
      return {
        ...state,
        userName: user.userName,
        firstname: user.firstname,
        lastname: user.lastname,
        avatar: user.avatar,
        admin: false,
        isRequesting: false,
        isLoggedIn: true,
        loginError: false,
        institute: user.branch.institute,
        branch: user.branch,
        authString: auth
      };
    case userActionTypes.API_GET_USER_AUTHORITIES + apiExecutionState.FINISHED:
      const authorities = JSON.parse(action.response);

      let isAdmin = false;

      for (const authObj of authorities) {
        if (authObj.authority === 'ROLE_ADMIN') {
          isAdmin = true;
          setAdmin(true);
        }
      }
      setLoggeddIn();
      return {
        ...state,
        admin: isAdmin,
        isRequesting: false,
        loginError: false,
        authorities
      };
    case userActionTypes.API_USER_LOGIN + apiExecutionState.ERROR:
    case userActionTypes.API_GET_USER_AUTHORITIES + apiExecutionState.ERROR:
      const errorResponse = action.error;
      let errorMessage = '';
      if (!errorResponse.ok && errorResponse.status === 401) {
        errorMessage = 'Incorrect username or password';
      }
      return {
        ...state,
        loginError: true,
        isUserLoggedIn: false,
        loginErrorMessage: errorMessage,
        isRequesting: false
      };
    case userActionTypes.CLEAR_USER_ERROR_MESSAGES:
      return {
        ...state,
        loginError: false,
        loginErrorMessage: '',
      };
      case userActionTypes.USER_LOG_OUT:
        return {
          ...state,
          userName: '',
          admin: '',
          isRequesting: false,
          isLoggedIn: false,
          loginError: false,
          loginErrorMessage: '',
          institute: '',
          branch: '',
          authorities: [],
          authString: ''
        };
    default:
      return state;
  }
}
