import { branchActionTypes, apiExecutionState} from '../actions/actionTypes';

const initialState = {
  id: '',
  code: '',
  name: '',
  branchList: [],
  branchLookup: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case branchActionTypes.API_GET_ALL_BRANCHES + apiExecutionState.FINISHED:
      const branchList = JSON.parse(action.response);
      return {
        ...state,
        branchList
      };
    case branchActionTypes.API_GET_ALL_BRANCHES_LOOKUP + apiExecutionState.FINISHED:
      const branchLookup = JSON.parse(action.response);
      return {
        ...state,
        branchLookup
      };
    case branchActionTypes.API_CREATE_BRANCH + apiExecutionState.FINISHED:
      const createdBranch = JSON.parse(action.response);
      state.branchList.push(createdBranch);
      return {
        ...state,
      };
    case branchActionTypes.API_UPDATE_BRANCH + apiExecutionState.FINISHED:
      const branchToUpdate = action.payload;
      const branchIdToUpdate = action.payload.id;
      for (let index = 0; index < state.branchList.length; index++) {
        if (branchIdToUpdate === state.branchList[index].id) {
          state.branchList[index] = branchToUpdate;
        }
      }
      return {
        ...state,
      };
    case branchActionTypes.API_DELETE_BRANCH + apiExecutionState.FINISHED:
      const branchIdToDelete = action.payload;
      for (let index = 0; index < state.branchList.length; index++) {
        if (branchIdToDelete === state.branchList[index].id) {
          state.branchList.splice(index, 1);
        }
      }
      return {
        ...state,
      };

    default:
      return state;
  }
}
