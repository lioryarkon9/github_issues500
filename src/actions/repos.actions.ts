import * as actionNames from 'constants/actionNames.constants';
import { FETCH_REPOS } from 'constants/actionNames.constants';
import { ApiAction } from 'actions/api.actions';

export const setRepos = (reposList: [any]) => ({
  type: actionNames.SET_REPOS,
  payload: reposList
});

export const fetchRepos = (): ApiAction<any> => ({
  type: FETCH_REPOS,
  meta: { api: true },
  payload: {
    path: '/user/repos',
    networkLabel: '',
    method: 'get',
    onError: error => {
      console.error('ERROR FETCHING REPOS: ', error);
      window.alert('something went wrong! try again');
    },
    onSuccess: (data: any) => setRepos(data),
    baseUrl: 'https://api.github.com'
  }
});
