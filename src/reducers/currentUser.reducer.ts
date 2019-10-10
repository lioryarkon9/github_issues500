import { handleActions } from 'redux-actions';

export type CurrentUserState = any;

const initialState = null;

const currentUser = handleActions<CurrentUserState>(
  {
    SET_USER_DETAILS: (state, action) => {
      return Object.assign({}, action.payload);
    }
  },

  initialState
);

export default currentUser;
