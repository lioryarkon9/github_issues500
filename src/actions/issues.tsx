import { ApiAction } from 'actions/api.actions';
import {
  FETCH_ISSUES_BY_OWNER_AND_REPO,
  SET_ISSUES_ARRAY_AS_OBJECT,
  ADD_NEW_ISSUE
} from 'constants/action-names';
import { GITHUB_USER, GITHUB_REPO } from 'constants/custom';
import { getIssuesObjectByList, SingleIssue } from 'reducers/issues.reducer';

type IssueResponse = [SingleIssue];

export const fetchIssuesByOwnerAndRepo = (): ApiAction<IssueResponse> => {
  return {
    type: FETCH_ISSUES_BY_OWNER_AND_REPO,
    meta: { api: true },
    payload: {
      path: `/repos/${GITHUB_USER}/${GITHUB_REPO}/issues`,
      networkLabel: '',
      method: 'get',
      onError: error => console.error('error: ', error),
      onSuccess: (data: IssueResponse) => setIssues(data),
      baseUrl: 'https://api.github.com'
    }
  };
};

export const setIssues = (issuesArr: [SingleIssue]) => ({
  type: SET_ISSUES_ARRAY_AS_OBJECT,
  payload: getIssuesObjectByList(issuesArr)
});

export const addNewIssue = () => ({
  type: ADD_NEW_ISSUE
});
