import {standardActionTypes, CALL_API, studentActionTypes} from './actionTypes';

export function getAllStandards(instituteId) {
  return {
    type: standardActionTypes.API_GET_ALL_STANDARDS,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/standards/${instituteId}`,
      options: {
        method: 'GET'
      }
    },
  };
}

export function getStandard(standardId) {
  return {
    type: standardActionTypes.API_GET_STANDARD,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/standards/${standardId}/current`,
      options: {
        method: 'GET'
      }
    },
  };
}

export function getAllStandardLookUp(instituteId) {
  return {
    type: standardActionTypes.API_GET_ALL_STANDARDS_LOOKUP,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/standards/${instituteId}/lookup`,
      options: {
        method: 'GET'
      }
    },
  };
}

export function createStandard(standard) {
  return {
    type: standardActionTypes.API_CREATE_STANDARD,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/standards/`,
      options: {
        method: 'POST',
        contentType: 'application/json',
        body: JSON.stringify(standard)
      }
    },
    payload: { standard }
  };
}

export function updateStandard(standard) {
  return {
    type: standardActionTypes.API_UPDATE_STANDARD,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/standards/`,
      options: {
        method: 'POST',
        contentType: 'application/json',
        body: JSON.stringify(standard)
      },
    },
    payload: standard
  };
}

export function deleteStandard(standardId) {
  return {
    type: standardActionTypes.API_DELETE_STANDARD,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/standards/${standardId}`,
      options: {
        method: 'DELETE',
        contentType: 'application/json'
      },
    },
    payload: standardId
  };
}