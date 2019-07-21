import {standardActionTypes, apiExecutionState} from '../actions/actionTypes';

const initialState = {
  id: '',
  code: '',
  name: '',
  fees: '',
  standardLookUp: {},
  standardList: [],
  isRequesting: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case standardActionTypes.API_GET_ALL_STANDARDS + apiExecutionState.STARTED:
    case standardActionTypes.API_GET_STANDARD + apiExecutionState.STARTED:
    case standardActionTypes.API_GET_ALL_STANDARDS_LOOKUP + apiExecutionState.STARTED:
    case standardActionTypes.API_CREATE_STANDARD + apiExecutionState.STARTED:
    case standardActionTypes.API_UPDATE_STANDARD + apiExecutionState.STARTED:
    case standardActionTypes.API_DELETE_STANDARD + apiExecutionState.STARTED:
      return {
        ...state,
        isRequesting: true
      };
    case standardActionTypes.API_GET_ALL_STANDARDS + apiExecutionState.FINISHED:
      const standardList = JSON.parse(action.response);
      return {
        ...state,
        standardList,
        isRequesting: false
      };
    case standardActionTypes.API_GET_STANDARD + apiExecutionState.FINISHED:
      const standard = JSON.parse(action.response);
      return {
        ...state,
        id: standard.id,
        code: standard.code,
        name: standard.name,
        fees: standard.fees
      };
    case standardActionTypes.API_GET_ALL_STANDARDS_LOOKUP + apiExecutionState.FINISHED:
      const standardLookUp = JSON.parse(action.response);
      return {
        ...state,
        standardLookUp
      };
    case standardActionTypes.API_CREATE_STANDARD + apiExecutionState.FINISHED:
      const createdStandard = JSON.parse(action.response);
      state.standardList.push(createdStandard);
      return {
        ...state,
      };
    case standardActionTypes.API_UPDATE_STANDARD + apiExecutionState.FINISHED:
      const standardToUpdate = action.payload;
      const standardIdToUpdate = action.payload.id;
      for (let index = 0; index < state.standardList.length; index++) {
        if (standardIdToUpdate === state.standardList[index].id) {
          state.standardList[index] = standardToUpdate;
        }
      }
      return {
        ...state,
      };
    case standardActionTypes.API_DELETE_STANDARD + apiExecutionState.FINISHED:
      const standardIdToDelete = action.payload;
      for (let index = 0; index < state.standardList.length; index++) {
        if (standardIdToDelete === state.standardList[index].id) {
          state.standardList.splice(index, 1);
        }
      }
      return {
        ...state,
      };

    default:
      return state;
  }
}
