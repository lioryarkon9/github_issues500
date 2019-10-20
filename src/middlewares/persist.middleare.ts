import { BaseAction } from 'types/base-redux.types';
import { Dispatch } from 'redux';
import { SET_USER_DETAILS } from 'constants/actionNames.constants';

const persistMiddleware = () => (next: Dispatch<BaseAction>) => (
  action: BaseAction
) => {
  next(action);

  if (action.type === SET_USER_DETAILS) {
    window.sessionStorage.setItem(
      '_currentUser',
      JSON.stringify(action.payload)
    );
  }

  if (action.type === 'SET_TOKEN_ON_SESSION_STORAGE') {
    window.sessionStorage.setItem('_token', action.payload);
  }
};

export default persistMiddleware;
