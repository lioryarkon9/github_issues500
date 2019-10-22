import * as actionNames from 'constants/actionNames.constants';
import { ApiAction } from 'actions/api.actions';
import { GITHUB_BASE_URL } from 'constants/custom.constants';
import { CurrentUserState } from 'reducers/currentUser.reducer';

type Data = {
  token: string;
};

export const fetchToken = (code: string): ApiAction<any> => ({
  type: actionNames.FETCH_TOKEN,
  meta: { api: true },
  payload: {
    path: `/authenticate/${code}`,
    networkLabel: '',
    method: 'get',
    onError: error => {
      console.error('ERROR FETCHING TOKEN', error);
      window.alert('something went wrong, try again');
    },
    onSuccess: [
      ({ token }: Data) => setTokenOnSessionStorage(token),
      fetchUserDetails
    ],
    baseUrl: 'https://gatekeeper-test2.herokuapp.com'
  }
});

export const fetchUserDetails = (): ApiAction<CurrentUserState> => ({
  type: actionNames.FETCH_USER_DETAILS,
  meta: { api: true },
  payload: {
    path: '/user',
    method: 'get',
    networkLabel: '',
    onError: error => {
      console.error('ERROR FETCHING USER DETAILS', error);
      window.alert('something went wrong, try again');
    },
    onSuccess: (data: CurrentUserState) => setUserDetails(data),
    baseUrl: GITHUB_BASE_URL
  }
});

const setTokenOnSessionStorage = (token: string) => ({
  type: 'SET_TOKEN_ON_SESSION_STORAGE',
  payload: token
});

export const setUserDetails = (jsObject: CurrentUserState) => ({
  type: actionNames.SET_USER_DETAILS,
  payload: jsObject
});
