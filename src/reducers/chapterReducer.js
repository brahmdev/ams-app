import { chapterActionTypes, apiExecutionState} from '../actions/actionTypes';

const initialState = {
  id: '',
  code: '',
  name: '',
  chapterList: [],
  isRequesting: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case chapterActionTypes.API_GET_ALL_CHAPTERS + apiExecutionState.STARTED:
    case chapterActionTypes.API_CREATE_CHAPTER + apiExecutionState.STARTED:
    case chapterActionTypes.API_UPDATE_CHAPTER + apiExecutionState.STARTED:
    case chapterActionTypes.API_DELETE_CHAPTER + apiExecutionState.STARTED:
      return {
        ...state,
        isRequesting: true
      };
    case chapterActionTypes.API_GET_ALL_CHAPTERS + apiExecutionState.FINISHED:
      const chapterList = JSON.parse(action.response);
      return {
        ...state,
        chapterList,
        isRequesting: false
      };
    case chapterActionTypes.API_CREATE_CHAPTER + apiExecutionState.FINISHED:
      const createdBoard = JSON.parse(action.response);
      state.chapterList.push(createdBoard);
      return {
        ...state,
        isRequesting: false
      };
    case chapterActionTypes.API_UPDATE_CHAPTER + apiExecutionState.FINISHED:
      const chapterToUpdate = action.payload;
      const chapterIdToUpdate = action.payload.id;
      for (let index = 0; index < state.chapterList.length; index++) {
        if (chapterIdToUpdate === state.chapterList[index].id) {
          state.chapterList[index] = chapterToUpdate;
        }
      }
      return {
        ...state,
        isRequesting: false
      };
    case chapterActionTypes.API_DELETE_CHAPTER + apiExecutionState.FINISHED:
      const chapterIdToDelete = action.payload;
      for (let index = 0; index < state.chapterList.length; index++) {
        if (chapterIdToDelete === state.chapterList[index].id) {
          state.chapterList.splice(index, 1);
        }
      }
      return {
        ...state,
        isRequesting: false
      };

    default:
      return state;
  }
}
