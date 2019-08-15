import {combineReducers} from 'redux';
import userAccount from './user-account';
import users from './users';
import UserLoginReducer from './userReducer';
import BranchReducer from './branchReducer';
import BoardReducer from './boardReducer';
import StandardReducer from './standardReducer';
import SubjectReducer from './subjectReducer';
import ChapterReducer from './chapterReducer';
import BatchReducer from './batchReducer';
import StudentReducer from './studentReducer';
import DashBoardReducer from './dashBoardReducer';

const allReducers = combineReducers(
  {
    account: userAccount,
    users,
    user: UserLoginReducer,
    branch: BranchReducer,
    board: BoardReducer,
    standard: StandardReducer,
    subject: SubjectReducer,
    chapter: ChapterReducer,
    batch: BatchReducer,
    userData: StudentReducer,
    dashboard: DashBoardReducer
  });

const rootReducer = (state, action) => allReducers(state, action);

export default rootReducer;
