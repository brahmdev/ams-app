import { ActionTypes as types, Urls, Settings } from '../constants';
import HttpClient from '../helpers/HttpClient';
import { mockSignin, mockSigninFailed } from "../store/mock";

const requested = () => ({
  type: types.USER_ACCOUNT.SIGN_IN_REQUESTED,
  payload: {}
});

const failed = ({ code, message }) => ({
  type: types.USER_ACCOUNT.SIGN_IN_FAILED,
  payload: { code, message }
});

const done = user => ({
  type: types.USER_ACCOUNT.SIGN_IN_SUCCESSFUL,
  payload: { user }
});

const api = ({ username, password }) => HttpClient().postAsync(Urls.USER.SIGN_IN, { username, password });

const mock = ({ username, password }) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(mockSignin);
    //reject(mockSigninFailed);
  }, Settings.MOCK_SERVICES_TIMEOUT);
});

const signInRequest = (request) => Settings.USE_MOCK_SERVICES ? mock(request) : api(request);

export const signin = (request) => async (dispatch) => {
  dispatch(requested());

  try {
    let { status, data, message } = await signInRequest(request);
    if (status) {
      dispatch(done(data));
      return Promise.resolve(data);
    } else {
      dispatch(failed({ message }));
      return Promise.reject({ message });
    }
  } catch (error) {
    dispatch(failed({ message: error.message || error }));
    return Promise.reject(error);
  }
};
