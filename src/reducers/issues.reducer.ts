import { handleActions } from 'redux-actions';
import * as actionNames from 'constants/actionNames.constants';
import { keyBy } from 'lodash/fp';
import { CurrentUserState } from 'reducers/currentUser.reducer';

export type Issue = {
  id: number;
  number: number;
  title: string;
  comments: number;
  created_at: string;
  body: string;
  state: string;
  user: CurrentUserState;
};

export type IssuesState = Record<number, Issue>;

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
