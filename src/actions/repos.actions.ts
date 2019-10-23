import * as actionNames from 'constants/actionNames.constants';
import { FETCH_REPOS } from 'constants/actionNames.constants';
import { ApiAction } from 'actions/api.actions';
import { GITHUB_BASE_URL } from 'constants/custom.constants';
import { Repo } from 'reducers/repos.reducer';

export const setRepos = (reposList: Repo[]) => ({
  type: actionNames.SET_REPOS,
  payload: reposList
});

export const fetchRepos = (): ApiAction<Repo[]> => ({
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
    onSuccess: (data: Repo[]) => setRepos(data),
    baseUrl: GITHUB_BASE_URL
  }
});
