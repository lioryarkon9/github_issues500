import { handleActions } from 'redux-actions';
import * as actionNames from 'constants/actionNames.constants';
import { keyBy } from 'lodash/fp';

export type Issues = {
  [id: number]: any;
};

const initialState = {};

const issuesReducer = handleActions<Issues>(
  {
    [actionNames.SET_ISSUES]: (state, action) => {
      const issuesList = action.payload;

      return {
        ...state,
        ...keyBy('id', issuesList)
      };
    },

    [actionNames.ADD_NEW_ISSUE]: (state, action) => {
      //todo: figure out what the {number} and {node_id} represent and how to get it
      const number = Object.keys(state).length + 1;
      const createDate = new Date();
      const id = Math.floor(Math.random() * 1000000000);

      return Object.assign({}, state, {
        [id]: {
          number: number,
          id: id,
          title: action.payload,
          state: 'open',
          comments: 0,
          created_at: createDate,
          updated_at: createDate,
          body: ''
        }
      });
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
