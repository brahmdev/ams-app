import {subjectActionTypes, studentActionTypes, imageActionType, CALL_API} from './actionTypes';

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

export function getAllStandardLookUpForStudent(branchId, authString) {
  return {
    type: studentActionTypes.API_GET_ALL_STANDARD_LOOKUP_FOR_STUDENT_ADMISSION,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/standards/${branchId}/lookup`,
      options: {
        method: 'GET'
      },
      payload: {
        authString
      }
    },
  };
}

export function getAllBatchOfStandardLookUp(standardId, authString) {
  return {
    type: studentActionTypes.API_GET_BATCH_FOR_STUDENT_ADMISSION,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/batches/standard/${standardId}/lookup`,
      options: {
        method: 'GET'
      },
      payload: {
        authString
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
    data: { user }
  };
}

export function uploadImage(formData, authString) {
  console.log('formdata is ', formData);
  return {
    type: imageActionType.API_UPLOAD_AVATAR,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/users/uploadImage`,
      options: {
        method: 'POST',
        body: formData,
        contentType: 'multipart/form-data'
      },
      payload: {
        authString
      }
    }
  };
}

export function uploadBase64Image(imageValue, fileName, authString) {
  return {
    type: imageActionType.API_UPLOAD_SIGN,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/users/uploadBase64Image/${fileName}`,
      options: {
        method: 'POST',
        contentType: 'application/json',
        body: imageValue
      },
      payload: {
        authString
      }
    }
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

export function deleteStudent(studentId, authString) {
  return {
    type: studentActionTypes.API_DELETE_STUDENT,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/users/${studentId}`,
      options: {
        method: 'DELETE',
        contentType: 'application/json'
      },
      payload: {
        authString
      }
    },
    data: studentId
  };
}