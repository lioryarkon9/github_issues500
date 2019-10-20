import { handleActions } from 'redux-actions';
import * as actionNames from 'constants/actionNames.constants';
import { keyBy } from 'lodash/fp';

export type IssuesState = {
  [id: number]: any;
};
// export type IssuesState = Record<number, any>;

const initialState = {};

const issuesReducer = handleActions<IssuesState>(
  {
    [actionNames.SET_ISSUES]: (state, action) => {
      const issuesList = action.payload;

      return keyBy('id', issuesList);
    }
  },

  initialState
);

export default issuesReducer;
