import { handleActions } from 'redux-actions';
import { keyBy } from 'lodash/fp';

export type Repos = {
  [id: number]: any;
};

const initialState = {};

const reposReducer = handleActions<Repos>(
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
