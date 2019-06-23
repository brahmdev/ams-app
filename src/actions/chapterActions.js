import { chapterActionTypes, CALL_API } from './actionTypes';

export function getAllChapters(instituteId) {
  return {
    type: chapterActionTypes.API_GET_ALL_CHAPTERS,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/chapters/${instituteId}`,
      options: {
        method: 'GET'
      }
    },
  };
}

export function createChapter(standard) {
  return {
    type: chapterActionTypes.API_CREATE_CHAPTER,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/chapters/`,
      options: {
        method: 'POST',
        contentType: 'application/json',
        body: JSON.stringify(standard)
      }
    },
    payload: { standard }
  };
}

export function updateChapter(standard) {
  return {
    type: chapterActionTypes.API_UPDATE_CHAPTER,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/chapters/`,
      options: {
        method: 'POST',
        contentType: 'application/json',
        body: JSON.stringify(standard)
      },
    },
    payload: standard
  };
}

export function deleteChapter(subjectId) {
  return {
    type: chapterActionTypes.API_DELETE_CHAPTER,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/chapters/${subjectId}`,
      options: {
        method: 'DELETE',
        contentType: 'application/json'
      },
    },
    payload: subjectId
  };
}