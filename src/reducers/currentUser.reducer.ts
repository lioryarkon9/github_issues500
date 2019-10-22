import { handleActions } from 'redux-actions';
import { SET_USER_DETAILS } from 'constants/actionNames.constants';

export type CurrentUserState = null | Object;

const initialState = null;

const currentUser = handleActions<CurrentUserState>(
  {
    [SET_USER_DETAILS]: (state, action) => action.payload
  },
  initialState
);

export default currentUser;
