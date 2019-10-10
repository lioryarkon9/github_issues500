import { handleActions } from 'redux-actions';
import * as actionNames from 'constants/actionNames.constants';
import { keyBy } from 'lodash/fp';

export type IssuesState = {
  [id: number]: any;
};

const initialState = {};

const issuesReducer = handleActions<IssuesState>(
  {
    [actionNames.SET_ISSUES]: (state, action) => {
      const issuesList = action.payload;

      return keyBy('id', issuesList);
    },

    [actionNames.UPDATE_ISSUE_BODY]: (state, action) => {
      const { issueId, updatedBody } = action.payload;

      return {
        ...state,
        [issueId]: {
          ...state[issueId],
          body: updatedBody
        }
      };
    }
  },

  initialState
);

export default issuesReducer;
