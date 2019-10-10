import { handleActions } from 'redux-actions';
import { keyBy } from 'lodash/fp';

export type ReposState = {
  [id: number]: any;
};

const initialState = {};

const reposReducer = handleActions<ReposState>(
  {
    SET_REPOS: (state, action) => {
      const reposList = action.payload;

      return {
        ...state,
        ...keyBy('id', reposList)
      };
    }
  },

  initialState
);

export default reposReducer;
