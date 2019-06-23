import { boardActionTypes, apiExecutionState} from '../actions/actionTypes';

const initialState = {
  id: '',
  code: '',
  name: '',
  boardList: [],
  boardLookup: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case boardActionTypes.API_GET_ALL_BOARDS + apiExecutionState.FINISHED:
      const boardList = JSON.parse(action.response);
      return {
        ...state,
        boardList
      };
    case boardActionTypes.API_GET_ALL_BOARDS_LOOKUP + apiExecutionState.FINISHED:
      const boardLookup = JSON.parse(action.response);
      return {
        ...state,
        boardLookup
      };
    case boardActionTypes.API_CREATE_BOARD + apiExecutionState.FINISHED:
      const createdBoard = JSON.parse(action.response);
      state.boardList.push(createdBoard);
      return {
        ...state,
      };
    case boardActionTypes.API_UPDATE_BOARD + apiExecutionState.FINISHED:
      const boardToUpdate = action.payload;
      const boardIdToUpdate = action.payload.id;
      for (let index = 0; index < state.boardList.length; index++) {
        if (boardIdToUpdate === state.boardList[index].id) {
          state.boardList[index] = boardToUpdate;
        }
      }
      return {
        ...state,
      };
    case boardActionTypes.API_DELETE_BOARD + apiExecutionState.FINISHED:
      const boardIdToDelete = action.payload;
      for (let index = 0; index < state.boardList.length; index++) {
        if (boardIdToDelete === state.boardList[index].id) {
          state.boardList.splice(index, 1);
        }
      }
      return {
        ...state,
      };

    default:
      return state;
  }
}
