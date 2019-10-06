import * as actionNames from 'constants/actionNames.constants';

export const setUserDetails = (jsObject: any) => {
  return {
    type: actionNames.SET_USER_DETAILS,
    payload: jsObject
  };
};
