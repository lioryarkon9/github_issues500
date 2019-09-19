import { handleActions } from 'redux-actions';
import { SET_CURRENT_ISSUE_ID } from 'constants/actionNames.constants';
import mockIssues from 'mock_issues.json';

export type UiReducer = {
  currentIssueId: number;
};

const initialState: UiReducer = {
  currentIssueId: mockIssues[0].id
};

const uiReducer = handleActions<UiReducer>(
  {
    [SET_CURRENT_ISSUE_ID]: (state, action) => {
      return {
        ...state,
        currentIssueId: action.payload
      };
    }
  },
  initialState
);

export default uiReducer;
