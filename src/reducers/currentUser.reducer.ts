import { handleActions } from 'redux-actions';
import { SET_USER_DETAILS } from 'constants/actionNames.constants';

export type CurrentUserState = {
  login: string;
  id: number;
} | null;

const initialState: CurrentUserState = null;

const currentUser = handleActions<CurrentUserState>(
  {
    [SET_USER_DETAILS]: (state, action) => action.payload
  },
  initialState
);

export default currentUser;
