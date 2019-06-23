import {batchActionTypes, CALL_API} from './actionTypes';

export function getAllBatches(instituteId) {
  return {
    type: batchActionTypes.API_GET_ALL_BATCHES,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/batches/${instituteId}`,
      options: {
        method: 'GET'
      }
    },
  };
}

export function createBatch(batch) {
  return {
    type: batchActionTypes.API_CREATE_BATCH,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/batches/`,
      options: {
        method: 'POST',
        contentType: 'application/json',
        body: JSON.stringify(batch)
      }
    },
    payload: { batch }
  };
}

export function updateBatch(batch) {
  return {
    type: batchActionTypes.API_UPDATE_BATCH,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/batches/`,
      options: {
        method: 'POST',
        contentType: 'application/json',
        body: JSON.stringify(batch)
      },
    },
    payload: batch
  };
}

export function deleteBatch(batchId) {
  return {
    type: batchActionTypes.API_DELETE_BATCH,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/batches/${batchId}`,
      options: {
        method: 'DELETE',
        contentType: 'application/json'
      },
    },
    payload: batchId
  };
}