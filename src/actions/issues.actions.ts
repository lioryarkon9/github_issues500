import { ApiAction } from 'actions/api.actions';
import * as actionNames from 'constants/actionNames.constants';

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
      baseUrl: 'https://api.github.com'
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
    baseUrl: 'https://api.github.com',
    method: 'post',
    networkLabel: '',
    data: JSON.stringify({ title, body, labels: [] }),
    onError: error => {
      console.error('ERROR ADDING ISSUE', error);
      window.alert('something was wrong. try again');
    },
    onSuccess: (data: any) => onSuccessAddNewIssue({ router })
  }
});

const onSuccessAddNewIssue = ({ router }: any) => {
  router.history.goBack();
  return {
    type: 'ON_SUCCESS_ADD_NEW_ISSUE'
  };
};

const onSuccessUpdateNewIssue = ({ router }: any) => {
  router.history.goBack();
  return {
    type: 'ON_SUCCESS_UPDATE_NEW_ISSUE'
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
    baseUrl: 'https://api.github.com',
    method: 'patch',
    networkLabel: '',
    data: JSON.stringify({ title, body, labels: [] }),
    onError: error => {
      console.error('ERROR UPDATING ISSUE', error);
      window.alert('something was wrong. try again');
    },
    onSuccess: (data: any) => onSuccessUpdateNewIssue({ router })
  }
});
