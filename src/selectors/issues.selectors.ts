import { State } from 'types/redux.types';
import { createSelector } from 'reselect';
import { Issue, IssuesState } from 'reducers/issues.reducer';

export const issuesSelector = (state: State): any => state.issues;

export const filterInputSelector = (state: State): string =>
  state.ui.filterInputValue;

export const issuesFilteredByInputChangeSelector = createSelector(
  issuesSelector,
  filterInputSelector,
  (issues: IssuesState, valueToFilterBy: string): any => {
    return Object.values(issues).filter((issue: Issue) => {
      const issueTitle = issue.title;

      if (valueToFilterBy) {
        const paramRegex = new RegExp(`${valueToFilterBy.toLowerCase()}`);

        return paramRegex.test(issueTitle.toLowerCase());
      }

      return false;
    });
  }
);
