import {subjectActionTypes, CALL_API} from './actionTypes';

export function getAllSubjects(instituteId) {
  return {
    type: subjectActionTypes.API_GET_ALL_SUBJECTS,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/subjects/${instituteId}`,
      options: {
        method: 'GET'
      }
    },
  };
}

export function getAllSubjectLookUp(instituteId) {
  return {
    type: subjectActionTypes.API_GET_ALL_SUBJECTS_LOOKUP,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/subjects/${instituteId}/lookup`,
      options: {
        method: 'GET'
      }
    },
  };
}

export function createSubject(standard) {
  return {
    type: subjectActionTypes.API_CREATE_SUBJECT,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/subjects/`,
      options: {
        method: 'POST',
        contentType: 'application/json',
        body: JSON.stringify(standard)
      }
    },
    payload: { standard }
  };
}

export function updateSubject(standard) {
  return {
    type: subjectActionTypes.API_UPDATE_SUBJECT,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/subjects/`,
      options: {
        method: 'POST',
        contentType: 'application/json',
        body: JSON.stringify(standard)
      },
    },
    payload: standard
  };
}

export function deleteSubject(subjectId) {
  return {
    type: subjectActionTypes.API_DELETE_SUBJECT,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/subjects/${subjectId}`,
      options: {
        method: 'DELETE',
        contentType: 'application/json'
      },
    },
    payload: subjectId
  };
}