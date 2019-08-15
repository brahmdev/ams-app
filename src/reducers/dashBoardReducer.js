import { dashBoardActionTypes, apiExecutionState} from '../actions/actionTypes';

const initialState = {
  pieData: [],
  errorMessage: '',
  isRequesting: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case dashBoardActionTypes.API_GET_DASHBOARD_DATA + apiExecutionState.STARTED:
      return {
        ...state,
        isRequesting: true
      };
    case dashBoardActionTypes.API_GET_DASHBOARD_DATA + apiExecutionState.FINISHED:
      const dashBoardData = JSON.parse(action.response);
      return {
        ...state,
        pieData: dashBoardData.pieDataList,
        isRequesting: false
      };
    default:
      return state;
  }
}
