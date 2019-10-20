import { handleActions } from 'redux-actions';
import { keyBy } from 'lodash/fp';
import { SET_REPOS } from 'constants/actionNames.constants';

export type ReposState = {
  [id: number]: any;
};

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
