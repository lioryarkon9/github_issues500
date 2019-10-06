import { handleActions } from 'redux-actions';

export type CurrentUser = any;

const initialState = null;

const currentUser = handleActions<CurrentUser>(
  {
    SET_USER_DETAILS: (state, action) => {
      return Object.assign({}, action.payload);
    }
  },

  initialState
);

export default currentUser;
