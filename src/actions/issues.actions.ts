import { ApiAction } from 'actions/api.actions';
import * as actionNames from 'constants/actionNames.constants';
import { GITHUB_USER, GITHUB_REPO } from 'constants/custom.constants';

type UserAndRepo = {
  user: string;
  repo: string;
};

export const fetchIssuesByOwnerAndRepo = ({
  user,
  repo
}: UserAndRepo): ApiAction<any> => {
  debugger;
  return {
    type: actionNames.FETCH_ISSUES_BY_OWNER_AND_REPO,
    meta: { api: true },
    payload: {
      path: `/repos/${user ? user : GITHUB_USER}/${
        repo ? repo : GITHUB_REPO
      }/issues`,
      networkLabel: '',
      method: 'get',
      onError: error => {
        console.error('ERROR FETCHING ISSUES: ', error);
        window.alert('something went wrong! try again');
      },
      onSuccess: (data: any) => setIssues(data),
      baseUrl: 'https://api.github.com'
    }
  };
};

export const setIssues = (issuesList: [any]) => ({
  type: actionNames.SET_ISSUES,
  payload: issuesList
});

export const addNewIssue = (title: string) => ({
  type: actionNames.ADD_NEW_ISSUE,
  payload: title
});

export const updateIssueBody = (issueId: string, updatedBody: string) => ({
  type: actionNames.UPDATE_ISSUE_BODY,
  payload: { issueId, updatedBody }
});
