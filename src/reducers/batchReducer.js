import { batchActionTypes, apiExecutionState} from '../actions/actionTypes';

const initialState = {
  id: '',
  code: '',
  name: '',
  year: '',
  capacity: '',
  created: '',
  updated: '',
  batchList: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case batchActionTypes.API_GET_ALL_BATCHES + apiExecutionState.FINISHED:
      const batchList = JSON.parse(action.response);
      return {
        ...state,
        batchList
      };
    case batchActionTypes.API_CREATE_BATCH + apiExecutionState.FINISHED:
      const createdBoard = JSON.parse(action.response);
      state.batchList.push(createdBoard);
      return {
        ...state,
      };
    case batchActionTypes.API_UPDATE_BATCH + apiExecutionState.FINISHED:
      const batchToUpdate = action.payload;
      const batchIdToUpdate = action.payload.id;
      for (let index = 0; index < state.batchList.length; index++) {
        if (batchIdToUpdate === state.batchList[index].id) {
          state.batchList[index] = batchToUpdate;
        }
      }
      return {
        ...state,
      };
    case batchActionTypes.API_DELETE_BATCH + apiExecutionState.FINISHED:
      const batchIdToDelete = action.payload;
      for (let index = 0; index < state.batchList.length; index++) {
        if (batchIdToDelete === state.batchList[index].id) {
          state.batchList.splice(index, 1);
        }
      }
      return {
        ...state,
      };

    default:
      return state;
  }
}
