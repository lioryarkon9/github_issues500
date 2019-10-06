import { handleActions } from 'redux-actions';

export type CurrentUser = null | any;

const initialState = null;

const currentUser = handleActions<CurrentUser>(
  {
    SET_USER_DETAILS: (state, action) => {
      return action.payload;
    }
  },

  initialState
);

export default currentUser;
