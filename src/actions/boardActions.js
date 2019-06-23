import { boardActionTypes, CALL_API } from './actionTypes';

export function getAllBoards(instituteId) {
  return {
    type: boardActionTypes.API_GET_ALL_BOARDS,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/boards/${instituteId}`,
      options: {
        method: 'GET'
      }
    },
  };
}

export function getAllBoardsLookUp(instituteId) {
  return {
    type: boardActionTypes.API_GET_ALL_BOARDS_LOOKUP,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/boards/${instituteId}/lookup`,
      options: {
        method: 'GET'
      }
    },
  };
}


export function createBoard(board) {
  return {
    type: boardActionTypes.API_CREATE_BOARD,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/boards/`,
      options: {
        method: 'POST',
        contentType: 'application/json',
        body: JSON.stringify(board)
      }
    },
    payload: { board }
  };
}

export function updateBoard(board) {
  return {
    type: boardActionTypes.API_UPDATE_BOARD,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/boards/`,
      options: {
        method: 'POST',
        contentType: 'application/json',
        body: JSON.stringify(board)
      },
    },
    payload: board
  };
}

export function deleteBoard(boardId) {
  return {
    type: boardActionTypes.API_DELETE_BOARD,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/boards/${boardId}`,
      options: {
        method: 'DELETE',
        contentType: 'application/json'
      },
    },
    payload: boardId
  };
}