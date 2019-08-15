export const CALL_API= 'CALL_API';
export const UPDATE_STORE = 'UPDATE_STORE';

export const apiExecutionState = {
  STARTED: '_STARTED',
  FINISHED: '_FINISHED',
  ERROR: '_ERROR'
};

export const userActionTypes = {
  API_USER_LOGIN: 'API_USER_LOGIN',
  API_GET_USER_AUTHORITIES: 'API_GET_USER_AUTHORITIES',
  CLEAR_USER_ERROR_MESSAGES: 'CLEAR_USER_ERROR_MESSAGES',
  USER_LOG_OUT: 'USER_LOG_OUT'
};

export const branchActionTypes = {
  API_GET_ALL_BRANCHES: 'API_GET_ALL_BRANCHES',
  API_GET_ALL_BRANCHES_LOOKUP: 'API_GET_ALL_BRANCHES_LOOKUP',
  API_CREATE_BRANCH: 'API_CREATE_BRANCH',
  API_DELETE_BRANCH: 'API_DELETE_BRANCH',
  API_UPDATE_BRANCH: 'API_UPDATE_BRANCH'
};

export const dashBoardActionTypes = {
  API_GET_DASHBOARD_DATA: 'API_GET_DASHBOARD_DATA'
};

export const boardActionTypes = {
  API_GET_ALL_BOARDS: 'API_GET_ALL_BOARDS',
  API_GET_ALL_BOARDS_LOOKUP: 'API_GET_ALL_BOARDS_LOOKUP',
  API_CREATE_BOARD: 'API_CREATE_BOARD',
  API_DELETE_BOARD: 'API_DELETE_BOARD',
  API_UPDATE_BOARD: 'API_UPDATE_BOARD'
};

export const standardActionTypes = {
  API_GET_ALL_STANDARDS: 'API_GET_ALL_STANDARDS',
  API_GET_STANDARD: 'API_GET_STANDARD',
  API_GET_ALL_STANDARDS_LOOKUP: 'API_GET_ALL_STANDARDS_LOOKUP',
  API_CREATE_STANDARD: 'API_CREATE_STANDARD',
  API_DELETE_STANDARD: 'API_DELETE_STANDARD',
  API_UPDATE_STANDARD: 'API_UPDATE_STANDARD'
};

export const subjectActionTypes = {
  API_GET_ALL_SUBJECTS: 'API_GET_ALL_SUBJECTS',
  API_GET_ALL_SUBJECTS_LOOKUP: 'API_GET_ALL_SUBJECTS_LOOKUP',
  API_CREATE_SUBJECT: 'API_CREATE_SUBJECT',
  API_DELETE_SUBJECT: 'API_DELETE_SUBJECT',
  API_UPDATE_SUBJECT: 'API_UPDATE_SUBJECT'
};


export const chapterActionTypes = {
  API_GET_ALL_CHAPTERS: 'API_GET_ALL_CHAPTERS',
  API_CREATE_CHAPTER: 'API_CREATE_CHAPTER',
  API_DELETE_CHAPTER: 'API_DELETE_CHAPTER',
  API_UPDATE_CHAPTER: 'API_UPDATE_CHAPTER'
};

export const batchActionTypes = {
  API_GET_ALL_BATCHES: 'API_GET_ALL_BATCHES',
  API_CREATE_BATCH: 'API_CREATE_BATCH',
  API_DELETE_BATCH: 'API_DELETE_BATCH',
  API_UPDATE_BATCH: 'API_UPDATE_BATCH'
};

export const studentActionTypes = {
  API_GET_ALL_STANDARD_LOOKUP_FOR_STUDENT_ADMISSION: 'API_GET_ALL_STANDARD_LOOKUP_FOR_STUDENT_ADMISSION',
  API_GET_STUDENT: 'API_GET_STUDENT',
  API_GET_BATCH_FOR_STUDENT_ADMISSION: 'API_GET_BATCH_FOR_STUDENT_ADMISSION',
  API_CREATE_STUDENT: 'API_CREATE_STUDENT',
  API_DELETE_STUDENT: 'API_DELETE_STUDENT',
  API_UPDATE_STUDENT: 'API_UPDATE_STUDENT',
  API_GET_ALL_STUDENTS: 'API_GET_ALL_STUDENTS',
  API_GET_PARENT: 'API_GET_PARENT',
  STORE_UPDATE_SELECTED_USER: 'STORE_UPDATE_SELECTED_USER',
  STORE_UPDATE_FEES_COLLECTION: 'STORE_UPDATE_FEES_COLLECTION'
};

export const imageActionType = {
  API_UPLOAD_AVATAR: 'API_UPLOAD_AVATAR',
  API_UPLOAD_SIGN: 'API_UPLOAD_SIGN'
};