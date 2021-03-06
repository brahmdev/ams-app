import {subjectActionTypes, studentActionTypes, imageActionType, CALL_API, UPDATE_STORE} from './actionTypes';

export function getAllStudents(branchId= 1, authString) {
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

export function getStudentByUserName(userName, authString, branchId= 1,) {
  return {
    type: studentActionTypes.API_GET_STUDENT,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/users/${branchId}/${userName}`,
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

export function updateStudentDataInStore(user) {
  return {
    type: studentActionTypes.STORE_UPDATE_SELECTED_USER,
    apiType: UPDATE_STORE,
    data: user
  };
}

export function updateFeesCollectionInStore(feesCollection) {
  return {
    type: studentActionTypes.STORE_UPDATE_FEES_COLLECTION,
    apiType: UPDATE_STORE,
    data: feesCollection
  };
}