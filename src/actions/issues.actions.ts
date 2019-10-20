import { ApiAction } from 'actions/api.actions';
import * as actionNames from 'constants/actionNames.constants';
import { GITHUB_BASE_URL } from 'constants/custom.constants';

type UserAndRepo = {
  user: string;
  repo: string;
};

export const fetchIssuesByOwnerAndRepo = ({
  user,
  repo
}: UserAndRepo): ApiAction<any> => {
  return {
    type: actionNames.FETCH_ISSUES_BY_OWNER_AND_REPO,
    meta: { api: true },
    payload: {
      path: `/repos/${user}/${repo}/issues`,
      networkLabel: '',
      method: 'get',
      onError: error => {
        console.error('ERROR FETCHING ISSUES: ', error);
        window.alert('something went wrong! try again');
      },
      onSuccess: (data: any) => setIssues(data),
      baseUrl: GITHUB_BASE_URL
    }
  };
};

export const setIssues = (issuesList: [any]) => ({
  type: actionNames.SET_ISSUES,
  payload: issuesList
});

export const addNewIssue = ({
  issueTitle: title,
  issueBody: body,
  userName,
  repoName,
  router
}: any): ApiAction<any> => ({
  type: actionNames.ADD_NEW_ISSUE,
  meta: { api: true },
  payload: {
    path: `/repos/${userName}/${repoName}/issues`,
    baseUrl: GITHUB_BASE_URL,
    method: 'post',
    networkLabel: '',
    data: JSON.stringify({ title, body, labels: [] }),
    onError: error => {
      console.error('ERROR ADDING ISSUE', error);
      window.alert('something was wrong. try again');
    },
    onSuccess: () => onSuccessAddNewIssue({ router })
  }
});

const onSuccessAddNewIssue = ({ router }: any) => {
  return {
    type: 'ON_SUCCESS_ADD_NEW_ISSUE',
    router
  };
};

const onSuccessUpdateNewIssue = ({ router }: any) => {
  return {
    type: 'ON_SUCCESS_UPDATE_NEW_ISSUE',
    router
  };
};

export const updateIssue = ({
  issueTitle: title,
  issueBody: body,
  userName,
  repoName,
  issueNumber,
  router
}: any): ApiAction<any> => ({
  type: actionNames.UPDATE_ISSUE,
  meta: { api: true },
  payload: {
    path: `/repos/${userName}/${repoName}/issues/${issueNumber}`,
    baseUrl: GITHUB_BASE_URL,
    method: 'patch',
    networkLabel: '',
    data: JSON.stringify({ title, body, labels: [] }),
    onError: error => {
      console.error('ERROR UPDATING ISSUE', error);
      window.alert('something was wrong. try again');
    },
    onSuccess: () => onSuccessUpdateNewIssue({ router })
  }
});
