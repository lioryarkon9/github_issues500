import { handleActions } from 'redux-actions';
import { keyBy } from 'lodash/fp';
import { SET_REPOS } from 'constants/actionNames.constants';
import { CurrentUserState } from 'reducers/currentUser.reducer';

export type Repo = {
  id: number;
  name: string;
  private: boolean;
  owner: CurrentUserState;
  open_issues_count: number;
};

export type ReposState = Record<number, Repo>;

const initialState = {};

const reposReducer = handleActions<ReposState>(
  {
    [SET_REPOS]: (state, { payload: issueList }) => ({
      ...state,
      ...keyBy('id', issueList)
    })
  },

  initialState
);

export default reposReducer;
