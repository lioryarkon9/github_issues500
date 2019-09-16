import { ApiAction } from 'actions/api.actions';
import {
  FETCH_ISSUES_BY_OWNER_AND_REPO,
  SET_ISSUES_ARRAY_AS_OBJECT
} from 'constants/action-names';
import { getIssuesObjectByList, SingleIssue } from 'reducers/issues.reducer';

type IssueResponse = [SingleIssue];

export const fetchIssuesByOwnerAndRepo = (): ApiAction<IssueResponse> => {
  return {
    type: FETCH_ISSUES_BY_OWNER_AND_REPO,
    meta: { api: true },
    payload: {
      path: '/repos/500tech/react-course/issues',
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
