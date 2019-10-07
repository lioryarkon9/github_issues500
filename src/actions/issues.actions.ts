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
  repoName
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
    onSuccess: (data: any) => onSuccessAddNewIssue(data)
  }
});

const onSuccessAddNewIssue = ({ title }: any) => {
  window.alert(`issue ${title} added successfully`);

  return {
    type: 'ON_SUCCESS_ADD_NEW_ISSUE'
  };
};

export const updateIssueBody = (issueId: string, updatedBody: string) => ({
  type: actionNames.UPDATE_ISSUE_BODY,
  payload: { issueId, updatedBody }
});
