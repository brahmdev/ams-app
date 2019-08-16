import { dashBoardActionTypes, apiExecutionState} from '../actions/actionTypes';

const initialState = {
  pieData: [],
  standardList: [],
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
        standardList: dashBoardData.standardList,
        isRequesting: false
      };
    default:
      return state;
  }
}
