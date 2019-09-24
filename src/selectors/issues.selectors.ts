import { State } from 'types/redux.types';
import { Issues, getIssuesObjectByList } from 'reducers/issues.reducer';
import { createSelector } from 'reselect';

const issuesSelector = (state: State): Issues => state.issues;

export const openIssues = createSelector(
  issuesSelector,
  (issuesSelector: Issues): Issues => {
    const openIssuesList = Object.values(issuesSelector).filter(
      issue => issue.state === 'open'
    );

    return getIssuesObjectByList(openIssuesList);
  }
);

export const createIssuesContainingParamInTitle = (param: string) =>
  createSelector(
    issuesSelector,
    (issuesSelector: Issues): Issues => {
      const filteredIssuesList = Object.values(issuesSelector).filter(issue => {
        const issueTitle = issue.title;
        const paramRegex = new RegExp(`${param}`);
        return paramRegex.test(issueTitle);
      });

      return getIssuesObjectByList(filteredIssuesList);
    }
  );

export default issuesSelector;
