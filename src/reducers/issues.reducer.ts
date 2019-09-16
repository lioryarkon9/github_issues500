import { handleActions } from 'redux-actions';
import mockIssues from 'mock_issues.json';
import { SET_ISSUES_ARRAY_AS_OBJECT } from 'constants/action-names';

export type SingleIssue = {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: any; // todo: consider handle in another reducer
  labels: Array<any>;
  state: string;
  locked: boolean;
  assignee: any;
  assignees: Array<any>;
  milestone: any;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: any;
  author_association: string;
  body: string;
};

export type Issues = {
  [id: number]: SingleIssue;
};

export const getIssuesObjectByList = (issuesArr: any[]): Issues => {
  return issuesArr.reduce((acc: Issues, cur: any) => {
    acc[cur.id] = cur;
    return acc;
  }, {});
};

const initialState: Issues = getIssuesObjectByList(mockIssues);

const issuesReducer = handleActions<Issues>(
  {
    [SET_ISSUES_ARRAY_AS_OBJECT]: (state, action) => {
      return Object.assign({}, state, action.payload);
    }
  },
  initialState
);

export default issuesReducer;
