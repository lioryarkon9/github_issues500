import { handleActions } from 'redux-actions';
import mockIssues from 'mock_issues.json';
import {
  SET_ISSUES_ARRAY_AS_OBJECT,
  ADD_NEW_ISSUE
} from 'constants/actionNames.constants';
import { GITHUB_USER, GITHUB_REPO } from 'constants/custom.constants';

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

const initialState: Issues = getIssuesObjectByList(mockIssues); //{}

const issuesReducer = handleActions<Issues>(
  {
    [SET_ISSUES_ARRAY_AS_OBJECT]: (state, action) => {
      return Object.assign({}, state, action.payload);
    },
    [ADD_NEW_ISSUE]: (state, action) => {
      //todo: figure out what the {number} and {node_id} represent and how to get it
      const nodeId = 'MDU6SXNzdWUzMTkxNDg3NTk=';
      const number = 2;
      const createDate = new Date();
      const id = Math.floor(Math.random() * 1000000000);
      return Object.assign({}, state, {
        [id]: {
          url: `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/issues/${number}`,
          repository_url: `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}`,
          labels_url: `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/issues/${number}/labels{/name}`,
          comments_url: `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/issues/${number}/comments`,
          events_url: `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/issues/${number}/events`,
          html_url: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/issues/${number}`,
          id: id,
          node_id: nodeId,
          number: number,
          title: '',
          user: null,
          labels: [],
          state: 'open',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 0,
          created_at: createDate,
          updated_at: createDate,
          closed_at: null,
          author_association: 'NONE',
          body: ''
        }
      });
    }
  },
  initialState
);

export default issuesReducer;
