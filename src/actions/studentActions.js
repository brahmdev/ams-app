import {subjectActionTypes, studentActionTypes, CALL_API} from './actionTypes';

export function getAllStudents(branchId= 1, authString) {
  console.log('get all students ', authString);
  return {
    type: studentActionTypes.API_GET_ALL_STUDENTS,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/users/${branchId}/ROLE_STUDENT`,
      options: {
        method: 'GET'
      },
      payload: {
        authString
      }
    },
  };
}


export function getParentDetails(studentUserName) {
  return {
    type: studentActionTypes.API_GET_PARENT,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/users/parent/${studentUserName}`,
      options: {
        method: 'GET'
      }
    },
  };
}

export function getAllStandardLookUpForStudent(instituteId) {
  return {
    type: studentActionTypes.API_GET_ALL_STANDARD_LOOKUP_FOR_STUDENT_ADMISSION,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/standards/${instituteId}/lookup`,
      options: {
        method: 'GET'
      }
    },
  };
}

export function getAllBatchOfStandardLookUp(standardId) {
  return {
    type: studentActionTypes.API_GET_BATCH_FOR_STUDENT_ADMISSION,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/batches/standard/${standardId}/lookup`,
      options: {
        method: 'GET'
      }
    },
  };
}

export function saveOrUpdateUser(user, authString) {
  return {
    type: studentActionTypes.API_UPDATE_STUDENT,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/users/`,
      options: {
        method: 'POST',
        contentType: 'application/json',
        body: JSON.stringify(user)
      },
      payload: {
        authString
      }
    },
    payload: { user }
  };
}

export function updateStudent(user) {
  return {
    type: subjectActionTypes.API_UPDATE_SUBJECT,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/student/`,
      options: {
        method: 'POST',
        contentType: 'application/json',
        body: JSON.stringify(user)
      },
    },
    payload: user
  };
}

export function deleteStudent(subjectId) {
  return {
    type: subjectActionTypes.API_DELETE_SUBJECT,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/student/${subjectId}`,
      options: {
        method: 'DELETE',
        contentType: 'application/json'
      },
    },
    payload: subjectId
  };
}