import { ApiAction } from 'actions/api.actions';
import * as actionNames from 'constants/actionNames.constants';
import { GITHUB_BASE_URL } from 'constants/custom.constants';
import { RouteComponentProps } from 'react-router';
import { BaseAction } from 'types/base-redux.types';
import { IssuesState } from 'reducers/issues.reducer';

type Router = {
  router: RouteComponentProps;
};

export type UserAndRepo = {
  user: string;
  repo: string;
};

export type AddNewIssueProps = {
  issueTitle: string;
  issueBody: string;
  userName: string;
  repoName: string;
  router: RouteComponentProps;
};

export const fetchIssuesByOwnerAndRepo = ({
  user,
  repo
}: UserAndRepo): ApiAction<BaseAction> => {
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

export const setIssues = (issuesList: IssuesState[]) => ({
  type: actionNames.SET_ISSUES,
  payload: issuesList
});

export const addNewIssue = ({
  issueTitle: title,
  issueBody: body,
  userName,
  repoName,
  router
}: AddNewIssueProps): ApiAction<BaseAction> => ({
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

const onSuccessAddNewIssue = ({ router }: Router) => {
  return {
    type: 'ON_SUCCESS_ADD_NEW_ISSUE',
    router
  };
};

const onSuccessUpdateNewIssue = ({ router }: Router) => {
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
}: AddNewIssueProps & { issueNumber: number }): ApiAction<BaseAction> => ({
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
