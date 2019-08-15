import {CALL_API, dashBoardActionTypes} from './actionTypes';

export function getDashBoardData(branchId= 1, authString) {
  return {
    type: dashBoardActionTypes.API_GET_DASHBOARD_DATA,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/dashboard/${branchId}`,
      options: {
        method: 'GET'
      },
      payload: {
        authString
      }
    },
  };
}