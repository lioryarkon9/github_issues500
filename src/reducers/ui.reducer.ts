import { handleActions } from 'redux-actions';

export type UiReducer = {
  currentIssueId?: number;
};

const initialState: UiReducer = {};

const uiReducer = handleActions<UiReducer>({}, initialState);

export default uiReducer;
