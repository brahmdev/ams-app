import { branchActionTypes, CALL_API } from './actionTypes';

export function getAllBranches(instituteId) {
  return {
    type: branchActionTypes.API_GET_ALL_BRANCHES,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/branches/${instituteId}`,
      options: {
        method: 'GET'
      }
    },
  };
}

export function getAllBranchesLookUp(instituteId) {
  return {
    type: branchActionTypes.API_GET_ALL_BRANCHES_LOOKUP,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/branches/${instituteId}/lookup`,
      options: {
        method: 'GET'
      }
    },
  };
}


export function createBranch(branch) {
  return {
    type: branchActionTypes.API_CREATE_BRANCH,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/branches/`,
      options: {
        method: 'POST',
        contentType: 'application/json',
        body: JSON.stringify(branch)
      }
    },
    payload: { branch }
  };
}

export function updateBranch(branch) {
  return {
    type: branchActionTypes.API_UPDATE_BRANCH,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/branches/`,
      options: {
        method: 'POST',
        contentType: 'application/json',
        body: JSON.stringify(branch)
      },
    },
    payload: branch
  };
}

export function deleteBranch(branchId) {
  return {
    type: branchActionTypes.API_DELETE_BRANCH,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/branches/${branchId}`,
      options: {
        method: 'DELETE',
        contentType: 'application/json'
      },
    },
    payload: branchId
  };
}